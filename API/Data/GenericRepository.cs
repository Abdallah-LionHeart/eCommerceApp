using API.Entity;
using API.Interfaces;
using API.Specifications;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
 public class GenericRepository<T> : IGenericRepository<T> where T : BaseEntity
 {
  private readonly StoreContext _context;
  public GenericRepository(StoreContext context)
  {
   _context = context;
  }

  public async Task<T> GetByIdAsync(int id)
  {
   return await _context.Set<T>().FindAsync(id);
  }

  // public Task<T> GetByNameAsync(string name)
  // {
  //  return _context.Set<T>().FirstOrDefaultAsync(x => x.Name == name);
  // }

  public async Task<IReadOnlyList<T>> ListAllAsync()
  {
   return await _context.Set<T>().ToListAsync();
  }

  public async Task<T> GetEntityWithSpec(ISpecifications<T> spec)
  {
   return await ApplySpecification(spec).FirstOrDefaultAsync();
  }

  public async Task<IReadOnlyList<T>> ListAsync(ISpecifications<T> spec)
  {
   return await ApplySpecification(spec).ToListAsync();
  }


  public async Task<int> CountAsync(ISpecifications<T> spec)
  {
   return await ApplySpecification(spec).CountAsync();
  }
  private IQueryable<T> ApplySpecification(ISpecifications<T> spec)
  {
   return SpecificationEvaluator<T>.GetQuery(_context.Set<T>().AsQueryable(), spec);
  }

  public Task<T> GetByNameAsync(string name)
  {
   throw new NotImplementedException();
  }
 }
}