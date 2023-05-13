using API.DTOS;
using API.Entity;
using AutoMapper;

namespace API.Helpers
{
 public class AutoMapperProfile : Profile
 {
  public AutoMapperProfile()
  {
   CreateMap<Product, ProductToReturnDto>()
     .ForMember(d => d.ProductBrand, option => option.MapFrom(s => s.ProductBrand.Name))
     .ForMember(d => d.ProductType, o => o.MapFrom(s => s.ProductType.Name))
     .ForMember(d => d.ImageUrl, o => o.MapFrom<ProductUrlResolver>());
  }
 }
}