using Microsoft.AspNetCore.Identity;

namespace API.Identity
{
 public class AppIdentityDbContextSeed
 {
  public static async Task SeedUsersAsync(UserManager<AppUser> userManager, RoleManager<AppRole> roleManager)
  {
   if (!userManager.Users.Any())
   {
    var users = new List<AppUser>
    {
     new AppUser
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
    },

    new AppUser
    {
     DisplayName = "Admin",
     Email = "admin@gmail.com",
     UserName = "admin@gmail.com"
    }

    };
    var roles = new List<AppRole>
    {
     new AppRole {Name = "Admin"},
     new AppRole {Name = "Member"}
    };

    foreach (var role in roles)
    {
     await roleManager.CreateAsync(role);
    }


    foreach (var user in users)
    {
     await userManager.CreateAsync(user, "Pa$$w0rd");
     await userManager.AddToRoleAsync(user, "Member");
     if (user.Email == "admin@gmail.com") await userManager.AddToRoleAsync(user, "Admin");


    }
   }
  }
 }
}