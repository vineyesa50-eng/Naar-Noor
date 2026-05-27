using MediatR;

namespace NaarNoor.Application.Orders.Commands.CreateOrder;

public record CreateOrderCommand(
    string CustomerName,
    string Email,
    string PhoneNumber,
    string? Notes,
    string Type,
    string? DeliveryAddress,
    string? TableReservationName,
    List<OrderItemRequest> Items
) : IRequest<Guid>;

public record OrderItemRequest(
    Guid MenuItemId,
    string MenuItemName,
    decimal UnitPrice,
    int Quantity
);
