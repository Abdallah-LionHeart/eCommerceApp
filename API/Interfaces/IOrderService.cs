using API.OrderAggregate;

namespace API.Interfaces
{
 public interface IOrderService
 {
  Task<Order> CreateOrdersAsync(string buyerEmail, int deliveryMethodId, string basketId, Address shippingAddress);
  Task<IReadOnlyList<Order>> GetOrderForUserAsync(string buyerEmail);
  Task<Order> GetOrderByIdAsync(int id, string buyerEmail);
  Task<IReadOnlyList<DeliveryMethod>> GetDeliveryMethodsAsync();
  //   Task<Order> UpdateOrderAsync(Order order);
  //   Task<bool> DeleteOrderAsync(int id);

 }
}