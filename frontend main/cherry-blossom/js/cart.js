/**
 * CHERRY BLOSSOM - LUXURY MAKEUP & BEAUTY
 * Shopping Cart Management with localStorage & Coupon Engine
 */

const CartService = {
  STORAGE_KEY: 'cherry_blossom_cart',
  COUPON_KEY: 'cherry_blossom_coupon',
  FREE_SHIPPING_THRESHOLD: 1999,
  DEFAULT_SHIPPING_FEE: 150,

  VALID_COUPONS: {
    'CHERRY10': { type: 'percent', value: 10, label: '10% Off First Luxury Order' },
    'BLOSSOM20': { type: 'percent', value: 20, label: '20% Off Spring Blossom Special' },
    'LUXURY500': { type: 'fixed', value: 500, minOrder: 2000, label: '₹500 Off orders above ₹2,000' },
    'FREESHIP': { type: 'shipping', value: 0, label: 'Complimentary Express Courier' }
  },

  getCart: () => {
    try {
      const data = localStorage.getItem(CartService.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Error reading cart', e);
      return [];
    }
  },

  saveCart: (items) => {
    try {
      localStorage.setItem(CartService.STORAGE_KEY, JSON.stringify(items));
      CartService.updateCartBadges();
      CartService.renderMiniCart();
      window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { cart: items } }));
    } catch (e) {
      console.error('Error saving cart', e);
    }
  },

  getAppliedCoupon: () => {
    try {
      const data = localStorage.getItem(CartService.COUPON_KEY);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  },

  setAppliedCoupon: (coupon) => {
    if (!coupon) {
      localStorage.removeItem(CartService.COUPON_KEY);
    } else {
      localStorage.setItem(CartService.COUPON_KEY, JSON.stringify(coupon));
    }
  },

  addToCart: (productId, quantity = 1, shadeName = null) => {
    const product = window.ProductService ? window.ProductService.getById(productId) : null;
    if (!product) return false;

    const chosenShade = shadeName || (product.shades && product.shades.length > 0 ? product.shades[0].name : 'Default');
    const cart = CartService.getCart();

    const existingIndex = cart.findIndex(
      item => item.productId === productId && item.shade === chosenShade
    );

    if (existingIndex > -1) {
      cart[existingIndex].quantity += parseInt(quantity, 10);
    } else {
      cart.push({
        id: `${productId}_${chosenShade.replace(/\s+/g, '_')}_${Date.now()}`,
        productId: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        shade: chosenShade,
        quantity: parseInt(quantity, 10)
      });
    }

    CartService.saveCart(cart);

    if (window.showToast) {
      window.showToast(`Added ${quantity}x "${product.name}" (${chosenShade}) to Bag`, 'cart');
    }

    // Trigger mini cart drawer open if available
    const miniCart = document.getElementById('mini-cart-drawer');
    if (miniCart) {
      miniCart.classList.add('active');
      document.body.classList.add('drawer-open');
    }

    return true;
  },

  updateQuantity: (cartItemId, newQty) => {
    const qty = parseInt(newQty, 10);
    let cart = CartService.getCart();

    if (qty <= 0) {
      CartService.removeFromCart(cartItemId);
      return;
    }

    const item = cart.find(i => i.id === cartItemId);
    if (item) {
      item.quantity = qty;
      CartService.saveCart(cart);
      if (window.showToast) {
        window.showToast(`Updated quantity to ${qty}`, 'info');
      }
    }
  },

  removeFromCart: (cartItemId) => {
    let cart = CartService.getCart();
    const removedItem = cart.find(i => i.id === cartItemId);
    cart = cart.filter(i => i.id !== cartItemId);
    CartService.saveCart(cart);

    if (window.showToast && removedItem) {
      window.showToast(`Removed "${removedItem.name}" from Bag`, 'info');
    }
  },

  clearCart: () => {
    localStorage.removeItem(CartService.STORAGE_KEY);
    localStorage.removeItem(CartService.COUPON_KEY);
    CartService.updateCartBadges();
    CartService.renderMiniCart();
    window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { cart: [] } }));
  },

  getTotals: () => {
    const cart = CartService.getCart();
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const coupon = CartService.getAppliedCoupon();
    let discount = 0;
    let shipping = subtotal >= CartService.FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : CartService.DEFAULT_SHIPPING_FEE;

    if (coupon) {
      if (coupon.type === 'percent') {
        discount = Math.round((subtotal * coupon.value) / 100);
      } else if (coupon.type === 'fixed') {
        if (!coupon.minOrder || subtotal >= coupon.minOrder) {
          discount = coupon.value;
        }
      } else if (coupon.type === 'shipping') {
        shipping = 0;
      }
    }

    // Ensure discount doesn't exceed subtotal
    discount = Math.min(discount, subtotal);
    const grandTotal = Math.max(0, subtotal - discount + shipping);

    return {
      subtotal,
      discount,
      shipping,
      grandTotal,
      coupon,
      freeShippingThreshold: CartService.FREE_SHIPPING_THRESHOLD,
      freeShippingRemaining: Math.max(0, CartService.FREE_SHIPPING_THRESHOLD - subtotal)
    };
  },

  applyCoupon: (code) => {
    const cleanCode = (code || '').trim().toUpperCase();
    const couponDef = CartService.VALID_COUPONS[cleanCode];

    if (!couponDef) {
      return { success: false, message: 'Invalid coupon code. Try CHERRY10 or BLOSSOM20.' };
    }

    const cart = CartService.getCart();
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    if (couponDef.minOrder && subtotal < couponDef.minOrder) {
      return { 
        success: false, 
        message: `This coupon requires a minimum purchase of ${window.ProductService.formatCurrency(couponDef.minOrder)}.` 
      };
    }

    const couponObj = {
      code: cleanCode,
      ...couponDef
    };

    CartService.setAppliedCoupon(couponObj);
    CartService.saveCart(cart); // trigger re-render
    return { success: true, message: `Coupon ${cleanCode} applied successfully!` };
  },

  removeCoupon: () => {
    CartService.setAppliedCoupon(null);
    const cart = CartService.getCart();
    CartService.saveCart(cart);
  },

  updateCartBadges: () => {
    const cart = CartService.getCart();
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    document.querySelectorAll('.cart-count-badge').forEach(badge => {
      badge.textContent = totalCount;
      badge.style.display = totalCount > 0 ? 'inline-flex' : 'none';
    });
  },

  renderMiniCart: () => {
    const miniCartContainer = document.getElementById('mini-cart-items');
    const miniCartSubtotal = document.getElementById('mini-cart-subtotal');
    const miniCartCount = document.getElementById('mini-cart-item-count');
    const miniCartEmpty = document.getElementById('mini-cart-empty');
    const miniCartFilled = document.getElementById('mini-cart-content');

    if (!miniCartContainer) return;

    const cart = CartService.getCart();
    const totals = CartService.getTotals();

    if (miniCartCount) {
      miniCartCount.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
    }

    if (cart.length === 0) {
      if (miniCartEmpty) miniCartEmpty.style.display = 'block';
      if (miniCartFilled) miniCartFilled.style.display = 'none';
      return;
    }

    if (miniCartEmpty) miniCartEmpty.style.display = 'none';
    if (miniCartFilled) miniCartFilled.style.display = 'block';

    miniCartContainer.innerHTML = cart.map(item => `
      <div class="mini-cart-item" data-id="${item.id}">
        <div class="mini-cart-img-wrap">
          <img src="${item.image}" alt="${item.name}" loading="lazy" />
        </div>
        <div class="mini-cart-info">
          <h4 class="mini-cart-title">${item.name}</h4>
          <span class="mini-cart-shade"><i class="fas fa-sparkles"></i> Shade: ${item.shade}</span>
          <div class="mini-cart-pricing">
            <span class="mini-cart-price">${window.ProductService ? window.ProductService.formatCurrency(item.price) : '₹' + item.price}</span>
            <span class="mini-cart-multiplier">× ${item.quantity}</span>
          </div>
          <div class="mini-cart-controls">
            <div class="qty-stepper-mini">
              <button type="button" class="btn-qty-mini" onclick="CartService.updateQuantity('${item.id}', ${item.quantity - 1})">-</button>
              <span>${item.quantity}</span>
              <button type="button" class="btn-qty-mini" onclick="CartService.updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
            </div>
            <button type="button" class="btn-remove-mini" onclick="CartService.removeFromCart('${item.id}')" title="Remove item">
              <i class="far fa-trash-alt"></i>
            </button>
          </div>
        </div>
      </div>
    `).join('');

    if (miniCartSubtotal) {
      miniCartSubtotal.textContent = window.ProductService ? window.ProductService.formatCurrency(totals.subtotal) : '₹' + totals.subtotal;
    }
  }
};

// Global click event for adding to cart
document.addEventListener('click', (e) => {
  const addBtn = e.target.closest('[data-add-to-cart]');
  if (addBtn) {
    e.preventDefault();
    const prodId = addBtn.getAttribute('data-add-to-cart');
    const qtyInput = document.getElementById('product-quantity-input');
    const quantity = qtyInput ? parseInt(qtyInput.value, 10) || 1 : 1;
    
    // Find active shade if on product page
    const activeShadeEl = document.querySelector('.shade-option.active');
    const shadeName = activeShadeEl ? activeShadeEl.getAttribute('data-shade-name') : null;

    CartService.addToCart(prodId, quantity, shadeName);
  }
});

// Auto initialize on load
document.addEventListener('DOMContentLoaded', () => {
  CartService.updateCartBadges();
  CartService.renderMiniCart();
});

if (typeof window !== 'undefined') {
  window.CartService = CartService;
}
