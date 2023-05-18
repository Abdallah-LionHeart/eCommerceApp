using API.DTOS;
using API.Entity;
using AutoMapper;

namespace API.Helpers
{
 public class ProductUrlResolver : IValueResolver<Product, ProductToReturnDto, string>
 {
  private readonly IConfiguration _config;

  public ProductUrlResolver(IConfiguration config)
  {
   _config = config;

  }

  public string Resolve(Product source, ProductToReturnDto destination, string destMember, ResolutionContext context)
  {
   // if (!string.IsNullOrEmpty(source.Photos))
   var photo = source.Photos.FirstOrDefault(x => x.IsMain).Url;
   if (photo != null)
   {
    return _config["ApiUrl"] + source.Photos;
   }
   return null;
  }
 }
}