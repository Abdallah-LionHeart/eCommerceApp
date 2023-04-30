using API.Data;
using API.Errors;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
 public class BuggyController : BaseApiController
 {
  private readonly StoreContext _context;
  public BuggyController(StoreContext context)
  {
   _context = context;
  }

  [HttpGet("notfound")]
  public ActionResult GetNotFoundRequest()
  {
   var thing = _context.Products.Find(-1);
   if (thing == null) return NotFound(new ApiResponse(404));

   return Ok();
  }

  [HttpGet("servererror")]
  public ActionResult<string> GetServerError()
  {
   var productIsExsists = _context.Products.Find(-1);
   // if (productIsExsists == null)
   // {
   //  return NotFound(new ApiResponse(404, "Proudect is not exsist"));
   // }
   var response = productIsExsists.ToString();
   return Ok();
  }

  [HttpGet("badrequest")]
  public ActionResult GetBadRequest()
  {
   return BadRequest(new ApiResponse(400));
  }

  [HttpGet("badrequest/{id}")]
  public ActionResult GetNotFoundRequest(int id)
  {
   return Ok();
  }
 }
}