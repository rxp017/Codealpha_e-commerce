import { motion } from 'framer-motion';
import { Tag, Truck, Shield, ArrowRight } from 'lucide-react';
import { formatPrice } from '../../lib/utils';

const CartSummary = ({
  subtotal,
  shipping,
  tax,
  total,
  promoCode,
  onApplyPromo,
  promoInput,
  onPromoInputChange,
  promoDiscount,
  onRemovePromo,
  onCheckout,
  isLoading,
}) => {
  return (
    <div className="surface p-6">
      <h3 className="font-cabinet text-lg font-semibold text-text-primary mb-6">
        Order Summary
      </h3>

      {/* Promo Code */}
      <div className="mb-6">
        {promoCode ? (
          <div className="flex items-center justify-between p-3 rounded-xl bg-status-success/10 border border-status-success/20">
            <div className="flex items-center gap-2">
              <Tag size={16} className="text-status-success" />
              <span className="text-sm text-status-success font-medium">
                {promoCode} applied
              </span>
            </div>
            <button
              onClick={onRemovePromo}
              className="text-xs text-text-muted hover:text-status-error transition-colors"
            >
              Remove
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <input
              type="text"
              value={promoInput}
              onChange={(e) => onPromoInputChange(e.target.value)}
              placeholder="Promo code"
              className="input-field flex-1 text-sm"
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onApplyPromo}
              className="btn-ghost text-sm px-4"
            >
              Apply
            </motion.button>
          </div>
        )}
      </div>

      {/* Price Breakdown */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-muted">Subtotal</span>
          <span className="text-text-primary">{formatPrice(subtotal)}</span>
        </div>

        {promoDiscount > 0 && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-status-success">Discount ({promoCode})</span>
            <span className="text-status-success">-{formatPrice(promoDiscount)}</span>
          </div>
        )}

        <div className="flex items-center justify-between text-sm">
          <span className="text-text-muted flex items-center gap-2">
            <Truck size={14} />
            Shipping
          </span>
          <span className={shipping === 0 ? 'text-status-success' : 'text-text-primary'}>
            {shipping === 0 ? 'FREE' : formatPrice(shipping)}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-text-muted">Tax (8%)</span>
          <span className="text-text-primary">{formatPrice(tax)}</span>
        </div>

        <div className="border-t border-white/10 pt-3">
          <div className="flex items-center justify-between">
            <span className="font-medium text-text-primary">Total</span>
            <span className="font-cabinet text-2xl font-bold text-copper">
              {formatPrice(total)}
            </span>
          </div>
        </div>
      </div>

      {/* Checkout Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onCheckout}
        disabled={isLoading}
        className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Processing...
          </>
        ) : (
          <>
            Proceed to Checkout
            <ArrowRight size={16} />
          </>
        )}
      </motion.button>

      {/* Trust Badges */}
      <div className="mt-6 pt-4 border-t border-white/8 space-y-2">
        <div className="flex items-center gap-2 text-xs text-text-muted">
          <Shield size={14} className="text-copper" />
          <span>Secure checkout with 256-bit encryption</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-text-muted">
          <Truck size={14} className="text-copper" />
          <span>Free shipping on orders over $100</span>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
