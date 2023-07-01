namespace API.Entity
{
 public class Product : BaseEntity
 {
  // public string Name { get; set; }
  public string Specification { get; set; } // we must use this property as a model that contain aother property specifications
  public string Generation { get; set; }
  public decimal Price { get; set; }
  public string Condition { get; set; }
  public bool TouchScreen { get; set; }
  public int Quantity { get; set; }
  public string StorageSize { get; set; }
  public string RamSize { get; set; }
  public List<Photo> Photos { get; set; } = new();
  public ProductType ProductType { get; set; }
  public int ProductTypeId { get; set; }
  public ProductBrand ProductBrand { get; set; }
  public int ProductBrandId { get; set; }


 }
}