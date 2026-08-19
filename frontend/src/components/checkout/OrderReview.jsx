import { motion } from 'framer-motion';
import { Package, ArrowLeft, ArrowRight, MapPin, CreditCard } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { formatPrice } from '../../lib/utils';

const OrderReview = ({ shippingAddress, onBack, onPlaceOrder, isSubmitting }) => {
  const { items, cartTotal } = useCart();

  const shipping = cartTotal >= 100 ? 0 : 15;
  const tax = cartTotal * 0.08;
  const total = cartTotal + shipping + tax;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-6"
    >
      <div className="surface p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-electric/10 flex items-center justify-center">
              <MapPin size={20} className="text-electric" />
            </div>
            <h3 className="font-cabinet text-lg font-semibold text-text-primary">
              Shipping Address
            </h3>
          </div>
          <button
            onClick={onBack}
            className="text-sm text-copper hover:text-copper-light transition-colors flex items-center gap-1"
          >
            <ArrowLeft size={14} />
            Edit
          </button>
        </div>
        <div className="text-sm text-text-muted space-y-1">
          <p className="text-text-primary font-medium">{shippingAddress.fullName}</p>
          <p>{shippingAddress.street}</p>
          <p>{shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}</p>
          <p>{shippingAddress.country}</p>
          <p className="pt-2">{shippingAddress.phone}</p>
        </div>
      </div>

      <div className="surface p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-copper/10 flex items-center justify-center">
            <CreditCard size={20} className="text-copper" />
          </div>
          <h3 className="font-cabinet text-lg font-semibold text-text-primary">
            Payment Method
          </h3>
        </div>
        <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/8">
          <div className="w-10 h-7 bg-gradient-to-r from-electric to-electric-dark rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">VISA</span>
          </div>
          <div>
            <p className="text-sm text-text-primary">•••• •••• •••• 4242</p>
            <p className="text-xs text-text-muted">Demo payment — no real charge</p>
          </div>
        </div>
      </div>

      <div className="surface p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-status-success/10 flex items-center justify-center">
            <Package size={20} className="text-status-success" />
          </div>
          <h3 className="font-cabinet text-lg font-semibold text-text-primary">
            Order Items ({items.length})
          </h3>
        </div>

        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.product._id} className="flex items-center gap-4">
              <img
                src={item.product.images?.[0]?.url}
                alt={item.product.name}
                className="w-16 h-16 rounded-xl object-cover bg-white/5"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary line-clamp-1">
                  {item.product.name}
                </p>
                <p className="text-xs text-text-muted">Qty: {item.quantity}</p>
              </div>
              <span className="text-sm font-medium text-copper">
                {formatPrice(item.product.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-white/10 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-text-muted">Subtotal</span>
            <span className="text-text-primary">{formatPrice(cartTotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-text-muted">Shipping</span>
            <span className={shipping === 0 ? 'text-status-success' : 'text-text-primary'}>
              {shipping === 0 ? 'FREE' : formatPrice(shipping)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-text-muted">Tax (8%)</span>
            <span className="text-text-primary">{formatPrice(tax)}</span>
          </div>
          <div className="flex justify-between pt-2 border-t border-white/10">
            <span className="font-medium text-text-primary">Total</span>
            <span className="font-cabinet text-xl font-bold text-copper">
              {formatPrice(total)}
            </span>
          </div>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onPlaceOrder}
        disabled={isSubmitting}
        className="w-full btn-primary flex items-center justify-center gap-2 py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Processing Order...
          </>
        ) : (
          <>
            Place Order
            <ArrowRight size={18} />
          </>
        )}
      </motion.button>
    </motion.div>
  );
};

export default OrderReview;
