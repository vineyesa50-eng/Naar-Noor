using MediatR;
using NaarNoor.Application.Common.Interfaces;
using NaarNoor.Domain.Entities;
using NaarNoor.Domain.Enums;

namespace NaarNoor.Application.Orders.Commands.CreateOrder;

public class CreateOrderCommandHandler : IRequestHandler<CreateOrderCommand, Guid>
{
    private readonly IApplicationDbContext _context;

    public CreateOrderCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Guid> Handle(CreateOrderCommand request, CancellationToken cancellationToken)
    {
        var type = request.Type.ToLowerInvariant() switch
        {
            "delivery" => OrderType.Delivery,
            "dine-in"  => OrderType.DineIn,
            _          => OrderType.Collection
        };

        var items = request.Items.Select(i => new OrderItem
        {
            MenuItemId   = i.MenuItemId,
            MenuItemName = i.MenuItemName,
            UnitPrice    = i.UnitPrice,
            Quantity     = i.Quantity
        }).ToList();

        var total = items.Sum(i => i.UnitPrice * i.Quantity);

        var order = new Order
        {
            CustomerName         = request.CustomerName,
            Email                = request.Email,
            PhoneNumber          = request.PhoneNumber,
            Notes                = request.Notes,
            Type                 = type,
            DeliveryAddress      = request.DeliveryAddress,
            TableReservationName = request.TableReservationName,
            TotalAmount          = total,
            Items                = items
        };

        _context.Orders.Add(order);
        await _context.SaveChangesAsync(cancellationToken);

        return order.Id;
    }
}
