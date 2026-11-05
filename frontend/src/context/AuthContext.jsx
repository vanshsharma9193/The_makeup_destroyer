import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const AuthContext = createContext();

const AUTH_KEY = 'cb_luxury_user';

export const AuthProvider = ({ children }) => {
  const { showToast } = useToast();
  const [user, setUser] = useState(() => {
    try {
      const data = localStorage.getItem(AUTH_KEY);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(AUTH_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(AUTH_KEY);
      }
    } catch (e) {
      console.error('Failed to sync user', e);
    }
  }, [user]);

  const login = (userData) => {
    setUser(userData);
    showToast(`Welcome back, ${userData.name}! VIP Privileges Activated.`, 'success');
  };

  const register = (userData) => {
    setUser(userData);
    showToast(`Welcome to the VIP Circle, ${userData.name}! Use code BLOSSOM20 for 20% off.`, 'success');
  };

  const logout = () => {
    setUser(null);
    showToast('You have been signed out of Cherry Blossom VIP', 'info');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

