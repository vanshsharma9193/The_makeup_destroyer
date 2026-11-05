import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { ProductService } from '../data/products';

export const ProductCard = ({ product, onQuickView }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const isFavorited = isInWishlist(product.id);
  const formattedPrice = ProductService.formatCurrency(product.price);
  const formattedOrig = ProductService.formatCurrency(product.originalPrice);

  const shadesPreview = product.shades
    ? product.shades.slice(0, 4).map((shade, idx) => (
        <span
          key={idx}
          className="shade-dot"
          style={{ backgroundColor: shade.hex }}
          title={shade.name}
        ></span>
      ))
    : null;

  return (
    <div className="product-card" data-id={product.id}>
      <div className="product-card-badge-wrap">
        {product.badge && <span className="product-badge">{product.badge}</span>}
        {product.discount && <span className="product-discount-badge">{product.discount}</span>}
      </div>

      <button
        type="button"
        className={`btn-wishlist-card ${isFavorited ? 'active' : ''}`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleWishlist(product.id);
        }}
        aria-label="Wishlist"
        title={isFavorited ? 'Remove from Wishlist' : 'Add to Wishlist'}
      >
        <i className={`${isFavorited ? 'fas' : 'far'} fa-heart`}></i>
      </button>

      <div className="product-card-media">
        <Link to={`/product/${product.id}`} className="product-img-link">
          <img
            src={product.image}
            alt={product.name}
            className="product-img-primary"
            loading="lazy"
          />
          {product.gallery && product.gallery[1] && (
            <img
              src={product.gallery[1]}
              alt={`${product.name} alternate view`}
              className="product-img-hover"
              loading="lazy"
            />
          )}
        </Link>
        <div className="product-card-actions">
          <button
            type="button"
            className="btn-quick-view"
            onClick={() => onQuickView && onQuickView(product)}
          >
            <i className="far fa-eye"></i> Quick View
          </button>
          <button
            type="button"
            className="btn-card-add-cart"
            onClick={() => addToCart(product.id, 1)}
          >
            <i className="fas fa-shopping-bag"></i> Add to Bag
          </button>
        </div>
      </div>

      <div className="product-card-content">
        <span className="product-card-category">{product.category}</span>
        <h3 className="product-card-title">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>

        <div className="product-card-rating">
          <div className="stars-gold">
            {'★'.repeat(Math.floor(product.rating))}
            {product.rating % 1 !== 0 ? '½' : ''}
          </div>
          <span className="rating-number">{product.rating}</span>
          <span className="reviews-count">({product.reviewsCount})</span>
        </div>

        {shadesPreview && (
          <div className="product-card-shades">
            {shadesPreview}
            {product.shades.length > 4 && (
              <span className="shade-more-count">+{product.shades.length - 4} shades</span>
            )}
          </div>
        )}

        <div className="product-card-pricing">
          <span className="current-price">{formattedPrice}</span>
          <span className="original-price">{formattedOrig}</span>
        </div>
      </div>
    </div>
  );
};

