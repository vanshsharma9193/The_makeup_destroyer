import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ProductService } from '../data/products';

export const Cart = () => {
  const { cart, updateQuantity, removeFromCart, clearCart, applyCoupon, removeCoupon, getTotals } = useCart();
  const [couponCode, setCouponCode] = useState('');

  const totals = getTotals();

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.trim()) {
      applyCoupon(couponCode);
      setCouponCode('');
    }
  };

  return (
    <main>
      {/* Cart Page Hero Header */}
      <section className="shop-hero-header silver-sparkle-container">
        <div className="container">
          <div className="breadcrumbs">
            <Link to="/">Home</Link>
            <span>/</span>
            <span style={{ color: '#FFFFFF' }}>Shopping Bag</span>
          </div>
          <h1>Your Curated Selection</h1>
          <p style={{ color: 'var(--soft-pink)', fontSize: '1.05rem' }}>
            Review your bespoke cosmetic selections, apply exclusive VIP privileges, and experience our signature unboxing.
          </p>
        </div>
      </section>

      {/* Cart Container */}
      <section className="cart-section">
        <div className="container">
          {cart.length === 0 ? (
            /* Empty Cart Notice */
            <div
              style={{
                textAlign: 'center',
                padding: '80px 20px',
                background: '#FFFFFF',
                borderRadius: '24px',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div style={{ fontSize: '4rem', color: 'var(--cherry-red)', marginBottom: '20px' }}>
                <i className="fas fa-shopping-bag"></i>
              </div>
              <h2 style={{ fontSize: '2.2rem', color: 'var(--dark-burgundy)', marginBottom: '12px' }}>
                Your Shopping Bag is Empty
              </h2>
              <p
                style={{
                  color: 'var(--text-muted)',
                  maxWidth: '520px',
                  margin: '0 auto 30px',
                  fontSize: '1.05rem'
                }}
              >
                Treat yourself to our internationally acclaimed lipsticks, silk foundations, and royal eyeshadow palettes.
              </p>
              <Link to="/shop" className="btn-luxury-primary shimmer-btn-effect">
                Discover Haute Collections <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
          ) : (
            /* Populated Cart Content */
            <div className="cart-layout-grid">
              {/* Left: Table of Items */}
              <div className="cart-table-wrapper">
                <table className="cart-table">
                  <thead>
                    <tr>
                      <th style={{ width: '48%' }}>Cosmetic Creation</th>
                      <th style={{ width: '18%' }}>Price</th>
                      <th style={{ width: '18%' }}>Quantity</th>
                      <th style={{ width: '16%', textAlign: 'right' }}>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item) => (
                      <tr key={item.id}>
                        <td data-label="Product">
                          <div className="cart-item-cell">
                            <img src={item.image} alt={item.name} className="cart-item-img" />
                            <div>
                              <h4 className="cart-item-title">
                                <Link to={`/product/${item.productId}`}>{item.name}</Link>
                              </h4>
                              <span className="cart-item-shade">
                                <i className="fas fa-palette"></i> Shade: {item.shade}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td data-label="Price">
                          <span style={{ fontWeight: 600, color: 'var(--dark-burgundy)' }}>
                            {ProductService.formatCurrency(item.price)}
                          </span>
                        </td>
                        <td data-label="Quantity">
                          <div className="qty-stepper" style={{ padding: '2px 6px' }}>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              -
                            </button>
                            <input
                              type="number"
                              value={item.quantity}
                              readOnly
                              style={{ width: '32px' }}
                            />
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td data-label="Total" style={{ textAlign: 'right' }}>
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'flex-end',
                              gap: '14px'
                            }}
                          >
                            <strong style={{ color: 'var(--primary-burgundy)', fontSize: '1.1rem' }}>
                              {ProductService.formatCurrency(item.price * item.quantity)}
                            </strong>
                            <button
                              type="button"
                              className="btn-remove-cart"
                              onClick={() => removeFromCart(item.id)}
                              title="Remove from bag"
                            >
                              <i className="far fa-trash-alt"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '24px',
                    paddingTop: '20px',
                    borderTop: '1px solid var(--light-grey)'
                  }}
                >
                  <Link
                    to="/shop"
                    className="btn-luxury-secondary"
                    style={{ fontSize: '0.82rem', padding: '12px 24px' }}
                  >
                    <i className="fas fa-arrow-left"></i> Continue Shopping
                  </Link>
                  <button
                    type="button"
                    className="btn-luxury-secondary"
                    style={{
                      fontSize: '0.82rem',
                      padding: '12px 24px',
                      borderColor: '#c92a2a',
                      color: '#c92a2a'
                    }}
                    onClick={clearCart}
                  >
                    <i className="far fa-trash-alt"></i> Clear Bag
                  </button>
                </div>
              </div>

              {/* Right: Summary Card */}
              <div className="cart-summary-card">
                <h3 className="summary-title">Order Summary</h3>

                {/* Free Shipping Progress */}
                <div className="free-shipping-progress-box">
                  <div className="free-shipping-text">
                    {totals.freeShippingRemaining <= 0 ? (
                      <>
                        <i className="fas fa-check-circle" style={{ color: '#2b9348' }}></i>
                        <span style={{ color: '#2b9348' }}>
                          You have unlocked Complimentary Shipping!
                        </span>
                      </>
                    ) : (
                      <>
                        <i className="fas fa-truck"></i>
                        <span>
                          Add {ProductService.formatCurrency(totals.freeShippingRemaining)} for Complimentary Shipping
                        </span>
                      </>
                    )}
                  </div>
                  <div className="progress-bar-bg">
                    <div
                      className="progress-bar-fill"
                      style={{
                        width:
                          totals.freeShippingRemaining <= 0
                            ? '100%'
                            : `${Math.min(
                                100,
                                Math.round(
                                  (totals.subtotal / totals.freeShippingThreshold) * 100
                                )
                              )}%`,
                        background:
                          totals.freeShippingRemaining <= 0
                            ? '#2b9348'
                            : 'linear-gradient(90deg, var(--cherry-red), var(--primary-burgundy))'
                      }}
                    ></div>
                  </div>
                </div>

                {/* Coupon Input Form */}
                <form className="coupon-form-group" onSubmit={handleApplyCoupon}>
                  <input
                    type="text"
                    placeholder="Coupon Code (e.g. BLOSSOM20)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                  <button type="submit" className="btn-apply-coupon">
                    Apply
                  </button>
                </form>

                {/* Applied Coupon Tag */}
                {totals.coupon && (
                  <div style={{ marginBottom: '20px' }}>
                    <span className="filter-pill" style={{ background: '#e9f7ef', color: '#2b9348' }}>
                      <i className="fas fa-tag"></i> {totals.coupon.code} ({totals.coupon.label})
                      <button type="button" onClick={removeCoupon}>
                        &times;
                      </button>
                    </span>
                  </div>
                )}

                {/* Line Items */}
                <div className="summary-line-item">
                  <span>Subtotal:</span>
                  <strong>{ProductService.formatCurrency(totals.subtotal)}</strong>
                </div>

                {totals.discount > 0 && (
                  <div className="summary-line-item" style={{ color: '#2b9348' }}>
                    <span>VIP Privilege Discount:</span>
                    <strong>-{ProductService.formatCurrency(totals.discount)}</strong>
                  </div>
                )}

                <div className="summary-line-item">
                  <span>Estimated Delivery:</span>
                  <strong>
                    {totals.shipping === 0
                      ? 'COMPLIMENTARY'
                      : ProductService.formatCurrency(totals.shipping)}
                  </strong>
                </div>

                <div className="summary-line-item total-line">
                  <span>Estimated Total:</span>
                  <strong>{ProductService.formatCurrency(totals.grandTotal)}</strong>
                </div>

                <p
                  style={{
                    fontSize: '0.78rem',
                    color: 'var(--text-muted)',
                    marginTop: '10px',
                    textAlign: 'center'
                  }}
                >
                  Taxes calculated at checkout. Complimentary luxury gift box included.
                </p>

                <Link
                  to="/checkout"
                  className="btn-luxury-primary btn-checkout-cta shimmer-btn-effect"
                >
                  Proceed to Checkout <i className="fas fa-arrow-right"></i>
                </Link>

                {/* Reassurance */}
                <div
                  style={{
                    marginTop: '24px',
                    paddingTop: '18px',
                    borderTop: '1px solid var(--light-grey)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      fontSize: '0.8rem',
                      color: 'var(--text-muted)'
                    }}
                  >
                    <i className="fas fa-lock" style={{ color: 'var(--primary-burgundy)' }}></i>{' '}
                    256-Bit SSL Encrypted Demonstration
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      fontSize: '0.8rem',
                      color: 'var(--text-muted)'
                    }}
                  >
                    <i className="fas fa-box" style={{ color: 'var(--primary-burgundy)' }}></i>{' '}
                    Signature Burgundy Velvet Packaging
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

