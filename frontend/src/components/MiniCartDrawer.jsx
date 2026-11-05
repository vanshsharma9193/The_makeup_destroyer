import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ProductService } from '../data/products';

export const MiniCartDrawer = () => {
  const { cart, cartCount, isMiniCartOpen, closeMiniCart, updateQuantity, removeFromCart, getTotals } = useCart();
  const totals = getTotals();

  return (
    <>
      <div
        className={`drawer-backdrop ${isMiniCartOpen ? 'active' : ''}`}
        onClick={closeMiniCart}
      ></div>

      <aside className={`mini-cart-drawer ${isMiniCartOpen ? 'active' : ''}`} aria-label="Mini Cart">
        <div className="mini-cart-header">
          <h3>Your Luxury Bag ({cartCount})</h3>
          <button type="button" className="btn-close-drawer" onClick={closeMiniCart}>
            &times;
          </button>
        </div>

        <div className="mini-cart-body">
          {cart.length === 0 ? (
            <div className="mini-cart-empty">
              <i className="fas fa-shopping-bag"></i>
              <h4 style={{ fontSize: '1.2rem', color: 'var(--dark-burgundy)', marginBottom: '8px' }}>
                Your Bag is Currently Empty
              </h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
                Discover our iconic cosmetics and treat yourself to royalty.
              </p>
              <Link to="/shop" className="btn-luxury-primary shimmer-btn-effect" onClick={closeMiniCart}>
                Explore Collection
              </Link>
            </div>
          ) : (
            <div id="mini-cart-items">
              {cart.map((item) => (
                <div key={item.id} className="mini-cart-item">
                  <div className="mini-cart-img-wrap">
                    <img src={item.image} alt={item.name} loading="lazy" />
                  </div>
                  <div className="mini-cart-info">
                    <h4 className="mini-cart-title">{item.name}</h4>
                    <span className="mini-cart-shade">
                      <i className="fas fa-sparkles"></i> Shade: {item.shade}
                    </span>
                    <div className="mini-cart-pricing">
                      <span className="mini-cart-price">
                        {ProductService.formatCurrency(item.price)}
                      </span>
                      <span className="mini-cart-multiplier">× {item.quantity}</span>
                    </div>
                    <div className="mini-cart-controls">
                      <div className="qty-stepper-mini">
                        <button
                          type="button"
                          className="btn-qty-mini"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          type="button"
                          className="btn-qty-mini"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        className="btn-remove-mini"
                        onClick={() => removeFromCart(item.id)}
                        title="Remove item"
                      >
                        <i className="far fa-trash-alt"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="mini-cart-footer">
            <div className="mini-cart-subtotal-row">
              <span>Estimated Subtotal:</span>
              <strong>{ProductService.formatCurrency(totals.subtotal)}</strong>
            </div>
            <div className="mini-cart-btns-row">
              <Link
                to="/cart"
                className="btn-luxury-secondary"
                style={{ padding: '12px 18px', fontSize: '0.8rem', textAlign: 'center' }}
                onClick={closeMiniCart}
              >
                View Bag
              </Link>
              <Link
                to="/checkout"
                className="btn-luxury-primary shimmer-btn-effect"
                style={{ padding: '12px 18px', fontSize: '0.8rem', textAlign: 'center' }}
                onClick={closeMiniCart}
              >
                Checkout
              </Link>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

