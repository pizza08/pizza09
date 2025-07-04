
import React, { useState, useEffect, useRef } from 'react';
import { Search, Clock, TrendingUp, X } from 'lucide-react';
import { pizzas } from '../data/pizzas';
import { drinks } from '../data/drinks';

interface SmartSearchProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedSection: 'pizzas' | 'bebidas';
  placeholder?: string;
  className?: string;
}

const SmartSearch = ({ 
  searchTerm, 
  onSearchChange, 
  selectedSection, 
  placeholder,
  className = ""
}: SmartSearchProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [popularSearches] = useState([
    'Margherita', 'Calabresa', 'Portuguesa', 'Frango', 'Chocolate',
    'Coca-Cola', 'Pepsi', 'Água', 'Suco'
  ]);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedHistory = localStorage.getItem('fornob_search_history');
    if (savedHistory) {
      try {
        setSearchHistory(JSON.parse(savedHistory));
      } catch (error) {
        console.error('Erro ao carregar histórico de busca:', error);
      }
    }
  }, []);

  useEffect(() => {
    if (searchTerm.length > 0) {
      const items = selectedSection === 'pizzas' ? pizzas : drinks;
      const filtered = items
        .filter(item => 
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map(item => item.name)
        .slice(0, 5);
      
      setSuggestions(filtered);
      setIsOpen(true);
    } else {
      setSuggestions([]);
      setIsOpen(searchTerm === '' && isOpen);
    }
  }, [searchTerm, selectedSection]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (term: string) => {
    onSearchChange(term);
    
    if (term && !searchHistory.includes(term)) {
      const newHistory = [term, ...searchHistory.slice(0, 4)];
      setSearchHistory(newHistory);
      localStorage.setItem('fornob_search_history', JSON.stringify(newHistory));
    }
    
    setIsOpen(false);
    inputRef.current?.blur();
  };

  const clearSearch = () => {
    onSearchChange('');
    inputRef.current?.focus();
  };

  const filteredPopular = popularSearches.filter(search => 
    selectedSection === 'pizzas' 
      ? !['Coca-Cola', 'Pepsi', 'Água', 'Suco'].includes(search)
      : ['Coca-Cola', 'Pepsi', 'Água', 'Suco'].includes(search)
  );

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={() => setIsOpen(true)}
          className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
        />
        {searchTerm && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 bg-transparent z-30"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-xl z-40 border border-gray-200 max-h-80 overflow-y-auto">
            
            {/* Sugestões baseadas na busca atual */}
            {suggestions.length > 0 && (
              <div className="p-3 border-b border-gray-100">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  Sugestões
                </h4>
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearch(suggestion)}
                    className="w-full text-left px-2 py-2 hover:bg-gray-50 rounded-md flex items-center gap-2 text-sm"
                  >
                    <Search className="w-4 h-4 text-gray-400" />
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            {/* Histórico de buscas */}
            {searchHistory.length > 0 && searchTerm === '' && (
              <div className="p-3 border-b border-gray-100">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  Buscas Recentes
                </h4>
                {searchHistory.map((term, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearch(term)}
                    className="w-full text-left px-2 py-2 hover:bg-gray-50 rounded-md flex items-center gap-2 text-sm"
                  >
                    <Clock className="w-4 h-4 text-gray-400" />
                    {term}
                  </button>
                ))}
              </div>
            )}

            {/* Buscas populares */}
            {searchTerm === '' && (
              <div className="p-3">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  Mais Buscados
                </h4>
                {filteredPopular.map((term, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearch(term)}
                    className="w-full text-left px-2 py-2 hover:bg-gray-50 rounded-md flex items-center gap-2 text-sm"
                  >
                    <TrendingUp className="w-4 h-4 text-orange-500" />
                    {term}
                  </button>
                ))}
              </div>
            )}

            {/* Estado vazio */}
            {suggestions.length === 0 && searchHistory.length === 0 && searchTerm !== '' && (
              <div className="p-4 text-center text-gray-500 text-sm">
                Nenhuma sugestão encontrada
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SmartSearch;
