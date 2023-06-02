using System.ComponentModel.DataAnnotations;

namespace API.DTOS
{
 public class RegisterDto
 {
  [Required]
  public string DisplayName { get; set; }
  [Required]
  [EmailAddress]
  public string Email { get; set; }
  // public string Username { get; set; }
  [Required]
  [RegularExpression("(?=^.{6,10}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\\s).*$",
   ErrorMessage = "Password must be complex one Uppercase,one Lowercase one number and one non alphanumeric character, min 6 and max 10 characters")]
  public string Password { get; set; }

 }
}