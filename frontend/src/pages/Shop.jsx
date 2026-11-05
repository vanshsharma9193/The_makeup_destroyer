import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { ProductService } from '../data/products';
import { useWishlist } from '../context/WishlistContext';

export const Shop = ({ onQuickView }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { wishlist } = useWishlist();

  const [category, setCategory] = useState(searchParams.get('category') || 'All');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [maxPrice, setMaxPrice] = useState(7000);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'featured');
  const viewMode = searchParams.get('view');

  useEffect(() => {
    if (searchParams.get('category')) {
      setCategory(searchParams.get('category'));
    }
    if (searchParams.get('search')) {
      setSearchQuery(searchParams.get('search'));
    }
    if (searchParams.get('sort')) {
      setSortBy(searchParams.get('sort'));
    }
  }, [searchParams]);

  const categories = ProductService.getCategories();
  const allProducts = ProductService.getAll();

  const resetFilters = () => {
    setCategory('All');
    setSearchQuery('');
    setMaxPrice(7000);
    setMinRating(0);
    setSortBy('featured');
    setSearchParams({});
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    // Wishlist view mode
    if (viewMode === 'wishlist') {
      result = result.filter((p) => wishlist.includes(p.id));
    }

    // Category
    if (category !== 'All') {
      result = result.filter(
        (p) =>
          p.category.toLowerCase() === category.toLowerCase() ||
          p.categorySlug.toLowerCase() === category.toLowerCase()
      );
    }

    // Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // Price
    result = result.filter((p) => p.price <= maxPrice);

    // Rating
    if (minRating > 0) {
      result = result.filter((p) => p.rating >= minRating);
    }

    // Sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'bestseller':
        result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
        break;
      case 'newest':
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default: // featured
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    return result;
  }, [allProducts, category, searchQuery, maxPrice, minRating, sortBy, viewMode, wishlist]);

  return (
    <main>
      {/* Shop Hero Header */}
      <section className="shop-hero-header silver-sparkle-container">
        <div className="container">
          <div className="breadcrumbs">
            <Link to="/">Home</Link>
            <span>/</span>
            <span style={{ color: '#FFFFFF' }}>
              {viewMode === 'wishlist' ? 'Your Wishlist' : 'Shop The Collections'}
            </span>
          </div>
          <h1>{viewMode === 'wishlist' ? 'Your Saved Formulations' : 'Haute Beauté Catalog'}</h1>
          <p style={{ color: 'var(--soft-pink)', maxWidth: '620px', margin: '0 auto', fontSize: '1.05rem' }}>
            {viewMode === 'wishlist'
              ? 'Your private collection of desired cosmetics, velvet lipsticks, and radiant palettes.'
              : 'Explore our complete collection of handcrafted makeup, infused with Japanese cherry blossom nectar, botanical extracts, and opulent pigments.'}
          </p>
        </div>
      </section>

      {/* Main Container */}
      <div className="container">
        <div className="shop-container">
          {/* Sidebar */}
          <aside className="shop-sidebar">
            {/* Search */}
            <div className="sidebar-widget">
              <h4 className="sidebar-widget-title">Search Formulation</h4>
              <div className="search-input-wrap">
                <input
                  type="text"
                  placeholder="Search by name, shade..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <i className="fas fa-search"></i>
              </div>
            </div>

            {/* Categories */}
            <div className="sidebar-widget">
              <h4 className="sidebar-widget-title">Categories</h4>
              <div className="category-filter-list">
                {categories.map((cat) => {
                  const count =
                    cat === 'All'
                      ? allProducts.length
                      : allProducts.filter(
                          (p) => p.category.toLowerCase() === cat.toLowerCase()
                        ).length;
                  const isActive = category.toLowerCase() === cat.toLowerCase();

                  return (
                    <button
                      key={cat}
                      type="button"
                      className={`category-filter-btn ${isActive ? 'active' : ''}`}
                      onClick={() => setCategory(cat)}
                    >
                      <span>{cat}</span>
                      <span className="cat-count">({count})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Slider */}
            <div className="sidebar-widget">
              <h4 className="sidebar-widget-title">Price Range</h4>
              <div className="price-range-wrap">
                <input
                  type="range"
                  min="1000"
                  max="7000"
                  step="250"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(parseInt(e.target.value, 10))}
                />
                <div className="price-range-labels">
                  <span>₹1,000</span>
                  <span>{ProductService.formatCurrency(maxPrice)}</span>
                </div>
              </div>
            </div>

            {/* Rating Filter */}
            <div className="sidebar-widget">
              <h4 className="sidebar-widget-title">Customer Rating</h4>
              <div className="rating-filter-list">
                <label className="rating-filter-option">
                  <input
                    type="radio"
                    name="shop-rating"
                    checked={minRating === 4.9}
                    onChange={() => setMinRating(4.9)}
                  />
                  <span className="stars-gold">★★★★★</span>
                  <span>4.9 & Above</span>
                </label>
                <label className="rating-filter-option">
                  <input
                    type="radio"
                    name="shop-rating"
                    checked={minRating === 4.8}
                    onChange={() => setMinRating(4.8)}
                  />
                  <span className="stars-gold">★★★★½</span>
                  <span>4.8 & Above</span>
                </label>
                <label className="rating-filter-option">
                  <input
                    type="radio"
                    name="shop-rating"
                    checked={minRating === 4.5}
                    onChange={() => setMinRating(4.5)}
                  />
                  <span className="stars-gold">★★★★☆</span>
                  <span>4.5 & Above</span>
                </label>
              </div>
            </div>

            <button type="button" className="btn-reset-filters" onClick={resetFilters}>
              <i className="fas fa-redo"></i> Reset All Filters
            </button>
          </aside>

          {/* Main Content Area */}
          <div className="shop-main-content">
            {/* Toolbar */}
            <div className="shop-toolbar">
              <span className="shop-result-count">
                Showing {filteredProducts.length} luxury cosmetic creation
                {filteredProducts.length === 1 ? '' : 's'}
              </span>

              <div className="shop-sort-wrap">
                <label htmlFor="shop-sort">Sort By:</label>
                <select
                  id="shop-sort"
                  className="shop-sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="featured">Featured Curations</option>
                  <option value="bestseller">Best Selling</option>
                  <option value="newest">New Arrivals</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Active Filter Pills */}
            <div className="active-filters-container">
              {category !== 'All' && (
                <span className="filter-pill">
                  Category: {category}
                  <button type="button" onClick={() => setCategory('All')}>&times;</button>
                </span>
              )}
              {searchQuery && (
                <span className="filter-pill">
                  Search: "{searchQuery}"
                  <button type="button" onClick={() => setSearchQuery('')}>&times;</button>
                </span>
              )}
              {maxPrice < 7000 && (
                <span className="filter-pill">
                  Max: {ProductService.formatCurrency(maxPrice)}
                  <button type="button" onClick={() => setMaxPrice(7000)}>&times;</button>
                </span>
              )}
              {minRating > 0 && (
                <span className="filter-pill">
                  {minRating}★ & above
                  <button type="button" onClick={() => setMinRating(0)}>&times;</button>
                </span>
              )}
              {viewMode === 'wishlist' && (
                <span className="filter-pill" style={{ background: 'var(--cherry-red)', color: '#FFFFFF' }}>
                  Wishlist View
                  <Link to="/shop" style={{ color: '#FFFFFF', marginLeft: '6px' }}>&times;</Link>
                </span>
              )}
            </div>

            {/* Product Grid */}
            {filteredProducts.length === 0 ? (
              <div className="shop-empty-state" style={{ display: 'block' }}>
                <div className="empty-icon">
                  <i className="fas fa-feather-alt"></i>
                </div>
                <h3 style={{ fontSize: '1.6rem', color: 'var(--dark-burgundy)', marginBottom: '8px' }}>
                  No matching cosmetics found
                </h3>
                <p style={{ color: 'var(--text-muted)', maxWidth: '480px', margin: '0 auto 24px' }}>
                  We couldn't find any formulation matching your selected filters. Try broadening your criteria or reset filters.
                </p>
                <button type="button" className="btn-luxury-primary" onClick={resetFilters}>
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="products-grid">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} onQuickView={onQuickView} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

