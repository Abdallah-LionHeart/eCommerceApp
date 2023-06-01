using API.DTOS;
using API.Entity;
using API.Identity;
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
    .ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(src => src.Photos.FirstOrDefault(x => x.IsMain).Url));
   CreateMap<Photo, PhotoDto>();
   CreateMap<ProductUpdateDto, Product>();
   CreateMap<Address, AddressDto>().ReverseMap();

  }
 }
}