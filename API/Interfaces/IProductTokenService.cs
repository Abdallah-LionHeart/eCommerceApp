namespace API.Interfaces
{
 public interface IProductTokenService
 {
  string CreateToken(string productId, string productName);
 }
}