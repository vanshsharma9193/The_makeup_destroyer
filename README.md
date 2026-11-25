# 🌸 CHERRY BLOSSOM — Haute Beauté & Luxury Cosmetics

![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-24-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.19-000000?logo=express&logoColor=white)
![JavaScript](https://img.shields.io/badge/ES6+-F7DF1E?logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-922B4B)

> **"Discover Your Beauty. Define Your Elegance."**  
> An ultra-luxury, full-stack cosmetics and makeup e-commerce platform combining Japanese Sakura botanical grace with French haute couture refinement.

---

## 🎨 Brand Identity & Palette

Cherry Blossom is crafted with a royal editorial visual language inspired by luxury beauty houses (*Charlotte Tilbury*, *Dior Beauty*, *Huda Beauty*):

| Color | Hex Code | Purpose & Application |
| :--- | :--- | :--- |
| **Primary Burgundy** | `#64132F` | Core brand signature, luxury buttons, borders, and active highlights |
| **Dark Burgundy** | `#3B091B` | Editorial hero backdrops, typography, headers, and footer depth |
| **Cherry Red** | `#922B4B` | Interactive hover states, badges, rating stars, and promo tags |
| **Silver Metallic** | `#C0C0C0` | Fine borders, subtle sparkle particles, and button shimmer sweeps |
| **Soft Pink** | `#F8E9EE` | Section backgrounds, pill tags, and ambient cards |
| **Background White** | `#FFFAFB` | Ultra-clean, luminous canvas for high-end product presentation |
| **Light Grey** | `#F1F1F1` | Dividers, subtle input borders, and badge backgrounds |

---

## ✨ Features & Modules

### 💄 10 Signature Beauty Disciplines
Curated formulations across:
1. **Lipsticks** — Velvet rouge satin lipsticks, matte elixirs, and hydrating lip oils
2. **Foundations** — Luminous silk breathable foundation, velvet matte poreless formulas
3. **Concealers** — Radiant silk touch-up and full-cover velvet camouflage
4. **Blushes** — Cherry petal soft baked powder blush, dewy cheek jelly tint
5. **Highlighters** — Starlight diamond shimmer powder, moonlit celestial liquid glow
6. **Eyeshadow Palettes** — Imperial blossom 18-color palette, rose quartz smoky palette
7. **Mascaras** — Lash crown dramatic volume, feather-light waterproof mascara
8. **Eyeliners** — Obsidian 0.01mm waterproof liquid liner, velvet gel glide pencil
9. **Makeup Brushes** — Imperial 12-piece luxury vegan brush set, buffing kabuki
10. **Beauty Essentials** — 24K silver hydra-mist setting spray, cleansing balm, translucent powder

### 🛍 Interactive Shopping Experience
- **Dynamic Catalog & Filtering**: Instant search, category tabs, price slider (up to ₹7,000), star rating filters, and multi-option sorting.
- **Quick View Lightbox**: Instant product inspection with shade selector, gallery thumbnails, and direct Add-to-Bag.
- **Product Details & Application Rituals**: Multi-angle gallery with zoom, shade swatch chips, ingredient breakdowns, and verified customer review submissions.
- **Shopping Cart & Coupon Engine**: Real-time subtotal calculations, bound quantity steppers, free shipping progress meter, and VIP promo code support:
  - `BLOSSOM20` — 20% off total purchase
  - `CHERRY10` — 10% off first luxury order
  - `LUXURY500` — ₹500 flat off orders above ₹2,000
  - `FREESHIP` — Complimentary express courier dispatch
- **Luxury Checkout & Order Confirmation**: Two-column responsive checkout with address validation, multi-payment options (Credit/Debit Card, UPI, Netbanking, COD), and an animated celebration modal generating a unique Order ID (`CB-XXXX-LUX`).
- **Wishlist Management**: Persistent bookmarking with live header counter badges.
- **Client Concierge & FAQ**: Salon booking inquiries for Mumbai and New Delhi flagships, plus an animated interactive accordion.
- **VIP Authentication**: Member login, registration, password reveal toggles, and Google VIP / Apple Pass demo single sign-on.

---

## 🏛 Project Architecture

```
sanjna ai 1/
├── package.json               # Root npm scripts orchestrating full-stack services
├── .gitignore                 # Excludes node_modules, build artifacts & secrets
├── README.md                  # Master project documentation
│
├── frontend/                  # React 18 + Vite Luxury Application
│   ├── package.json
│   ├── vite.config.js         # Configured with proxy to http://localhost:5000/api
│   ├── index.html             # Google Fonts & FontAwesome integration
│   │
│   └── src/
│       ├── main.jsx           # React DOM mount point
│       ├── App.jsx            # React Router v6 & Context Providers
│       │
│       ├── assets/css/        # Luxury Burgundy & Silver CSS system
│       │   ├── style.css      # Core styles, typography, buttons & cards
│       │   ├── animations.css # Silver sparkle particles, twinges & shimmers
│       │   └── responsive.css # Desktop, tablet, and mobile breakpoints
│       │
│       ├── context/           # React Context state management
│       │   ├── CartContext.jsx    # Bag state, quantities, localStorage & coupons
│       │   ├── WishlistContext.jsx# Persistent wishlist bookmarks
│       │   ├── AuthContext.jsx    # VIP session state & user profile
│       │   └── ToastContext.jsx   # Global auto-dismissing toast notifications
│       │
│       ├── components/        # Reusable UI components
│       │   ├── Header.jsx         # Sticky navigation, logo & mobile drawer
│       │   ├── Footer.jsx         # Brand story, salon addresses & payment badges
│       │   ├── ProductCard.jsx    # Hover zoom, shade preview & quick view
│       │   ├── MiniCartDrawer.jsx # Slide-out cart drawer
│       │   ├── QuickViewModal.jsx # Product preview lightbox
│       │   ├── SearchModal.jsx    # Fullscreen live search with autocomplete
│       │   └── BackToTop.jsx      # Smooth scroll-to-top floating button
│       │
│       ├── pages/             # Route views
│       │   ├── Home.jsx           # Editorial hero, collections & reviews
│       │   ├── Shop.jsx           # Catalog, sidebar filters & sorting
│       │   ├── ProductDetail.jsx  # Multi-angle gallery, shades & accordions
│       │   ├── Cart.jsx           # Cart table, shipping bar & coupon box
│       │   ├── Checkout.jsx       # 2-column checkout & celebration modal
│       │   ├── About.jsx          # Maison heritage & ethical beauty pillars
│       │   ├── Contact.jsx        # Concierge contact form & FAQ accordion
│       │   ├── Login.jsx          # VIP member sign-in & password recovery
│       │   └── Register.jsx       # VIP Circle induction form
│       │
│       ├── services/
│       │   └── api.js         # Full-stack API client with graceful fallback
│       │
│       └── data/
│           └── products.js    # Client-side product dataset & currency utilities
│
└── backend/                   # Node.js & Express RESTful API Server
    ├── server.js              # Express entry point, middleware & route mounting
    ├── package.json           # express, cors, jsonwebtoken, bcryptjs, morgan
    ├── .env                   # Environment variables (PORT 5000, JWT_SECRET)
    ├── .env.example
    │
    ├── config/
    │   └── db.js              # Asynchronous JSON file-backed persistence engine
    ├── middleware/
    │   ├── auth.js            # JWT verification & role authorization
    │   └── errorHandler.js    # Centralized 404 & 500 error handlers
    ├── controllers/           # Business logic
    │   ├── productController.js
    │   ├── orderController.js
    │   ├── authController.js
    │   ├── couponController.js
    │   └── contactController.js
    ├── routes/                # Express router endpoints
    │   ├── productRoutes.js   # /api/products
    │   ├── orderRoutes.js     # /api/orders
    │   ├── authRoutes.js      # /api/auth
    │   ├── couponRoutes.js    # /api/coupons
    │   └── contactRoutes.js   # /api/contact
    └── data/                  # Persistent JSON storage
        ├── products.json
        ├── coupons.json
        ├── users.json
        ├── orders.json
        └── messages.json
```

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js** (v18.0.0 or higher recommended)
- **npm** (v9.0.0 or higher)

### 1. Clone the Repository
```bash
git clone https://github.com/vanshsharma9193/The_makeup_destroyer.git
cd The_makeup_destroyer
```

### 2. Install Dependencies
Install dependencies for both frontend and backend:
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

cd ..
```

### 3. Run the Development Environment

You can start the frontend and backend concurrently or in separate terminals:

#### Option A: Running in Two Terminals

**Terminal 1 (Backend API - Port 5000):**
```bash
cd backend
npm run dev
```
*API will run at `http://localhost:5000` with live file watching.*

**Terminal 2 (Frontend React App - Port 3000):**
```bash
cd frontend
npm run dev
```
*Frontend will launch at `http://localhost:3000`.*

#### Option B: Single-Command Root Shortcuts
From the project root:
- `npm run dev:backend` — Starts Express API server
- `npm run dev:frontend` — Starts Vite React dev server
- `npm run build:frontend` — Generates optimized production build of the React app

---

## 📡 REST API Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Service health status, uptime, and server timestamp |
| `GET` | `/api/products` | Retrieve all products (`?category=`, `?search=`, `?maxPrice=`, `?sort=`) |
| `GET` | `/api/products/:id` | Retrieve single product details |
| `GET` | `/api/products/meta/categories` | Retrieve distinct categories with item counts |
| `GET` | `/api/products/:id/related` | Retrieve related product recommendations |
| `POST` | `/api/orders` | Place a new luxury order (returns unique Order ID) |
| `GET` | `/api/orders/:id` | Fetch specific order details & receipt |
| `POST` | `/api/auth/login` | Authenticate VIP credentials & receive signed JWT |
| `POST` | `/api/auth/register` | Induct new member into the VIP Circle |
| `GET` | `/api/auth/me` | Fetch active user profile (Protected route) |
| `POST` | `/api/coupons/apply` | Validate privilege discount code against order rules |
| `GET` | `/api/coupons` | Retrieve active public privilege codes |
| `POST` | `/api/contact` | Submit private concierge inquiry or salon appointment |
| `POST` | `/api/contact/newsletter` | Subscribe email to VIP Circle and receive promo code |

---

## 🔒 Security & Best Practices
- **256-Bit SSL Ready**: Clean standard HTTP/HTTPS headers and CORS configuration.
- **Environment Isolation**: Sensitive secrets stored in `.env` (excluded from version control).
- **Password Protection**: Salted password hashing via `bcryptjs`.
- **JWT Authorization**: Stateless Bearer token verification for protected client routes.
- **Graceful Fallback**: Frontend API client seamlessly falls back to bundled catalog data if the backend server is unreachable.

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
