using System.Text;
using API.Data;
using API.Errors;
using API.Extensions;
using API.Helpers;
using API.Identity;
using API.Interfaces;
using API.Meddleware;
using API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using StackExchange.Redis;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.Services.Configure<CloudinarySettings>(builder.Configuration.GetSection("CloudinarySettings"));
builder.Services.AddScoped<IBasketRepository, BasketRepository>();
builder.Services.AddScoped<IPhotoService, PhotoService>();
builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddScoped<IPaymentService, PaymentService>();
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
// builder.Configuration.AddEnvironmentVariables();

var storeConnectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<StoreContext>(opt =>
{
 opt.UseSqlite(storeConnectionString);
});

var identityConnectionString = builder.Configuration.GetConnectionString("IdentityConnection");
builder.Services.AddDbContext<AppIdentityDbContext>(opt =>
{
 opt.UseSqlite(identityConnectionString);
});


builder.Services.AddSingleton<IConnectionMultiplexer>(c =>
{
 var options = ConfigurationOptions.Parse(builder.Configuration.GetConnectionString("Redis"));
 return ConnectionMultiplexer.Connect(options);
});

builder.Services.AddIdentityCore<AppUser>(opt =>
{
 // opt.Password.RequireNonAlphanumeric = false/* true*/;
})
 .AddEntityFrameworkStores<AppIdentityDbContext>()
 .AddSignInManager<SignInManager<AppUser>>();

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

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
 .AddJwtBearer(opt =>
 {
  opt.TokenValidationParameters = new TokenValidationParameters
  {
   ValidateIssuerSigningKey = true,
   IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Token:Key"])),
   ValidIssuer = builder.Configuration["Token:Issuer"],
   ValidateIssuer = true,
   ValidateAudience = false
  };
 });
builder.Services.AddAuthorization();

builder.Services.AddCors(opt =>
{
 opt.AddPolicy("CorsPolicy", policy =>
 {
  policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:4200");
 });
});

builder.Services.AddCors();
builder.Services.AddSwaggerDocumentation();

var app = builder.Build();

app.UseMiddleware<ExceptionMiddleware>();
app.UseStatusCodePagesWithReExecute("/errors/{0}");

// Configure the HTTP request pipeline.


// if (app.Environment.IsDevelopment())
// {
//  app.UseSwagger();
//  app.UseSwaggerUI();
// }

app.UseSwaggerDocumentation();

// app.UseCors(builder => builder.AllowAnyHeader().AllowAnyMethod()
// .AllowCredentials().WithOrigins("https://localhost:4200"));
// app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseCors("CorsPolicy");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;
var context = services.GetRequiredService<StoreContext>();
var identityContext = services.GetRequiredService<AppIdentityDbContext>();
var userManger = services.GetRequiredService<UserManager<AppUser>>();
var logger = services.GetRequiredService<ILogger<Program>>();
try
{
 await context.Database.MigrateAsync();
 await identityContext.Database.MigrateAsync();
 await StoreContextSeed.SeedAsync(context);
 await AppIdentityDbContextSeed.SeedUsersAsync(userManger);
}
catch (Exception ex)
{
 logger.LogError(ex, " An Error Occured During Migration");
}
app.Run();
