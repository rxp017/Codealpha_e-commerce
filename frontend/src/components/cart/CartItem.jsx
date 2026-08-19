import { motion } from 'framer-motion';
import { Trash2, Minus, Plus } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { formatPrice } from '../../lib/utils';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const product = item.product;
  const itemTotal = product.price * item.quantity;

  const handleDecrease = () => {
    if (item.quantity > 1) {
      updateQuantity(product._id, item.quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (item.quantity < product.stock) {
      updateQuantity(product._id, item.quantity + 1);
    }
  };

  const handleRemove = () => {
    removeFromCart(product._id);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="flex gap-4 py-4 border-b border-white/5 last:border-0"
    >
      {/* Product Image */}
      <div className="w-20 h-20 rounded-xl overflow-hidden bg-white/5 flex-shrink-0">
        <img
          src={product.images?.[0]?.url || ''}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h4 className="text-sm font-medium text-text-primary line-clamp-1">
              {product.name}
            </h4>
            <p className="text-xs text-text-muted mt-0.5">{product.category}</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleRemove}
            className="p-1.5 rounded-lg text-text-muted hover:text-status-error hover:bg-status-error/10 transition-colors flex-shrink-0"
            aria-label={`Remove ${product.name} from cart`}
          >
            <Trash2 size={14} />
          </motion.button>
        </div>

        {/* Quantity Controls & Price */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-1.5">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleDecrease}
              disabled={item.quantity <= 1}
              className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-text-primary disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus size={12} />
            </motion.button>
            <span className="w-8 text-center text-sm font-medium text-text-primary">
              {item.quantity}
            </span>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleIncrease}
              disabled={item.quantity >= product.stock}
              className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-text-primary disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
              aria-label="Increase quantity"
            >
              <Plus size={12} />
            </motion.button>
          </div>
          <span className="text-sm font-semibold text-copper">
            {formatPrice(itemTotal)}
          </span>
        </div>

        {/* Stock warning */}
        {item.quantity >= product.stock && (
          <p className="text-xs text-status-error mt-1">Maximum stock reached</p>
        )}
      </div>
    </motion.div>
  );
};

export default CartItem;
