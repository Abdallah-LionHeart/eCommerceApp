using API.OrderAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Data.Config
{
 public class OrderItemConfigration : IEntityTypeConfiguration<OrderItem>
 {
  public void Configure(EntityTypeBuilder<OrderItem> builder)
  {
   builder.OwnsOne(i => i.ItemOrdered, io => { io.WithOwner(); });
   builder.Property(i => i.Price)
        .HasColumnType("decimal(18.2)");
  }
 }
}