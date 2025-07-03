import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Clock } from 'lucide-react';

interface AddressAutocompleteProps {
  onAddressSelect: (address: string, deliveryTime: string) => void;
  className?: string;
}

const mockAddresses = [
  { address: 'Rua das Flores, 123 - Centro', deliveryTime: '15-20 min', area: 'Centro' },
  { address: 'Av. Paulista, 456 - Bela Vista', deliveryTime: '20-25 min', area: 'Bela Vista' },
  { address: 'Rua Augusta, 789 - Consolação', deliveryTime: '18-23 min', area: 'Consolação' },
  { address: 'Rua da Consolação, 321 - Centro', deliveryTime: '15-20 min', area: 'Centro' },
  { address: 'Rua Barão de Itapetininga, 654 - República', deliveryTime: '22-27 min', area: 'República' }
];

const AddressAutocomplete = ({ onAddressSelect, className = '' }: AddressAutocompleteProps) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<typeof mockAddresses>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (query.length >= 3) {
      const filtered = mockAddresses.filter(addr =>
        addr.address.toLowerCase().includes(query.toLowerCase()) ||
        addr.area.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
      setIsOpen(true);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
    setSelectedIndex(-1);
  }, [query]);

  const handleSelect = (address: typeof mockAddresses[0]) => {
    setQuery(address.address);
    setIsOpen(false);
    onAddressSelect(address.address, address.deliveryTime);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSelect(suggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Digite seu endereço para delivery..."
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />
      </div>

      {isOpen && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 mt-1 max-h-60 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              onClick={() => handleSelect(suggestion)}
              className={`p-3 cursor-pointer hover:bg-gray-50 border-b border-gray-100 last:border-b-0 ${
                index === selectedIndex ? 'bg-orange-50' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">
                    {suggestion.address}
                  </p>
                  <p className="text-xs text-gray-600">
                    {suggestion.area}
                  </p>
                </div>
                <div className="flex items-center text-green-600 text-sm">
                  <Clock className="w-4 h-4 mr-1" />
                  {suggestion.deliveryTime}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {query.length >= 1 && query.length < 3 && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 mt-1 p-3">
          <p className="text-sm text-gray-500">
            Digite pelo menos 3 caracteres para buscar endereços
          </p>
        </div>
      )}
    </div>
  );
};

export default AddressAutocomplete;