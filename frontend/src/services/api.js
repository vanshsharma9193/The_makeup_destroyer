/**
 * CHERRY BLOSSOM - LUXURY MAKEUP & BEAUTY
 * Full-Stack API Client Service
 */

const API_BASE = '/api';

export const api = {
  // Products
  async getProducts(params = {}) {
    const query = new URLSearchParams();
    if (params.category && params.category !== 'All') query.append('category', params.category);
    if (params.search) query.append('search', params.search);
    if (params.maxPrice) query.append('maxPrice', params.maxPrice);
    if (params.minRating) query.append('minRating', params.minRating);
    if (params.sort) query.append('sort', params.sort);
    if (params.limit) query.append('limit', params.limit);

    try {
      const res = await fetch(`${API_BASE}/products?${query.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch products');
      return await res.json();
    } catch (err) {
      console.warn('Backend offline or unreachable, falling back to local dataset:', err);
      return null;
    }
  },

  async getProductById(id) {
    try {
      const res = await fetch(`${API_BASE}/products/${id}`);
      if (!res.ok) throw new Error('Product not found');
      return await res.json();
    } catch (err) {
      return null;
    }
  },

  async getCategories() {
    try {
      const res = await fetch(`${API_BASE}/products/meta/categories`);
      if (!res.ok) throw new Error('Failed to fetch categories');
      return await res.json();
    } catch (err) {
      return null;
    }
  },

  // Orders
  async createOrder(orderPayload) {
    try {
      const res = await fetch(`${API_BASE}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });
      return await res.json();
    } catch (err) {
      console.error('Order creation error:', err);
      return { success: false, message: 'Could not connect to luxury order dispatch service.' };
    }
  },

  async getOrder(id) {
    try {
      const res = await fetch(`${API_BASE}/orders/${id}`);
      return await res.json();
    } catch (err) {
      return null;
    }
  },

  // Authentication
  async login(email, password) {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: 'Authentication server unavailable.' };
    }
  },

  async register(name, email, password, phone) {
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, phone })
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: 'Registration server unavailable.' };
    }
  },

  // Coupons
  async applyCoupon(code, subtotal) {
    try {
      const res = await fetch(`${API_BASE}/coupons/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, subtotal })
      });
      return await res.json();
    } catch (err) {
      return null;
    }
  },

  // Contact & Newsletter
  async sendContact(name, email, phone, subject, message) {
    try {
      const res = await fetch(`${API_BASE}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, subject, message })
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: 'Failed to dispatch inquiry.' };
    }
  },

  async subscribeNewsletter(email) {
    try {
      const res = await fetch(`${API_BASE}/contact/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: 'Newsletter service unavailable.' };
    }
  }
};

