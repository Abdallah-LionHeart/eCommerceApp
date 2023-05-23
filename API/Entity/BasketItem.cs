namespace API.Entity
{
 public class BasketItem
 {
  public int Id { get; set; }
  public string ProductName { get; set; }
  public decimal Price { get; set; }
  public int Quantity { get; set; }
  public string PictureUrl { get; set; }
  public string Brand { get; set; }
  public string Type { get; set; }
  public int ProductId { get; set; }
  // public string ProductUrl { get; set; }
  // public int CustomerBasketId { get; set; }
  // public CustomerBasket CustomerBasket { get; set; }
 }
}