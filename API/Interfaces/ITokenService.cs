namespace API.Identity
{
 public interface ITokenService
 {
  Task<string> CreateToken(AppUser user);

 }
}