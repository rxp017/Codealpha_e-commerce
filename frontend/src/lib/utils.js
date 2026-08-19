// Format currency with USD symbol and 2 decimal places
export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
};

// Format date for order history display
export const formatDate = (dateString) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateString));
};

// Truncate text to a specific length
export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

// Generate a unique ID for temporary cart items (before backend sync)
export const generateTempId = () => {
  return `temp_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
};

// Class name utility for conditional classes
export const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

// Validate email format
export const isValidEmail = (email) => {
  return /^\S+@\S+\.\S+$/.test(email);
};

// Get stock status label and color
export const getStockStatus = (stock) => {
  if (stock === 0) return { label: 'Out of Stock', color: '#FF5C5C' };
  if (stock <= 5) return { label: `Only ${stock} left`, color: '#E8873A' };
  return { label: 'In Stock', color: '#3DD68C' };
};

// Get order status badge styling
export const getOrderStatusStyle = (status) => {
  const styles = {
    pending: { bg: 'rgba(232, 135, 58, 0.15)', color: '#E8873A', label: 'Pending' },
    processing: { bg: 'rgba(79, 140, 255, 0.15)', color: '#4F8CFF', label: 'Processing' },
    shipped: { bg: 'rgba(79, 140, 255, 0.15)', color: '#4F8CFF', label: 'Shipped' },
    delivered: { bg: 'rgba(61, 214, 140, 0.15)', color: '#3DD68C', label: 'Delivered' },
    cancelled: { bg: 'rgba(255, 92, 92, 0.15)', color: '#FF5C5C', label: 'Cancelled' },
  };
  return styles[status] || styles.pending;
};

// Debounce function for search inputs
export const debounce = (func, wait = 300) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Scroll to top of page
export const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Get initials from name for avatar fallback
export const getInitials = (name) => {
  if (!name) return 'AK';
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};
