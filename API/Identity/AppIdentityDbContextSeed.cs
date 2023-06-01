using Microsoft.AspNetCore.Identity;

namespace API.Identity
{
 public class AppIdentityDbContextSeed
 {
  public static async Task SeedUsersAsync(UserManager<AppUser> userManager)
  {
   if (!userManager.Users.Any())
   {
    var user = new AppUser
    {
     DisplayName = "Bob",
     Email = "bob@gmail.com",
     UserName = "bob@gmail.com",
     Address = new Address
     {
      FirstName = "Bob",
      LastName = "Bobbity",
      Street = "10 The Street",
      City = "New York",
      Zipcode = "90210"
     }
    };
    await userManager.CreateAsync(user, "Pa$$w0rd");
   }
  }
 }
}