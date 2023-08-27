using API.Entity;
using API.Interfaces;
using API.OrderAggregate;
using API.Specifications;
using Stripe;
using Product = API.Entity.Product;

namespace API.Services
{
 public class PaymentService : IPaymentService
 {
  private readonly IBasketRepository _basketRepository;
  private readonly IUnitOfWork _uow;
  private readonly IConfiguration _config;
  public PaymentService(IBasketRepository basketRepository, IUnitOfWork uow, IConfiguration config)
  {
   _config = config;
   _uow = uow;
   _basketRepository = basketRepository;
  }

  public async Task<CustomerBasket> CreateOrUpdatePaymentIntent(string basketId)
  {
   StripeConfiguration.ApiKey = _config["StripeSettings:SecretKey"];

   var basket = await _basketRepository.GetBasketAsync(basketId);
   var shippingPrice = 0m;

   if (basket.DeliveryMethodId.HasValue)
   {
    var deliveryMethod = await _uow.Repository<DeliveryMethod>().GetByIdAsync((int)basket.DeliveryMethodId);
    shippingPrice = deliveryMethod.Price;
   }

   foreach (var item in basket.Items)
   {
    var productItem = await _uow.Repository<Product>().GetByIdAsync(item.Id);
    if (item.Price != productItem.Price)
    {
     item.Price = productItem.Price;
    }
   }
   var service = new PaymentIntentService();
   PaymentIntent intent;

   if (string.IsNullOrEmpty(basket.PaymentIntentId))
   {
    var options = new PaymentIntentCreateOptions
    {
     Amount = (long)basket.Items.Sum(i => i.Quantity * (i.Price * 100)) + (long)shippingPrice * 100,
     Currency = "usd",
     PaymentMethodTypes = new List<string> { "card" }
    };
    intent = await service.CreateAsync(options);
    basket.PaymentIntentId = intent.Id;
    basket.ClientSecret = intent.ClientSecret;
   }
   else
   {
    var options = new PaymentIntentUpdateOptions
    {
     Amount = (long)basket.Items.Sum(i => i.Quantity * (i.Price * 100)) + (long)shippingPrice * 100
    };
    // intent = await service.ConfirmAsync(basket.PaymentIntentId, options);
    await service.UpdateAsync(basket.PaymentIntentId, options);
   }

   await _basketRepository.UpdateBasketAsync(basket);
   return basket;
  }

  public async Task<Order> UpdateOrderPaymentFailed(string paymentIntentId)
  {
   var spec = new OrderByPaymentIntentIdSpecification(paymentIntentId);
   var order = await _uow.Repository<Order>().GetEntityWithSpec(spec);

   if (order == null) return null;
   order.Status = OrderStatus.PaymentFailed;
   await _uow.Complete();
   return order;
  }

  public async Task<Order> UpdateOrderPaymentSucceeded(string paymentIntentId)
  {
   var spec = new OrderByPaymentIntentIdSpecification(paymentIntentId);
   var order = await _uow.Repository<Order>().GetEntityWithSpec(spec);

   if (order == null) return null;
   order.Status = OrderStatus.PaymentReceived;
   await _uow.Complete();
   return order;
  }
 }
}