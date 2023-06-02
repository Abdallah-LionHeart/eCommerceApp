using Microsoft.OpenApi.Models;

namespace API.Extensions
{
 public static class SwaggerServiceExtensions
 {
  public static IServiceCollection AddSwaggerDocumentation(this IServiceCollection services)
  {
   services.AddEndpointsApiExplorer();
   services.AddSwaggerGen(configratution =>
   {
    var SecuritySchema = new OpenApiSecurityScheme
    {
     Description = "JWT Auth Bearer Scheme",
     Name = "Authorization",
     In = ParameterLocation.Header,
     Type = SecuritySchemeType.Http,
     Scheme = "bearer",
     Reference = new OpenApiReference
     {
      Type = ReferenceType.SecurityScheme,
      Id = "Bearer"
     }
    };

    configratution.AddSecurityDefinition("Bearer", SecuritySchema);
    var SecurityRequirement = new OpenApiSecurityRequirement
    {
     {
        SecuritySchema, new[] {"Bearer"}
     }
    };

    configratution.AddSecurityRequirement(SecurityRequirement);

   });
   return services;

  }
  public static IApplicationBuilder UseSwaggerDocumentation(this IApplicationBuilder app)
  {
   app.UseSwagger();
   app.UseSwaggerUI();

   return app;
  }


 }
}