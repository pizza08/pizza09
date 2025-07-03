import React, { useState } from 'react';
import { Search } from 'lucide-react';
import PizzaCard from '../components/PizzaCard';
import DeliveryCalculator from '../components/DeliveryCalculator';
import OrderScheduler from '../components/OrderScheduler';
import DeliveryAreaMap from '../components/DeliveryAreaMap';
import SavedAddresses from '../components/SavedAddresses';
import NotificationBanner from '../components/NotificationBanner';
import MobileSearchBar from '../components/MobileSearchBar';
import { pizzas, categories } from '../data/pizzas';
import { useCart } from '../contexts/CartContext';
import { useIsMobile } from '../hooks/use-mobile';

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [searchTerm, setSearchTerm] = useState('');
  const { dispatch } = useCart();
  const isMobile = useIsMobile();

  const handleAddToCart = (pizza: any) => {
    dispatch({ type: 'ADD_ITEM', payload: pizza });
  };

  const filteredPizzas = pizzas.filter(pizza => {
    const matchesCategory = selectedCategory === 'Todas' || pizza.category === selectedCategory;
    const matchesSearch = pizza.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pizza.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Nosso Cardápio</h1>
          <p className="text-lg md:text-xl text-gray-600">Escolha sua pizza favorita e personalize como quiser</p>
        </div>

        {/* Notification Banner */}
        <NotificationBanner />

        {/* Funcionalidades de Entrega - Responsivo */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className={`grid gap-6 mb-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'}`}>
            <DeliveryCalculator />
            <OrderScheduler />
          </div>
          
          <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'}`}>
            <SavedAddresses />
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-4">Informações de Entrega</h3>
              <div className="space-y-3">
                <DeliveryAreaMap />
                <div className="text-sm text-gray-600 space-y-1">
                  <p>• Pedido mínimo: R$ 25,00</p>
                  <p>• Frete grátis acima de R$ 40,00</p>
                  <p>• Funcionamento: 18h às 23h</p>
                  <p>• Formas de pagamento: Cartão, PIX, Dinheiro</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar - Mobile/Desktop */}
        {isMobile ? (
          <div className="mb-8">
            <MobileSearchBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>
        ) : (
          <>
            {/* Desktop Search Bar */}
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

            {/* Desktop Category Filter */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-orange-500 text-white'
                      : 'bg-white text-gray-700 hover:bg-orange-50 hover:text-orange-500'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </>
        )}

        {/* Info Banner */}
        <div className="bg-orange-100 border border-orange-200 rounded-lg p-4 mb-8 text-center">
          <p className="text-orange-800 text-sm md:text-base">
            🍕 <strong>Novo!</strong> Agora você pode personalizar suas pizzas! Escolha o tamanho e adicione ingredientes extras.
          </p>
        </div>

        {/* Pizza Grid - Responsivo */}
        <div className={`grid gap-6 md:gap-8 ${
          isMobile ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
        }`}>
          {filteredPizzas.map((pizza) => (
            <PizzaCard
              key={pizza.id}
              {...pizza}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>

        {filteredPizzas.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500">Nenhuma pizza encontrada.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
