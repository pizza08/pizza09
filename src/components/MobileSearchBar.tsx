
import React, { useState } from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';

interface MobileSearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const MobileSearchBar = ({ 
  searchTerm, 
  onSearchChange, 
  categories, 
  selectedCategory, 
  onCategoryChange 
}: MobileSearchBarProps) => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Buscar pizzas..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-base"
        />
        {searchTerm && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        )}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full transition-colors ${
            showFilters ? 'bg-orange-500 text-white' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <SlidersHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile Category Filters */}
      {showFilters && (
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-lg">
          <h3 className="font-medium text-gray-800 mb-3">Categorias</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  onCategoryChange(category);
                  setShowFilters(false);
                }}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === category
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-50 text-gray-700 hover:bg-orange-50 hover:text-orange-500'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Selected Category Indicator */}
      {selectedCategory !== 'Todas' && (
        <div className="flex items-center justify-between bg-orange-50 border border-orange-200 rounded-lg px-4 py-2">
          <span className="text-orange-800 text-sm">
            Filtro: <strong>{selectedCategory}</strong>
          </span>
          <button
            onClick={() => onCategoryChange('Todas')}
            className="text-orange-600 hover:text-orange-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default MobileSearchBar;
