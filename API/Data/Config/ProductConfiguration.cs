using API.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Data.Config
{
 public class ProductConfiguration : IEntityTypeConfiguration<Product>
 {
  public void Configure(EntityTypeBuilder<Product> builder)
  {
   builder.Property(p => p.Id).IsRequired();
   builder.Property(p => p.Name).IsRequired().HasMaxLength(100);
   builder.Property(p => p.Specification).IsRequired();
   builder.Property(p => p.Generation).IsRequired();
   builder.Property(p => p.TouchScreen).IsRequired().ValueGeneratedNever().HasDefaultValue(false);
   builder.Property(p => p.Condition).IsRequired();
   builder.Property(p => p.Quantity).IsRequired();
   builder.Property(p => p.StorageSize).IsRequired();
   builder.Property(p => p.RamSize).IsRequired();
   builder.Property(p => p.Price).HasColumnType("decimal(18,2)");
   // builder.Property(p => p.Photos).WithOne(photo => photo.Product).HasForeignKey(p => p.ProductId);
   builder.HasOne(b => b.ProductBrand).WithMany().HasForeignKey(p => p.ProductBrandId);
   builder.HasOne(t => t.ProductType).WithMany().HasForeignKey(p => p.ProductTypeId);


   
  }
 }
}