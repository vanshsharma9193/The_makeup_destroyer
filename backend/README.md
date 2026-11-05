# CHERRY BLOSSOM — Haute Beauté REST API Backend

A production-grade, secure RESTful API built with **Node.js** and **Express** powering the **CHERRY BLOSSOM** luxury e-commerce platform.

---

## 🏛 Architecture & Tech Stack

- **Runtime**: Node.js (ES6+ Modules)
- **Framework**: Express.js
- **Security & Utilities**: CORS, Morgan HTTP Logger, Dotenv
- **Authentication**: JSON Web Tokens (JWT) & BcryptJS password hashing
- **Data Persistence**: Asynchronous File-backed JSON Database (`backend/config/db.js`)
  - Out-of-the-box zero setup required (no external database installation needed)
  - Seamlessly swappable for MongoDB/Mongoose or PostgreSQL/Prisma

---

## 📡 REST API Endpoints Specification

### 1. Products API
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/products` | Retrieve all products (Supports `?category=`, `?search=`, `?maxPrice=`, `?minRating=`, `?sort=`, `?limit=`) |
| `GET` | `/api/products/:id` | Retrieve single product details |
| `GET` | `/api/products/meta/categories` | Retrieve distinct categories with item counts |
| `GET` | `/api/products/:id/related` | Retrieve related products from the same beauty discipline |

### 2. Orders API
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/orders` | Place a new luxury acquisition order (generates `CB-XXXX-LUX` ID) |
| `GET` | `/api/orders/:id` | Fetch specific order details & receipt |
| `GET` | `/api/orders` | Retrieve all orders |

### 3. VIP Authentication API
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/login` | Authenticate VIP credentials & receive signed JWT |
| `POST` | `/api/auth/register` | Induct new member into the VIP Circle |
| `GET` | `/api/auth/me` | Fetch active user profile (Protected route) |

### 4. Privilege Coupons API
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/coupons/apply` | Validate coupon code against minimum order rules |
| `GET` | `/api/coupons` | Retrieve active public privilege codes (`BLOSSOM20`, `CHERRY10`, etc.) |

### 5. Client Concierge & Newsletter API
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/contact` | Submit private concierge inquiry or boutique appointment |
| `POST` | `/api/contact/newsletter` | Subscribe email to VIP Circle & dispatch welcome code |

### 6. Health Check
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Returns server status, uptime, and system timestamp |

---

## 🚀 Running the Backend Server

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch development server with automatic file watching:
   ```bash
   npm run dev
   ```
   Or production:
   ```bash
   npm start
   ```

The server will be live on **`http://localhost:5000`**.

