using API.Entity;
using API.OrderAggregate;

namespace API.Interfaces
{
 public interface IPaymentService
 {
  Task<CustomerBasket> CreateOrUpdatePaymentIntent(string basketId);
  Task<Order> UpdateOrderPaymentSucceeded(string paymentIntentId);
  Task<Order> UpdateOrderPaymentFailed(string paymentIntentId);
 }
}