using API.Entity;
using API.Specifications;

namespace API.Interfaces
{
 public interface IGenericRepository<T> where T : BaseEntity
 {
  Task<T> GetByIdAsync(int id);
  // Task<T> GetByNameAsync(string name);
  Task<IReadOnlyList<T>> ListAllAsync();
  Task<T> GetEntityWithSpec(ISpecifications<T> spec);
  Task<IReadOnlyList<T>> ListAsync(ISpecifications<T> spec);
  Task<int> CountAsync(ISpecifications<T> spec);
  void Update(Product product);
  void Update(T entity);
  void Add(T entity);
  void Delete(T entity);
  Task<bool> SaveAllAsync();

 }
}