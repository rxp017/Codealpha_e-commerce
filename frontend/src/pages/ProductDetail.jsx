import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingCart,
  Minus,
  Plus,
  ChevronLeft,
  Star,
  Package,
  Truck,
  Shield,
  AlertTriangle,
} from 'lucide-react';
import api from '../lib/api';
import { useCart } from '../contexts/CartContext';
import { formatPrice, getStockStatus } from '../lib/utils';
import Skeleton from '../components/ui/Skeleton';
import toast from 'react-hot-toast';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/products/${id}`);
        if (data.success) {
          setProduct(data.data);
        }
      } catch (err) {
        if (err.response?.status === 404) {
          setError('Product not found');
        } else {
          setError('Failed to load product');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (newQty) => {
    if (newQty >= 1 && newQty <= product.stock) {
      setQuantity(newQty);
    }
  };

  const handleAddToCart = async () => {
    if (!product || product.stock === 0) return;

    setIsAdding(true);
    await addToCart(product, quantity);
    setIsAdding(false);
  };

  const handleBuyNow = async () => {
    if (!product || product.stock === 0) return;
    await addToCart(product, quantity);
    navigate('/checkout');
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <Skeleton className="h-6 w-32 mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-4">
              <Skeleton className="h-96 w-full rounded-2xl" />
              <div className="flex gap-4">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-20 w-20 rounded-xl" />
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <Skeleton className="h-8 w-1/3" />
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-14 w-full rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen pt-24 pb-16 px-4 flex items-center justify-center"
      >
        <div className="text-center">
          <div className="w-20 h-20 rounded-3xl bg-status-error/10 flex items-center justify-center mx-auto mb-6">
            <AlertTriangle size={32} className="text-status-error" />
          </div>
          <h1 className="font-cabinet text-2xl font-bold mb-2">Product Not Found</h1>
          <p className="text-text-muted mb-6">
            {error || "The product you're looking for doesn't exist."}
          </p>
          <Link to="/products" className="btn-primary">
            Back to Shop
          </Link>
        </div>
      </motion.div>
    );
  }

  const stockStatus = getStockStatus(product.stock);
  const specs = product.specifications ? Object.entries(product.specifications) : [];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-24 pb-16 px-4"
    >
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-text-muted hover:text-copper transition-colors text-sm"
          >
            <ChevronLeft size={16} />
            Back to Products
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {/* Main Image */}
            <div className="surface overflow-hidden mb-4">
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImage}
                  src={product.images?.[selectedImage]?.url}
                  alt={product.images?.[selectedImage]?.alt || product.name}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-96 object-cover"
                />
              </AnimatePresence>
            </div>

            {/* Thumbnail Images */}
            {product.images?.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((image, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden transition-all duration-200 ${
                      selectedImage === index
                        ? 'ring-2 ring-copper'
                        : 'ring-1 ring-white/10 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                  </motion.button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col"
          >
            {/* Category & Featured */}
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 text-xs font-medium bg-electric/10 text-electric rounded-full">
                {product.category}
              </span>
              {product.featured && (
                <span className="px-3 py-1 text-xs font-medium bg-copper/10 text-copper rounded-full flex items-center gap-1">
                  <Star size={12} fill="currentColor" />
                  Featured
                </span>
              )}
            </div>

            {/* Product Name */}
            <h1 className="font-cabinet text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              {product.name}
            </h1>

            {/* Price & Stock */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-3xl font-bold text-copper">
                {formatPrice(product.price)}
              </span>
              <span
                className="px-3 py-1 text-sm font-medium rounded-full"
                style={{
                  backgroundColor: `${stockStatus.color}15`,
                  color: stockStatus.color,
                }}
              >
                {stockStatus.label}
              </span>
            </div>

            {/* Description */}
            <div className="surface p-6 mb-6">
              <h3 className="font-cabinet text-sm font-semibold text-text-primary mb-3">
                Description
              </h3>
              <p className="text-text-muted text-sm leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Specifications */}
            {specs.length > 0 && (
              <div className="surface p-6 mb-6">
                <h3 className="font-cabinet text-sm font-semibold text-text-primary mb-4">
                  Specifications
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {specs.map(([key, value]) => (
                    <div key={key} className="flex flex-col">
                      <span className="text-xs text-text-muted">{key}</span>
                      <span className="text-sm text-text-primary font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector & Add to Cart */}
            <div className="mt-auto space-y-4">
              {/* Quantity */}
              <div className="flex items-center gap-4">
                <span className="text-sm text-text-muted">Quantity:</span>
                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-text-primary disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
                  >
                    <Minus size={16} />
                  </motion.button>
                  <span className="w-12 text-center font-cabinet text-lg font-semibold">
                    {quantity}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= product.stock}
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-text-primary disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
                  >
                    <Plus size={16} />
                  </motion.button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  disabled={product.stock === 0 || isAdding}
                  className="flex-1 btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAdding ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Adding...
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={18} />
                      Add to Cart
                    </>
                  )}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleBuyNow}
                  disabled={product.stock === 0}
                  className="flex-1 btn-secondary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Buy Now
                </motion.button>
              </div>

              {/* Trust Badges */}
              <div className="flex items-center justify-center gap-6 pt-4 border-t border-white/8">
                <div className="flex items-center gap-2 text-xs text-text-muted">
                  <Truck size={14} className="text-copper" />
                  Free shipping over $100
                </div>
                <div className="flex items-center gap-2 text-xs text-text-muted">
                  <Shield size={14} className="text-copper" />
                  2-year warranty
                </div>
                <div className="flex items-center gap-2 text-xs text-text-muted">
                  <Package size={14} className="text-copper" />
                  30-day returns
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tags */}
        {product.tags?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 flex flex-wrap gap-2"
          >
            <span className="text-sm text-text-muted mr-2">Tags:</span>
            {product.tags.map((tag) => (
              <Link
                key={tag}
                to={`/products?search=${tag}`}
                className="px-3 py-1 text-xs bg-white/5 border border-white/10 rounded-full text-text-muted hover:text-copper hover:border-copper/30 transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ProductDetail;
