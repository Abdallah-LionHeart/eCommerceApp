using API.DTOS;
using API.OrderAggregate;
using AutoMapper;

namespace API.Helpers
{
 public class OrderItemUrlResolver : IValueResolver<OrderItem, OrderItemDto, string>
 {
  private readonly IConfiguration _config;
  public OrderItemUrlResolver(IConfiguration config)
  {
   _config = config;
  }

  public string Resolve(OrderItem source, OrderItemDto destination, string destMember, ResolutionContext context)
  {
   if (!string.IsNullOrEmpty(source.ItemOrdered.PhotoUrl))
   {
    return _config["ApiUrl"] + source.ItemOrdered.PhotoUrl;
   }
   return null;
  }
 }
}