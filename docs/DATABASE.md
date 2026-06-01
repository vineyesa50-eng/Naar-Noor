# 🗄️ Database Documentation

Complete database schema and management guide for **Naar & Noor**.

---

## 📊 Overview

- **Database:** SQL Server 2019+
- **ORM:** Entity Framework Core 8.0
- **Migration Tool:** EF Core Migrations
- **Connection:** Remote SQL Server

---

## 🔌 Connection Configuration

### Connection String

Update in `appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=db54355.public.databaseasp.net; Database=db54355; User Id=db54355; Password=eW!62%tA=bT7; Encrypt=True; TrustServerCertificate=True; MultipleActiveResultSets=True;"
  }
}
```

### Environment-Specific Configuration

**Development:**
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=NaarNoor;Trusted_Connection=true;"
  }
}
```

**Production:**
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=db54355.public.databaseasp.net;Database=db54355;User Id=db54355;Password=***;"
  }
}
```

---

## 📐 Entity Relationship Diagram

```
┌─────────────────┐
│     Chefs       │
├─────────────────┤
│ Id (PK)         │
│ Name            │
│ Specialty       │
│ Bio             │
│ ImageUrl        │
│ CreatedAt       │
│ UpdatedAt       │
└─────────────────┘

┌─────────────────┐
│   MenuItems     │
├─────────────────┤
│ Id (PK)         │
│ Name            │
│ Description     │
│ Price           │
│ Category        │
│ ImageUrl        │
│ IsAvailable     │
│ CreatedAt       │
│ UpdatedAt       │
└─────────────────┘

┌─────────────────┐
│  Reservations   │
├─────────────────┤
│ Id (PK)         │
│ GuestName       │
│ Email           │
│ PhoneNumber     │
│ ReservationDate │
│ NumberOfGuests  │
│ SpecialRequests │
│ Status          │
│ CreatedAt       │
│ UpdatedAt       │
└─────────────────┘

┌─────────────────┐
│    Reviews      │
├─────────────────┤
│ Id (PK)         │
│ GuestName       │
│ Rating          │
│ Comment         │
│ IsApproved      │
│ CreatedAt       │
│ UpdatedAt       │
└─────────────────┘

┌──────────────────┐
│ ContactInquiries │
├──────────────────┤
│ Id (PK)          │
│ Name             │
│ Email            │
│ Subject          │
│ Message          │
│ CreatedAt        │
└──────────────────┘
```

---

## 📋 Table Schemas

### Chefs

Stores information about restaurant chefs.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `Id` | INT | PRIMARY KEY, IDENTITY | Unique identifier |
| `Name` | NVARCHAR(100) | NOT NULL | Chef's full name |
| `Specialty` | NVARCHAR(100) | NOT NULL | Culinary specialty |
| `Bio` | NVARCHAR(500) | NULL | Biography |
| `ImageUrl` | NVARCHAR(500) | NULL | Profile image URL |
| `CreatedAt` | DATETIME2 | NOT NULL | Creation timestamp |
| `UpdatedAt` | DATETIME2 | NOT NULL | Last update timestamp |

**Indexes:**
- `PK_Chefs` on `Id`

**Sample Data:**

```sql
INSERT INTO Chefs (Name, Specialty, Bio, ImageUrl, CreatedAt, UpdatedAt)
VALUES 
  ('Chef Arjun', 'Indian Cuisine', 'Expert in traditional Indian cooking', 
   'https://example.com/chefs/arjun.jpg', GETUTCDATE(), GETUTCDATE()),
  ('Chef Maya', 'Fusion Cuisine', 'Creative fusion chef', 
   'https://example.com/chefs/maya.jpg', GETUTCDATE(), GETUTCDATE());
```

---

### MenuItems

Stores restaurant menu items.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `Id` | INT | PRIMARY KEY, IDENTITY | Unique identifier |
| `Name` | NVARCHAR(100) | NOT NULL | Item name |
| `Description` | NVARCHAR(500) | NULL | Item description |
| `Price` | DECIMAL(10,2) | NOT NULL | Price in USD |
| `Category` | NVARCHAR(50) | NOT NULL | Category (Starters, Mains, Cocktails) |
| `ImageUrl` | NVARCHAR(500) | NULL | Item image URL |
| `IsAvailable` | BIT | NOT NULL, DEFAULT 1 | Availability status |
| `CreatedAt` | DATETIME2 | NOT NULL | Creation timestamp |
| `UpdatedAt` | DATETIME2 | NOT NULL | Last update timestamp |

**Indexes:**
- `PK_MenuItems` on `Id`
- `IX_MenuItems_Category` on `Category`
- `IX_MenuItems_IsAvailable` on `IsAvailable`

**Sample Data:**

```sql
INSERT INTO MenuItems (Name, Description, Price, Category, ImageUrl, IsAvailable, CreatedAt, UpdatedAt)
VALUES 
  ('Tandoori Chicken', 'Grilled chicken marinated in yogurt and spices', 14.99, 'Mains', 
   'https://example.com/menu/tandoori.jpg', 1, GETUTCDATE(), GETUTCDATE()),
  ('Butter Chicken', 'Tender chicken in creamy tomato sauce', 13.99, 'Mains', 
   'https://example.com/menu/butter-chicken.jpg', 1, GETUTCDATE(), GETUTCDATE());
```

---

### Reservations

Stores customer reservations.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `Id` | INT | PRIMARY KEY, IDENTITY | Unique identifier |
| `GuestName` | NVARCHAR(100) | NOT NULL | Guest's name |
| `Email` | NVARCHAR(100) | NOT NULL | Guest's email |
| `PhoneNumber` | NVARCHAR(20) | NOT NULL | Contact number |
| `ReservationDate` | DATETIME2 | NOT NULL | Reservation date/time |
| `NumberOfGuests` | INT | NOT NULL, CHECK (1-20) | Number of guests |
| `SpecialRequests` | NVARCHAR(500) | NULL | Special requests |
| `Status` | NVARCHAR(50) | NOT NULL, DEFAULT 'Pending' | Status (Pending, Confirmed, Cancelled, Completed) |
| `CreatedAt` | DATETIME2 | NOT NULL | Creation timestamp |
| `UpdatedAt` | DATETIME2 | NOT NULL | Last update timestamp |

**Indexes:**
- `PK_Reservations` on `Id`
- `IX_Reservations_ReservationDate` on `ReservationDate`
- `IX_Reservations_Email` on `Email`
- `IX_Reservations_Status` on `Status`

**Constraints:**
- `NumberOfGuests` must be between 1 and 20
- `ReservationDate` must be in the future (enforced by application)

---

### Reviews

Stores customer reviews.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `Id` | INT | PRIMARY KEY, IDENTITY | Unique identifier |
| `GuestName` | NVARCHAR(100) | NOT NULL | Reviewer's name |
| `Rating` | INT | NOT NULL, CHECK (1-5) | Rating (1-5 stars) |
| `Comment` | NVARCHAR(1000) | NULL | Review comment |
| `IsApproved` | BIT | NOT NULL, DEFAULT 0 | Approval status |
| `CreatedAt` | DATETIME2 | NOT NULL | Creation timestamp |
| `UpdatedAt` | DATETIME2 | NOT NULL | Last update timestamp |

**Indexes:**
- `PK_Reviews` on `Id`
- `IX_Reviews_IsApproved` on `IsApproved`
- `IX_Reviews_Rating` on `Rating`

**Constraints:**
- `Rating` must be between 1 and 5

---

### ContactInquiries

Stores contact form submissions.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `Id` | INT | PRIMARY KEY, IDENTITY | Unique identifier |
| `Name` | NVARCHAR(100) | NOT NULL | Sender's name |
| `Email` | NVARCHAR(100) | NOT NULL | Sender's email |
| `Subject` | NVARCHAR(200) | NOT NULL | Inquiry subject |
| `Message` | NVARCHAR(1000) | NOT NULL | Inquiry message |
| `CreatedAt` | DATETIME2 | NOT NULL | Creation timestamp |

**Indexes:**
- `PK_ContactInquiries` on `Id`
- `IX_ContactInquiries_Email` on `Email`
- `IX_ContactInquiries_CreatedAt` on `CreatedAt`

---

## 🔄 Migrations

### Create New Migration

```bash
dotnet ef migrations add MigrationName --project src/NaarNoor.Infrastructure
```

### Apply Migrations

```bash
dotnet ef database update --project src/NaarNoor.Infrastructure
```

### Apply Specific Migration

```bash
dotnet ef database update MigrationName --project src/NaarNoor.Infrastructure
```

### List All Migrations

```bash
dotnet ef migrations list --project src/NaarNoor.Infrastructure
```

### Remove Last Migration

```bash
dotnet ef migrations remove --project src/NaarNoor.Infrastructure
```

### Generate SQL Script

```bash
dotnet ef migrations script --project src/NaarNoor.Infrastructure --output migration.sql
```

---

## 🌱 Data Seeding

Initial data is seeded automatically on application startup via `DatabaseSeeder.cs`:

```csharp
public static async Task SeedAsync(ApplicationDbContext context)
{
    // Seed Chefs
    if (!await context.Chefs.AnyAsync())
    {
        var chefs = new List<Chef>
        {
            new Chef 
            { 
                Name = "Chef Arjun", 
                Specialty = "Indian Cuisine",
                Bio = "Expert in traditional Indian cooking",
                ImageUrl = "/assets/chefs/arjun.jpg"
            },
            new Chef 
            { 
                Name = "Chef Maya", 
                Specialty = "Fusion Cuisine",
                Bio = "Creative fusion chef",
                ImageUrl = "/assets/chefs/maya.jpg"
            }
        };
        
        context.Chefs.AddRange(chefs);
        await context.SaveChangesAsync();
    }
}
```

---

## 🔍 Query Optimization

### Use AsNoTracking for Read-Only Queries

```csharp
var chefs = await _context.Chefs
    .AsNoTracking()
    .ToListAsync();
```

### Select Only Required Columns

```csharp
var chefNames = await _context.Chefs
    .Select(c => new { c.Id, c.Name })
    .ToListAsync();
```

### Use Pagination

```csharp
var menuItems = await _context.MenuItems
    .Skip((page - 1) * pageSize)
    .Take(pageSize)
    .ToListAsync();
```

### Eager Loading

```csharp
var reservations = await _context.Reservations
    .Include(r => r.Guest)
    .ToListAsync();
```

---

## 💾 Backup & Restore

### Backup Database

```sql
BACKUP DATABASE db54355
TO DISK = 'C:\Backups\NaarNoor_Backup.bak'
WITH FORMAT, COMPRESSION;
```

### Restore Database

```sql
RESTORE DATABASE db54355
FROM DISK = 'C:\Backups\NaarNoor_Backup.bak'
WITH REPLACE;
```

### Automated Backup Script

```sql
-- Create backup job (SQL Server Agent)
EXEC sp_add_job @job_name = 'NaarNoor_Daily_Backup';

EXEC sp_add_jobstep
    @job_name = 'NaarNoor_Daily_Backup',
    @step_name = 'Backup Database',
    @command = 'BACKUP DATABASE db54355 TO DISK = ''C:\Backups\NaarNoor_$(ESCAPE_SQUOTE(DATE)).bak''';

EXEC sp_add_schedule
    @schedule_name = 'Daily at 2 AM',
    @freq_type = 4,
    @freq_interval = 1,
    @active_start_time = 020000;
```

---

## 🛠️ Maintenance

### Check Database Integrity

```sql
DBCC CHECKDB (db54355);
```

### Rebuild Indexes

```sql
ALTER INDEX ALL ON Chefs REBUILD;
ALTER INDEX ALL ON MenuItems REBUILD;
ALTER INDEX ALL ON Reservations REBUILD;
ALTER INDEX ALL ON Reviews REBUILD;
ALTER INDEX ALL ON ContactInquiries REBUILD;
```

### Update Statistics

```sql
UPDATE STATISTICS Chefs;
UPDATE STATISTICS MenuItems;
UPDATE STATISTICS Reservations;
UPDATE STATISTICS Reviews;
UPDATE STATISTICS ContactInquiries;
```

### Shrink Database (Use Sparingly)

```sql
DBCC SHRINKDATABASE (db54355, 10);
```

---

## 📈 Performance Monitoring

### View Active Connections

```sql
SELECT 
    session_id,
    login_name,
    host_name,
    program_name,
    status
FROM sys.dm_exec_sessions
WHERE database_id = DB_ID('db54355');
```

### Find Slow Queries

```sql
SELECT TOP 10
    qs.execution_count,
    qs.total_elapsed_time / qs.execution_count AS avg_elapsed_time,
    SUBSTRING(qt.text, (qs.statement_start_offset/2)+1,
        ((CASE qs.statement_end_offset
            WHEN -1 THEN DATALENGTH(qt.text)
            ELSE qs.statement_end_offset
        END - qs.statement_start_offset)/2) + 1) AS query_text
FROM sys.dm_exec_query_stats qs
CROSS APPLY sys.dm_exec_sql_text(qs.sql_handle) qt
ORDER BY avg_elapsed_time DESC;
```

### Check Index Usage

```sql
SELECT 
    OBJECT_NAME(s.object_id) AS TableName,
    i.name AS IndexName,
    s.user_seeks,
    s.user_scans,
    s.user_lookups,
    s.user_updates
FROM sys.dm_db_index_usage_stats s
INNER JOIN sys.indexes i ON s.object_id = i.object_id AND s.index_id = i.index_id
WHERE database_id = DB_ID('db54355')
ORDER BY s.user_seeks + s.user_scans + s.user_lookups DESC;
```

---

## 🐛 Troubleshooting

### Connection Issues

**Problem:** Cannot connect to database

**Solutions:**
1. Verify SQL Server is running
2. Check connection string
3. Verify firewall allows port 1433
4. Check user permissions

### Migration Errors

**Problem:** Migration fails to apply

**Solutions:**
```bash
# Remove last migration
dotnet ef migrations remove --project src/NaarNoor.Infrastructure

# Drop database and recreate
dotnet ef database drop --project src/NaarNoor.Infrastructure
dotnet ef database update --project src/NaarNoor.Infrastructure
```

### Deadlocks

**Problem:** Deadlock detected

**Solutions:**
1. Use proper transaction isolation levels
2. Keep transactions short
3. Access tables in consistent order
4. Use `WITH (NOLOCK)` for read queries (use cautiously)

---

## 🔗 Related Documentation

- [Backend Guide](./BACKEND.md) - API architecture
- [API Documentation](./API.md) - API endpoints
- [Deployment Guide](./DEPLOYMENT.md) - Production setup

---

**Need Help?** Check the [Troubleshooting Guide](./TROUBLESHOOTING.md).
