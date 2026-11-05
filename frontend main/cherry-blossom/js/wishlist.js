/**
 * CHERRY BLOSSOM - LUXURY MAKEUP & BEAUTY
 * Wishlist Management (localStorage backed)
 */

const WishlistService = {
  STORAGE_KEY: 'cherry_blossom_wishlist',

  getWishlist: () => {
    try {
      const items = localStorage.getItem(WishlistService.STORAGE_KEY);
      return items ? JSON.parse(items) : [];
    } catch (e) {
      console.error('Error reading wishlist from localStorage', e);
      return [];
    }
  },

  saveWishlist: (items) => {
    try {
      localStorage.setItem(WishlistService.STORAGE_KEY, JSON.stringify(items));
      WishlistService.updateWishlistCount();
      window.dispatchEvent(new CustomEvent('wishlistUpdated', { detail: { count: items.length } }));
    } catch (e) {
      console.error('Error saving wishlist to localStorage', e);
    }
  },

  isInWishlist: (productId) => {
    const list = WishlistService.getWishlist();
    return list.some(item => (typeof item === 'string' ? item : item.id) === productId);
  },

  toggleWishlist: (productId) => {
    let list = WishlistService.getWishlist();
    const index = list.findIndex(item => (typeof item === 'string' ? item : item.id) === productId);
    let added = false;

    if (index > -1) {
      list.splice(index, 1);
      added = false;
    } else {
      list.push(productId);
      added = true;
    }

    WishlistService.saveWishlist(list);
    WishlistService.syncHeartIcons(productId, added);

    const product = window.ProductService ? window.ProductService.getById(productId) : null;
    const prodName = product ? product.name : 'Product';

    if (window.showToast) {
      if (added) {
        window.showToast(`Added "${prodName}" to your Wishlist`, 'wishlist');
      } else {
        window.showToast(`Removed from Wishlist`, 'info');
      }
    }

    return added;
  },

  updateWishlistCount: () => {
    const count = WishlistService.getWishlist().length;
    document.querySelectorAll('.wishlist-count-badge').forEach(el => {
      el.textContent = count;
      el.style.display = count > 0 ? 'inline-flex' : 'none';
    });
  },

  syncHeartIcons: (productId, isFavorited) => {
    const buttons = document.querySelectorAll(`[data-wishlist-id="${productId}"]`);
    buttons.forEach(btn => {
      const icon = btn.querySelector('i');
      if (isFavorited) {
        btn.classList.add('active');
        if (icon) {
          icon.classList.remove('far', 'fa-heart');
          icon.classList.add('fas', 'fa-heart');
        }
      } else {
        btn.classList.remove('active');
        if (icon) {
          icon.classList.remove('fas', 'fa-heart');
          icon.classList.add('far', 'fa-heart');
        }
      }
    });
  },

  initHeartButtons: () => {
    const wishlist = WishlistService.getWishlist();
    const wishIds = new Set(wishlist.map(item => typeof item === 'string' ? item : item.id));

    document.querySelectorAll('[data-wishlist-id]').forEach(btn => {
      const prodId = btn.getAttribute('data-wishlist-id');
      const isFav = wishIds.has(prodId);
      const icon = btn.querySelector('i');
      if (isFav) {
        btn.classList.add('active');
        if (icon) {
          icon.classList.remove('far');
          icon.classList.add('fas');
        }
      } else {
        btn.classList.remove('active');
        if (icon) {
          icon.classList.remove('fas');
          icon.classList.add('far');
        }
      }
    });
  }
};

// Global click delegation for wishlist buttons
document.addEventListener('click', (e) => {
  const wishBtn = e.target.closest('[data-wishlist-id]');
  if (wishBtn) {
    e.preventDefault();
    e.stopPropagation();
    const prodId = wishBtn.getAttribute('data-wishlist-id');
    WishlistService.toggleWishlist(prodId);
  }
});

// Auto initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  WishlistService.updateWishlistCount();
  WishlistService.initHeartButtons();
});

if (typeof window !== 'undefined') {
  window.WishlistService = WishlistService;
}
