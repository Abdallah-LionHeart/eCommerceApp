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

  public void Update(Product product)
  {
   _context.Entry(product).State = EntityState.Modified;

  }

  public async Task<bool> SaveAllAsync()
  {
   return await _context.SaveChangesAsync() > 0;
  }

  public void Update(T entity)
  {
   _context.Set<T>().Attach(entity);
   _context.Entry(entity).State = EntityState.Modified;
  }

  public void Add(T entity)
  {
   _context.Set<T>().Add(entity);
  }

  public void Delete(T entity)
  {
   _context.Set<T>().Remove(entity);
  }



  // public Task<IReadOnlyList<T>> UpdateAsync(int id, T entity)
  // {
  //  var entityToUpdate = _context.Set<T>().FindAsync(id);
  //  _context.Entry(entityToUpdate).CurrentValues.SetValues(entity);
  //  return _context.SaveChangesAsync();

  // }
 }
}