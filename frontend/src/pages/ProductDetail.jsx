import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ProductService } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';

export const ProductDetail = ({ onQuickView }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();

  const product = ProductService.getById(id || 'cb-lip-01');

  const [activeImg, setActiveImg] = useState('');
  const [activeShade, setActiveShade] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState(0); // 0: Benefits, 1: Ingredients, 2: Ritual

  // Review Form state
  const [reviewerName, setReviewerName] = useState('');
  const [reviewerRating, setReviewerRating] = useState('5');
  const [reviewerComment, setReviewerComment] = useState('');

  useEffect(() => {
    if (product) {
      setActiveImg(product.image);
      setActiveShade(product.shades && product.shades.length > 0 ? product.shades[0].name : '');
      setQuantity(1);
      window.scrollTo(0, 0);
    }
  }, [id, product]);

  if (!product) {
    return (
      <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
        <h2>Cosmetic Not Found</h2>
        <Link to="/shop" className="btn-luxury-primary" style={{ marginTop: '20px' }}>
          Return to Catalog
        </Link>
      </div>
    );
  }

  const isFavorited = isInWishlist(product.id);
  const relatedProducts = ProductService.getRelated(product.id, product.category, 4);

  const handleAddToCart = () => {
    addToCart(product.id, quantity, activeShade);
  };

  const handleBuyNow = () => {
    addToCart(product.id, quantity, activeShade);
    navigate('/checkout');
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    showToast('Your exquisite review has been submitted for VIP verification. Thank you!', 'success');
    setReviewerName('');
    setReviewerComment('');
  };

  return (
    <main>
      {/* Breadcrumb Bar */}
      <div className="container" style={{ paddingTop: '24px' }}>
        <div className="breadcrumbs" style={{ justifyContent: 'flex-start' }}>
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/shop">Shop</Link>
          <span>/</span>
          <Link to={`/shop?category=${encodeURIComponent(product.category)}`}>
            {product.category}
          </Link>
          <span>/</span>
          <span style={{ color: 'var(--dark-burgundy)', fontWeight: '600' }}>{product.name}</span>
        </div>
      </div>

      {/* Main Details Section */}
      <section className="product-detail-section">
        <div className="container">
          <div className="product-detail-grid">
            {/* Left: Gallery */}
            <div className="product-gallery-sticky">
              <div className="product-main-view">
                <img src={activeImg || product.image} alt={product.name} />
              </div>
              {product.gallery && product.gallery.length > 0 && (
                <div className="gallery-thumbs-row">
                  {product.gallery.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={`gallery-thumb-btn ${activeImg === img ? 'active' : ''}`}
                      onClick={() => setActiveImg(img)}
                    >
                      <img src={img} alt={`${product.name} thumbnail ${idx + 1}`} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Info & Purchase */}
            <div className="product-info-column">
              <div className="detail-badge-row">
                <span className="detail-category">{product.category}</span>
                {product.badge && <span className="product-badge">{product.badge}</span>}
              </div>

              <h1 className="detail-title">{product.name}</h1>

              <div className="detail-rating-row">
                <div className="stars-gold">
                  {'★'.repeat(Math.floor(product.rating))}
                  {product.rating % 1 !== 0 ? '½' : ''}
                </div>
                <span style={{ fontWeight: 700, color: 'var(--dark-burgundy)' }}>
                  {product.rating}
                </span>
                <span style={{ color: 'var(--text-muted)' }}>
                  ({product.reviewsCount} verified reviews)
                </span>
              </div>

              <div className="detail-pricing-box">
                <span className="detail-price">
                  {ProductService.formatCurrency(product.price)}
                </span>
                <span className="detail-orig-price">
                  {ProductService.formatCurrency(product.originalPrice)}
                </span>
                <span className="detail-discount-tag">{product.discount}</span>
              </div>

              <p className="detail-description">{product.description}</p>

              {/* Shades Selector */}
              {product.shades && product.shades.length > 0 && (
                <div className="shades-picker-group">
                  <div className="shades-header">
                    <label>Selected Shade:</label>
                    <span>{activeShade}</span>
                  </div>
                  <div className="shades-list-chips">
                    {product.shades.map((shade, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className={`shade-option ${activeShade === shade.name ? 'active' : ''}`}
                        style={{ backgroundColor: shade.hex }}
                        title={shade.name}
                        onClick={() => setActiveShade(shade.name)}
                      ></button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Stepper & Actions */}
              <div className="purchase-actions-row">
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

                <button
                  type="button"
                  className="btn-luxury-primary btn-detail-add-bag shimmer-btn-effect"
                  onClick={handleAddToCart}
                >
                  <i className="fas fa-shopping-bag"></i> Add to Bag
                </button>

                <button
                  type="button"
                  className={`btn-detail-wishlist ${isFavorited ? 'active' : ''}`}
                  onClick={() => toggleWishlist(product.id)}
                  title={isFavorited ? 'Remove from Wishlist' : 'Save to Wishlist'}
                >
                  <i className={`${isFavorited ? 'fas' : 'far'} fa-heart`}></i>
                </button>
              </div>

              {/* Instant Buy Now */}
              <button
                type="button"
                className="btn-luxury-secondary"
                style={{ width: '100%', marginBottom: '30px' }}
                onClick={handleBuyNow}
              >
                <i className="fas fa-bolt"></i> Instant VIP Checkout
              </button>

              {/* Accordions */}
              <div className="product-accordion">
                {/* Accordion 1: Benefits */}
                <div className={`accordion-item ${openAccordion === 0 ? 'active' : ''}`}>
                  <button
                    type="button"
                    className="accordion-header"
                    onClick={() => setOpenAccordion(openAccordion === 0 ? -1 : 0)}
                  >
                    <span>Haute Benefits & Science</span>
                    <i className="fas fa-chevron-down"></i>
                  </button>
                  <div className="accordion-body">
                    <div className="accordion-content-inner">
                      {product.benefits && (
                        <ul>
                          {product.benefits.map((b, i) => (
                            <li key={i}>{b}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>

                {/* Accordion 2: Ingredients */}
                <div className={`accordion-item ${openAccordion === 1 ? 'active' : ''}`}>
                  <button
                    type="button"
                    className="accordion-header"
                    onClick={() => setOpenAccordion(openAccordion === 1 ? -1 : 1)}
                  >
                    <span>Full Botanical Ingredients</span>
                    <i className="fas fa-chevron-down"></i>
                  </button>
                  <div className="accordion-body">
                    <div className="accordion-content-inner">{product.ingredients}</div>
                  </div>
                </div>

                {/* Accordion 3: Ritual */}
                <div className={`accordion-item ${openAccordion === 2 ? 'active' : ''}`}>
                  <button
                    type="button"
                    className="accordion-header"
                    onClick={() => setOpenAccordion(openAccordion === 2 ? -1 : 2)}
                  >
                    <span>Atelier Application Ritual</span>
                    <i className="fas fa-chevron-down"></i>
                  </button>
                  <div className="accordion-body">
                    <div className="accordion-content-inner">{product.howToUse}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Verified Reviews Section & Review Form */}
      <section className="testimonials-section" style={{ background: 'var(--soft-pink-light)', padding: '70px 0' }}>
        <div className="container">
          <div className="text-center">
            <span className="section-tagline">Client Experience</span>
            <h2 className="section-heading-lg">Verified Customer Reflections</h2>
          </div>

          <div className="testimonials-grid" style={{ marginTop: '36px' }}>
            <div className="testimonial-card">
              <div className="testimonial-stars">★★★★★</div>
              <p className="testimonial-text">
                "The texture of {product.name} is unlike anything I have encountered. Effortless elegance, rich pigment, and supreme comfort."
              </p>
              <div className="testimonial-author">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80"
                  alt="Isabella"
                  className="author-avatar"
                />
                <div className="author-info">
                  <h4>Isabella Montgomery</h4>
                  <span>Verified VIP Buyer • London</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-stars">★★★★★</div>
              <p className="testimonial-text">
                "I wore this for an 8-hour evening gala in New Delhi. No creasing, no fading, and so many compliments. Cherry Blossom is pure mastery."
              </p>
              <div className="testimonial-author">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                  alt="Meera"
                  className="author-avatar"
                />
                <div className="author-info">
                  <h4>Meera Singhania</h4>
                  <span>Verified VIP Buyer • Mumbai</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-stars">★★★★★</div>
              <p className="testimonial-text">
                "Luxurious packaging, exquisite formula, and gentle on sensitive skin. A permanent staple in my beauty routine."
              </p>
              <div className="testimonial-author">
                <img
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80"
                  alt="Camille"
                  className="author-avatar"
                />
                <div className="author-info">
                  <h4>Camille Dubois</h4>
                  <span>Verified VIP Buyer • Paris</span>
                </div>
              </div>
            </div>
          </div>

          {/* Leave a review form */}
          <div
            style={{
              maxWidth: '680px',
              margin: '50px auto 0',
              background: '#FFFFFF',
              borderRadius: '20px',
              padding: '36px',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <h3 style={{ fontSize: '1.5rem', color: 'var(--dark-burgundy)', marginBottom: '8px' }}>
              Leave a Bespoke Review
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
              Share your experience with other beauty connoisseurs.
            </p>
            <form onSubmit={handleReviewSubmit}>
              <div className="form-grid-2">
                <div className="form-group">
                  <label>Your Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Charlotte L."
                    value={reviewerName}
                    onChange={(e) => setReviewerName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Your Rating *</label>
                  <select
                    className="form-control"
                    value={reviewerRating}
                    onChange={(e) => setReviewerRating(e.target.value)}
                  >
                    <option value="5">★★★★★ (5/5 Exceptional)</option>
                    <option value="4">★★★★☆ (4/5 Very Good)</option>
                    <option value="3">★★★☆☆ (3/5 Average)</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Review Commentary *</label>
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder="Describe texture, longevity, shade payoff..."
                  value={reviewerComment}
                  onChange={(e) => setReviewerComment(e.target.value)}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn-luxury-primary shimmer-btn-effect">
                Publish Review
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="products-section">
          <div className="container">
            <div className="text-center">
              <span className="section-tagline">Harmonious Pairings</span>
              <h2 className="section-heading-lg">You May Also Covet</h2>
            </div>
            <div className="products-grid">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} onQuickView={onQuickView} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

