import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';
import { ProductService } from '../data/products';

const CartContext = createContext();

const CART_KEY = 'cherry_blossom_cart';
const COUPON_KEY = 'cherry_blossom_coupon';
const FREE_SHIPPING_THRESHOLD = 1999;
const DEFAULT_SHIPPING_FEE = 150;

const VALID_COUPONS = {
  'CHERRY10': { type: 'percent', value: 10, label: '10% Off First Luxury Order' },
  'BLOSSOM20': { type: 'percent', value: 20, label: '20% Off Spring Blossom Special' },
  'LUXURY500': { type: 'fixed', value: 500, minOrder: 2000, label: '₹500 Off orders above ₹2,000' },
  'FREESHIP': { type: 'shipping', value: 0, label: 'Complimentary Express Courier' }
};

export const CartProvider = ({ children }) => {
  const { showToast } = useToast();
  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false);

  const [cart, setCart] = useState(() => {
    try {
      const data = localStorage.getItem(CART_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  });

  const [coupon, setCoupon] = useState(() => {
    try {
      const data = localStorage.getItem(COUPON_KEY);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to sync cart', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      if (coupon) {
        localStorage.setItem(COUPON_KEY, JSON.stringify(coupon));
      } else {
        localStorage.removeItem(COUPON_KEY);
      }
    } catch (e) {
      console.error('Failed to sync coupon', e);
    }
  }, [coupon]);

  const addToCart = (productId, quantity = 1, shadeName = null) => {
    const product = ProductService.getById(productId);
    if (!product) return false;

    const chosenShade = shadeName || (product.shades && product.shades.length > 0 ? product.shades[0].name : 'Default');
    const qty = parseInt(quantity, 10) || 1;

    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.productId === productId && item.shade === chosenShade
      );

      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += qty;
        return updated;
      } else {
        return [
          ...prev,
          {
            id: `${productId}_${chosenShade.replace(/\s+/g, '_')}_${Date.now()}`,
            productId: product.id,
            name: product.name,
            category: product.category,
            price: product.price,
            originalPrice: product.originalPrice,
            image: product.image,
            shade: chosenShade,
            quantity: qty
          }
        ];
      }
    });

    showToast(`Added ${qty}x "${product.name}" (${chosenShade}) to Bag`, 'cart');
    setIsMiniCartOpen(true);
    return true;
  };

  const updateQuantity = (cartItemId, newQty) => {
    const qty = parseInt(newQty, 10);
    if (qty <= 0) {
      removeFromCart(cartItemId);
      return;
    }

    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity: qty } : item))
    );
    showToast(`Updated quantity to ${qty}`, 'info');
  };

  const removeFromCart = (cartItemId) => {
    const item = cart.find((i) => i.id === cartItemId);
    setCart((prev) => prev.filter((i) => i.id !== cartItemId));
    if (item) {
      showToast(`Removed "${item.name}" from Bag`, 'info');
    }
  };

  const clearCart = () => {
    setCart([]);
    setCoupon(null);
    showToast('Your Shopping Bag has been cleared', 'info');
  };

  const applyCoupon = (code) => {
    const cleanCode = (code || '').trim().toUpperCase();
    const couponDef = VALID_COUPONS[cleanCode];

    if (!couponDef) {
      showToast('Invalid coupon code. Try CHERRY10 or BLOSSOM20.', 'error');
      return { success: false, message: 'Invalid coupon code.' };
    }

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (couponDef.minOrder && subtotal < couponDef.minOrder) {
      const msg = `This privilege coupon requires a minimum purchase of ${ProductService.formatCurrency(couponDef.minOrder)}.`;
      showToast(msg, 'error');
      return { success: false, message: msg };
    }

    const newCoupon = { code: cleanCode, ...couponDef };
    setCoupon(newCoupon);
    showToast(`Coupon ${cleanCode} applied successfully!`, 'success');
    return { success: true, message: 'Coupon applied.' };
  };

  const removeCoupon = () => {
    setCoupon(null);
    showToast('Coupon removed', 'info');
  };

  const getTotals = () => {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    let discount = 0;
    let shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : DEFAULT_SHIPPING_FEE;

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

    discount = Math.min(discount, subtotal);
    const grandTotal = Math.max(0, subtotal - discount + shipping);

    return {
      subtotal,
      discount,
      shipping,
      grandTotal,
      coupon,
      freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
      freeShippingRemaining: Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal)
    };
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        coupon,
        isMiniCartOpen,
        setIsMiniCartOpen,
        openMiniCart: () => setIsMiniCartOpen(true),
        closeMiniCart: () => setIsMiniCartOpen(false),
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        applyCoupon,
        removeCoupon,
        getTotals
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

