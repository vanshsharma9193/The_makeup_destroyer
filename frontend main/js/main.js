/**
 * CHERRY BLOSSOM - LUXURY MAKEUP & BEAUTY
 * Global Main Application Script
 */

// Toast Notification Engine
function showToast(message, type = 'info', duration = 3500) {
  let container = document.getElementById('cherry-toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'cherry-toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `cherry-toast toast-${type}`;

  let icon = '<i class="fas fa-sparkles"></i>';
  if (type === 'cart') icon = '<i class="fas fa-shopping-bag"></i>';
  if (type === 'wishlist') icon = '<i class="fas fa-heart"></i>';
  if (type === 'success') icon = '<i class="fas fa-check-circle"></i>';
  if (type === 'error') icon = '<i class="fas fa-exclamation-circle"></i>';

  toast.innerHTML = `
    <div class="toast-icon-wrap">${icon}</div>
    <div class="toast-body">${message}</div>
    <button type="button" class="toast-close" onclick="this.parentElement.remove()">&times;</button>
  `;

  container.appendChild(toast);

  // Animate in
  requestAnimationFrame(() => {
    toast.classList.add('visible');
  });

  // Auto remove
  setTimeout(() => {
    toast.classList.remove('visible');
    setTimeout(() => toast.remove(), 400);
  }, duration);
}

window.showToast = showToast;

// User Auth Mock State Helper
const AuthService = {
  AUTH_KEY: 'cb_luxury_user',

  getUser: () => {
    try {
      const data = localStorage.getItem(AuthService.AUTH_KEY);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  },

  setUser: (userData) => {
    localStorage.setItem(AuthService.AUTH_KEY, JSON.stringify(userData));
    AuthService.updateUI();
  },

  logout: () => {
    localStorage.removeItem(AuthService.AUTH_KEY);
    AuthService.updateUI();
    showToast('You have been signed out of Cherry Blossom VIP', 'info');
    setTimeout(() => {
      window.location.reload();
    }, 800);
  },

  updateUI: () => {
    const user = AuthService.getUser();
    document.querySelectorAll('.user-auth-indicator').forEach(el => {
      if (user) {
        el.innerHTML = `
          <div class="auth-logged-in-dropdown">
            <button type="button" class="btn-auth-user" id="user-profile-btn">
              <i class="far fa-user-circle"></i> <span>${user.name.split(' ')[0]}</span>
            </button>
            <div class="user-dropdown-menu">
              <div class="dropdown-header">
                <strong>${user.name}</strong>
                <small>${user.email}</small>
                <span class="vip-tier-badge"><i class="fas fa-gem"></i> VIP Diamond Tier</span>
              </div>
              <a href="shop.html"><i class="fas fa-shopping-bag"></i> Shop New In</a>
              <a href="cart.html"><i class="fas fa-shopping-cart"></i> My Bag</a>
              <button type="button" onclick="AuthService.logout()" class="dropdown-logout-btn"><i class="fas fa-sign-out-alt"></i> Sign Out</button>
            </div>
          </div>
        `;
      } else {
        el.innerHTML = `
          <a href="login.html" class="nav-icon-link" title="VIP Account">
            <i class="far fa-user"></i>
            <span class="nav-icon-label">VIP Sign In</span>
          </a>
        `;
      }
    });
  }
};

window.AuthService = AuthService;

// Sparkle Effect Generator
function initSilverSparkles() {
  const containers = document.querySelectorAll('.silver-sparkle-container');
  containers.forEach(container => {
    // Generate 16 floating silver sparkles
    for (let i = 0; i < 16; i++) {
      const sparkle = document.createElement('span');
      sparkle.className = 'silver-sparkle-dot';
      sparkle.style.left = `${Math.random() * 100}%`;
      sparkle.style.top = `${Math.random() * 100}%`;
      sparkle.style.animationDelay = `${Math.random() * 5}s`;
      sparkle.style.animationDuration = `${3 + Math.random() * 4}s`;
      sparkle.style.opacity = `${0.3 + Math.random() * 0.7}`;
      sparkle.style.transform = `scale(${0.4 + Math.random() * 0.9})`;
      container.appendChild(sparkle);
    }
  });
}

// Main App Initialization
document.addEventListener('DOMContentLoaded', () => {
  // 1. Header Sticky Effect
  const header = document.querySelector('.luxury-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // 2. Mobile Hamburger Toggle
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileNav = document.getElementById('mobile-nav-drawer');
  const mobileClose = document.getElementById('mobile-nav-close');
  const navBackdrop = document.getElementById('mobile-nav-backdrop');

  function openMobileNav() {
    if (mobileNav) mobileNav.classList.add('active');
    if (navBackdrop) navBackdrop.classList.add('active');
    document.body.classList.add('drawer-open');
  }

  function closeMobileNav() {
    if (mobileNav) mobileNav.classList.remove('active');
    if (navBackdrop) navBackdrop.classList.remove('active');
    document.body.classList.remove('drawer-open');
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openMobileNav);
  if (mobileClose) mobileClose.addEventListener('click', closeMobileNav);
  if (navBackdrop) navBackdrop.addEventListener('click', closeMobileNav);

  // 3. Mini Cart Drawer Toggle
  const miniCartDrawer = document.getElementById('mini-cart-drawer');
  const miniCartClose = document.getElementById('mini-cart-close');
  const miniCartBackdrop = document.getElementById('mini-cart-backdrop');

  document.querySelectorAll('.btn-open-mini-cart').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (miniCartDrawer) miniCartDrawer.classList.add('active');
      if (miniCartBackdrop) miniCartBackdrop.classList.add('active');
      document.body.classList.add('drawer-open');
    });
  });

  function closeMiniCart() {
    if (miniCartDrawer) miniCartDrawer.classList.remove('active');
    if (miniCartBackdrop) miniCartBackdrop.classList.remove('active');
    document.body.classList.remove('drawer-open');
  }

  if (miniCartClose) miniCartClose.addEventListener('click', closeMiniCart);
  if (miniCartBackdrop) miniCartBackdrop.addEventListener('click', closeMiniCart);

  // 4. Quick Search Overlay Toggle
  const searchOverlay = document.getElementById('search-modal-overlay');
  const searchInput = document.getElementById('global-search-input');
  const searchClose = document.getElementById('search-modal-close');
  const searchResults = document.getElementById('global-search-results');

  document.querySelectorAll('.btn-open-search').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (searchOverlay) {
        searchOverlay.classList.add('active');
        document.body.classList.add('modal-open');
        setTimeout(() => {
          if (searchInput) searchInput.focus();
        }, 150);
      }
    });
  });

  if (searchClose) {
    searchClose.addEventListener('click', () => {
      if (searchOverlay) searchOverlay.classList.remove('active');
      document.body.classList.remove('modal-open');
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.trim().toLowerCase();
      if (!searchResults) return;

      if (q.length < 2) {
        searchResults.innerHTML = '<p class="search-placeholder-text">Type at least 2 characters to explore luxury collections...</p>';
        return;
      }

      const products = window.ProductService ? window.ProductService.getAll() : [];
      const matches = products.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.category.toLowerCase().includes(q)
      ).slice(0, 5);

      if (matches.length === 0) {
        searchResults.innerHTML = `<p class="search-no-results">No cosmetics found matching "${q}". Explore our <a href="shop.html">Full Catalog</a></p>`;
        return;
      }

      searchResults.innerHTML = matches.map(p => `
        <a href="product.html?id=${p.id}" class="search-result-item">
          <img src="${p.image}" alt="${p.name}" />
          <div class="search-result-info">
            <span class="search-res-cat">${p.category}</span>
            <h4 class="search-res-name">${p.name}</h4>
            <span class="search-res-price">${window.ProductService.formatCurrency(p.price)}</span>
          </div>
          <i class="fas fa-chevron-right search-res-arrow"></i>
        </a>
      `).join('');
    });
  }

  // 5. Back to Top Button
  const backToTopBtn = document.getElementById('btn-back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 6. Scroll Reveal Observer
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('revealed'));
  }

  // 7. Global Newsletter Form Handler
  document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (input && input.value.trim()) {
        showToast('Welcome to Cherry Blossom VIP Club! Enjoy 15% off with code BLOSSOM20', 'success', 5000);
        input.value = '';
      }
    });
  });

  // 8. Silver Sparkles initialization
  initSilverSparkles();

  // 9. Update Auth UI
  AuthService.updateUI();
});

