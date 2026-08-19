import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../lib/api';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Load user from localStorage on mount
  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      try {
        const parsedUser = JSON.parse(userInfo);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Failed to parse user info:', error);
        localStorage.removeItem('userInfo');
      }
    }
    setLoading(false);
  }, []);

  // Register a new user
  const register = useCallback(async (name, email, password) => {
    try {
      setLoading(true);
      const { data } = await api.post('/auth/register', { name, email, password });
      
      if (data.success) {
        localStorage.setItem('userInfo', JSON.stringify(data.data));
        setUser(data.data);
        setIsAuthenticated(true);
        toast.success(`Welcome to Alpha Keys, ${data.data.name}!`);
        return { success: true };
      }
      return { success: false, message: data.message };
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed. Please try again.';
      toast.error(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  }, []);

  // Login existing user
  const login = useCallback(async (email, password) => {
    try {
      setLoading(true);
      const { data } = await api.post('/auth/login', { email, password });
      
      if (data.success) {
        localStorage.setItem('userInfo', JSON.stringify(data.data));
        setUser(data.data);
        setIsAuthenticated(true);
        toast.success(`Welcome back, ${data.data.name}!`);
        return { success: true };
      }
      return { success: false, message: data.message };
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed. Please check your credentials.';
      toast.error(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  }, []);

  // Logout user
  const logout = useCallback(() => {
    localStorage.removeItem('userInfo');
    setUser(null);
    setIsAuthenticated(false);
    toast.success('You have been logged out.');
    navigate('/');
  }, [navigate]);

  // Fetch current user profile (useful for token refresh/validation)
  const fetchProfile = useCallback(async () => {
    try {
      const { data } = await api.get('/auth/me');
      if (data.success) {
        const updatedUser = { ...user, ...data.data };
        setUser(updatedUser);
        localStorage.setItem('userInfo', JSON.stringify(updatedUser));
      }
    } catch (error) {
      // Token might be invalid
      if (error.response?.status === 401) {
        logout();
      }
    }
  }, [user, logout]);

  const value = {
    user,
    isAuthenticated,
    loading,
    register,
    login,
    logout,
    fetchProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
