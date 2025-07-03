
import React, { useState, useMemo } from 'react';
import PizzaCard from '../components/PizzaCard';
import NotificationBanner from '../components/NotificationBanner';
import MobileSearchBar from '../components/MobileSearchBar';
import { MenuLoadingSkeleton } from '../components/LoadingStates';
import { pizzas } from '../data/pizzas';
import { useCart } from '../contexts/CartContext';
import { useIsMobile } from '../hooks/use-mobile';
import { Search } from 'lucide-react';

const Menu = () => {
  const { dispatch } = useCart();
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todas');
  const [isLoading, setIsLoading] = useState(true);

  // Simular carregamento inicial
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleAddToCart = (pizza: any) => {
    dispatch({ type: 'ADD_ITEM', payload: pizza });
  };

  const categories = [
    { id: 'todas', name: 'Todas', count: pizzas.length },
    { id: 'tradicional', name: 'Tradicionais', count: pizzas.filter(p => p.category === 'tradicional').length },
    { id: 'especial', name: 'Especiais', count: pizzas.filter(p => p.category === 'especial').length },
    { id: 'doce', name: 'Doces', count: pizzas.filter(p => p.category === 'doce').length },
    { id: 'vegana', name: 'Veganas', count: pizzas.filter(p => p.category === 'vegana').length }
  ];

  const filteredPizzas = useMemo(() => {
    return pizzas.filter(pizza => {
      const matchesSearch = pizza.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          pizza.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'todas' || pizza.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  if (isLoading) {
    return <MenuLoadingSkeleton />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <NotificationBanner />
      
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
          Nosso Cardápio
        </h1>
        <p className="text-xl text-gray-600">
          Sabores únicos preparados com ingredientes frescos
        </p>
      </div>

      {/* Search and Filters */}
      {isMobile ? (
        <MobileSearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          categories={categories}
        />
      ) : (
        <div className="mb-8">
          {/* Desktop Search */}
          <div className="relative max-w-md mx-auto mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar pizzas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          {/* Desktop Categories */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-orange-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-orange-50 border border-gray-200'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Pizza Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredPizzas.map((pizza) => (
          <PizzaCard
            key={pizza.id}
            {...pizza}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>

      {/* No Results */}
      {filteredPizzas.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🍕</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            Nenhuma pizza encontrada
          </h3>
          <p className="text-gray-600 mb-6">
            Tente buscar por outros termos ou explore nossas categorias
          </p>
          <button
            onClick={() => {setSearchTerm(''); setSelectedCategory('todas');}}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-medium transition-colors"
          >
            Ver Todas as Pizzas
          </button>
        </div>
      )}
    </div>
  );
};

export default Menu;
