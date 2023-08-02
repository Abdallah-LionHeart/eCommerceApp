using System.Security.Claims;

namespace API.Extensions
{
 public static class ClaimsPrincipleExtensions
 {
  public static string RetrieveEmailFromPrincipal(this ClaimsPrincipal user)
  {
   return user.FindFirstValue(ClaimTypes.Email);
  }
  public static string GetProductId(this ClaimsPrincipal product)
  {
   return product.FindFirstValue("ProductId");
  }

  public static string GetProductName(this ClaimsPrincipal product)
  {
   return product.FindFirstValue("ProductName");
  }
 }
}