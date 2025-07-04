
import React, { useState, useMemo } from 'react';
import PizzaCard from '../components/PizzaCard';
import DrinkCard from '../components/DrinkCard';
import NotificationBanner from '../components/NotificationBanner';
import MobileSearchBar from '../components/MobileSearchBar';
import { MenuLoadingSkeleton } from '../components/LoadingStates';
import { pizzas } from '../data/pizzas';
import { drinks, drinkCategories } from '../data/drinks';
import { useCart } from '../contexts/CartContext';
import { useIsMobile } from '../hooks/use-mobile';
import { Search, Phone, Clock, MapPin } from 'lucide-react';

const Menu = () => {
  const { dispatch } = useCart();
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todas');
  const [selectedSection, setSelectedSection] = useState<'pizzas' | 'bebidas'>('pizzas');
  const [isLoading, setIsLoading] = useState(true);

  // Simular carregamento inicial
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleAddToCart = (item: any) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: item
    });
  };

  const handleWhatsAppOrder = () => {
    const whatsappUrl = "https://wa.me/message/6DSN3FA5UPI4G1";
    window.open(whatsappUrl, '_blank');
  };

  const pizzaCategories = [{
    id: 'todas',
    name: 'Todas',
    count: pizzas.length
  }, {
    id: 'tradicionais',
    name: 'Tradicionais',
    count: pizzas.filter(p => p.category === 'Tradicionais').length
  }, {
    id: 'doces',
    name: 'Doces',
    count: pizzas.filter(p => p.category === 'Doces').length
  }];

  const filteredPizzas = useMemo(() => {
    return pizzas.filter(pizza => {
      const matchesSearch = pizza.name.toLowerCase().includes(searchTerm.toLowerCase()) || pizza.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'todas' || pizza.category.toLowerCase() === selectedCategory.toLowerCase();
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const filteredDrinks = useMemo(() => {
    return drinks.filter(drink => {
      const matchesSearch = drink.name.toLowerCase().includes(searchTerm.toLowerCase()) || drink.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'todas' || drink.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const currentCategories = selectedSection === 'pizzas' ? pizzaCategories : drinkCategories;
  const currentItems = selectedSection === 'pizzas' ? filteredPizzas : filteredDrinks;

  if (isLoading) {
    return <MenuLoadingSkeleton />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <NotificationBanner />
      
      {/* Header Simplificado */}
      <div className="text-center mb-8">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
          Nosso Cardápio
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Sabores únicos preparados com ingredientes frescos
        </p>

        {/* Informações de Delivery - Destacadas */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 mb-8 border border-orange-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="flex items-center justify-center gap-2">
              <Clock className="w-5 h-5 text-orange-500" />
              <div>
                <p className="font-semibold text-gray-800">Entrega Rápida</p>
                <p className="text-sm text-gray-600">30-40 minutos</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2">
              <MapPin className="w-5 h-5 text-green-500" />
              <div>
                <p className="font-semibold text-gray-800">Área de Cobertura</p>
                <p className="text-sm text-gray-600">Até 5km do centro</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Phone className="w-5 h-5 text-blue-500" />
              <button onClick={handleWhatsAppOrder} className="text-center hover:scale-105 transition-transform">
                <p className="font-semibold text-gray-800">Pedir WhatsApp</p>
                <p className="text-sm text-green-600 font-medium">(47) 99280-9169</p>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Combos Mais Pedidos - Simplificado */}
      <div className="mb-8 bg-yellow-50 rounded-xl p-6 border border-yellow-200">
        <h2 className="text-2xl font-bold text-center mb-4">🔥 Combos Mais Pedidos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg p-4 border-2 border-orange-200 hover:border-orange-400 transition-colors cursor-pointer">
            <h3 className="font-semibold text-orange-600">Combo Família</h3>
            <p className="text-sm text-gray-600 mb-2">2 Pizzas G + 1 Refrigerantes</p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold">R$ 89,90</span>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                Economia R$ 15
              </span>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border-2 border-blue-200 hover:border-blue-400 transition-colors cursor-pointer">
            <h3 className="font-semibold text-blue-600">Combo Casal</h3>
            <p className="text-sm text-gray-600 mb-2">1 Pizza G + 1 Refrigerantes</p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold">R$ 49,90</span>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                Economia R$ 8
              </span>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border-2 border-purple-200 hover:border-purple-400 transition-colors cursor-pointer">
            <h3 className="font-semibold text-purple-600">Combo Individual</h3>
            <p className="text-sm text-gray-600 mb-2">1 Pizza M + 1 Refrigerante</p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold">R$ 35,90</span>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                Economia R$ 5
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Seletor de Seção (Pizzas/Bebidas) */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-100 rounded-full p-1 flex">
          <button
            onClick={() => {
              setSelectedSection('pizzas');
              setSelectedCategory('todas');
            }}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              selectedSection === 'pizzas'
                ? 'bg-orange-500 text-white shadow-md'
                : 'text-gray-700 hover:bg-gray-200'
            }`}
          >
            🍕 Pizzas
          </button>
          <button
            onClick={() => {
              setSelectedSection('bebidas');
              setSelectedCategory('todas');
            }}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              selectedSection === 'bebidas'
                ? 'bg-orange-500 text-white shadow-md'
                : 'text-gray-700 hover:bg-gray-200'
            }`}
          >
            🥤 Bebidas
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      {isMobile ? (
        <MobileSearchBar 
          searchTerm={searchTerm} 
          onSearchChange={setSearchTerm} 
          selectedCategory={selectedCategory} 
          onCategoryChange={setSelectedCategory} 
          categories={currentCategories.map(cat => cat.name)} 
        />
      ) : (
        <div className="mb-8">
          {/* Desktop Search */}
          <div className="relative max-w-md mx-auto mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder={`Buscar ${selectedSection === 'pizzas' ? 'pizzas' : 'bebidas'}...`}
              value={searchTerm} 
              onChange={e => setSearchTerm(e.target.value)} 
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent" 
            />
          </div>

          {/* Desktop Categories */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {currentCategories.map(category => (
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

      {/* Items Grid */}
      <div className={`grid gap-8 ${
        selectedSection === 'bebidas' 
          ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
          : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
      }`}>
        {selectedSection === 'pizzas' 
          ? filteredPizzas.map(pizza => (
              <PizzaCard key={pizza.id} {...pizza} onAddToCart={handleAddToCart} />
            ))
          : filteredDrinks.map(drink => (
              <DrinkCard key={drink.id} {...drink} onAddToCart={handleAddToCart} />
            ))
        }
      </div>

      {/* No Results */}
      {currentItems.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">
            {selectedSection === 'pizzas' ? '🍕' : '🥤'}
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            {selectedSection === 'pizzas' ? 'Nenhuma pizza encontrada' : 'Nenhuma bebida encontrada'}
          </h3>
          <p className="text-gray-600 mb-6">
            Tente buscar por outros termos ou explore nossas categorias
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('todas');
            }}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-medium transition-colors"
          >
            Ver Todos os {selectedSection === 'pizzas' ? 'Sabores' : 'Produtos'}
          </button>
        </div>
      )}

      {/* WhatsApp CTA Fixo no Mobile */}
      {isMobile && (
        <div className="fixed bottom-4 right-4 z-50">
          <button
            onClick={handleWhatsAppOrder}
            className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-colors"
          >
            <Phone className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Menu;
