/**
 * CHERRY BLOSSOM - LUXURY MAKEUP & BEAUTY
 * Shop Filtering, Search, Sorting & Quick View Modal
 */

const FilterService = {
  state: {
    category: 'All',
    searchQuery: '',
    maxPrice: 7000,
    minRating: 0,
    sortBy: 'featured',
    currentPage: 1,
    itemsPerPage: 9
  },

  init: () => {
    FilterService.readURLParams();
    FilterService.bindEvents();
    FilterService.renderCategories();
    FilterService.applyFilters();
  },

  readURLParams: () => {
    const params = new URLSearchParams(window.location.search);
    if (params.has('category')) {
      FilterService.state.category = params.get('category');
    }
    if (params.has('search')) {
      FilterService.state.searchQuery = params.get('search');
      const searchInput = document.getElementById('shop-search-input');
      if (searchInput) searchInput.value = FilterService.state.searchQuery;
    }
    if (params.has('sort')) {
      FilterService.state.sortBy = params.get('sort');
      const sortSelect = document.getElementById('shop-sort-select');
      if (sortSelect) sortSelect.value = FilterService.state.sortBy;
    }
  },

  bindEvents: () => {
    // Search input
    const searchInput = document.getElementById('shop-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        FilterService.state.searchQuery = e.target.value.trim().toLowerCase();
        FilterService.state.currentPage = 1;
        FilterService.applyFilters();
      });
    }

    // Price range
    const priceRange = document.getElementById('price-range-slider');
    const priceDisplay = document.getElementById('price-range-value');
    if (priceRange) {
      priceRange.addEventListener('input', (e) => {
        FilterService.state.maxPrice = parseInt(e.target.value, 10);
        if (priceDisplay) {
          priceDisplay.textContent = window.ProductService.formatCurrency(FilterService.state.maxPrice);
        }
        FilterService.state.currentPage = 1;
        FilterService.applyFilters();
      });
    }

    // Sort select
    const sortSelect = document.getElementById('shop-sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        FilterService.state.sortBy = e.target.value;
        FilterService.applyFilters();
      });
    }

    // Rating checkboxes or radio
    document.querySelectorAll('.rating-filter-input').forEach(input => {
      input.addEventListener('change', (e) => {
        FilterService.state.minRating = parseFloat(e.target.value);
        FilterService.state.currentPage = 1;
        FilterService.applyFilters();
      });
    });

    // Reset filters
    const resetBtn = document.getElementById('btn-reset-filters');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        FilterService.resetFilters();
      });
    }
  },

  resetFilters: () => {
    FilterService.state = {
      category: 'All',
      searchQuery: '',
      maxPrice: 7000,
      minRating: 0,
      sortBy: 'featured',
      currentPage: 1,
      itemsPerPage: 9
    };

    const searchInput = document.getElementById('shop-search-input');
    if (searchInput) searchInput.value = '';

    const priceRange = document.getElementById('price-range-slider');
    const priceDisplay = document.getElementById('price-range-value');
    if (priceRange) {
      priceRange.value = 7000;
      if (priceDisplay) priceDisplay.textContent = window.ProductService.formatCurrency(7000);
    }

    const sortSelect = document.getElementById('shop-sort-select');
    if (sortSelect) sortSelect.value = 'featured';

    document.querySelectorAll('.rating-filter-input').forEach(i => i.checked = false);

    FilterService.renderCategories();
    FilterService.applyFilters();
  },

  renderCategories: () => {
    const container = document.getElementById('category-filter-list');
    if (!container) return;

    const categories = window.ProductService ? window.ProductService.getCategories() : [];
    const allProducts = window.ProductService ? window.ProductService.getAll() : [];

    container.innerHTML = categories.map(cat => {
      const count = cat === 'All' 
        ? allProducts.length 
        : allProducts.filter(p => p.category.toLowerCase() === cat.toLowerCase()).length;

      const isActive = FilterService.state.category.toLowerCase() === cat.toLowerCase();

      return `
        <button type="button" class="category-filter-btn ${isActive ? 'active' : ''}" data-category="${cat}">
          <span>${cat}</span>
          <span class="cat-count">(${count})</span>
        </button>
      `;
    }).join('');

    container.querySelectorAll('.category-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        container.querySelectorAll('.category-filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        FilterService.state.category = btn.getAttribute('data-category');
        FilterService.state.currentPage = 1;
        FilterService.applyFilters();
      });
    });
  },

  applyFilters: () => {
    if (!window.ProductService) return;
    let products = window.ProductService.getAll();

    // 1. Category Filter
    if (FilterService.state.category && FilterService.state.category !== 'All') {
      products = products.filter(p => 
        p.category.toLowerCase() === FilterService.state.category.toLowerCase() ||
        p.categorySlug.toLowerCase() === FilterService.state.category.toLowerCase()
      );
    }

    // 2. Search Query Filter
    if (FilterService.state.searchQuery) {
      const q = FilterService.state.searchQuery;
      products = products.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }

    // 3. Price Filter
    products = products.filter(p => p.price <= FilterService.state.maxPrice);

    // 4. Rating Filter
    if (FilterService.state.minRating > 0) {
      products = products.filter(p => p.rating >= FilterService.state.minRating);
    }

    // 5. Sorting
    switch (FilterService.state.sortBy) {
      case 'price-low':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        products.sort((a, b) => b.rating - a.rating);
        break;
      case 'bestseller':
        products.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
        break;
      case 'newest':
        products.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default: // 'featured'
        products.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    FilterService.renderProductGrid(products);
    FilterService.renderActiveFilterPills();
  },

  renderProductGrid: (products) => {
    const grid = document.getElementById('shop-product-grid');
    const resultCount = document.getElementById('shop-result-count');
    const emptyState = document.getElementById('shop-empty-state');

    if (resultCount) {
      resultCount.textContent = `Showing ${products.length} luxury cosmetic creation${products.length === 1 ? '' : 's'}`;
    }

    if (!grid) return;

    if (products.length === 0) {
      grid.innerHTML = '';
      if (emptyState) emptyState.style.display = 'block';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';

    grid.innerHTML = products.map(product => FilterService.createProductCardHTML(product)).join('');

    // Re-sync wishlist heart buttons state
    if (window.WishlistService) {
      window.WishlistService.initHeartButtons();
    }
  },

  createProductCardHTML: (product) => {
    const isWishlisted = window.WishlistService ? window.WishlistService.isInWishlist(product.id) : false;
    const formattedPrice = window.ProductService.formatCurrency(product.price);
    const formattedOrig = window.ProductService.formatCurrency(product.originalPrice);

    const shadesPreview = product.shades ? product.shades.slice(0, 4).map(shade => `
      <span class="shade-dot" style="background-color: ${shade.hex};" title="${shade.name}"></span>
    `).join('') : '';

    return `
      <div class="product-card" data-id="${product.id}">
        <div class="product-card-badge-wrap">
          ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
          ${product.discount ? `<span class="product-discount-badge">${product.discount}</span>` : ''}
        </div>

        <button type="button" class="btn-wishlist-card ${isWishlisted ? 'active' : ''}" data-wishlist-id="${product.id}" aria-label="Add to wishlist" title="Save to Wishlist">
          <i class="${isWishlisted ? 'fas' : 'far'} fa-heart"></i>
        </button>

        <div class="product-card-media">
          <a href="product.html?id=${product.id}" class="product-img-link">
            <img src="${product.image}" alt="${product.name}" class="product-img-primary" loading="lazy" />
            ${product.gallery && product.gallery[1] ? `<img src="${product.gallery[1]}" alt="${product.name} back" class="product-img-hover" loading="lazy" />` : ''}
          </a>
          <div class="product-card-actions">
            <button type="button" class="btn-quick-view" onclick="FilterService.openQuickView('${product.id}')">
              <i class="far fa-eye"></i> Quick View
            </button>
            <button type="button" class="btn-card-add-cart" onclick="CartService.addToCart('${product.id}', 1)">
              <i class="fas fa-shopping-bag"></i> Add to Bag
            </button>
          </div>
        </div>

        <div class="product-card-content">
          <span class="product-card-category">${product.category}</span>
          <h3 class="product-card-title">
            <a href="product.html?id=${product.id}">${product.name}</a>
          </h3>

          <div class="product-card-rating">
            <div class="stars-gold">
              ${'★'.repeat(Math.floor(product.rating))}${product.rating % 1 !== 0 ? '½' : ''}
            </div>
            <span class="rating-number">${product.rating}</span>
            <span class="reviews-count">(${product.reviewsCount})</span>
          </div>

          ${shadesPreview ? `<div class="product-card-shades">${shadesPreview} <span class="shade-more-count">+${Math.max(0, product.shades.length - 4)} shades</span></div>` : ''}

          <div class="product-card-pricing">
            <span class="current-price">${formattedPrice}</span>
            <span class="original-price">${formattedOrig}</span>
          </div>
        </div>
      </div>
    `;
  },

  renderActiveFilterPills: () => {
    const container = document.getElementById('active-filters-container');
    if (!container) return;

    const pills = [];

    if (FilterService.state.category !== 'All') {
      pills.push(`
        <span class="filter-pill">
          Category: ${FilterService.state.category}
          <button type="button" onclick="FilterService.clearCategoryFilter()">&times;</button>
        </span>
      `);
    }

    if (FilterService.state.searchQuery) {
      pills.push(`
        <span class="filter-pill">
          Search: "${FilterService.state.searchQuery}"
          <button type="button" onclick="FilterService.clearSearchFilter()">&times;</button>
        </span>
      `);
    }

    if (FilterService.state.maxPrice < 7000) {
      pills.push(`
        <span class="filter-pill">
          Max: ${window.ProductService.formatCurrency(FilterService.state.maxPrice)}
          <button type="button" onclick="FilterService.clearPriceFilter()">&times;</button>
        </span>
      `);
    }

    if (FilterService.state.minRating > 0) {
      pills.push(`
        <span class="filter-pill">
          ${FilterService.state.minRating}★ & above
          <button type="button" onclick="FilterService.clearRatingFilter()">&times;</button>
        </span>
      `);
    }

    container.innerHTML = pills.join('');
  },

  clearCategoryFilter: () => {
    FilterService.state.category = 'All';
    FilterService.renderCategories();
    FilterService.applyFilters();
  },

  clearSearchFilter: () => {
    FilterService.state.searchQuery = '';
    const searchInput = document.getElementById('shop-search-input');
    if (searchInput) searchInput.value = '';
    FilterService.applyFilters();
  },

  clearPriceFilter: () => {
    FilterService.state.maxPrice = 7000;
    const priceRange = document.getElementById('price-range-slider');
    const priceDisplay = document.getElementById('price-range-value');
    if (priceRange) priceRange.value = 7000;
    if (priceDisplay) priceDisplay.textContent = window.ProductService.formatCurrency(7000);
    FilterService.applyFilters();
  },

  clearRatingFilter: () => {
    FilterService.state.minRating = 0;
    document.querySelectorAll('.rating-filter-input').forEach(i => i.checked = false);
    FilterService.applyFilters();
  },

  openQuickView: (productId) => {
    const product = window.ProductService.getById(productId);
    if (!product) return;

    const modal = document.getElementById('quick-view-modal');
    const modalBody = document.getElementById('quick-view-modal-body');
    if (!modal || !modalBody) return;

    modalBody.innerHTML = `
      <div class="quick-view-layout">
        <div class="quick-view-gallery">
          <div class="quick-view-main-img-wrap">
            <img id="qv-main-image" src="${product.image}" alt="${product.name}" />
          </div>
          <div class="quick-view-thumbs">
            ${product.gallery.map((imgUrl, idx) => `
              <button type="button" class="qv-thumb ${idx === 0 ? 'active' : ''}" onclick="document.getElementById('qv-main-image').src='${imgUrl}'; document.querySelectorAll('.qv-thumb').forEach(t=>t.classList.remove('active')); this.classList.add('active');">
                <img src="${imgUrl}" alt="thumb ${idx + 1}" />
              </button>
            `).join('')}
          </div>
        </div>

        <div class="quick-view-details">
          <span class="qv-category">${product.category}</span>
          <h2 class="qv-title">${product.name}</h2>
          
          <div class="qv-rating-wrap">
            <div class="stars-gold">${'★'.repeat(Math.floor(product.rating))}</div>
            <span>${product.rating} (${product.reviewsCount} verified reviews)</span>
          </div>

          <div class="qv-pricing">
            <span class="qv-price">${window.ProductService.formatCurrency(product.price)}</span>
            <span class="qv-orig">${window.ProductService.formatCurrency(product.originalPrice)}</span>
            <span class="qv-discount">${product.discount}</span>
          </div>

          <p class="qv-desc">${product.description}</p>

          ${product.shades ? `
            <div class="qv-shades-section">
              <label class="qv-label">Select Shade: <strong id="qv-selected-shade-name">${product.shades[0].name}</strong></label>
              <div class="qv-shades-list">
                ${product.shades.map((shade, i) => `
                  <button type="button" class="shade-pill-btn ${i === 0 ? 'active' : ''}" 
                    style="background-color: ${shade.hex};" 
                    title="${shade.name}"
                    onclick="document.querySelectorAll('.shade-pill-btn').forEach(s => s.classList.remove('active')); this.classList.add('active'); document.getElementById('qv-selected-shade-name').textContent = '${shade.name}';">
                  </button>
                `).join('')}
              </div>
            </div>
          ` : ''}

          <div class="qv-quantity-wrap">
            <label class="qv-label">Quantity</label>
            <div class="qty-stepper">
              <button type="button" onclick="const input = document.getElementById('qv-qty-input'); if(input.value > 1) input.value = parseInt(input.value) - 1;">-</button>
              <input type="number" id="qv-qty-input" value="1" min="1" max="10" readonly />
              <button type="button" onclick="const input = document.getElementById('qv-qty-input'); input.value = parseInt(input.value) + 1;">+</button>
            </div>
          </div>

          <div class="qv-actions-row">
            <button type="button" class="btn-luxury-primary" onclick="
              const qty = parseInt(document.getElementById('qv-qty-input').value, 10);
              const shade = document.getElementById('qv-selected-shade-name') ? document.getElementById('qv-selected-shade-name').textContent : null;
              CartService.addToCart('${product.id}', qty, shade);
              FilterService.closeQuickView();
            ">
              <i class="fas fa-shopping-bag"></i> Add to Bag
            </button>
            
            <a href="product.html?id=${product.id}" class="btn-luxury-secondary">
              View Full Details <i class="fas fa-arrow-right"></i>
            </a>
          </div>

          <div class="qv-features">
            <div class="qv-feat-item"><i class="fas fa-shield-alt"></i> 100% Authentic Luxury Guarantee</div>
            <div class="qv-feat-item"><i class="fas fa-shipping-fast"></i> Complimentary Dispatch over ₹1,999</div>
            <div class="qv-feat-item"><i class="fas fa-paw"></i> Cruelty-Free & Dermatologist Approved</div>
          </div>
        </div>
      </div>
    `;

    modal.classList.add('active');
    document.body.classList.add('modal-open');
  },

  closeQuickView: () => {
    const modal = document.getElementById('quick-view-modal');
    if (modal) {
      modal.classList.remove('active');
      document.body.classList.remove('modal-open');
    }
  }
};

// Auto initialize if on shop page
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('shop-product-grid')) {
    FilterService.init();
  }

  // Close modal when clicking outside or close button
  document.addEventListener('click', (e) => {
    if (e.target.matches('#quick-view-modal') || e.target.closest('.modal-close-btn')) {
      FilterService.closeQuickView();
    }
  });
});

if (typeof window !== 'undefined') {
  window.FilterService = FilterService;
}
