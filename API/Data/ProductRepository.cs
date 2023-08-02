using API.Entity;
using API.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
 public class ProductRepository : IProductRepository
 {
  private readonly StoreContext _context;
  private readonly IMapper __mapper;
  public ProductRepository(StoreContext context, IMapper _mapper)
  {
   __mapper = _mapper;
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

  // public async Task<Product> GetProductByNameAsync(string name)
  // {
  //  // return await _context.Products.Where(x => x.Name == name).ProjectTo<ProductToReturnDto>(__mapper.ConfigurationProvider)
  //  // .SingleOrDefaultAsync();
  //  return await _context.Products
  //  .Include(p => p.Photos)
  //  // .Include(p => p.ProductType)
  //  // .Include(p => p.ProductBrand)
  //  .SingleOrDefaultAsync(x => x.Name == name);
  // }

  public async Task<IReadOnlyList<Product>> GetProductsAsync()
  {
   return await _context.Products
   .Include(p => p.ProductType)
   .Include(p => p.ProductBrand)
   .Include(p => p.Photos)
   .ToListAsync();
  }

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