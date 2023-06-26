using API.Entity;
using API.Interfaces;
using API.OrderAggregate;
using API.Specifications;
using AutoMapper;

namespace API.Services
{
 public class OrderService : IOrderService
 {
  private readonly IUnitOfWork _uow;

  private readonly IBasketRepository _basketRepository;
  private readonly IMapper _mapper;
  private readonly IPaymentService _paymentService;
  public OrderService(IUnitOfWork uow, IBasketRepository basketRepository, IMapper mapper, IPaymentService paymentService)
  {
   _uow = uow;
   _paymentService = paymentService;
   _mapper = mapper;
   _basketRepository = basketRepository;
  }


  public async Task<IReadOnlyList<DeliveryMethod>> GetDeliveryMethodsAsync()
  {
   return await _uow.Repository<DeliveryMethod>().ListAllAsync();
  }

  public async Task<Order> GetOrderByIdAsync(int id, string buyerEmail)
  {
   var spec = new OrderWithItemsAndOrderingSpecification(id, buyerEmail);
   return await _uow.Repository<Order>().GetEntityWithSpec(spec);
  }

  public async Task<IReadOnlyList<Order>> GetOrderForUserAsync(string buyerEmail)
  {
   var spec = new OrderWithItemsAndOrderingSpecification(buyerEmail);
   return await _uow.Repository<Order>().ListAsync(spec);
  }


  public async Task<Order> CreateOrdersAsync(string buyerEmail, int deliveryMethodId, string basketId, Address shippingAddress)
  {
   // get basket from the repo
   var basket = await _basketRepository.GetBasketAsync(basketId);
   // get items from the product repo
   var items = new List<OrderItem>();
   foreach (var item in basket.Items)
   {
    var productItem = await _uow.Repository<Product>().GetByIdAsync(item.Id);
    // var itemOrdered = new ProductItemOrdered(productItem.Id, productItem.Name, productItem.Photos.FirstOrDefault(x => x.IsMain).Url);
    var itemOrdered = new ProductItemOrdered(productItem.Id, productItem.Name, string.Join(",", productItem.Photos));
    var orderItem = new OrderItem(itemOrdered, productItem.Price, item.Quantity);
    items.Add(orderItem);
   }
   // get delivery method from repo
   var deliveryMethod = await _uow.Repository<DeliveryMethod>().GetByIdAsync(deliveryMethodId);
   // calc subtotal
   var subtotal = items.Sum(item => item.Price * item.Quantity);

   // check to see if order exists
   // var spec = new OrderByPaymentIntentIdSpecification(basket.PaymentIntentId);
   // var existingOrder = await _orderRepo.GetEntityWithSpec(spec);
   // if (existingOrder != null)
   // {
   //  _orderRepo.Delete(existingOrder);
   //  await _paymentService.CreateOrUpdatePaymentIntent(basket.PaymentIntentId);
   // }

   // create order
   var order = new Order(items, buyerEmail, shippingAddress, deliveryMethod, subtotal);
   _uow.Repository<Order>().Add(order);

   // save to db
   var result = await _uow.Complete();
   if (result <= 0) return null;
   // delete basket

   await _basketRepository.DeleteBasketAsync(basketId);

   // return order
   return order;
  }
 }
}