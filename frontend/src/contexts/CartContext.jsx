import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import toast from 'react-hot-toast';
import api from '../lib/api';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Load cart from localStorage for guests, or fetch from API for logged-in users
  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    } else {
      const savedCart = localStorage.getItem('guestCart');
      if (savedCart) {
        try {
          setItems(JSON.parse(savedCart));
        } catch (error) {
          console.error('Failed to parse guest cart:', error);
          localStorage.removeItem('guestCart');
        }
      }
    }
  }, [isAuthenticated]);

  // Sync guest cart to backend when user logs in
  useEffect(() => {
    if (isAuthenticated && items.length > 0) {
      syncGuestCartToBackend();
    }
  }, [isAuthenticated]);

  // Fetch cart from backend for authenticated users
  const fetchCart = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/cart');
      if (data.success) {
        setItems(data.data.items);
      }
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Sync guest cart items to backend after login
  const syncGuestCartToBackend = useCallback(async () => {
    try {
      for (const item of items) {
        await api.post('/cart', {
          productId: item.product._id || item.product,
          quantity: item.quantity,
        });
      }
      // Clear guest cart and fetch the merged cart
      localStorage.removeItem('guestCart');
      await fetchCart();
    } catch (error) {
      console.error('Failed to sync guest cart:', error);
    }
  }, [items, fetchCart]);

  // Add item to cart
  const addToCart = useCallback(async (product, quantity = 1) => {
    if (isAuthenticated) {
      try {
        setLoading(true);
        const { data } = await api.post('/cart', {
          productId: product._id,
          quantity,
        });
        if (data.success) {
          setItems(data.data.items);
          toast.success(`${product.name} added to cart!`, {
            icon: '🛒',
          });
        }
      } catch (error) {
        const message = error.response?.data?.message || 'Failed to add item to cart';
        toast.error(message);
      } finally {
        setLoading(false);
      }
    } else {
      // Guest cart - use localStorage
      setItems((prevItems) => {
        const existingIndex = prevItems.findIndex(
          (item) => (item.product._id || item.product) === product._id
        );

        let newItems;
        if (existingIndex > -1) {
          newItems = [...prevItems];
          newItems[existingIndex].quantity += quantity;
        } else {
          newItems = [...prevItems, { product, quantity }];
        }

        localStorage.setItem('guestCart', JSON.stringify(newItems));
        toast.success(`${product.name} added to cart!`, {
          icon: '🛒',
        });
        return newItems;
      });
    }
  }, [isAuthenticated]);

  // Update item quantity
  const updateQuantity = useCallback(async (productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }

    if (isAuthenticated) {
      try {
        setLoading(true);
        const { data } = await api.put(`/cart/${productId}`, { quantity });
        if (data.success) {
          setItems(data.data.items);
        }
      } catch (error) {
        const message = error.response?.data?.message || 'Failed to update quantity';
        toast.error(message);
      } finally {
        setLoading(false);
      }
    } else {
      setItems((prevItems) => {
        const newItems = prevItems.map((item) => {
          const itemId = item.product._id || item.product;
          if (itemId === productId) {
            return { ...item, quantity };
          }
          return item;
        });
        localStorage.setItem('guestCart', JSON.stringify(newItems));
        return newItems;
      });
    }
  }, [isAuthenticated]);

  // Remove item from cart
  const removeFromCart = useCallback(async (productId) => {
    if (isAuthenticated) {
      try {
        setLoading(true);
        const { data } = await api.delete(`/cart/${productId}`);
        if (data.success) {
          setItems(data.data.items);
          toast.success('Item removed from cart');
        }
      } catch (error) {
        const message = error.response?.data?.message || 'Failed to remove item';
        toast.error(message);
      } finally {
        setLoading(false);
      }
    } else {
      setItems((prevItems) => {
        const newItems = prevItems.filter((item) => {
          const itemId = item.product._id || item.product;
          return itemId !== productId;
        });
        localStorage.setItem('guestCart', JSON.stringify(newItems));
        return newItems;
      });
      toast.success('Item removed from cart');
    }
  }, [isAuthenticated]);

  // Clear entire cart
  const clearCart = useCallback(async () => {
    if (isAuthenticated) {
      try {
        await api.delete('/cart');
      } catch (error) {
        console.error('Failed to clear cart:', error);
      }
    }
    setItems([]);
    localStorage.removeItem('guestCart');
  }, [isAuthenticated]);

  // Toggle cart drawer
  const toggleDrawer = useCallback(() => {
    setIsDrawerOpen((prev) => !prev);
  }, []);

  const openDrawer = useCallback(() => setIsDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setIsDrawerOpen(false), []);

  // Computed values
  const cartCount = useMemo(() => {
    return items.reduce((total, item) => total + item.quantity, 0);
  }, [items]);

  const cartTotal = useMemo(() => {
    return items.reduce((total, item) => {
      const price = item.product?.price || 0;
      return total + price * item.quantity;
    }, 0);
  }, [items]);

  const value = {
    items,
    loading,
    cartCount,
    cartTotal,
    isDrawerOpen,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    toggleDrawer,
    openDrawer,
    closeDrawer,
    fetchCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
