import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const Login = () => {
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [email, setEmail] = useState('lady.sanjana@cherryblossom.com');
  const [password, setPassword] = useState('LuxurySecret2026');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      showToast('Please provide both your registered email and password.', 'error');
      return;
    }

    const name = email.split('@')[0].replace('.', ' ').replace(/\b\w/g, (l) => l.toUpperCase());
    login({ name, email });
    setTimeout(() => {
      navigate('/');
    }, 600);
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    setIsForgotModalOpen(false);
    showToast('Encrypted security link dispatched. Please inspect your private inbox.', 'info', 4500);
    setForgotEmail('');
  };

  const handleSocialLogin = (name, socialEmail) => {
    login({ name, email: socialEmail });
    setTimeout(() => {
      navigate('/');
    }, 600);
  };

  return (
    <main>
      <section className="auth-page-section silver-sparkle-container">
        <div className="auth-card-container">
          <div className="auth-header">
            <div style={{ fontSize: '2.2rem', color: 'var(--primary-burgundy)', marginBottom: '8px' }}>
              <i className="fas fa-spa"></i>
            </div>
            <h1>VIP Member Access</h1>
            <p>Enter your distinguished credentials to enter the Maison</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Registered VIP Email *</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="client@luxury.com"
                required
              />
            </div>

            <div className="form-group">
              <label>Master Password *</label>
              <div className="password-input-wrap">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                />
                <button
                  type="button"
                  className="btn-toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  <i className={showPassword ? 'fas fa-eye-slash' : 'far fa-eye'}></i>
                </button>
              </div>
            </div>

            <div className="auth-extra-row">
              <label className="remember-checkbox">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember My Suite</span>
              </label>
              <button
                type="button"
                className="forgot-link"
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                onClick={() => setIsForgotModalOpen(true)}
              >
                Forgot Secret?
              </button>
            </div>

            <button type="submit" className="btn-luxury-primary btn-auth-submit shimmer-btn-effect">
              <span>Sign In to VIP Suite</span>
              <i className="fas fa-arrow-right"></i>
            </button>

            <div className="auth-divider">
              <span>Or continue with</span>
            </div>

            <div className="social-auth-row">
              <button
                type="button"
                className="btn-social-auth"
                onClick={() => handleSocialLogin('Lady Sanjana', 'sanjana@google.com')}
              >
                <i className="fab fa-google" style={{ color: '#EA4335' }}></i> Google VIP
              </button>
              <button
                type="button"
                className="btn-social-auth"
                onClick={() => handleSocialLogin('Duchess Eleanor', 'eleanor@icloud.com')}
              >
                <i className="fab fa-apple"></i> Apple Pass
              </button>
            </div>

            <p className="auth-switch-text">
              Not yet inducted into the VIP Circle?{' '}
              <Link to="/register">Request Privilege Membership</Link>
            </p>
          </form>
        </div>
      </section>

      {/* Forgot Password Modal */}
      {isForgotModalOpen && (
        <div className="modal-overlay active" onClick={() => setIsForgotModalOpen(false)}>
          <div
            className="modal-content-card"
            style={{ maxWidth: '480px', padding: '36px', textAlign: 'center' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="modal-close-btn"
              onClick={() => setIsForgotModalOpen(false)}
            >
              &times;
            </button>
            <div style={{ fontSize: '2.5rem', color: 'var(--primary-burgundy)', marginBottom: '14px' }}>
              <i className="fas fa-key"></i>
            </div>
            <h3 style={{ fontSize: '1.8rem', color: 'var(--dark-burgundy)', marginBottom: '8px' }}>
              Reset Credentials
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '24px' }}>
              Enter your registered VIP email address to receive an encrypted security link.
            </p>
            <form onSubmit={handleForgotSubmit}>
              <div className="form-group" style={{ textAlign: 'left' }}>
                <label>VIP Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  required
                  placeholder="client@luxury.com"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="btn-luxury-primary shimmer-btn-effect"
                style={{ width: '100%' }}
              >
                Dispatch Recovery Link
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

