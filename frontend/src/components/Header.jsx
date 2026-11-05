import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';

export const Header = ({ onOpenSearch }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const { cartCount, openMiniCart } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* 1. Announcement Bar */}
      <aside className="announcement-bar">
        <div className="container">
          <i className="fas fa-sparkles"></i>
          <span>
            Complimentary Haute Couture Sample on orders over ₹2,999 | Code: <strong>BLOSSOM20</strong> for 20% off
          </span>
          <Link to="/shop" style={{ marginLeft: '10px' }}>Shop Now &rarr;</Link>
        </div>
      </aside>

      {/* 2. Main Navigation Header */}
      <header className={`luxury-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="header-inner">
            {/* Mobile Menu Trigger */}
            <button
              type="button"
              className="mobile-menu-trigger"
              onClick={() => setIsMobileNavOpen(true)}
              aria-label="Open Mobile Menu"
            >
              <i className="fas fa-bars"></i>
            </button>

            {/* Brand Logo */}
            <Link to="/" className="brand-logo-wrap">
              <div className="brand-logo-icon">
                <i className="fas fa-spa"></i>
              </div>
              <div className="brand-logo-text">
                <span className="brand-logo-title">CHERRY BLOSSOM</span>
                <span className="brand-logo-subtitle">Haute Beauté • Paris</span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="main-nav" aria-label="Main Navigation">
              <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} end>
                Home
              </NavLink>
              <NavLink to="/shop" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Shop Collection
              </NavLink>
              <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Our Atelier
              </NavLink>
              <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Concierge
              </NavLink>
            </nav>

            {/* Header Action Icons */}
            <div className="header-actions">
              <button
                type="button"
                className="nav-icon-btn btn-open-search"
                onClick={onOpenSearch}
                aria-label="Search Catalog"
                title="Search Collections"
              >
                <i className="fas fa-search"></i>
              </button>

              <Link to="/shop?view=wishlist" className="nav-icon-link" aria-label="Wishlist" title="Your Wishlist">
                <i className="far fa-heart"></i>
                {wishlistCount > 0 && <span className="badge-counter">{wishlistCount}</span>}
              </Link>

              <button
                type="button"
                className="nav-icon-btn btn-open-mini-cart"
                onClick={openMiniCart}
                aria-label="Shopping Bag"
                title="View Bag"
              >
                <i className="fas fa-shopping-bag"></i>
                {cartCount > 0 && <span className="badge-counter">{cartCount}</span>}
              </button>

              {/* VIP Auth Indicator */}
              <div className="user-auth-indicator">
                {isAuthenticated ? (
                  <div className="auth-logged-in-dropdown">
                    <button type="button" className="btn-auth-user">
                      <i className="far fa-user-circle"></i> <span>{user.name.split(' ')[0]}</span>
                    </button>
                    <div className="user-dropdown-menu">
                      <div className="dropdown-header">
                        <strong>{user.name}</strong>
                        <small>{user.email}</small>
                        <span className="vip-tier-badge">
                          <i className="fas fa-gem"></i> VIP Diamond Tier
                        </span>
                      </div>
                      <Link to="/shop"><i className="fas fa-shopping-bag"></i> Shop New In</Link>
                      <Link to="/cart"><i className="fas fa-shopping-cart"></i> My Bag</Link>
                      <button
                        type="button"
                        onClick={() => {
                          logout();
                          navigate('/');
                        }}
                        className="dropdown-logout-btn"
                      >
                        <i className="fas fa-sign-out-alt"></i> Sign Out
                      </button>
                    </div>
                  </div>
                ) : (
                  <Link to="/login" className="nav-icon-link" title="VIP Sign In">
                    <i className="far fa-user"></i>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div
        className={`drawer-backdrop ${isMobileNavOpen ? 'active' : ''}`}
        onClick={() => setIsMobileNavOpen(false)}
      ></div>
      <div className={`mobile-nav-drawer ${isMobileNavOpen ? 'active' : ''}`}>
        <div className="mobile-nav-header">
          <div className="brand-logo-wrap">
            <i className="fas fa-spa" style={{ color: 'var(--primary-burgundy)', fontSize: '1.4rem' }}></i>
            <span className="brand-logo-title" style={{ fontSize: '1.3rem' }}>CHERRY BLOSSOM</span>
          </div>
          <button type="button" className="btn-close-drawer" onClick={() => setIsMobileNavOpen(false)}>
            &times;
          </button>
        </div>
        <div className="mobile-nav-links">
          <Link to="/" className="mobile-nav-link" onClick={() => setIsMobileNavOpen(false)}>
            Home <i className="fas fa-chevron-right"></i>
          </Link>
          <Link to="/shop" className="mobile-nav-link" onClick={() => setIsMobileNavOpen(false)}>
            Shop All Cosmetics <i className="fas fa-chevron-right"></i>
          </Link>
          <Link to="/shop?category=Lipsticks" className="mobile-nav-link" onClick={() => setIsMobileNavOpen(false)}>
            Velvet Lipsticks <i className="fas fa-chevron-right"></i>
          </Link>
          <Link to="/shop?category=Foundations" className="mobile-nav-link" onClick={() => setIsMobileNavOpen(false)}>
            Silk Foundations <i className="fas fa-chevron-right"></i>
          </Link>
          <Link to="/shop?category=Eyeshadow%20Palettes" className="mobile-nav-link" onClick={() => setIsMobileNavOpen(false)}>
            Eyeshadow Palettes <i className="fas fa-chevron-right"></i>
          </Link>
          <Link to="/about" className="mobile-nav-link" onClick={() => setIsMobileNavOpen(false)}>
            Our Atelier & Heritage <i className="fas fa-chevron-right"></i>
          </Link>
          <Link to="/contact" className="mobile-nav-link" onClick={() => setIsMobileNavOpen(false)}>
            Client Concierge <i className="fas fa-chevron-right"></i>
          </Link>
          {isAuthenticated ? (
            <button
              type="button"
              className="mobile-nav-link"
              style={{ textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', width: '100%' }}
              onClick={() => {
                logout();
                setIsMobileNavOpen(false);
              }}
            >
              Sign Out ({user.name.split(' ')[0]}) <i className="fas fa-sign-out-alt"></i>
            </button>
          ) : (
            <Link to="/login" className="mobile-nav-link" onClick={() => setIsMobileNavOpen(false)}>
              VIP Sign In <i className="fas fa-chevron-right"></i>
            </Link>
          )}
        </div>
        <div className="mobile-nav-footer">
          <Link to="/shop" className="btn-luxury-primary shimmer-btn-effect" onClick={() => setIsMobileNavOpen(false)}>
            Explore All Collections
          </Link>
        </div>
      </div>
    </>
  );
};

