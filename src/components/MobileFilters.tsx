
import React from 'react';
import { Filter } from 'lucide-react';
import SmartSearch from './SmartSearch';

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
      {/* Smart Search Bar */}
      <div className="mb-4">
        <SmartSearch
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
          selectedSection={selectedSection}
          placeholder={`Buscar ${selectedSection === 'pizzas' ? 'pizzas' : 'bebidas'}...`}
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
