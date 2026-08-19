import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, ChevronDown, ChevronUp, MapPin, Calendar, CreditCard } from 'lucide-react';
import { formatPrice, formatDate, getOrderStatusStyle } from '../../lib/utils';

const OrderCard = ({ order, index = 0 }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const statusStyle = getOrderStatusStyle(order.status);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="surface overflow-hidden"
    >
      <div
        className="p-6 cursor-pointer hover:bg-white/[0.02] transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-copper/10 flex items-center justify-center">
              <Package size={24} className="text-copper" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h3 className="font-cabinet text-base font-semibold text-text-primary">
                  {order.orderNumber || `ALPHA-${order._id?.slice(-8).toUpperCase()}`}
                </h3>
                <span
                  className="px-2.5 py-1 text-xs font-medium rounded-full"
                  style={{
                    backgroundColor: statusStyle.bg,
                    color: statusStyle.color,
                  }}
                >
                  {statusStyle.label}
                </span>
              </div>
              <div className="flex items-center gap-4 mt-1 text-xs text-text-muted">
                <span className="flex items-center gap-1">
                  <Calendar size={12} />
                  {formatDate(order.createdAt)}
                </span>
                <span className="flex items-center gap-1">
                  <CreditCard size={12} />
                  {formatPrice(order.totalPrice)}
                </span>
              </div>
            </div>
          </div>

          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-text-muted"
          >
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 border-t border-white/8 pt-4">
              <div className="space-y-3 mb-6">
                <h4 className="text-sm font-medium text-text-primary">Items</h4>
                {order.items?.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-lg object-cover bg-white/5"
                    />
                    <div className="flex-1">
                      <p className="text-sm text-text-primary">{item.name}</p>
                      <p className="text-xs text-text-muted">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-sm text-copper">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-medium text-text-primary mb-2 flex items-center gap-2">
                  <MapPin size={14} className="text-copper" />
                  Shipping Address
                </h4>
                <div className="text-sm text-text-muted">
                  <p>{order.shippingAddress?.fullName}</p>
                  <p>{order.shippingAddress?.street}</p>
                  <p>
                    {order.shippingAddress?.city}, {order.shippingAddress?.state}{' '}
                    {order.shippingAddress?.zipCode}
                  </p>
                  <p>{order.shippingAddress?.country}</p>
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Subtotal</span>
                  <span className="text-text-primary">{formatPrice(order.itemsPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Shipping</span>
                  <span className="text-text-primary">
                    {order.shippingPrice === 0 ? 'FREE' : formatPrice(order.shippingPrice)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Tax</span>
                  <span className="text-text-primary">{formatPrice(order.taxPrice)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-white/10">
                  <span className="font-medium text-text-primary">Total</span>
                  <span className="font-semibold text-copper">
                    {formatPrice(order.totalPrice)}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default OrderCard;
