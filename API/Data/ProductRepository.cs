using API.Entity;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
 public class ProductRepository : IProductRepository
 {
  private readonly StoreContext _context;
  public ProductRepository(StoreContext context)
  {
   _context = context;
  }

  public async Task<Product> GetProductByIdAsync(int id)
  {
   return await _context.Products
   .Include(p => p.ProductType)
   .Include(p => p.ProductBrand)
   .Include(p => p.Photos)
   .FirstOrDefaultAsync(p => p.Id == id);
  }

  public async Task<Product> GetProductByNameAsync(string name)
  {
   return await _context.Products.Include(p => p.Photos)
   .SingleOrDefaultAsync(x => x.Name == name);
  }

  public async Task<IReadOnlyList<Product>> GetProductsAsync()
  {
   return await _context.Products
   .Include(p => p.ProductType)
   .Include(p => p.ProductBrand)
   .Include(p => p.Photos)
   .ToListAsync();
  }

  // public async Task<Product> GetProductByNameAsync(string name)
  // {
  //  return await _context.Products
  //  .Include(p => p.ProductType)
  //  .Include(p => p.ProductBrand)
  //  .Include(p => p.photos)
  //  .SingleOrDefaultAsync(p => p.Name == name);
  // }
  public async Task<IReadOnlyList<ProductBrand>> GetProductsBrandsAsync()
  {
   return await _context.ProductBrands.ToListAsync();

  }

  public async Task<IReadOnlyList<ProductType>> GetProductsTypesAsync()
  {
   return await _context.ProductTypes.ToListAsync();
  }
 }


}