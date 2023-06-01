using API.DTOS;
using API.Errors;
using API.Extensions;
using API.Identity;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
 public class AccountController : BaseApiController
 {
  private readonly SignInManager<AppUser> _signInManager;
  private readonly UserManager<AppUser> _userManager;
  private readonly ITokenService _tokenService;
  private readonly IMapper _mapper;

  public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, ITokenService tokenService, IMapper mapper)
  {
   _mapper = mapper;
   _tokenService = tokenService;
   _userManager = userManager;
   _signInManager = signInManager;

  }

  [Authorize]
  [HttpGet]
  public async Task<ActionResult<AppUserDto>> GetCurrentUser()
  {
   // var email = User.FindFirstValue(ClaimTypes.Email);
   var user = await _userManager.FindByEmailFromClaimsPrincipal(User);

   return new AppUserDto
   {
    Email = user.Email,
    DisplayName = user.DisplayName,
    Token = _tokenService.CreateToken(user),
   };
  }


  [HttpPost("login")]
  public async Task<ActionResult<AppUserDto>> Login(LoginDto loginDto)
  {
   var user = await _userManager.FindByEmailAsync(loginDto.Email);

   if (user == null) return Unauthorized(new ApiResponse(401));

   var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

   if (!result.Succeeded) return Unauthorized(new ApiResponse(401));

   return new AppUserDto
   {
    DisplayName = user.DisplayName,
    Token = _tokenService.CreateToken(user),
    Email = user.Email,
   };
  }

  [HttpPost("register")]
  public async Task<ActionResult<AppUserDto>> Register(RegisterDto registerDto)
  {
   if (await _userManager.Users.AnyAsync(x => x.Email == registerDto.Email))
   {
    return BadRequest("Email taken");
   }

   // if (await _userManager.Users.AnyAsync(x => x.UserName == registerDto.Username))
   // {
   //  return BadRequest("Username taken");
   // }

   var user = new AppUser
   {
    DisplayName = registerDto.DisplayName,
    Email = registerDto.Email,
    // UserName = registerDto.Email,
   };

   var result = await _userManager.CreateAsync(user, registerDto.Password);

   if (!result.Succeeded) return BadRequest(new ApiResponse(400));

   return new AppUserDto
   {
    DisplayName = user.DisplayName,
    Token = _tokenService.CreateToken(user),
    Email = user.Email,
   };
  }
  [HttpGet("emailexists")]
  public async Task<ActionResult<bool>> CheckEmailExistsAsync([FromQuery] string email)
  {
   // return await _userManager.Users.AnyAsync(x => x.Email == email);
   return await _userManager.FindByEmailAsync(email) != null;
  }
  [Authorize]
  [HttpGet("address")]
  public async Task<ActionResult<AddressDto>> GetUserAddress()
  {
   // var user = await _userManager.Users.Include(x => x.Address).SingleOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email));
   var user = await _userManager.FindByUserClaimsPrincipalWithAddressAsync(User);

   return _mapper.Map<Address, AddressDto>(user.Address);
  }
  [Authorize]
  [HttpPut("address")]
  public async Task<ActionResult<AddressDto>> UpdateUserAddress(AddressDto address)
  {
   // var user = await _userManager.FindByUserClaimsPrincipalWithAddressAsync(User);
   var user = await _userManager.FindByUserClaimsPrincipalWithAddressAsync(HttpContext.User);

   user.Address = _mapper.Map<AddressDto, Address>(address);

   var result = await _userManager.UpdateAsync(user);

   if (result.Succeeded) return Ok(_mapper.Map<Address, AddressDto>(user.Address));

   return BadRequest("Problem updating the user");
  }
 }
}