using API.Data;
using API.Errors;
using API.Interfaces;
using API.Meddleware;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StackExchange.Redis;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<StoreContext>(opt =>
{
 opt.UseSqlite(connectionString);
});

builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
builder.Services.AddScoped<IBasketRepository, BasketRepository>();
builder.Services.AddSingleton<IConnectionMultiplexer>(c =>
{
 var options = ConfigurationOptions.Parse(builder.Configuration.GetConnectionString("Redis"));
 return ConnectionMultiplexer.Connect(options);
});
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
// builder.Configuration.AddEnvironmentVariables();

builder.Services.Configure<ApiBehaviorOptions>(options =>
{
 options.InvalidModelStateResponseFactory = actionContext =>
 {
  var errors = actionContext.ModelState
    .Where(e => e.Value.Errors.Count > 0)
    .SelectMany(x => x.Value.Errors)
    .Select(x => x.ErrorMessage).ToArray();

  var errorResponse = new ApiValidationErrorResponse
  {
   Errors = errors
  };
  return new BadRequestObjectResult(errorResponse);
 };
});

// builder.Services.AddCors(opt =>
// {
//  opt.AddPolicy("CorsPolicy", policy =>
//  {
//   policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:4200");
//  });
// });
builder.Services.AddCors();

var app = builder.Build();

app.UseStatusCodePagesWithReExecute("/errors/{0}");

// Configure the HTTP request pipeline.

app.UseMiddleware<ExceptionMiddleware>();
if (app.Environment.IsDevelopment())
{
 app.UseSwagger();
 app.UseSwaggerUI();
}
app.UseCors(builder => builder.AllowAnyHeader().AllowAnyMethod()
.AllowCredentials().WithOrigins("https://localhost:4200"));
app.UseHttpsRedirection();
app.UseStaticFiles();
// app.UseCors("CorsPolicy");

app.UseAuthorization();

app.MapControllers();

using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;
var context = services.GetRequiredService<StoreContext>();
var logger = services.GetRequiredService<ILogger<Program>>();
try
{
 await context.Database.MigrateAsync();
 await StoreContextSeed.SeedAsync(context);
}
catch (Exception ex)
{
 logger.LogError(ex, " An Error Occured During Migration");
}
app.Run();
