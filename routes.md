# API Routes Documentation

## List of API Routes

- **POST /customer**: Create a new customer.
- **GET /customer/list**: List all customers.
- **GET /customer/orders/:customer_id**: List all orders for a customer.
- **POST /order**: Create a new order.
- **GET /order/list**: List all orders.
- **PATCH /order/:order_id**: Update order status.
- **PATCH /order/modify/:order_id**: Modify order items.
- **POST /menu**: Add a new menu item.
- **GET /menu**: List all menu items.

## Route details

## Customer

### POST /customer

**Request body:**

```json
{
  "name": "João",
  "email": "joao@email.com",
  "phone": "999-999-999"
}
```

**Response:**

```json
{
  "id": 1,
  "name": "João",
  "email": "joao@email.com",
  "phone": "999999999",
  "createdAt": "2025-07-05 15:40:46.732-03",
  "updatedAt": "2025-07-05 15:40:46.732-03"
}
```

### GET /customer/list?page=2&limit=5

Get a list of all customers.

**Response:**

```json
[
  {
    "id": 1,
    "name": "João",
    "email": "joao@email.com",
    "phone": "999999999",
    "createdAt": "2025-07-05 15:40:46.732-03",
    "updatedAt": "2025-07-05 15:40:46.732-03"
  }
]
```

### GET /customer/orders/:customer_id?page=2&limit=5

Get all orders for a specific customer.

**Response:**

```json
[
  {
    "id": 10,
    "customer_id": 1,
    "items": [
      { "manu_item_id": 2, "quantity": 1 },
      { "manu_item_id": 3, "quantity": 2 }
    ],
    "status": "pending",
    "createdAt": "2025-07-05 15:40:46.732-03",
    "updatedAt": "2025-07-05 15:40:46.732-03"
  }
]
```

## Menu

### POST /menu

Add a new menu item.

**Request body:**

```json
{
  "name": "Pizza Margherita",
  "description": "Description here",
  "price": 35.0,
  "category": "main_course",
  "createdAt": "2025-07-05 15:40:46.732-03",
  "updatedAt": "2025-07-05 15:40:46.732-03"
}
```

**Response:**

```json
{
  "id": 5,
  "name": "Pizza Margherita",
  "description": "Description here",
  "price": 35.0,
  "category": "main_course",
  "createdAt": "2025-07-05 15:40:46.732-03",
  "updatedAt": "2025-07-05 15:40:46.732-03"
}
```

### GET /menu?page=2&limit=5

Get a list of all menu items.

**Response:**

```json
[
  {
    "id": 5,
    "name": "Pizza Margherita",
    "description": "Description here",
    "price": 35.0,
    "category": "main_course",
    "createdAt": "2025-07-05 15:40:46.732-03",
    "updatedAt": "2025-07-05 15:40:46.732-03"
  }
]
```

## Order

### POST /order

Create a new order.

**Request body:**

```json
{
  "customer_id": 1,
  "items": [
    { "menu_item_id": 2, "quantity": 1, "price_at_order": 5, "order_id": 1 },
    { "menu_item_id": 3, "quantity": 2, "price_at_order": 5, "order_id": 1 }
  ],
  "createdAt": "2025-07-05 15:40:46.732-03",
  "updatedAt": "2025-07-05 15:40:46.732-03"
}
```

**Response:**

```json
{
  "id": 10,
  "customer_id": 1,
  "items": [
    { "menu_item_id": 2, "quantity": 1, "price_at_order": 5, "order_id": 1 },
    { "menu_item_id": 3, "quantity": 2, "price_at_order": 5, "order_id": 1 }
  ],
  "status": "pending",
  "createdAt": "2025-07-05 15:40:46.732-03",
  "updatedAt": "2025-07-05 15:40:46.732-03"
}
```

### GET /order/list?page=2&limit=5

Get a list of all orders.

**Response:**

```json
[
  {
    "id": 10,
    "customer_id": 1,
    "items": [
      {
        "menu_item_id": 2,
        "quantity": 1,
        "name": "Product name",
        "price_at_order": 5,
        "order_id": 1
      },
      {
        "menu_item_id": 3,
        "quantity": 2,
        "name": "Other Product name",
        "price_at_order": 5,
        "order_id": 1
      }
    ],
    "status": "pending",
    "createdAt": "2025-07-05 15:40:46.732-03",
    "updatedAt": "2025-07-05 15:40:46.732-03"
  }
]
```

### PATCH /order/:order_id

Update the status of an order.

**Request body:**

```json
{
  "status": "completed"
}
```

### PATCH /order/modify/:order_id

Modify the items of an order.

**Request body:**

```json
{
  "items": [{ "menu_item_id": 2, "quantity": 2 }]
}
```
