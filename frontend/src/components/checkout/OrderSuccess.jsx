import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, Package, ArrowRight } from 'lucide-react';
import { formatPrice, formatDate } from '../../lib/utils';

const OrderSuccess = ({ order }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  if (!order) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-lg mx-auto text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 15,
          delay: 0.2,
        }}
        className="relative inline-block mb-8"
      >
        <div className="w-24 h-24 rounded-full bg-status-success/10 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: 'spring', stiffness: 300 }}
          >
            <CheckCircle2 size={48} className="text-status-success" />
          </motion.div>
        </div>

        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              x: [0, (i - 2.5) * 30],
              y: [0, -60 - i * 10],
            }}
            transition={{
              duration: 1.5,
              delay: 0.5 + i * 0.1,
              ease: 'easeOut',
            }}
            className={`absolute top-1/2 left-1/2 w-2 h-2 rounded-full ${
              i % 2 === 0 ? 'bg-copper' : 'bg-electric'
            }`}
          />
        ))}
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="font-cabinet text-3xl lg:text-4xl font-bold text-text-primary mb-3"
      >
        Order Placed! 🎉
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-text-muted mb-8"
      >
        Thank you for your purchase! Your keyboard is being prepared with love.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="surface p-6 text-left mb-8"
      >
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-text-muted">Order Number</span>
          <span className="font-mono text-copper font-medium">
            {order.orderNumber || `ALPHA-${order._id?.slice(-8).toUpperCase()}`}
          </span>
        </div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-text-muted">Date</span>
          <span className="text-text-primary">{formatDate(order.createdAt)}</span>
        </div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-text-muted">Items</span>
          <span className="text-text-primary">{order.items?.length || 0} products</span>
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <span className="font-medium text-text-primary">Total Paid</span>
          <span className="font-cabinet text-xl font-bold text-copper">
            {formatPrice(order.totalPrice)}
          </span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <Link
          to="/orders"
          className="flex-1 btn-primary flex items-center justify-center gap-2"
        >
          <Package size={18} />
          View My Orders
        </Link>
        <Link
          to="/products"
          className="flex-1 btn-ghost flex items-center justify-center gap-2"
        >
          Continue Shopping
          <ArrowRight size={16} />
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default OrderSuccess;
