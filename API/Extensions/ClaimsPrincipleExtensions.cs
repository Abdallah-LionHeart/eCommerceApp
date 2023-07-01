using System.Security.Claims;

namespace API.Extensions
{
 public static class ClaimsPrincipleExtensions
 {
  public static string RetrieveEmailFromPrincipal(this ClaimsPrincipal user)
  {
   // return user?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;
   //    return user?.Claims?.FirstOrDefault(x => x.Type == "email")?.Value;
   return user.FindFirstValue(ClaimTypes.Email);
  }

  public static string GetProductId(this ClaimsPrincipal user)
  {
   return user.FindFirstValue("ProductId");
  }

  public static string GetProductName(this ClaimsPrincipal user)
  {
   return user.FindFirstValue("ProductName");
  }

 }
}