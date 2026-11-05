# CHERRY BLOSSOM — Luxury Cosmetics (React Frontend)

An ultra-luxury, high-performance React application for **CHERRY BLOSSOM Haute Beauté**, converted from the master codebase into modern, component-driven, production-ready React (ES6+).

---

## 🌸 Brand Identity & Theme
- **Primary Burgundy**: `#64132F`
- **Dark Burgundy**: `#3B091B`
- **Cherry Red**: `#922B4B`
- **Silver Metallic**: `#C0C0C0`
- **Soft Pink**: `#F8E9EE`
- **Background White**: `#FFFAFB`
- **Light Grey**: `#F1F1F1`

---

## 📁 Architecture & File Structure

```
frontend/
├── package.json               # Dependencies (React 18, React Router DOM 6, Vite)
├── vite.config.js             # Vite configuration with fast HMR & port 3000
├── index.html                 # Master HTML container with Google Fonts & FontAwesome
├── src/
│   ├── main.jsx               # Application entry point
│   ├── App.jsx                # Router, providers & global modal layout
│   ├── assets/
│   │   └── css/
│   │       ├── style.css      # Luxury CSS styling, typography, cards & buttons
│   │       ├── animations.css # Silver sparkle particles, twinges & shimmers
│   │       └── responsive.css # Comprehensive responsive breakpoints
│   ├── data/
│   │   └── products.js        # 10 categories, Indian Rupee (₹) pricing, shades
│   ├── context/
│   │   ├── CartContext.jsx    # Shopping bag state with localStorage & coupons
│   │   ├── WishlistContext.jsx# Persistent wishlist bookmarks & badge counters
│   │   ├── AuthContext.jsx    # VIP Member authentication & session state
│   │   └── ToastContext.jsx   # Haute toast notification dispatch system
│   ├── components/
│   │   ├── Header.jsx         # Sticky navigation, logo, badges & mobile drawer
│   │   ├── Footer.jsx         # Collections, concierge, salon addresses & SSL
│   │   ├── ProductCard.jsx    # Hover image zoom, shades, quick view & add-to-bag
│   │   ├── MiniCartDrawer.jsx # Slide-out side drawer with stepper & checkout
│   │   ├── QuickViewModal.jsx # Instant product preview lightbox modal
│   │   ├── SearchModal.jsx    # Fullscreen live search with auto-complete
│   │   └── BackToTop.jsx      # Smooth scroll-to-top floating button
│   └── pages/
│       ├── Home.jsx           # Luxury landing page & editorial Sakura hero
│       ├── Shop.jsx           # 10 categories, multi-filters, price slider & sorting
│       ├── ProductDetail.jsx  # Gallery zoom, shade chips, accordions & reviews
│       ├── Cart.jsx           # Shopping bag table, free shipping meter & coupons
│       ├── Checkout.jsx       # 2-column checkout, address & payment celebration
│       ├── About.jsx          # Maison heritage, Kyoto/Paris story & pillars
│       ├── Contact.jsx        # Concierge contact form & interactive FAQ accordion
│       ├── Login.jsx          # VIP sign-in, show/hide password & social login
│       └── Register.jsx       # VIP membership charter & registration form
```

---

## 🚀 Getting Started

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

---

## 💎 Full-Stack Ready
- Clean decoupled state management with Context API.
- Ready to connect to backend REST or GraphQL APIs (Node.js/Express, Python/FastAPI, or Spring Boot) by replacing `products.js` with API endpoints.
- Authentication state pre-wired for JWT or session cookies.

