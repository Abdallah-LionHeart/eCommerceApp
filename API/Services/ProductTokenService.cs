using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using API.Entity;
using API.Interfaces;
using Microsoft.IdentityModel.Tokens;

namespace API.Services
{
 public class ProductTokenService : IProductTokenService
 {

  private readonly IConfiguration _config;
  private readonly SymmetricSecurityKey _key;

  public ProductTokenService(IConfiguration config)
  {
   _config = config;
   _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Token:Key"]));
  }

  public string CreateToken(Product product)
  {
   var claims = new List<Claim>
    {
      new Claim("ProductId", product.Id.ToString()),
      new Claim("ProductName", product.Name)
    };

   var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);

   var tokenDescriptor = new SecurityTokenDescriptor
   {
    Subject = new ClaimsIdentity(claims),
    Expires = DateTime.Now.AddHours(1),
    SigningCredentials = creds,
    Issuer = _config["Token:Issuer"]
   };

   var tokenHandler = new JwtSecurityTokenHandler();

   var token = tokenHandler.CreateToken(tokenDescriptor);

   return tokenHandler.WriteToken(token);
  }

 }
}
