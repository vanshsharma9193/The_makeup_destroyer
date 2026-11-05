import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ProductService } from '../data/products';

export const QuickViewModal = ({ product, isOpen, onClose }) => {
  const { addToCart } = useCart();
  const [selectedImg, setSelectedImg] = useState('');
  const [selectedShade, setSelectedShade] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product) {
      setSelectedImg(product.image);
      setSelectedShade(product.shades && product.shades.length > 0 ? product.shades[0].name : '');
      setQuantity(1);
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const handleAdd = () => {
    addToCart(product.id, quantity, selectedShade);
    onClose();
  };

  return (
    <div className={`modal-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}>
      <div className="modal-content-card" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal-close-btn" onClick={onClose}>
          &times;
        </button>

        <div className="quick-view-layout">
          {/* Gallery */}
          <div className="quick-view-gallery">
            <div className="quick-view-main-img-wrap">
              <img src={selectedImg || product.image} alt={product.name} />
            </div>
            {product.gallery && product.gallery.length > 0 && (
              <div className="quick-view-thumbs">
                {product.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`qv-thumb ${selectedImg === img ? 'active' : ''}`}
                    onClick={() => setSelectedImg(img)}
                  >
                    <img src={img} alt={`Angle ${idx + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="quick-view-details">
            <span className="qv-category">{product.category}</span>
            <h2 className="qv-title">{product.name}</h2>

            <div className="qv-rating-wrap">
              <div className="stars-gold">
                {'★'.repeat(Math.floor(product.rating))}
                {product.rating % 1 !== 0 ? '½' : ''}
              </div>
              <span>
                {product.rating} ({product.reviewsCount} verified reviews)
              </span>
            </div>

            <div className="qv-pricing">
              <span className="qv-price">{ProductService.formatCurrency(product.price)}</span>
              <span className="qv-orig">{ProductService.formatCurrency(product.originalPrice)}</span>
              <span className="qv-discount">{product.discount}</span>
            </div>

            <p className="qv-desc">{product.description}</p>

            {/* Shades */}
            {product.shades && product.shades.length > 0 && (
              <div className="qv-shades-section">
                <label className="qv-label">
                  Select Shade: <strong>{selectedShade}</strong>
                </label>
                <div className="qv-shades-list">
                  {product.shades.map((shade, i) => (
                    <button
                      key={i}
                      type="button"
                      className={`shade-pill-btn ${selectedShade === shade.name ? 'active' : ''}`}
                      style={{ backgroundColor: shade.hex }}
                      title={shade.name}
                      onClick={() => setSelectedShade(shade.name)}
                    ></button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="qv-quantity-wrap">
              <label className="qv-label">Quantity</label>
              <div className="qty-stepper">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}
                >
                  -
                </button>
                <input type="number" value={quantity} readOnly />
                <button
                  type="button"
                  onClick={() => setQuantity((q) => (q < 10 ? q + 1 : 10))}
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="qv-actions-row">
              <button
                type="button"
                className="btn-luxury-primary shimmer-btn-effect"
                onClick={handleAdd}
              >
                <i className="fas fa-shopping-bag"></i> Add to Bag
              </button>
              <Link
                to={`/product/${product.id}`}
                className="btn-luxury-secondary"
                onClick={onClose}
              >
                View Full Details <i className="fas fa-arrow-right"></i>
              </Link>
            </div>

            {/* Reassurance */}
            <div className="qv-features">
              <div className="qv-feat-item">
                <i className="fas fa-shield-alt"></i> 100% Authentic Luxury Guarantee
              </div>
              <div className="qv-feat-item">
                <i className="fas fa-shipping-fast"></i> Complimentary Dispatch over ₹1,999
              </div>
              <div className="qv-feat-item">
                <i className="fas fa-paw"></i> Cruelty-Free & Dermatologist Approved
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

