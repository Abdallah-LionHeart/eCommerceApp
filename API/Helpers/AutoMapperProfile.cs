using API.DTOS;
using API.Entity;
using API.OrderAggregate;
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
   CreateMap<Identity.Address, AddressDto>().ReverseMap();
   CreateMap<CustomerBasketDto, CustomerBasket>();
   CreateMap<BasketItemDto, BasketItem>();
   CreateMap<AddressDto, OrderAggregate.Address>();

   CreateMap<Order, OrderToReturnDto>()
     .ForMember(d => d.DeliveryMethod, o => o.MapFrom(s => s.DeliveryMethod.ShortName))
     .ForMember(d => d.ShippingPrice, o => o.MapFrom(s => s.DeliveryMethod.Price));
   //  !ProductItemOrdered map


   CreateMap<OrderItem, OrderItemDto>()
     .ForMember(d => d.ProductId, o => o.MapFrom(s => s.ItemOrdered.ProductItemId))
     .ForMember(d => d.ProductName, o => o.MapFrom(s => s.ItemOrdered.ProductName))
     .ForMember(d => d.PhotoUrl, o => o.MapFrom(s => s.ItemOrdered.PhotoUrl))
    .ForMember(d => d.PhotoUrl, o => o.MapFrom<OrderItemUrlResolver>());
   // .ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(src => src.Photos.FirstOrDefault(x => x.IsMain).Url));

   //    CreateMap<ProductToReturnDto, Product>().ReverseMap()
   // .ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(src => src.Photos.FirstOrDefault(x => x.IsMain).Url));
  }
 }
}