import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import { ProductCardSkeleton } from '../ui/Skeleton';
import { SearchX } from 'lucide-react';

const ProductGrid = ({ products, loading, searchQuery, onClearFilters }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center justify-center py-24 text-center"
      >
        {/* Custom Empty State Illustration */}
        <div className="relative mb-8">
          <div className="w-24 h-24 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center">
            <SearchX size={40} className="text-text-muted" />
          </div>
          {/* Decorative elements */}
          <motion.div
            animate={{ rotate: [0, 10, 0], y: [-2, 2, -2] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-2 -right-2 w-6 h-6 rounded-lg bg-copper/20 border border-copper/30"
          />
          <motion.div
            animate={{ rotate: [0, -10, 0], y: [2, -2, 2] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-2 -left-2 w-6 h-6 rounded-lg bg-electric/20 border border-electric/30"
          />
        </div>

        <h3 className="font-cabinet text-xl font-semibold text-text-primary mb-2">
          No keyboards found
        </h3>
        <p className="text-text-muted max-w-md mb-6">
          {searchQuery
            ? `We couldn't find any products matching "${searchQuery}". Try adjusting your search or filters.`
            : 'No products match your current filters. Try broadening your search.'}
        </p>
        <button
          onClick={onClearFilters}
          className="btn-ghost text-sm"
        >
          Clear All Filters
        </button>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <ProductCard key={product._id} product={product} index={index} />
      ))}
    </div>
  );
};

export default ProductGrid;
