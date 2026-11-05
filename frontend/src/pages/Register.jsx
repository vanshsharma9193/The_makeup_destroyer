import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const Register = () => {
  const { register } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phone: '',
    password: '',
    confirm_password: '',
    terms: false
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.fullname || !formData.email || !formData.password) {
      showToast('Please fill out all mandatory fields.', 'error');
      return;
    }

    if (formData.password.length < 8) {
      showToast('Password must be at least 8 characters long.', 'error');
      return;
    }

    if (formData.password !== formData.confirm_password) {
      showToast('Passwords do not match. Please re-enter carefully.', 'error');
      return;
    }

    if (!formData.terms) {
      showToast('Please accept the VIP Privilege protocol to complete registration.', 'error');
      return;
    }

    register({
      name: formData.fullname,
      email: formData.email,
      phone: formData.phone,
      tier: 'VIP Diamond Member'
    });

    setTimeout(() => {
      navigate('/');
    }, 800);
  };

  return (
    <main>
      <section className="auth-page-section silver-sparkle-container">
        <div className="auth-card-container" style={{ maxWidth: '580px' }}>
          <div className="auth-header">
            <div style={{ fontSize: '2.2rem', color: 'var(--primary-burgundy)', marginBottom: '8px' }}>
              <i className="fas fa-crown"></i>
            </div>
            <h1>Induction into the Circle</h1>
            <p>Create your personal profile to enjoy confidential luxury privileges</p>
          </div>

          {/* VIP Benefits Banner */}
          <div
            style={{
              background: 'var(--soft-pink)',
              borderRadius: '14px',
              padding: '14px 18px',
              marginBottom: '24px',
              fontSize: '0.82rem',
              color: 'var(--dark-burgundy)',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '8px'
            }}
          >
            <div>
              <i className="fas fa-sparkles" style={{ color: 'var(--cherry-red)' }}></i> 15% Maiden Order Privilege
            </div>
            <div>
              <i className="fas fa-gift" style={{ color: 'var(--cherry-red)' }}></i> Annual Birthday Flacon
            </div>
            <div>
              <i className="fas fa-plane" style={{ color: 'var(--cherry-red)' }}></i> Priority Global Courier
            </div>
            <div>
              <i className="fas fa-gem" style={{ color: 'var(--cherry-red)' }}></i> Diamond Points Multiplier
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Distinguished Name *</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Princess Sophia..."
                value={formData.fullname}
                onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                required
              />
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label>VIP Email Address *</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="sophia@luxury.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Mobile Number *</label>
                <input
                  type="tel"
                  className="form-control"
                  placeholder="9876543210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label>Create Password *</label>
                <div className="password-input-wrap">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="form-control"
                    placeholder="Min. 8 characters"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                  <button
                    type="button"
                    className="btn-toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Toggle password"
                  >
                    <i className={showPassword ? 'fas fa-eye-slash' : 'far fa-eye'}></i>
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label>Confirm Password *</label>
                <div className="password-input-wrap">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="form-control"
                    placeholder="Re-type password"
                    value={formData.confirm_password}
                    onChange={(e) => setFormData({ ...formData, confirm_password: e.target.value })}
                    required
                  />
                  <button
                    type="button"
                    className="btn-toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Toggle password"
                  >
                    <i className={showPassword ? 'fas fa-eye-slash' : 'far fa-eye'}></i>
                  </button>
                </div>
              </div>
            </div>

            <div className="form-group" style={{ marginTop: '6px' }}>
              <label
                className="remember-checkbox"
                style={{ fontSize: '0.82rem', color: 'var(--text-muted)', alignItems: 'flex-start' }}
              >
                <input
                  type="checkbox"
                  checked={formData.terms}
                  onChange={(e) => setFormData({ ...formData, terms: e.target.checked })}
                  required
                  style={{ marginTop: '3px' }}
                />
                <span>
                  I consent to the Cherry Blossom Haute Beauté Terms of Service, Confidentiality Protocol, and VIP Privilege charter.
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="btn-luxury-primary btn-auth-submit shimmer-btn-effect"
              style={{ marginTop: '14px' }}
            >
              <span>Complete VIP Induction</span>
              <i className="fas fa-check-circle"></i>
            </button>

            <p className="auth-switch-text" style={{ marginTop: '24px' }}>
              Already hold credentials with the Maison? <Link to="/login">Sign In Here</Link>
            </p>
          </form>
        </div>
      </section>
    </main>
  );
};

