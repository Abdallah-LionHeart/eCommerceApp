using API.Entity;
using API.Specifications;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
 public class SpecificationEvaluator<TEntity> where TEntity : BaseEntity
 {
  public static IQueryable<TEntity> GetQuery(IQueryable<TEntity> inputQuery, ISpecifications<TEntity> spec)
  {

   var query = inputQuery;
   if (spec.Criteria != null)
   {
    query = query.Where(spec.Criteria);
   }

   query = spec.Includes.Aggregate(query, (current, include) => current.Include(include));

   return query;
  }

 }
}