using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NaarNoor.Domain.Entities;

namespace NaarNoor.Infrastructure.Data.Configurations;

public class OrderItemConfiguration : IEntityTypeConfiguration<OrderItem>
{
    public void Configure(EntityTypeBuilder<OrderItem> builder)
    {
        builder.HasKey(i => i.Id);
        builder.Property(i => i.MenuItemName).IsRequired().HasMaxLength(150);
        builder.Property(i => i.UnitPrice).HasColumnType("numeric(10,2)").IsRequired();
        builder.Property(i => i.Quantity).IsRequired();
        builder.Ignore(i => i.SubTotal);
        builder.Property(i => i.CreatedAt).IsRequired();
        builder.Property(i => i.UpdatedAt).IsRequired();
    }
}
