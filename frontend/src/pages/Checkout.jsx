import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ProductService } from '../data/products';
import { useToast } from '../context/ToastContext';

export const Checkout = () => {
  const { cart, clearCart, getTotals } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const totals = getTotals();

  // Form Fields State
  const [formData, setFormData] = useState({
    firstName: 'Sanjana',
    lastName: 'Roy',
    email: 'client@luxury.com',
    phone: '9876543210',
    address: 'Penthouse 4B, Silver Oak Heights, 14th Road',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400050'
  });

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      showToast('Your shopping bag is empty. Please add items before checkout.', 'error');
      return;
    }

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.address || !formData.pincode) {
      showToast('Please fill in all required shipping and contact details.', 'error');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const orderId = 'CB-' + Math.floor(1000 + Math.random() * 9000) + '-LUX';
      const orderSummary = {
        orderId,
        paymentMethod: paymentMethod.toUpperCase(),
        total: totals.grandTotal,
        customerName: `${formData.firstName} ${formData.lastName}`
      };

      setConfirmedOrder(orderSummary);
      clearCart();
      setIsProcessing(false);
    }, 1200);
  };

  return (
    <main>
      <section className="checkout-section">
        <div className="container">
          <div className="breadcrumbs" style={{ justifyContent: 'flex-start', marginBottom: '24px' }}>
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/cart">Bag</Link>
            <span>/</span>
            <span style={{ color: 'var(--dark-burgundy)', fontWeight: 600 }}>Checkout</span>
          </div>

          <form onSubmit={handlePlaceOrder}>
            <div className="checkout-grid">
              {/* Left Column: Forms */}
              <div className="checkout-forms-column">
                {/* 1. Contact Information */}
                <div className="checkout-card">
                  <h3 className="checkout-step-title">
                    <span className="step-num">1</span>
                    <span>Contact Information</span>
                  </h3>
                  <div className="form-grid-2">
                    <div className="form-group">
                      <label>First Name *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Last Name *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-grid-2">
                    <div className="form-group">
                      <label>VIP Email Address *</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Mobile Number *</label>
                      <input
                        type="tel"
                        className="form-control"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Delivery Address */}
                <div className="checkout-card">
                  <h3 className="checkout-step-title">
                    <span className="step-num">2</span>
                    <span>Delivery Address</span>
                  </h3>
                  <div className="form-group">
                    <label>Street Address / Suite / Residence *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-grid-2">
                    <div className="form-group">
                      <label>City *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>State *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-grid-2">
                    <div className="form-group">
                      <label>Postal Code / Pincode *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Country</label>
                      <input
                        type="text"
                        className="form-control"
                        value="India"
                        readOnly
                        style={{ background: 'var(--light-grey)' }}
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Payment Method */}
                <div className="checkout-card">
                  <h3 className="checkout-step-title">
                    <span className="step-num">3</span>
                    <span>Select Payment Method</span>
                  </h3>

                  <div className="payment-method-selector">
                    {/* Card Option */}
                    <label
                      className={`payment-option-card ${paymentMethod === 'card' ? 'selected' : ''}`}
                      onClick={() => setPaymentMethod('card')}
                    >
                      <div className="payment-left">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="card"
                          checked={paymentMethod === 'card'}
                          onChange={() => setPaymentMethod('card')}
                        />
                        <div>
                          <div className="payment-name">Credit / Debit Card</div>
                          <small style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                            Visa, Mastercard, Amex, Rupay
                          </small>
                        </div>
                      </div>
                      <div className="payment-icons">
                        <i className="fab fa-cc-visa"></i>
                        <i className="fab fa-cc-mastercard"></i>
                        <i className="fab fa-cc-amex"></i>
                      </div>
                    </label>

                    {paymentMethod === 'card' && (
                      <div
                        style={{
                          padding: '16px',
                          background: 'var(--bg-white)',
                          borderRadius: '12px',
                          border: '1px solid var(--border-color)',
                          marginTop: '-6px',
                          marginBottom: '10px'
                        }}
                      >
                        <div className="form-group">
                          <label>Card Number</label>
                          <input
                            type="text"
                            className="form-control"
                            defaultValue="4242 •••• •••• 4242"
                          />
                        </div>
                        <div className="form-grid-2">
                          <div className="form-group">
                            <label>Expiry (MM/YY)</label>
                            <input type="text" className="form-control" defaultValue="12/28" />
                          </div>
                          <div className="form-group">
                            <label>CVV / CVC</label>
                            <input type="password" className="form-control" defaultValue="888" maxLength="4" />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* UPI Option */}
                    <label
                      className={`payment-option-card ${paymentMethod === 'upi' ? 'selected' : ''}`}
                      onClick={() => setPaymentMethod('upi')}
                    >
                      <div className="payment-left">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="upi"
                          checked={paymentMethod === 'upi'}
                          onChange={() => setPaymentMethod('upi')}
                        />
                        <div>
                          <div className="payment-name">UPI / QR Code</div>
                          <small style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                            Google Pay, PhonePe, Paytm, BHIM
                          </small>
                        </div>
                      </div>
                      <div className="payment-icons">
                        <i className="fab fa-google-pay"></i>
                        <i className="fas fa-qrcode"></i>
                      </div>
                    </label>

                    {/* Net Banking */}
                    <label
                      className={`payment-option-card ${paymentMethod === 'netbanking' ? 'selected' : ''}`}
                      onClick={() => setPaymentMethod('netbanking')}
                    >
                      <div className="payment-left">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="netbanking"
                          checked={paymentMethod === 'netbanking'}
                          onChange={() => setPaymentMethod('netbanking')}
                        />
                        <div>
                          <div className="payment-name">Net Banking</div>
                          <small style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                            HDFC, ICICI, SBI, Axis, Kotak
                          </small>
                        </div>
                      </div>
                      <div className="payment-icons">
                        <i className="fas fa-university"></i>
                      </div>
                    </label>

                    {/* Cash on Delivery */}
                    <label
                      className={`payment-option-card ${paymentMethod === 'cod' ? 'selected' : ''}`}
                      onClick={() => setPaymentMethod('cod')}
                    >
                      <div className="payment-left">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cod"
                          checked={paymentMethod === 'cod'}
                          onChange={() => setPaymentMethod('cod')}
                        />
                        <div>
                          <div className="payment-name">Cash on Delivery (COD)</div>
                          <small style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                            Pay cash or UPI upon courier arrival
                          </small>
                        </div>
                      </div>
                      <div className="payment-icons">
                        <i className="fas fa-money-bill-wave"></i>
                      </div>
                    </label>
                  </div>

                  <div
                    style={{
                      background: 'var(--soft-pink)',
                      borderRadius: '12px',
                      padding: '14px 18px',
                      marginTop: '24px',
                      fontSize: '0.85rem',
                      color: 'var(--dark-burgundy)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px'
                    }}
                  >
                    <i
                      className="fas fa-info-circle"
                      style={{ fontSize: '1.2rem', color: 'var(--cherry-red)' }}
                    ></i>
                    <span>
                      Frontend demonstration checkout. No actual monetary charge will occur.
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Order Review */}
              <div className="checkout-summary-column">
                <div className="cart-summary-card">
                  <h3 className="summary-title">Order Review</h3>

                  <div
                    style={{
                      maxHeight: '280px',
                      overflowY: 'auto',
                      marginBottom: '20px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px'
                    }}
                  >
                    {cart.length === 0 ? (
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                        Your bag is currently empty.
                      </p>
                    ) : (
                      cart.map((item) => (
                        <div
                          key={item.id}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            paddingBottom: '10px',
                            borderBottom: '1px solid var(--light-grey)'
                          }}
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            style={{
                              width: '50px',
                              height: '50px',
                              borderRadius: '8px',
                              objectFit: 'cover'
                            }}
                          />
                          <div style={{ flexGrow: 1 }}>
                            <h5
                              style={{
                                fontFamily: 'var(--font-serif)',
                                fontSize: '0.95rem',
                                color: 'var(--dark-burgundy)'
                              }}
                            >
                              {item.name}
                            </h5>
                            <small style={{ color: 'var(--cherry-red)', fontSize: '0.75rem' }}>
                              {item.shade} × {item.quantity}
                            </small>
                          </div>
                          <strong
                            style={{ fontSize: '0.9rem', color: 'var(--dark-burgundy)' }}
                          >
                            {ProductService.formatCurrency(item.price * item.quantity)}
                          </strong>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="summary-line-item">
                    <span>Subtotal:</span>
                    <strong>{ProductService.formatCurrency(totals.subtotal)}</strong>
                  </div>

                  {totals.discount > 0 && (
                    <div className="summary-line-item" style={{ color: '#2b9348' }}>
                      <span>Privilege Discount:</span>
                      <strong>-{ProductService.formatCurrency(totals.discount)}</strong>
                    </div>
                  )}

                  <div className="summary-line-item">
                    <span>Courier Dispatch:</span>
                    <strong>
                      {totals.shipping === 0
                        ? 'COMPLIMENTARY'
                        : ProductService.formatCurrency(totals.shipping)}
                    </strong>
                  </div>

                  <div className="summary-line-item total-line">
                    <span>Total Amount:</span>
                    <strong>{ProductService.formatCurrency(totals.grandTotal)}</strong>
                  </div>

                  <button
                    type="submit"
                    className="btn-luxury-primary btn-checkout-cta shimmer-btn-effect"
                    disabled={isProcessing || cart.length === 0}
                    style={{ padding: '16px' }}
                  >
                    {isProcessing ? (
                      <>
                        <i className="fas fa-spinner fa-spin"></i> Processing Haute Order...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-lock"></i> Place Luxury Order
                      </>
                    )}
                  </button>

                  <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>
                      Complimentary VIP Gift Box & Deluxe Samples Included
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* Confirmation Modal */}
      {confirmedOrder && (
        <div className="modal-overlay active">
          <div className="modal-content-card" style={{ maxWidth: '620px', textAlign: 'center', padding: '48px 36px' }}>
            <div
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--cherry-red), var(--primary-burgundy))',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2.4rem',
                margin: '0 auto 20px',
                boxShadow: '0 10px 30px rgba(100, 19, 47, 0.4)'
              }}
            >
              <i className="fas fa-check"></i>
            </div>

            <span className="section-tagline">Acquisition Confirmed</span>
            <h2 style={{ fontSize: '2.2rem', color: 'var(--dark-burgundy)', marginBottom: '8px' }}>
              Thank You For Choosing Royalty
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '24px' }}>
              Your order has been recorded in the Cherry Blossom Atelier. We are carefully packaging your cosmetic creations in our signature burgundy velvet box.
            </p>

            <div
              style={{
                background: 'var(--soft-pink)',
                borderRadius: '16px',
                padding: '20px',
                marginBottom: '28px',
                textAlign: 'left'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Order Reference:</span>
                <strong style={{ color: 'var(--primary-burgundy)', fontFamily: 'var(--font-sans)' }}>
                  {confirmedOrder.orderId}
                </strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Estimated Dispatch:</span>
                <strong style={{ color: 'var(--dark-burgundy)' }}>Within 24 Hours via Express Air</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Payment Mode:</span>
                <strong style={{ color: 'var(--dark-burgundy)' }}>{confirmedOrder.paymentMethod}</strong>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center' }}>
              <Link to="/shop" className="btn-luxury-primary shimmer-btn-effect">
                Continue Exploring
              </Link>
              <Link to="/" className="btn-luxury-secondary">
                Return to Maison
              </Link>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

