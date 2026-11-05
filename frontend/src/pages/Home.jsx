import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { ProductService } from '../data/products';
import { useToast } from '../context/ToastContext';

export const Home = ({ onQuickView }) => {
  const { showToast } = useToast();
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const bestsellers = ProductService.getBestSellers().slice(0, 4);
  const newArrivals = ProductService.getNewArrivals().slice(0, 4);

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      showToast('Welcome to Cherry Blossom VIP Club! Enjoy 15% off with code BLOSSOM20', 'success', 5000);
      setNewsletterEmail('');
    }
  };

  return (
    <main>
      {/* 1. Animated Luxury Hero Section */}
      <section className="hero-section silver-sparkle-container">
        <div className="hero-bg-overlay"></div>
        <div className="container">
          <div className="hero-grid">
            {/* Hero Text Content */}
            <div className="hero-content">
              <div className="hero-badge-wrap">
                <i className="fas fa-gem"></i>
                <span>Spring / Summer Haute Beauté Édition</span>
              </div>

              <h1 className="hero-title">
                Discover Your Beauty. <br />
                <span className="sparkle-text">Define Your Elegance.</span>
              </h1>

              <p className="hero-subtitle">
                Where beauty meets sophistication. Immerse yourself in the opulent touch of velvety burgundy pigments, micronized silver shimmer, and Japanese cherry blossom nectar.
              </p>

              <div className="hero-cta-group">
                <Link to="/shop" className="btn-luxury-silver shimmer-btn-effect">
                  <span>Shop The Collection</span>
                  <i className="fas fa-arrow-right"></i>
                </Link>
                <a
                  href="#featured-collection"
                  className="btn-luxury-secondary"
                  style={{ borderColor: 'rgba(255,255,255,0.7)', color: '#FFFFFF' }}
                >
                  Explore Bestsellers
                </a>
              </div>

              <div className="hero-metrics-row">
                <div className="metric-item">
                  <strong>100%</strong>
                  <span>Cruelty-Free</span>
                </div>
                <div className="metric-item">
                  <strong>24H</strong>
                  <span>Velvet Wear</span>
                </div>
                <div className="metric-item">
                  <strong>4.9 ★</strong>
                  <span>Global Acclaim</span>
                </div>
              </div>
            </div>

            {/* Hero Visual Frame */}
            <div className="hero-visual-frame">
              <div className="hero-image-wrapper">
                <img
                  src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=85"
                  alt="Cherry Blossom Haute Beauté Cosmetics"
                />
              </div>

              <div className="hero-floating-card">
                <div className="floating-card-icon">
                  <i className="fas fa-crown"></i>
                </div>
                <div className="floating-card-text">
                  <strong>Imperial Blossom Palette</strong>
                  <span>Award-winning 18-shade masterpiece</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Benefits Ribbon */}
      <section className="benefits-ribbon">
        <div className="container">
          <div className="benefits-grid">
            <div className="benefit-item">
              <div className="benefit-icon">
                <i className="fas fa-shipping-fast"></i>
              </div>
              <div className="benefit-text">
                <h4>Complimentary Shipping</h4>
                <p>On all domestic luxury orders above ₹1,999</p>
              </div>
            </div>

            <div className="benefit-item">
              <div className="benefit-icon">
                <i className="fas fa-heart"></i>
              </div>
              <div className="benefit-text">
                <h4>100% Cruelty-Free</h4>
                <p>Certified ethical, vegan-formulated botanicals</p>
              </div>
            </div>

            <div className="benefit-item">
              <div className="benefit-icon">
                <i className="fas fa-certificate"></i>
              </div>
              <div className="benefit-text">
                <h4>Artisanal Formulations</h4>
                <p>Dermatologist-approved French & Japanese lab craft</p>
              </div>
            </div>

            <div className="benefit-item">
              <div className="benefit-icon">
                <i className="fas fa-gem"></i>
              </div>
              <div className="benefit-text">
                <h4>VIP Diamond Privilege</h4>
                <p>Exclusive access to private releases & masterclasses</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Beauty Disciplines (Categories) */}
      <section className="categories-section">
        <div className="container">
          <div className="text-center">
            <span className="section-tagline">Signature Curations</span>
            <h2 className="section-heading-lg">Explore Beauty Disciplines</h2>
            <p className="section-description">
              From iconic burgundy velvets to weightless silk veil foundations, immerse your vanity in artisanal cosmetics engineered for enduring brilliance.
            </p>
          </div>

          <div className="categories-carousel">
            <Link to="/shop?category=Lipsticks" className="category-card">
              <div className="category-img-wrap">
                <img
                  src="https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=500&q=80"
                  alt="Lipsticks"
                  loading="lazy"
                />
              </div>
              <div className="category-info">
                <h3 className="category-title">Lipsticks</h3>
                <span className="category-link-arrow">
                  Discover <i className="fas fa-arrow-right"></i>
                </span>
              </div>
            </Link>

            <Link to="/shop?category=Foundations" className="category-card">
              <div className="category-img-wrap">
                <img
                  src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=500&q=80"
                  alt="Foundations"
                  loading="lazy"
                />
              </div>
              <div className="category-info">
                <h3 className="category-title">Foundations</h3>
                <span className="category-link-arrow">
                  Discover <i className="fas fa-arrow-right"></i>
                </span>
              </div>
            </Link>

            <Link to="/shop?category=Eyeshadow%20Palettes" className="category-card">
              <div className="category-img-wrap">
                <img
                  src="https://images.unsplash.com/photo-1583241800698-e8ab01c85b27?auto=format&fit=crop&w=500&q=80"
                  alt="Palettes"
                  loading="lazy"
                />
              </div>
              <div className="category-info">
                <h3 className="category-title">Palettes</h3>
                <span className="category-link-arrow">
                  Discover <i className="fas fa-arrow-right"></i>
                </span>
              </div>
            </Link>

            <Link to="/shop?category=Blushes" className="category-card">
              <div className="category-img-wrap">
                <img
                  src="https://images.unsplash.com/photo-1515688594390-b649af70d282?auto=format&fit=crop&w=500&q=80"
                  alt="Blushes"
                  loading="lazy"
                />
              </div>
              <div className="category-info">
                <h3 className="category-title">Blushes</h3>
                <span className="category-link-arrow">
                  Discover <i className="fas fa-arrow-right"></i>
                </span>
              </div>
            </Link>

            <Link to="/shop?category=Highlighters" className="category-card">
              <div className="category-img-wrap">
                <img
                  src="https://images.unsplash.com/photo-1503236823255-94609f598e71?auto=format&fit=crop&w=500&q=80"
                  alt="Highlighters"
                  loading="lazy"
                />
              </div>
              <div className="category-info">
                <h3 className="category-title">Highlighters</h3>
                <span className="category-link-arrow">
                  Discover <i className="fas fa-arrow-right"></i>
                </span>
              </div>
            </Link>

            <Link to="/shop?category=Makeup%20Brushes" className="category-card">
              <div className="category-img-wrap">
                <img
                  src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=500&q=80"
                  alt="Brushes"
                  loading="lazy"
                />
              </div>
              <div className="category-info">
                <h3 className="category-title">Artisan Brushes</h3>
                <span className="category-link-arrow">
                  Discover <i className="fas fa-arrow-right"></i>
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Best Sellers Section */}
      <section className="products-section" id="featured-collection">
        <div className="container">
          <div className="text-center">
            <span className="section-tagline">Loved Worldwide</span>
            <h2 className="section-heading-lg">Most Coveted Bestsellers</h2>
            <p className="section-description">
              Award-winning cosmetic icons embraced by international makeup artists and royal beauty aficionados alike.
            </p>
          </div>

          <div className="products-grid">
            {bestsellers.map((product) => (
              <ProductCard key={product.id} product={product} onQuickView={onQuickView} />
            ))}
          </div>

          <div className="text-center" style={{ marginTop: '50px' }}>
            <Link to="/shop?sort=bestseller" className="btn-luxury-primary shimmer-btn-effect">
              View All Bestsellers <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Editorial Split Offer Banner */}
      <section className="editorial-banner-section silver-sparkle-container">
        <div className="container">
          <div className="editorial-grid">
            <div className="editorial-visual">
              <img
                src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1000&q=80"
                alt="Imperial Rose Quartz Collection"
              />
            </div>
            <div className="editorial-content">
              <span className="promo-badge-tag">
                <i className="fas fa-sparkles"></i> Limited Atelier Release
              </span>
              <h2 className="editorial-title">The Imperial Sakura & Velvet Burgundy Suite</h2>
              <p className="editorial-desc">
                Inspired by the twilight blossoms of Kyoto and the grand ballrooms of Versailles. Each shade is enriched with genuine micronized silver crystals and organic cherry seed oil for a breathtaking finish that lasts from dusk till dawn.
              </p>
              <div className="promo-code-box">
                <span>Use Exclusive Code:</span>
                <strong>BLOSSOM20</strong>
                <span>for 20% Luxury Savings</span>
              </div>
              <div>
                <Link to="/shop" className="btn-luxury-silver shimmer-btn-effect">
                  Shop The Suite Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. New Haute Arrivals */}
      <section className="products-section" style={{ background: 'var(--bg-white)' }}>
        <div className="container">
          <div className="text-center">
            <span className="section-tagline">Fresh from the Atelier</span>
            <h2 className="section-heading-lg">New Haute Arrivals</h2>
            <p className="section-description">
              Introducing our latest breakthroughs in clean beauty, micro-pigment technology, and couture cosmetic artistry.
            </p>
          </div>

          <div className="products-grid">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} onQuickView={onQuickView} />
            ))}
          </div>
        </div>
      </section>

      {/* 7. Words of Pure Devotion (Testimonials) */}
      <section className="testimonials-section">
        <div className="container">
          <div className="text-center">
            <span className="section-tagline">Royal Acclaim</span>
            <h2 className="section-heading-lg">Words of Pure Devotion</h2>
            <p className="section-description">
              Discover why the most discerning women and celebrity makeup artists choose Cherry Blossom.
            </p>
          </div>

          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-quote-icon">“</div>
              <div className="testimonial-stars">★★★★★</div>
              <p className="testimonial-text">
                "The Velvet Rouge Satin Lipstick in Burgundy Velvet is sublime. The formulation glides like melted silk and leaves lips cushiony all night without dry patches. Truly red-carpet worthy."
              </p>
              <div className="testimonial-author">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                  alt="Evelyn Sinclair"
                  className="author-avatar"
                />
                <div className="author-info">
                  <h4>Lady Evelyn Sinclair</h4>
                  <span>Fashion Editor, Vogue Paris</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-quote-icon">“</div>
              <div className="testimonial-stars">★★★★★</div>
              <p className="testimonial-text">
                "The Luminous Silk Foundation creates a poreless, candlelit glow that photographs magnificently without flashback. It feels completely weightless like a second skin."
              </p>
              <div className="testimonial-author">
                <img
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80"
                  alt="Ananya Kapoor"
                  className="author-avatar"
                />
                <div className="author-info">
                  <h4>Ananya Kapoor</h4>
                  <span>Celebrity Makeup Artist, Mumbai</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-quote-icon">“</div>
              <div className="testimonial-stars">★★★★★</div>
              <p className="testimonial-text">
                "The Imperial 18-color palette is pure theatre. The silver chrome and buttery burgundy mattes have zero fallout. Cherry Blossom has raised the bar for international luxury makeup."
              </p>
              <div className="testimonial-author">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
                  alt="Julian Laurent"
                  className="author-avatar"
                />
                <div className="author-info">
                  <h4>Julian Laurent</h4>
                  <span>Creative Director, Studio Beauté</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Visual Community Gallery */}
      <section className="instagram-section">
        <div className="container text-center">
          <span className="section-tagline">#CherryBlossomBeauty</span>
          <h2 className="section-heading-lg">Follow Our Visual Ode to Beauty</h2>
          <p className="section-description">
            Tag your bespoke cosmetic creations with @CherryBlossomHaute for a chance to be featured on our global gallery.
          </p>

          <div className="instagram-gallery">
            <div className="insta-item">
              <img src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=400&q=80" alt="Cosmetic 1" loading="lazy" />
              <div className="insta-overlay"><i className="fab fa-instagram"></i></div>
            </div>
            <div className="insta-item">
              <img src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=400&q=80" alt="Cosmetic 2" loading="lazy" />
              <div className="insta-overlay"><i className="fab fa-instagram"></i></div>
            </div>
            <div className="insta-item">
              <img src="https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=400&q=80" alt="Cosmetic 3" loading="lazy" />
              <div className="insta-overlay"><i className="fab fa-instagram"></i></div>
            </div>
            <div className="insta-item">
              <img src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=400&q=80" alt="Cosmetic 4" loading="lazy" />
              <div className="insta-overlay"><i className="fab fa-instagram"></i></div>
            </div>
            <div className="insta-item">
              <img src="https://images.unsplash.com/photo-1503236823255-94609f598e71?auto=format&fit=crop&w=400&q=80" alt="Cosmetic 5" loading="lazy" />
              <div className="insta-overlay"><i className="fab fa-instagram"></i></div>
            </div>
            <div className="insta-item">
              <img src="https://images.unsplash.com/photo-1583241800698-e8ab01c85b27?auto=format&fit=crop&w=400&q=80" alt="Cosmetic 6" loading="lazy" />
              <div className="insta-overlay"><i className="fab fa-instagram"></i></div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. VIP Newsletter Capture */}
      <section className="newsletter-section silver-sparkle-container">
        <div className="container">
          <div className="newsletter-box">
            <i className="fas fa-envelope-open-text" style={{ fontSize: '2.2rem', color: 'var(--silver-bright)', marginBottom: '12px', display: 'inline-block' }}></i>
            <h2>Join The Cherry Blossom VIP Circle</h2>
            <p>
              Receive private invitations to confidential product unveilings, bespoke beauty consultations with master artists, and 15% off your maiden acquisition.
            </p>

            <form className="newsletter-form" onSubmit={handleNewsletter}>
              <input
                type="email"
                className="newsletter-input"
                placeholder="Enter your distinguished email address..."
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
              />
              <button type="submit" className="btn-newsletter-submit">Subscribe</button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

