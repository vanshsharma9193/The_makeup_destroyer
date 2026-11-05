import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'info', duration = 3500) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, removeToast }}>
      {children}
      <div className="toast-container" id="cherry-toast-container">
        {toasts.map((toast) => {
          let icon = <i className="fas fa-sparkles"></i>;
          if (toast.type === 'cart') icon = <i className="fas fa-shopping-bag"></i>;
          if (toast.type === 'wishlist') icon = <i className="fas fa-heart"></i>;
          if (toast.type === 'success') icon = <i className="fas fa-check-circle"></i>;
          if (toast.type === 'error') icon = <i className="fas fa-exclamation-circle"></i>;

          return (
            <div key={toast.id} className={`cherry-toast toast-${toast.type} visible`}>
              <div className="toast-icon-wrap">{icon}</div>
              <div className="toast-body">{toast.message}</div>
              <button
                type="button"
                className="toast-close"
                onClick={() => removeToast(toast.id)}
              >
                &times;
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);

