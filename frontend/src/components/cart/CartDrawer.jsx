import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import CartItem from './CartItem';
import { formatPrice } from '../../lib/utils';
import { CartItemSkeleton } from '../ui/Skeleton';

const CartDrawer = () => {
  const {
    isDrawerOpen,
    closeDrawer,
    items,
    loading,
    cartTotal,
    cartCount,
  } = useCart();
  const navigate = useNavigate();

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isDrawerOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') closeDrawer();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [closeDrawer]);

  const handleCheckout = () => {
    closeDrawer();
    navigate('/checkout');
  };

  const handleViewCart = () => {
    closeDrawer();
    navigate('/cart');
  };

  const shippingThreshold = 100;
  const remainingForFreeShipping = Math.max(0, shippingThreshold - cartTotal);
  const shippingProgress = Math.min(100, (cartTotal / shippingThreshold) * 100);

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            onClick={closeDrawer}
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed right-0 top-0 h-full w-full sm:w-[420px] bg-base border-l border-white/10 z-[70] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-copper/10 flex items-center justify-center">
                  <ShoppingCart size={20} className="text-copper" />
                </div>
                <div>
                  <h2 className="font-cabinet text-lg font-semibold text-text-primary">
                    Your Cart
                  </h2>
                  <p className="text-xs text-text-muted">
                    {cartCount} {cartCount === 1 ? 'item' : 'items'}
                  </p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={closeDrawer}
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-white/10 transition-colors"
                aria-label="Close cart"
              >
                <X size={20} />
              </motion.button>
            </div>

            {/* Free Shipping Progress */}
            {items.length > 0 && (
              <div className="px-6 py-4 border-b border-white/8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-text-muted">
                    {remainingForFreeShipping > 0
                      ? `Add ${formatPrice(remainingForFreeShipping)} more for free shipping`
                      : '🎉 You qualify for free shipping!'}
                  </span>
                  <span className="text-xs font-medium text-copper">
                    {formatPrice(shippingThreshold)}
                  </span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${shippingProgress}%` }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full bg-gradient-to-r from-copper to-copper-light rounded-full"
                  />
                </div>
              </div>
            )}

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <CartItemSkeleton key={i} />
                  ))}
                </div>
              ) : items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  {/* Empty Cart Illustration */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    className="relative mb-6"
                  >
                    <div className="w-24 h-24 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center">
                      <ShoppingCart size={36} className="text-text-muted" />
                    </div>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-copper/20"
                    />
                  </motion.div>
                  <h3 className="font-cabinet text-lg font-semibold text-text-primary mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-sm text-text-muted mb-6 max-w-[240px]">
                    Looks like you haven't added any keyboards to your collection yet.
                  </p>
                  <button
                    onClick={() => {
                      closeDrawer();
                      navigate('/products');
                    }}
                    className="btn-primary text-sm flex items-center gap-2"
                  >
                    Start Shopping
                    <ArrowRight size={16} />
                  </button>
                </div>
              ) : (
                <AnimatePresence>
                  {items.map((item) => (
                    <CartItem key={item.product._id} item={item} />
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-white/8 px-6 py-5 space-y-4">
                {/* Subtotal */}
                <div className="flex items-center justify-between">
                  <span className="text-text-muted">Subtotal</span>
                  <span className="font-cabinet text-xl font-bold text-text-primary">
                    {formatPrice(cartTotal)}
                  </span>
                </div>
                <p className="text-xs text-text-muted">
                  Shipping and taxes calculated at checkout
                </p>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCheckout}
                    className="w-full btn-primary flex items-center justify-center gap-2"
                  >
                    Proceed to Checkout
                    <ArrowRight size={16} />
                  </motion.button>
                  <button
                    onClick={handleViewCart}
                    className="w-full btn-ghost text-sm"
                  >
                    View Full Cart
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
