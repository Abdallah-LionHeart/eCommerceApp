using System.Text.Json;
using API.Entity;
using API.OrderAggregate;

namespace API.Data
{
 public class StoreContextSeed
 {
  public static async Task SeedAsync(StoreContext context)
  {
   if (!context.ProductBrands.Any())
   {
    var brandsData = File.ReadAllText("Data/SeedData/brands.json");
    var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
    var brands = JsonSerializer.Deserialize<List<ProductBrand>>(brandsData);
    context.ProductBrands.AddRange(brands);
   }

   if (!context.ProductTypes.Any())
   {
    var typesData = File.ReadAllText("Data/SeedData/types.json");
    var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
    var types = JsonSerializer.Deserialize<List<ProductType>>(typesData);
    context.ProductTypes.AddRange(types);
   }


   if (!context.Products.Any())
   {
    var productsData = File.ReadAllText("Data/SeedData/products.json");
    var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
    var products = JsonSerializer.Deserialize<List<Product>>(productsData);
    context.Products.AddRange(products);
   }
   if (!context.DeliveryMethods.Any())
   {
    var deliveryData = File.ReadAllText("Data/SeedData/delivery.json");
    var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
    var methods = JsonSerializer.Deserialize<List<DeliveryMethod>>(deliveryData);
    context.DeliveryMethods.AddRange(methods);
   }

   if (context.ChangeTracker.HasChanges()) await context.SaveChangesAsync();
  }
 }
}