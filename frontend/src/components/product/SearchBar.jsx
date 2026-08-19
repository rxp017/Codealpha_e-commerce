import { useState, useEffect, useCallback } from 'react';
import { Search, X } from 'lucide-react';
import { debounce } from '../../lib/utils';

const SearchBar = ({ onSearch, initialValue = '' }) => {
  const [query, setQuery] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);

  // Debounced search callback
  const debouncedSearch = useCallback(
    debounce((value) => {
      onSearch(value);
    }, 400),
    [onSearch]
  );

  useEffect(() => {
    debouncedSearch(query);
  }, [query, debouncedSearch]);

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <div
      className={`relative transition-all duration-300 ${
        isFocused ? 'ring-2 ring-copper/50' : ''
      } rounded-xl`}
    >
      <Search
        size={18}
        className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200 ${
          isFocused ? 'text-copper' : 'text-text-muted'
        }`}
      />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Search keyboards, keycaps, switches..."
        className="input-field pl-11 pr-11"
        aria-label="Search products"
      />
      {query && (
        <button
          onClick={handleClear}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
          aria-label="Clear search"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
