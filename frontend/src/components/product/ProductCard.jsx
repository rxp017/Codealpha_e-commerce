import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Star } from 'lucide-react';
import TiltedCard from '../ui/TiltedCard';
import { useCart } from '../../contexts/CartContext';
import { formatPrice, getStockStatus, truncateText } from '../../lib/utils';

const ProductCard = ({ product, index = 0 }) => {
  const { addToCart } = useCart();
  const stockStatus = getStockStatus(product.stock);
  const primaryImage = product.images?.[0]?.url || '';

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.stock > 0) {
      addToCart(product, 1);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <TiltedCard className="h-full">
        <Link
          to={`/products/${product._id}`}
          className="block surface h-full overflow-hidden group transition-all duration-300 hover:shadow-glow-copper"
        >
          {/* Image Container */}
          <div className="relative h-52 overflow-hidden bg-white/5">
            <img
              src={primaryImage}
              alt={product.images?.[0]?.alt || product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            {/* Category Badge */}
            <div className="absolute top-3 left-3">
              <span className="px-3 py-1 text-xs font-medium bg-base/80 backdrop-blur-sm border border-white/10 rounded-full text-text-primary">
                {product.category}
              </span>
            </div>
            {/* Featured Badge */}
            {product.featured && (
              <div className="absolute top-3 right-3">
                <span className="px-3 py-1 text-xs font-medium bg-copper/90 text-white rounded-full flex items-center gap-1">
                  <Star size={12} fill="currentColor" />
                  Featured
                </span>
              </div>
            )}
            {/* Stock indicator for low stock */}
            {product.stock > 0 && product.stock <= 5 && (
              <div className="absolute bottom-3 left-3">
                <span className="px-3 py-1 text-xs font-medium bg-status-error/90 text-white rounded-full">
                  Only {product.stock} left!
                </span>
              </div>
            )}
            {product.stock === 0 && (
              <div className="absolute inset-0 bg-base/60 backdrop-blur-[2px] flex items-center justify-center">
                <span className="px-4 py-2 text-sm font-semibold bg-status-error text-white rounded-xl">
                  Out of Stock
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-5 flex flex-col h-[calc(100%-13rem)]">
            {/* Product Name */}
            <h3 className="font-cabinet text-base font-semibold text-text-primary mb-1 group-hover:text-copper transition-colors duration-200 line-clamp-1">
              {product.name}
            </h3>

            {/* Short Description */}
            <p className="text-sm text-text-muted mb-3 line-clamp-2 flex-grow">
              {truncateText(product.shortDescription || product.description, 80)}
            </p>

            {/* Price and Add to Cart */}
            <div className="flex items-center justify-between mt-auto">
              <span className="text-lg font-bold text-copper">
                {formatPrice(product.price)}
              </span>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`p-2.5 rounded-xl transition-all duration-200 ${
                  product.stock === 0
                    ? 'bg-white/5 text-text-muted cursor-not-allowed'
                    : 'bg-copper/10 text-copper hover:bg-copper hover:text-white'
                }`}
                aria-label={`Add ${product.name} to cart`}
              >
                <ShoppingCart size={18} />
              </motion.button>
            </div>
          </div>
        </Link>
      </TiltedCard>
    </motion.div>
  );
};

export default ProductCard;
