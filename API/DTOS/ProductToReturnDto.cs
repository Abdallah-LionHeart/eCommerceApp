namespace API.DTOS
{
 public class ProductToReturnDto
 {
  public int Id { get; set; }
  public string Name { get; set; }
  public string PhotoUrl { get; set; }
  public string Specification { get; set; }
  public string Generation { get; set; }
  public decimal Price { get; set; }
  public string Condition { get; set; }
  public int Quantity { get; set; }
  public string StorageSize { get; set; }
  public string RamSize { get; set; }
  public bool TouchScreen { get; set; }
  public List<PhotoDto> Photos { get; set; }
  public string ProductType { get; set; }
  public string ProductBrand { get; set; }

 }
}