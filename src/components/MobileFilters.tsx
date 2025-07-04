
import React from 'react';
import { Search, Filter } from 'lucide-react';

interface MobileFiltersProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categories: Array<{ id: string; name: string; count: number }>;
  selectedSection: 'pizzas' | 'bebidas';
}

const MobileFilters = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
  selectedSection
}: MobileFiltersProps) => {
  return (
    <div className="sticky top-16 bg-white z-40 border-b border-gray-200 pb-4 mb-6">
      {/* Search Bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder={`Buscar ${selectedSection === 'pizzas' ? 'pizzas' : 'bebidas'}...`}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
        />
      </div>

      {/* Category Chips */}
      <div className="flex items-center gap-2 mb-2">
        <Filter className="w-4 h-4 text-gray-500 flex-shrink-0" />
        <div className="flex overflow-x-auto gap-2 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category.id
                  ? 'bg-orange-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-orange-50 border border-gray-200'
              }`}
            >
              {category.name}
              <span className={`ml-1 text-xs ${
                selectedCategory === category.id ? 'text-orange-100' : 'text-gray-500'
              }`}>
                ({category.count})
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileFilters;
