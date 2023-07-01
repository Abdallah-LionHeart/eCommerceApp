using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
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

  public string CreateToken(string productId, string productName)
  {
   var claims = new List<Claim>
    {
     new Claim("ProductId", productId),
     new Claim("ProductName", productName),
    };

   var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);

   var tokenDescriptor = new SecurityTokenDescriptor
   {
    Subject = new ClaimsIdentity(claims),
    Expires = DateTime.Now.AddDays(7),
    SigningCredentials = creds,
    Issuer = _config["Token:Issuer"]
   };

   var tokenHandler = new JwtSecurityTokenHandler();

   var token = tokenHandler.CreateToken(tokenDescriptor);

   return tokenHandler.WriteToken(token);
  }
 }
}
