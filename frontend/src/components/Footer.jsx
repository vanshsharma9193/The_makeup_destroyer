import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="luxury-footer">
      <div className="container">
        <div className="footer-top-grid">
          {/* Col 1: Brand Info */}
          <div className="footer-brand-col">
            <Link to="/" className="brand-logo-wrap">
              <div className="brand-logo-icon">
                <i className="fas fa-spa"></i>
              </div>
              <div className="brand-logo-text">
                <span className="brand-logo-title">CHERRY BLOSSOM</span>
                <span className="brand-logo-subtitle">Haute Beauté • Paris</span>
              </div>
            </Link>
            <p className="footer-brand-text">
              Crafting the world's most luxurious cosmetic creations since 2014. Where Japanese Sakura botanical grace unites with French high fashion refinement.
            </p>
            <div className="footer-social-links">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Pinterest">
                <i className="fab fa-pinterest-p"></i>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="YouTube">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>

          {/* Col 2: The Collections */}
          <div>
            <h4 className="footer-title">The Collections</h4>
            <ul className="footer-links-list">
              <li><Link to="/shop?category=Lipsticks">Velvet Lipsticks</Link></li>
              <li><Link to="/shop?category=Foundations">Luminous Foundations</Link></li>
              <li><Link to="/shop?category=Eyeshadow%20Palettes">Eyeshadow Palettes</Link></li>
              <li><Link to="/shop?category=Highlighters">Diamond Highlighters</Link></li>
              <li><Link to="/shop?category=Blushes">Cherry Petal Blushes</Link></li>
              <li><Link to="/shop?category=Makeup%20Brushes">Artisan Vegan Brushes</Link></li>
            </ul>
          </div>

          {/* Col 3: Client Concierge */}
          <div>
            <h4 className="footer-title">Client Concierge</h4>
            <ul className="footer-links-list">
              <li><Link to="/about">The Maison Atelier</Link></li>
              <li><Link to="/contact">Boutique Appointments</Link></li>
              <li><Link to="/contact#faq">Shipping & Deliveries</Link></li>
              <li><Link to="/cart">View Shopping Bag</Link></li>
              <li><Link to="/login">VIP Member Account</Link></li>
              <li><Link to="/contact#faq">Shade Finding Service</Link></li>
            </ul>
          </div>

          {/* Col 4: Flagship Salons */}
          <div>
            <h4 className="footer-title">Flagship Salons</h4>
            <div className="footer-contact-info">
              <p>
                <i className="fas fa-map-marker-alt"></i>
                <span>74 Palais Royal, Bandra West, Mumbai 400050, India</span>
              </p>
              <p>
                <i className="fas fa-phone-alt"></i>
                <span>VIP Concierge: +91 22 8900 2400</span>
              </p>
              <p>
                <i className="fas fa-envelope"></i>
                <span>concierge@cherryblossombeaute.com</span>
              </p>
              <p>
                <i className="fas fa-clock"></i>
                <span>Mon – Sun: 10:00 AM – 8:30 PM IST</span>
              </p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            &copy; {new Date().getFullYear()} CHERRY BLOSSOM HAUTE BEAUTÉ. All Rights Reserved. Luxury React Full-Stack Ready.
          </p>
          <div className="footer-payment-icons">
            <i className="fab fa-cc-visa" title="Visa"></i>
            <i className="fab fa-cc-mastercard" title="Mastercard"></i>
            <i className="fab fa-cc-amex" title="American Express"></i>
            <i className="fab fa-google-pay" title="Google Pay"></i>
            <i className="fas fa-shield-alt" title="100% Secure 256-Bit SSL"></i>
          </div>
        </div>
      </div>
    </footer>
  );
};

