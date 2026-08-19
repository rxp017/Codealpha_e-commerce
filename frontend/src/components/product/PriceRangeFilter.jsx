import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SlidersHorizontal } from 'lucide-react';
import { formatPrice } from '../../lib/utils';

const PriceRangeFilter = ({ priceRange, onPriceChange, maxPrice = 500 }) => {
  const [localMin, setLocalMin] = useState(priceRange.min || 0);
  const [localMax, setLocalMax] = useState(priceRange.max || maxPrice);

  useEffect(() => {
    setLocalMin(priceRange.min || 0);
    setLocalMax(priceRange.max || maxPrice);
  }, [priceRange, maxPrice]);

  const handleMinChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setLocalMin(value);
    onPriceChange({ min: value, max: localMax });
  };

  const handleMaxChange = (e) => {
    const value = parseInt(e.target.value) || maxPrice;
    setLocalMax(value);
    onPriceChange({ min: localMin, max: value });
  };

  const handleReset = () => {
    setLocalMin(0);
    setLocalMax(maxPrice);
    onPriceChange({ min: 0, max: maxPrice });
  };

  return (
    <div className="surface p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-cabinet text-sm font-semibold text-text-primary flex items-center gap-2">
          <SlidersHorizontal size={16} className="text-copper" />
          Price Range
        </h3>
        <button
          onClick={handleReset}
          className="text-xs text-text-muted hover:text-copper transition-colors"
        >
          Reset
        </button>
      </div>

      <div className="space-y-4">
        {/* Min Price */}
        <div>
          <label className="block text-xs text-text-muted mb-2">
            Min: <span className="text-copper font-medium">{formatPrice(localMin)}</span>
          </label>
          <input
            type="range"
            min="0"
            max={maxPrice}
            step="10"
            value={localMin}
            onChange={handleMinChange}
            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-copper"
          />
        </div>

        {/* Max Price */}
        <div>
          <label className="block text-xs text-text-muted mb-2">
            Max: <span className="text-copper font-medium">{formatPrice(localMax)}</span>
          </label>
          <input
            type="range"
            min="0"
            max={maxPrice}
            step="10"
            value={localMax}
            onChange={handleMaxChange}
            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-copper"
          />
        </div>
      </div>
    </div>
  );
};

export default PriceRangeFilter;
