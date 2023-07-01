using API.Entity;

namespace API.Interfaces
{
 public interface IProductRepository
 {
  Task<Product> GetProductByIdAsync(int id);
  Task<Product> GetProductByNameAsync(string name);
  Task<IReadOnlyList<Product>> GetProductsAsync();
  Task<IReadOnlyList<ProductBrand>> GetProductsBrandsAsync();
  Task<IReadOnlyList<ProductType>> GetProductsTypesAsync();


 }
}