# 📡 API Documentation

Complete REST API reference for **Naar & Noor** backend services.

---

## 🌐 Base URL

| Environment | URL |
|-------------|-----|
| **Development** | `http://localhost:8080/api` |
| **Production** | `https://naar-noor-api.vercel.app/api` |

---

## 🔐 Authentication

Currently, the API does not require authentication. Future versions will implement **JWT-based authentication**.

---

## 📦 Response Format

### Success Response

```json
{
  "id": 1,
  "name": "Chef Arjun",
  "specialty": "Indian Cuisine"
}
```

### Error Response

```json
{
  "type": "https://tools.ietf.org/html/rfc7231#section-6.5.1",
  "title": "One or more validation errors occurred.",
  "status": 400,
  "errors": {
    "Email": ["Email is required"]
  }
}
```

---

## 📚 Endpoints

### 👨‍🍳 Chefs

#### Get All Chefs

Retrieve a list of all chefs.

```http
GET /api/chefs
```

**Response: 200 OK**

```json
[
  {
    "id": 1,
    "name": "Chef Arjun",
    "specialty": "Indian Cuisine",
    "bio": "Expert in traditional Indian cooking with 15 years of experience",
    "imageUrl": "https://example.com/chefs/arjun.jpg",
    "createdAt": "2026-05-26T10:00:00Z",
    "updatedAt": "2026-05-26T10:00:00Z"
  },
  {
    "id": 2,
    "name": "Chef Maya",
    "specialty": "Fusion Cuisine",
    "bio": "Creative fusion chef blending Eastern and Western flavors",
    "imageUrl": "https://example.com/chefs/maya.jpg",
    "createdAt": "2026-05-26T10:00:00Z",
    "updatedAt": "2026-05-26T10:00:00Z"
  }
]
```

---

### 🍽️ Menu Items

#### Get All Menu Items

Retrieve the complete menu.

```http
GET /api/menu
```

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `category` | string | Filter by category: `Starters`, `Mains`, `Cocktails` |
| `available` | boolean | Filter by availability |

**Example:**

```http
GET /api/menu?category=Mains&available=true
```

**Response: 200 OK**

```json
[
  {
    "id": 1,
    "name": "Tandoori Chicken",
    "description": "Grilled chicken marinated in yogurt and aromatic spices",
    "price": 14.99,
    "category": "Mains",
    "imageUrl": "https://example.com/menu/tandoori-chicken.jpg",
    "isAvailable": true,
    "createdAt": "2026-05-26T10:00:00Z",
    "updatedAt": "2026-05-26T10:00:00Z"
  },
  {
    "id": 2,
    "name": "Butter Chicken",
    "description": "Tender chicken in creamy tomato sauce with butter",
    "price": 13.99,
    "category": "Mains",
    "imageUrl": "https://example.com/menu/butter-chicken.jpg",
    "isAvailable": true,
    "createdAt": "2026-05-26T10:00:00Z",
    "updatedAt": "2026-05-26T10:00:00Z"
  }
]
```

---

### 📅 Reservations

#### Get All Reservations

Retrieve all reservations.

```http
GET /api/reservations
```

**Response: 200 OK**

```json
[
  {
    "id": 1,
    "guestName": "John Doe",
    "email": "john@example.com",
    "phoneNumber": "+1-555-0123",
    "reservationDate": "2026-06-15T19:00:00Z",
    "numberOfGuests": 4,
    "specialRequests": "Window seat preferred",
    "status": "Confirmed",
    "createdAt": "2026-05-26T10:00:00Z",
    "updatedAt": "2026-05-26T10:00:00Z"
  }
]
```

#### Create Reservation

Create a new reservation.

```http
POST /api/reservations
Content-Type: application/json
```

**Request Body:**

```json
{
  "guestName": "Jane Smith",
  "email": "jane@example.com",
  "phoneNumber": "+1-555-0456",
  "reservationDate": "2026-06-20T19:30:00Z",
  "numberOfGuests": 2,
  "specialRequests": "Vegetarian options needed"
}
```

**Validation Rules:**

| Field | Rules |
|-------|-------|
| `guestName` | Required, max 100 characters |
| `email` | Required, valid email format |
| `phoneNumber` | Required |
| `reservationDate` | Required, must be in the future |
| `numberOfGuests` | Required, between 1-20 |
| `specialRequests` | Optional, max 500 characters |

**Response: 201 Created**

```json
{
  "id": 2,
  "guestName": "Jane Smith",
  "email": "jane@example.com",
  "phoneNumber": "+1-555-0456",
  "reservationDate": "2026-06-20T19:30:00Z",
  "numberOfGuests": 2,
  "specialRequests": "Vegetarian options needed",
  "status": "Pending",
  "createdAt": "2026-05-26T11:00:00Z",
  "updatedAt": "2026-05-26T11:00:00Z"
}
```

**Error Response: 400 Bad Request**

```json
{
  "type": "https://tools.ietf.org/html/rfc7231#section-6.5.1",
  "title": "One or more validation errors occurred.",
  "status": 400,
  "errors": {
    "Email": ["Email is required"],
    "NumberOfGuests": ["Number of guests must be between 1 and 20"]
  }
}
```

---

### ⭐ Reviews

#### Get Approved Reviews

Retrieve all approved customer reviews.

```http
GET /api/reviews
```

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `rating` | integer | Filter by rating (1-5) |
| `limit` | integer | Limit results (default: 10, max: 100) |

**Example:**

```http
GET /api/reviews?rating=5&limit=5
```

**Response: 200 OK**

```json
[
  {
    "id": 1,
    "guestName": "Alice Johnson",
    "rating": 5,
    "comment": "Excellent food and outstanding service! Highly recommend.",
    "isApproved": true,
    "createdAt": "2026-05-20T10:00:00Z",
    "updatedAt": "2026-05-20T10:00:00Z"
  },
  {
    "id": 2,
    "guestName": "Bob Wilson",
    "rating": 4,
    "comment": "Great atmosphere and delicious food. Will visit again!",
    "isApproved": true,
    "createdAt": "2026-05-21T10:00:00Z",
    "updatedAt": "2026-05-21T10:00:00Z"
  }
]
```

---

### 📧 Contact

#### Submit Contact Inquiry

Submit a contact form inquiry.

```http
POST /api/contact
Content-Type: application/json
```

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Catering Inquiry",
  "message": "I would like to inquire about catering services for my corporate event on July 15th."
}
```

**Validation Rules:**

| Field | Rules |
|-------|-------|
| `name` | Required, max 100 characters |
| `email` | Required, valid email format |
| `subject` | Required, max 200 characters |
| `message` | Required, max 1000 characters |

**Response: 201 Created**

```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Catering Inquiry",
  "message": "I would like to inquire about catering services for my corporate event on July 15th.",
  "createdAt": "2026-05-26T12:00:00Z"
}
```

---

### 🏥 Health Check

#### Get API Health Status

Check if the API is running and healthy.

```http
GET /health
```

**Response: 200 OK**

```json
{
  "status": "Healthy",
  "timestamp": "2026-05-26T12:00:00Z",
  "version": "1.0.0",
  "database": "Connected"
}
```

---

## 🚨 HTTP Status Codes

| Code | Status | Description |
|------|--------|-------------|
| **200** | OK | Request successful |
| **201** | Created | Resource created successfully |
| **400** | Bad Request | Invalid request parameters or validation error |
| **404** | Not Found | Resource not found |
| **409** | Conflict | Resource already exists |
| **422** | Unprocessable Entity | Validation error |
| **500** | Internal Server Error | Server error |

---

## 📄 Pagination

For endpoints returning lists, use pagination parameters:

```http
GET /api/menu?page=1&pageSize=10
```

**Parameters:**

| Parameter | Type | Default | Max |
|-----------|------|---------|-----|
| `page` | integer | 1 | - |
| `pageSize` | integer | 10 | 100 |

**Response Headers:**

```
X-Total-Count: 45
X-Page: 1
X-Page-Size: 10
X-Total-Pages: 5
```

---

## 🔍 Filtering & Sorting

### Filtering

```http
GET /api/menu?category=Mains&available=true
```

### Sorting

```http
GET /api/menu?sortBy=price&sortOrder=asc
```

**Sort Orders:**
- `asc` - Ascending
- `desc` - Descending

---

## 🌐 CORS

CORS is configured to allow requests from:

- **Development:** `http://localhost:5000`
- **Production:** `https://naar-noor.vercel.app`

---

## 📖 Interactive Documentation

Access **Swagger UI** for interactive API testing:

```
http://localhost:8080/swagger
```

---

## 💻 Code Examples

### JavaScript (Fetch API)

```javascript
// Get all chefs
fetch('http://localhost:8080/api/chefs')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

// Create reservation
fetch('http://localhost:8080/api/reservations', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    guestName: 'Jane Smith',
    email: 'jane@example.com',
    phoneNumber: '+1-555-0456',
    reservationDate: '2026-06-20T19:30:00Z',
    numberOfGuests: 2,
    specialRequests: 'Vegetarian options needed'
  })
})
  .then(response => response.json())
  .then(data => console.log('Reservation created:', data))
  .catch(error => console.error('Error:', error));
```

### cURL

```bash
# Get all chefs
curl -X GET http://localhost:8080/api/chefs

# Create reservation
curl -X POST http://localhost:8080/api/reservations \
  -H "Content-Type: application/json" \
  -d '{
    "guestName": "Jane Smith",
    "email": "jane@example.com",
    "phoneNumber": "+1-555-0456",
    "reservationDate": "2026-06-20T19:30:00Z",
    "numberOfGuests": 2,
    "specialRequests": "Vegetarian options needed"
  }'
```

### C# (HttpClient)

```csharp
using System.Net.Http;
using System.Text;
using System.Text.Json;

// Get all chefs
var client = new HttpClient();
var response = await client.GetAsync("http://localhost:8080/api/chefs");
var chefs = await response.Content.ReadAsStringAsync();

// Create reservation
var reservation = new
{
    guestName = "Jane Smith",
    email = "jane@example.com",
    phoneNumber = "+1-555-0456",
    reservationDate = "2026-06-20T19:30:00Z",
    numberOfGuests = 2,
    specialRequests = "Vegetarian options needed"
};

var json = JsonSerializer.Serialize(reservation);
var content = new StringContent(json, Encoding.UTF8, "application/json");
var response = await client.PostAsync("http://localhost:8080/api/reservations", content);
```

---

## 🔗 Related Documentation

- [Backend Guide](./BACKEND.md) - Learn about the API architecture
- [Database Schema](./DATABASE.md) - Understand the data model
- [Deployment Guide](./DEPLOYMENT.md) - Deploy the API
- [Troubleshooting](./TROUBLESHOOTING.md) - Common issues and solutions

---

**Need Help?** Open an issue on [GitHub](https://github.com/Mostafa-SAID7/Naar-Noor/issues).
