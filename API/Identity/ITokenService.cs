namespace API.Identity
{
 public interface ITokenService
 {
  string CreateToken(AppUser user);

 }
}