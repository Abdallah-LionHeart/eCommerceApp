using API.Entity;

namespace API.Interfaces
{
 public interface IProductTokenService
 {
  string CreateToken(Product product);
 }
}