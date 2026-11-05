import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';
import { ProductService } from '../data/products';

const WishlistContext = createContext();

const STORAGE_KEY = 'cherry_blossom_wishlist';

export const WishlistProvider = ({ children }) => {
  const { showToast } = useToast();
  const [wishlist, setWishlist] = useState(() => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlist));
    } catch (e) {
      console.error('Failed to sync wishlist', e);
    }
  }, [wishlist]);

  const isInWishlist = (productId) => {
    return wishlist.includes(productId);
  };

  const toggleWishlist = (productId) => {
    const product = ProductService.getById(productId);
    const prodName = product ? product.name : 'Cosmetic';

    setWishlist((prev) => {
      if (prev.includes(productId)) {
        showToast(`Removed "${prodName}" from Wishlist`, 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast(`Added "${prodName}" to your Wishlist`, 'wishlist');
        return [...prev, productId];
      }
    });
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        isInWishlist,
        toggleWishlist,
        wishlistCount: wishlist.length
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);

