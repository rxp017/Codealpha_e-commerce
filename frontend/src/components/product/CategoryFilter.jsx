import { motion } from 'framer-motion';
import { Tag } from 'lucide-react';

const CategoryFilter = ({ categories, activeCategory, onCategoryChange }) => {
  const allCategories = ['all', ...categories];

  return (
    <div className="flex flex-wrap gap-2">
      {allCategories.map((category) => {
        const isActive = activeCategory === category;
        const displayName = category === 'all' ? 'All Products' : category;

        return (
          <motion.button
            key={category}
            onClick={() => onCategoryChange(category)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 flex items-center gap-2 ${
              isActive
                ? 'bg-copper text-white shadow-glow-copper'
                : 'bg-white/5 border border-white/8 text-text-muted hover:text-text-primary hover:bg-white/10'
            }`}
            aria-pressed={isActive}
          >
            {isActive && <Tag size={14} />}
            {displayName}
          </motion.button>
        );
      })}
    </div>
  );
};

export default CategoryFilter;
