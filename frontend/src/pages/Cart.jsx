import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, ArrowLeft, ArrowRight, Package } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import { CartItemSkeleton } from '../components/ui/Skeleton';
import { formatPrice } from '../lib/utils';
import toast from 'react-hot-toast';

const Cart = () => {
  const {
    items,
    loading,
    cartTotal,
    cartCount,
    clearCart
  } = useCart();
  const navigate = useNavigate();

  const [promoInput, setPromoInput] = useState('');
  const [promoCode, setPromoCode] = useState(null);
  const [promoDiscount, setPromoDiscount] = useState(0);

  // Calculate shipping and tax
  const shippingThreshold = 100;
  const shipping = cartTotal >= shippingThreshold || cartTotal === 0 ? 0 : 15;
  const discountedSubtotal = cartTotal - promoDiscount;
  const tax = discountedSubtotal * 0.08;
  const total = discountedSubtotal + shipping + tax;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    const code = promoInput.trim().toUpperCase();
    
    // Demo promo codes
    const validPromos = {
      'ALPHA10': 0.10,
      'KEYBOARD20': 0.20,
      'THOCK15': 0.15,
    };

    if (validPromos[code]) {
      setPromoCode(code);
      const discount = cartTotal * validPromos[code];
      setPromoDiscount(discount);
      setPromoInput('');
      toast.success(`Promo code ${code} applied successfully!`);
    } else {
      toast.error('Invalid or expired promo code.');
    }
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    // Pass promo info to checkout via state or context if needed
    navigate('/checkout', { state: { promoCode, promoDiscount, finalTotal: total } });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-24 pb-16 px-4"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <ShoppingCart size={28} className="text-copper" />
          <h1 className="font-cabinet text-3xl font-bold">Your Cart</h1>
          <span className="text-text-muted">({cartCount} {cartCount === 1 ? 'item' : 'items'})</span>
        </div>

        {items.length === 0 && !loading ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-24 bg-surface rounded-2xl border border-white/5 backdrop-blur-md"
          >
            <Package size={64} className="mx-auto text-text-muted mb-4 opacity-50" />
            <h2 className="font-cabinet text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-text-muted mb-8 max-w-md mx-auto">
              Looks like you haven't added any premium gear to your cart yet.
            </p>
            <Link 
              to="/products"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-copper text-white font-medium hover:bg-copper/90 transition-all hover:scale-[1.02]"
            >
              Start Shopping
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-surface rounded-2xl border border-white/5 backdrop-blur-md p-6">
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/5">
                  <h3 className="font-medium">Items</h3>
                  {items.length > 0 && (
                    <button 
                      onClick={clearCart}
                      className="text-sm text-text-muted hover:text-status-error transition-colors"
                    >
                      Clear Cart
                    </button>
                  )}
                </div>
                
                <div className="space-y-2">
                  <AnimatePresence mode="popLayout">
                    {loading ? (
                      Array.from({ length: 3 }).map((_, i) => (
                        <motion.div key={`skeleton-${i}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                          <CartItemSkeleton />
                        </motion.div>
                      ))
                    ) : (
                      items.map((item) => (
                        <CartItem key={item._id} item={item} />
                      ))
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Continue Shopping Link */}
              <Link 
                to="/products"
                className="inline-flex items-center gap-2 text-sm font-medium text-text-muted hover:text-electric transition-colors"
              >
                <ArrowLeft size={16} />
                Continue Shopping
              </Link>
            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-1 sticky top-24">
              <CartSummary 
                subtotal={cartTotal}
                shipping={shipping}
                tax={tax}
                total={total}
                promoDiscount={promoDiscount}
                promoCode={promoCode}
                promoInput={promoInput}
                setPromoInput={setPromoInput}
                handleApplyPromo={handleApplyPromo}
                onCheckout={handleCheckout}
                loading={loading}
              />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Cart;
