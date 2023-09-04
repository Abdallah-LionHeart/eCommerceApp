namespace API.Entity
{
 public class Product : BaseEntity
 {
  private object _photos;

  public string Name { get; set; }
  public string Specification { get; set; } // we must use this property as a model that contain aother property specifications
  public string Generation { get; set; }
  public decimal Price { get; set; }
  public string Condition { get; set; }
  public bool TouchScreen { get; set; }
  public int Quantity { get; set; }
  public string StorageSize { get; set; }
  public string RamSize { get; set; }
  public readonly List<Photo> _Photos { get; set; } = new List<Photo>();
  public IReadOnlyList<Photo> Photos => _photos.AsReadOnly();
  public ProductType ProductType { get; set; }
  public int ProductTypeId { get; set; }
  public ProductBrand ProductBrand { get; set; }
  public int ProductBrandId { get; set; }

  public void AddPhoto(string photoUrl, string fileName, bool isMain = false)
  {
   var photo = new Photo
   {
    FileName = fileName,
    Url = url
   };
   if (_photo.Count == 0) photo.IsMain = true;
   _photo.Add(photo);
  }

 }
}