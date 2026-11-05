import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '../context/ToastContext';

export const Contact = () => {
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Virtual Shade Matching Consultation',
    message: ''
  });

  const [openFaq, setOpenFaq] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      showToast('Thank you! Your correspondence has been dispatched to our VIP Concierge team.', 'success', 5000);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'Virtual Shade Matching Consultation',
        message: ''
      });
    } else {
      showToast('Please fill out all required fields.', 'error');
    }
  };

  const faqs = [
    {
      q: 'Are all Cherry Blossom cosmetics 100% cruelty-free and vegan?',
      a: 'Unconditionally yes. We do not test on animals at any stage of product formulation, nor do we commission third parties to do so. Our formulas are registered cruelty-free, utilizing nourishing botanical oils and synthetic vegan silk proteins in place of animal-derived binders.'
    },
    {
      q: 'How does your complimentary luxury dispatch and delivery operate?',
      a: 'All orders above ₹1,999 qualify for complimentary express air courier delivery across India. Orders are hand-wrapped in our signature burgundy velvet collector box and dispatched within 24 hours. Metros receive delivery within 48 to 72 hours.'
    },
    {
      q: 'What if I select a foundation or concealer shade that does not match?',
      a: 'Every foundation and concealer includes a complimentary companion discovery blister sample in the box. You may test the blister before unsealing the master flacon. If it is not your exact tone, our complimentary courier will collect it and exchange it for your true match without fee.'
    },
    {
      q: 'What makes your silver sparkle and shimmer accents unique?',
      a: 'Unlike generic plastic micro-glitters that irritate delicate eyelid skin and damage oceans, Cherry Blossom uses micro-refined synthetic fluorphlogopite and cosmetic-grade silver pearls. They melt into skin with zero gritty texture and reflect ambient candlelight seamlessly.'
    },
    {
      q: 'Can I book a private bridal beauty trial at your salons?',
      a: 'Indeed. Our salons in Mumbai and New Delhi feature private VIP dressing suites where brides and bridal parties enjoy champagne consultations, skin prep diagnostics, and custom shade blending sessions. Submit a request using the form above.'
    }
  ];

  return (
    <main>
      {/* Contact Hero */}
      <section className="about-hero-section silver-sparkle-container">
        <div className="container">
          <div className="breadcrumbs">
            <Link to="/">Home</Link>
            <span>/</span>
            <span style={{ color: '#FFFFFF' }}>Client Concierge</span>
          </div>
          <span className="section-tagline" style={{ color: 'var(--silver-bright)' }}>
            At Your Service
          </span>
          <h1>Private Concierge & Salons</h1>
          <p
            style={{
              color: 'var(--soft-pink)',
              maxWidth: '620px',
              margin: '0 auto',
              fontSize: '1.05rem'
            }}
          >
            Whether you desire bespoke shade curation, bridal beauty appointments, or assistance with an order, our beauty ambassadors await your correspondence.
          </p>
        </div>
      </section>

      {/* Main Contact & Boutique Info */}
      <section className="contact-section">
        <div className="container">
          <div className="contact-grid">
            {/* Left: Flagship Info Card */}
            <div className="contact-info-card">
              <span className="promo-badge-tag">
                <i className="fas fa-crown"></i> Dedicated VIP Care
              </span>
              <h3>Connect With The Maison</h3>
              <p>
                Our flagship salons in Mumbai, Delhi, and Paris offer private consultations with our senior makeup artists.
              </p>

              <div className="boutique-list">
                <div className="boutique-item">
                  <div className="boutique-icon">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div className="boutique-text">
                    <h4>Mumbai Flagship Salon</h4>
                    <p>74 Palais Royal, Waterfield Road, Bandra West, Mumbai 400050</p>
                    <small style={{ color: 'var(--silver-bright)', display: 'block', marginTop: '4px' }}>
                      Private Masterclasses by Appointment
                    </small>
                  </div>
                </div>

                <div className="boutique-item">
                  <div className="boutique-icon">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div className="boutique-text">
                    <h4>New Delhi Heritage Boutique</h4>
                    <p>The Colonnade, Inner Circle, Connaught Place, New Delhi 110001</p>
                  </div>
                </div>

                <div className="boutique-item">
                  <div className="boutique-icon">
                    <i className="fas fa-phone-alt"></i>
                  </div>
                  <div className="boutique-text">
                    <h4>VIP Direct Hotline</h4>
                    <p>+91 22 8900 2400 / +91 11 4500 8800</p>
                    <small style={{ color: 'var(--silver-bright)', display: 'block', marginTop: '2px' }}>
                      Toll-free across India
                    </small>
                  </div>
                </div>

                <div className="boutique-item">
                  <div className="boutique-icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div className="boutique-text">
                    <h4>Electronic Correspondence</h4>
                    <p>concierge@cherryblossombeaute.com</p>
                  </div>
                </div>
              </div>

              <div
                style={{
                  marginTop: 'auto',
                  paddingTop: '24px',
                  borderTop: '1px solid rgba(192, 192, 192, 0.2)',
                  display: 'flex',
                  gap: '14px'
                }}
              >
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-btn">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-btn">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="social-btn">
                  <i className="fab fa-pinterest-p"></i>
                </a>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="contact-form-card">
              <span className="section-tagline">Send an Inquiry</span>
              <h3 style={{ fontSize: '1.8rem', color: 'var(--dark-burgundy)', marginBottom: '8px' }}>
                Direct Correspondence
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '28px' }}>
                Our concierge team typically responds within four business hours.
              </p>

              <form onSubmit={handleSubmit}>
                <div className="form-grid-2">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      placeholder="Lady Charlotte..."
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Email Address *</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder="charlotte@luxury.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label>Phone Number (Optional)</label>
                    <input
                      type="tel"
                      className="form-control"
                      name="phone"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Inquiry Nature *</label>
                    <select
                      className="form-control"
                      name="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    >
                      <option value="Virtual Shade Matching Consultation">
                        Virtual Shade Matching Consultation
                      </option>
                      <option value="Book Salon Appointment (Mumbai/Delhi)">
                        Book Salon Appointment (Mumbai/Delhi)
                      </option>
                      <option value="Existing Acquisition Inquiry">
                        Existing Acquisition Inquiry
                      </option>
                      <option value="Bespoke Bridal Beauty Package">
                        Bespoke Bridal Beauty Package
                      </option>
                      <option value="Press & VIP Partnerships">Press & VIP Partnerships</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Your Message *</label>
                  <textarea
                    className="form-control"
                    name="message"
                    rows="5"
                    placeholder="Share your inquiry or requested appointment date..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn-luxury-primary shimmer-btn-effect"
                  style={{ width: '100%', marginTop: '10px' }}
                >
                  <span>Dispatch Correspondence</span>
                  <i className="fas fa-paper-plane"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Answered Curiosities (FAQ) */}
      <section className="faq-section" id="faq">
        <div className="container">
          <div className="text-center">
            <span className="section-tagline">Client Guidance</span>
            <h2 className="section-heading-lg">Frequently Answered Curiosities</h2>
            <p className="section-description">
              Everything you need to know about our formulations, packaging, shade selection, and worldwide dispatch.
            </p>
          </div>

          <div className="faq-list">
            {faqs.map((faq, idx) => (
              <div key={idx} className={`faq-card ${openFaq === idx ? 'active' : ''}`}>
                <button
                  type="button"
                  className="faq-question"
                  onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                >
                  <span>{faq.q}</span>
                  <i className="fas fa-chevron-down"></i>
                </button>
                <div className="faq-answer">
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

