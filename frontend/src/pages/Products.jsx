import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutGrid, Filter } from 'lucide-react';
import api from '../lib/api';
import ProductGrid from '../components/product/ProductGrid';
import SearchBar from '../components/product/SearchBar';
import CategoryFilter from '../components/product/CategoryFilter';
import SortSelect from '../components/product/SortSelect';
import PriceRangeFilter from '../components/product/PriceRangeFilter';
import { Skeleton } from '../components/ui/Skeleton';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter states
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'all');
  const [sortOption, setSortOption] = useState('newest');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 500 });
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await api.get('/products/categories');
        if (data.success) {
          setCategories(data.data);
        }
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    };
    fetchCategories();
  }, []);

  // Fetch products with filters
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      if (searchQuery) params.append('search', searchQuery);
      if (activeCategory && activeCategory !== 'all') params.append('category', activeCategory);
      if (priceRange.min > 0) params.append('minPrice', priceRange.min);
      if (priceRange.max < 500) params.append('maxPrice', priceRange.max);

      // Map sort option to API params
      switch (sortOption) {
        case 'price_asc':
          params.append('sort', 'price');
          params.append('order', 'asc');
          break;
        case 'price_desc':
          params.append('sort', 'price');
          params.append('order', 'desc');
          break;
        case 'name_asc':
          params.append('sort', 'name');
          params.append('order', 'asc');
          break;
        case 'name_desc':
          params.append('sort', 'name');
          params.append('order', 'desc');
          break;
        default:
          params.append('sort', 'createdAt');
          params.append('order', 'desc');
      }

      const { data } = await api.get(`/products?${params.toString()}`);
      if (data.success) {
        setProducts(data.data);
      }
    } catch (err) {
      setError('Failed to load products. Please try again.');
      console.error('Failed to fetch products:', err);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, activeCategory, sortOption, priceRange]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Update URL params when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('search', searchQuery);
    if (activeCategory !== 'all') params.set('category', activeCategory);
    setSearchParams(params, { replace: true });
  }, [searchQuery, activeCategory, setSearchParams]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setActiveCategory('all');
    setSortOption('newest');
    setPriceRange({ min: 0, max: 500 });
  };

  const activeFilterCount = [
    searchQuery,
    activeCategory !== 'all',
    priceRange.min > 0 || priceRange.max < 500,
  ].filter(Boolean).length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-24 pb-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-cabinet text-3xl lg:text-4xl font-bold mb-2"
          >
            Shop <span className="text-copper">Collection</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-text-muted"
          >
            Discover premium mechanical keyboards and accessories curated for enthusiasts.
          </motion.p>
        </div>

        {/* Search and Sort Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 mb-8"
        >
          <div className="flex-1">
            <SearchBar onSearch={setSearchQuery} initialValue={searchQuery} />
          </div>
          <div className="flex gap-4">
            <div className="w-48">
              <SortSelect sortOption={sortOption} onSortChange={setSortOption} />
            </div>
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="lg:hidden btn-ghost flex items-center gap-2 px-4"
            >
              <Filter size={16} />
              Filters
              {activeFilterCount > 0 && (
                <span className="w-5 h-5 bg-copper text-white text-xs rounded-full flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-8"
        >
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </motion.div>

        {/* Main Content */}
        <div className="flex gap-8">
          {/* Sidebar Filters (Desktop) */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="hidden lg:block w-64 flex-shrink-0"
          >
            <div className="sticky top-24 space-y-6">
              <PriceRangeFilter
                priceRange={priceRange}
                onPriceChange={setPriceRange}
                maxPrice={500}
              />

              {/* Active Filters Summary */}
              {activeFilterCount > 0 && (
                <div className="surface p-4">
                  <h4 className="text-sm font-medium text-text-primary mb-3">Active Filters</h4>
                  <div className="space-y-2">
                    {searchQuery && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-text-muted">Search</span>
                        <button
                          onClick={() => setSearchQuery('')}
                          className="text-copper hover:text-copper-light"
                        >
                          Clear
                        </button>
                      </div>
                    )}
                    {activeCategory !== 'all' && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-text-muted">Category</span>
                        <button
                          onClick={() => setActiveCategory('all')}
                          className="text-copper hover:text-copper-light"
                        >
                          Clear
                        </button>
                      </div>
                    )}
                    {(priceRange.min > 0 || priceRange.max < 500) && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-text-muted">Price</span>
                        <button
                          onClick={() => setPriceRange({ min: 0, max: 500 })}
                          className="text-copper hover:text-copper-light"
                        >
                          Clear
                        </button>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={handleClearFilters}
                    className="w-full mt-4 btn-ghost text-sm py-2"
                  >
                    Clear All
                  </button>
                </div>
              )}
            </div>
          </motion.aside>

          {/* Mobile Filters */}
          {showMobileFilters && (
            <div className="lg:hidden fixed inset-0 z-50 bg-base/80 backdrop-blur-sm">
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="absolute right-0 top-0 h-full w-80 bg-base border-l border-white/10 p-6 overflow-y-auto"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-cabinet text-lg font-semibold">Filters</h3>
                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    ✕
                  </button>
                </div>
                <PriceRangeFilter
                  priceRange={priceRange}
                  onPriceChange={setPriceRange}
                  maxPrice={500}
                />
                <button
                  onClick={handleClearFilters}
                  className="w-full mt-6 btn-ghost"
                >
                  Clear All Filters
                </button>
              </motion.div>
            </div>
          )}

          {/* Product Grid */}
          <div className="flex-1">
            {error ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-16 h-16 rounded-2xl bg-status-error/10 flex items-center justify-center mb-4">
                  <span className="text-2xl">⚠️</span>
                </div>
                <h3 className="font-cabinet text-xl font-semibold text-text-primary mb-2">
                  Something went wrong
                </h3>
                <p className="text-text-muted mb-6">{error}</p>
                <button onClick={fetchProducts} className="btn-primary">
                  Try Again
                </button>
              </div>
            ) : (
              <>
                {/* Results Count */}
                {!loading && products.length > 0 && (
                  <div className="flex items-center justify-between mb-6">
                    <p className="text-sm text-text-muted">
                      Showing <span className="text-copper font-medium">{products.length}</span> products
                    </p>
                    <div className="flex items-center gap-2 text-text-muted">
                      <LayoutGrid size={16} />
                      <span className="text-sm">Grid View</span>
                    </div>
                  </div>
                )}
                <ProductGrid
                  products={products}
                  loading={loading}
                  searchQuery={searchQuery}
                  onClearFilters={handleClearFilters}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Products;
