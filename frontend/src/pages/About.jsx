import React from 'react';
import { Link } from 'react-router-dom';

export const About = () => {
  return (
    <main>
      {/* About Hero */}
      <section className="about-hero-section silver-sparkle-container">
        <div className="container">
          <div className="breadcrumbs">
            <Link to="/">Home</Link>
            <span>/</span>
            <span style={{ color: '#FFFFFF' }}>Our Atelier</span>
          </div>
          <span className="section-tagline" style={{ color: 'var(--silver-bright)' }}>
            The Maison Heritage
          </span>
          <h1>The Art of Elegance & Botanical Grace</h1>
          <p
            style={{
              color: 'var(--soft-pink)',
              maxWidth: '680px',
              margin: '0 auto',
              fontSize: '1.1rem',
              lineHeight: 1.7
            }}
          >
            Born at the crossroads of Parisian haute couture and ancient Japanese Sakura botanical science, Cherry Blossom was founded to transcend fleeting trends with eternal luxury.
          </p>
        </div>
      </section>

      {/* Brand Story Grid */}
      <section className="about-story-section">
        <div className="container">
          <div className="about-story-grid">
            <div className="about-story-images">
              <img
                src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80"
                alt="Cherry Blossom Creation Laboratory"
                className="story-img-main"
              />
              <div className="story-badge-floating">
                <strong>2014</strong>
                <span>Founded in Paris & Kyoto</span>
              </div>
            </div>

            <div className="about-story-text">
              <span className="section-tagline">Our Genesis</span>
              <h2 className="section-heading-lg">Where Passion Meets Cosmetic Alchemy</h2>
              <p
                style={{
                  color: 'var(--text-muted)',
                  fontSize: '1.05rem',
                  lineHeight: 1.8,
                  marginBottom: '20px'
                }}
              >
                Founded over a decade ago by visionary cosmetic chemists and Parisian fashion artisans, Cherry Blossom began with a singular reverence: the brief, transcendent beauty of cherry blossom petals blooming under moonlight.
              </p>
              <p
                style={{
                  color: 'var(--text-muted)',
                  fontSize: '1rem',
                  lineHeight: 1.8,
                  marginBottom: '28px'
                }}
              >
                We questioned why cosmetics had to compromise between opulent velvet pigments and clean, skin-nurturing ingredients. By harvesting cold-pressed Japanese Sakura seed nectar and fusing it with micronized silver mineral light-reflectors, we developed formulas that act as living skincare while delivering red-carpet intensity.
              </p>

              <div
                style={{
                  borderLeft: '3px solid var(--primary-burgundy)',
                  paddingLeft: '20px',
                  marginBottom: '30px'
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.25rem',
                    fontStyle: 'italic',
                    color: 'var(--dark-burgundy)',
                    lineHeight: 1.6
                  }}
                >
                  "True elegance does not demand attention; it commands presence through whisper-light perfection."
                </p>
                <span
                  style={{
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    color: 'var(--cherry-red)',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    display: 'block',
                    marginTop: '8px'
                  }}
                >
                  — Hélène Moreau & Kenji Takahashi, Founders
                </span>
              </div>

              <Link to="/shop" className="btn-luxury-primary shimmer-btn-effect">
                Explore The Formulations
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars of Devotion */}
      <section style={{ padding: '90px 0', background: 'var(--soft-pink-light)' }}>
        <div className="container">
          <div className="text-center">
            <span className="section-tagline">Our Pillars of Devotion</span>
            <h2 className="section-heading-lg">Uncompromising Standards of Excellence</h2>
            <p className="section-description">
              Every bottle, compact, and lipstick bullet carrying the Cherry Blossom crest adheres to our uncompromising charter of ethical luxury.
            </p>
          </div>

          <div className="pillars-grid">
            <div className="pillar-card">
              <div className="pillar-icon">
                <i className="fas fa-paw"></i>
              </div>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--dark-burgundy)', marginBottom: '12px' }}>
                100% Cruelty-Free & Ethical
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.7 }}>
                We never test on animals, nor do we collaborate with suppliers who do. Certified by international cruelty-free standards and formulated with vegan botanical proteins.
              </p>
            </div>

            <div className="pillar-card">
              <div className="pillar-icon">
                <i className="fas fa-flask"></i>
              </div>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--dark-burgundy)', marginBottom: '12px' }}>
                Clean Botanical Chemistry
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.7 }}>
                Formulated without parabens, phthalates, synthetic sulfates, or harsh talcs. Dermatologist tested and hypoallergenic even for sensitive, delicate complexions.
              </p>
            </div>

            <div className="pillar-card">
              <div className="pillar-icon">
                <i className="fas fa-gem"></i>
              </div>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--dark-burgundy)', marginBottom: '12px' }}>
                Sustainable Royal Packaging
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.7 }}>
                Our heavy-gauge burgundy and silver compacts are crafted from infinitely recyclable aluminum and refillable casings, minimizing waste while honoring vanity aesthetics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Craftsmanship */}
      <section className="editorial-banner-section silver-sparkle-container">
        <div className="container">
          <div className="editorial-grid">
            <div className="editorial-visual">
              <img
                src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1000&q=80"
                alt="Handcrafted artisan cosmetic testing"
              />
            </div>
            <div className="editorial-content">
              <span className="promo-badge-tag">
                <i className="fas fa-feather-alt"></i> The Artisanal Touch
              </span>
              <h2 className="editorial-title">Triple-Milled Pigments & 24K Micro-Crystals</h2>
              <p className="editorial-desc">
                Every powder shadow, blush, and highlighter is milled three times in micro-jet chambers until it reaches the consistency of morning mist. The result is zero chalkiness, effortless blendability, and a celestial finish that flatters every skin tone under candlelight or flash photography.
              </p>
              <div>
                <Link to="/shop" className="btn-luxury-silver shimmer-btn-effect">
                  Experience The Textures
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

