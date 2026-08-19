import { ChevronDown } from 'lucide-react';

const SortSelect = ({ sortOption, onSortChange }) => {
  const options = [
    { value: 'newest', label: 'Newest First' },
    { value: 'price_asc', label: 'Price: Low to High' },
    { value: 'price_desc', label: 'Price: High to Low' },
    { value: 'name_asc', label: 'Name: A to Z' },
    { value: 'name_desc', label: 'Name: Z to A' },
  ];

  return (
    <div className="relative">
      <select
        value={sortOption}
        onChange={(e) => onSortChange(e.target.value)}
        className="input-field appearance-none pr-10 cursor-pointer"
        aria-label="Sort products"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-base">
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown
        size={16}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
      />
    </div>
  );
};

export default SortSelect;
