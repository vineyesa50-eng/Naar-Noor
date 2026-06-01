# 🔧 Backend Development Guide

Complete guide to developing the **Naar & Noor** .NET API backend.

---

## 🚀 Quick Start

### Prerequisites

- **.NET SDK 8.0+**
- **SQL Server 2019+**
- **Visual Studio** or **VS Code** with C# extension

### Installation

```bash
cd api-server
dotnet restore
```

### Running the Application

```bash
dotnet run --project src/NaarNoor.API/NaarNoor.API.csproj
```

✅ **API running at:** `http://localhost:8080`  
✅ **Swagger docs at:** `http://localhost:8080/swagger`

---

## 📁 Project Structure

```
api-server/
├── src/
│   ├── NaarNoor.API/              # API Layer (Controllers, Middleware)
│   ├── NaarNoor.Application/      # Business Logic (CQRS)
│   ├── NaarNoor.Domain/           # Domain Entities & Rules
│   └── NaarNoor.Infrastructure/   # Data Access & External Services
└── NaarNoor.sln                   # Solution File
```

---

## 🏗️ Architecture Layers

The backend follows **Clean Architecture** with **CQRS** pattern:

```
┌─────────────────────────────────────┐
│    API Layer (Controllers)          │  ← HTTP Requests/Responses
├─────────────────────────────────────┤
│    Application Layer                │  ← Business Logic (Commands/Queries)
│    (Commands, Queries, Handlers)    │
├─────────────────────────────────────┤
│    Domain Layer                     │  ← Core Business Entities & Rules
│    (Entities, Enums, Interfaces)    │
├─────────────────────────────────────┤
│    Infrastructure Layer             │  ← Database, External Services
│    (DbContext, Repositories)        │
└─────────────────────────────────────┘
```

---

## 🎯 Layer 1: API Layer

### Controllers

Controllers handle HTTP requests and delegate to MediatR handlers.

**Example: ChefsController.cs**

```csharp
using Microsoft.AspNetCore.Mvc;
using MediatR;
using NaarNoor.Application.Chefs.Queries.GetChefs;

namespace NaarNoor.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ChefsController : ControllerBase
{
    private readonly IMediator _mediator;

    public ChefsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    /// <summary>
    /// Get all chefs
    /// </summary>
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetChefs()
    {
        var query = new GetChefsQuery();
        var result = await _mediator.Send(query);
        return Ok(result);
    }
}
```

### Middleware

Custom middleware is organized in the `Middleware/` folder:

- **ExceptionHandlingMiddleware** - Global error handling
- **SecurityHeadersMiddleware** - Security headers
- **CorsMiddleware** - CORS configuration
- **AuthorizationMiddleware** - Authentication/authorization

---

## 💼 Layer 2: Application Layer

### CQRS Pattern

**Commands** = Write operations (Create, Update, Delete)  
**Queries** = Read operations (Get, List, Search)

### Commands (Write Operations)

**CreateReservationCommand.cs**

```csharp
using MediatR;

namespace NaarNoor.Application.Reservations.Commands.CreateReservation;

public class CreateReservationCommand : IRequest<int>
{
    public string GuestName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;
    public DateTime ReservationDate { get; set; }
    public int NumberOfGuests { get; set; }
    public string? SpecialRequests { get; set; }
}
```

**CreateReservationCommandHandler.cs**

```csharp
using MediatR;
using NaarNoor.Domain.Entities;
using NaarNoor.Application.Common.Interfaces;

namespace NaarNoor.Application.Reservations.Commands.CreateReservation;

public class CreateReservationCommandHandler 
    : IRequestHandler<CreateReservationCommand, int>
{
    private readonly IApplicationDbContext _context;

    public CreateReservationCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<int> Handle(
        CreateReservationCommand request, 
        CancellationToken cancellationToken)
    {
        var reservation = new Reservation
        {
            GuestName = request.GuestName,
            Email = request.Email,
            PhoneNumber = request.PhoneNumber,
            ReservationDate = request.ReservationDate,
            NumberOfGuests = request.NumberOfGuests,
            SpecialRequests = request.SpecialRequests,
            Status = ReservationStatus.Pending
        };

        _context.Reservations.Add(reservation);
        await _context.SaveChangesAsync(cancellationToken);

        return reservation.Id;
    }
}
```

### Queries (Read Operations)

**GetChefsQuery.cs**

```csharp
using MediatR;

namespace NaarNoor.Application.Chefs.Queries.GetChefs;

public class GetChefsQuery : IRequest<List<ChefDto>>
{
}
```

**GetChefsQueryHandler.cs**

```csharp
using MediatR;
using Microsoft.EntityFrameworkCore;
using NaarNoor.Application.Common.Interfaces;

namespace NaarNoor.Application.Chefs.Queries.GetChefs;

public class GetChefsQueryHandler : IRequestHandler<GetChefsQuery, List<ChefDto>>
{
    private readonly IApplicationDbContext _context;

    public GetChefsQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<ChefDto>> Handle(
        GetChefsQuery request, 
        CancellationToken cancellationToken)
    {
        return await _context.Chefs
            .Select(c => new ChefDto
            {
                Id = c.Id,
                Name = c.Name,
                Specialty = c.Specialty,
                Bio = c.Bio,
                ImageUrl = c.ImageUrl
            })
            .ToListAsync(cancellationToken);
    }
}
```

### Validation with FluentValidation

**CreateReservationCommandValidator.cs**

```csharp
using FluentValidation;

namespace NaarNoor.Application.Reservations.Commands.CreateReservation;

public class CreateReservationCommandValidator 
    : AbstractValidator<CreateReservationCommand>
{
    public CreateReservationCommandValidator()
    {
        RuleFor(x => x.GuestName)
            .NotEmpty().WithMessage("Guest name is required")
            .MaximumLength(100).WithMessage("Guest name must not exceed 100 characters");

        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("Email is required")
            .EmailAddress().WithMessage("Email must be valid");

        RuleFor(x => x.PhoneNumber)
            .NotEmpty().WithMessage("Phone number is required");

        RuleFor(x => x.ReservationDate)
            .GreaterThan(DateTime.Now)
            .WithMessage("Reservation date must be in the future");

        RuleFor(x => x.NumberOfGuests)
            .GreaterThan(0).WithMessage("Number of guests must be greater than 0")
            .LessThanOrEqualTo(20).WithMessage("Maximum 20 guests allowed");
    }
}
```

---

## 🏛️ Layer 3: Domain Layer

### Entities

**Chef.cs**

```csharp
using NaarNoor.Domain.Common;

namespace NaarNoor.Domain.Entities;

public class Chef : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string Specialty { get; set; } = string.Empty;
    public string Bio { get; set; } = string.Empty;
    public string ImageUrl { get; set; } = string.Empty;
}
```

**BaseEntity.cs**

```csharp
namespace NaarNoor.Domain.Common;

public abstract class BaseEntity
{
    public int Id { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
```

### Enums

**ReservationStatus.cs**

```csharp
namespace NaarNoor.Domain.Enums;

public enum ReservationStatus
{
    Pending = 0,
    Confirmed = 1,
    Cancelled = 2,
    Completed = 3
}
```

---

## 🗄️ Layer 4: Infrastructure Layer

### DbContext

**ApplicationDbContext.cs**

```csharp
using Microsoft.EntityFrameworkCore;
using NaarNoor.Domain.Entities;
using NaarNoor.Application.Common.Interfaces;

namespace NaarNoor.Infrastructure.Data;

public class ApplicationDbContext : DbContext, IApplicationDbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Chef> Chefs { get; set; }
    public DbSet<MenuItem> MenuItems { get; set; }
    public DbSet<Reservation> Reservations { get; set; }
    public DbSet<Review> Reviews { get; set; }
    public DbSet<ContactInquiry> ContactInquiries { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);
    }
}
```

### Entity Configuration

**ChefConfiguration.cs**

```csharp
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NaarNoor.Domain.Entities;

namespace NaarNoor.Infrastructure.Data.Configurations;

public class ChefConfiguration : IEntityTypeConfiguration<Chef>
{
    public void Configure(EntityTypeBuilder<Chef> builder)
    {
        builder.HasKey(c => c.Id);

        builder.Property(c => c.Name)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(c => c.Specialty)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(c => c.Bio)
            .HasMaxLength(500);

        builder.Property(c => c.ImageUrl)
            .HasMaxLength(500);
    }
}
```

---

## 🗃️ Database Migrations

### Create Migration

```bash
dotnet ef migrations add MigrationName --project src/NaarNoor.Infrastructure
```

### Apply Migration

```bash
dotnet ef database update --project src/NaarNoor.Infrastructure
```

### Remove Last Migration

```bash
dotnet ef migrations remove --project src/NaarNoor.Infrastructure
```

### List Migrations

```bash
dotnet ef migrations list --project src/NaarNoor.Infrastructure
```

---

## 🔌 Dependency Injection

**Program.cs**

```csharp
var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add application services
builder.Services.AddApplicationServices();
builder.Services.AddInfrastructureServices(builder.Configuration);

var app = builder.Build();

// Configure middleware pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowAll");
app.UseAuthorization();
app.MapControllers();

app.Run();
```

---

## ✅ Best Practices

| Practice | Description |
|----------|-------------|
| **SOLID Principles** | Follow Single Responsibility, Open/Closed, etc. |
| **DRY** | Don't Repeat Yourself - extract common logic |
| **Async/Await** | Use async operations for I/O-bound work |
| **Error Handling** | Implement comprehensive exception handling |
| **Logging** | Use structured logging with Serilog |
| **Validation** | Validate all inputs with FluentValidation |
| **Unit Tests** | Write tests for business logic |
| **Documentation** | Document complex logic with XML comments |

---

## 🧪 Testing

### Unit Test Example

```csharp
using Xunit;
using Moq;
using NaarNoor.Application.Chefs.Queries.GetChefs;
using NaarNoor.Application.Common.Interfaces;

public class GetChefsQueryHandlerTests
{
    [Fact]
    public async Task Handle_ReturnsListOfChefs()
    {
        // Arrange
        var mockContext = new Mock<IApplicationDbContext>();
        var handler = new GetChefsQueryHandler(mockContext.Object);
        var query = new GetChefsQuery();

        // Act
        var result = await handler.Handle(query, CancellationToken.None);

        // Assert
        Assert.NotNull(result);
    }
}
```

---

## 🐛 Debugging

### Visual Studio

1. Set breakpoints by clicking line numbers
2. Press **F5** to start debugging
3. Use **Step Over (F10)** and **Step Into (F11)**
4. Inspect variables in the **Locals** window

### Console Logging

```csharp
Console.WriteLine($"Debug: {variable}");
_logger.LogInformation("Processing request for {Id}", id);
```

---

## ⚡ Performance Optimization

| Technique | Description |
|-----------|-------------|
| **AsNoTracking()** | Use for read-only queries |
| **Pagination** | Implement for large datasets |
| **Caching** | Cache frequently accessed data |
| **Indexing** | Add database indexes |
| **Async Operations** | Use async/await for I/O |
| **Connection Pooling** | Enabled by default in EF Core |

### Example: Optimized Query

```csharp
var chefs = await _context.Chefs
    .AsNoTracking()
    .Where(c => c.IsActive)
    .OrderBy(c => c.Name)
    .ToListAsync(cancellationToken);
```

---

## 🔗 Useful Resources

- [.NET Documentation](https://docs.microsoft.com/dotnet/)
- [Entity Framework Core](https://docs.microsoft.com/ef/core/)
- [MediatR](https://github.com/jbogard/MediatR)
- [FluentValidation](https://fluentvalidation.net/)

---

**Need Help?** Check the [API Documentation](./API.md) or [Troubleshooting Guide](./TROUBLESHOOTING.md).
