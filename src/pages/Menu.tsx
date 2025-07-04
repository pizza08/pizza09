
import React, { useState, useMemo } from 'react';
import PizzaCard from '../components/PizzaCard';
import DrinkCard from '../components/DrinkCard';
import NotificationBanner from '../components/NotificationBanner';
import MobileFilters from '../components/MobileFilters';
import SmartSearch from '../components/SmartSearch';
import FunctionalCombos from '../components/FunctionalCombos';
import MiniCartDropdown from '../components/MiniCartDropdown';
import { MenuLoadingSkeleton } from '../components/LoadingStates';
import { pizzas } from '../data/pizzas';
import { drinks, drinkCategories } from '../data/drinks';
import { useCart } from '../contexts/CartContext';
import { useCartPersistence } from '../hooks/useCartPersistence';
import { useIsMobile } from '../hooks/use-mobile';
import { Phone, Clock, MapPin, ArrowUp } from 'lucide-react';

const Menu = () => {
  const { dispatch } = useCart();
  useCartPersistence();
  
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todas');
  const [selectedSection, setSelectedSection] = useState<'pizzas' | 'bebidas'>('pizzas');
  const [isLoading, setIsLoading] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Carregamento otimizado - sem delays artificiais
  React.useEffect(() => {
    // Simular apenas o tempo necessário para carregar dados reais
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
      const matchesSearch = pizza.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           pizza.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'todas' || 
                             pizza.category.toLowerCase() === selectedCategory.toLowerCase();
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const filteredDrinks = useMemo(() => {
    return drinks.filter(drink => {
      const matchesSearch = drink.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           drink.description.toLowerCase().includes(searchTerm.toLowerCase());
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
      
      {/* Header com Mini Cart */}
      <div className="flex items-center justify-between mb-6">
        <div className="text-center flex-1">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Nosso Cardápio
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Sabores únicos preparados com ingredientes frescos
          </p>
        </div>
        
        {!isMobile && (
          <div className="ml-4">
            <MiniCartDropdown />
          </div>
        )}
      </div>

      {/* Informações de Delivery */}
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

      {/* Combos Funcionais */}
      <FunctionalCombos />

      {/* Seletor de Seção */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-100 rounded-full p-1 flex">
          <button
            onClick={() => {
              setSelectedSection('pizzas');
              setSelectedCategory('todas');
              setSearchTerm('');
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
              setSearchTerm('');
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

      {/* Busca e Filtros */}
      {isMobile ? (
        <MobileFilters 
          searchTerm={searchTerm} 
          onSearchChange={setSearchTerm} 
          selectedCategory={selectedCategory} 
          onCategoryChange={setSelectedCategory} 
          categories={currentCategories}
          selectedSection={selectedSection}
        />
      ) : (
        <div className="mb-8">
          {/* Desktop Smart Search */}
          <div className="max-w-md mx-auto mb-8">
            <SmartSearch
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              selectedSection={selectedSection}
              placeholder={`Buscar ${selectedSection === 'pizzas' ? 'pizzas' : 'bebidas'}...`}
            />
          </div>

          {/* Desktop Categories */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {currentCategories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all hover:scale-105 ${
                  selectedCategory === category.id
                    ? 'bg-orange-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-orange-50 border border-gray-200 hover:shadow-md'
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
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-medium transition-colors hover:shadow-md"
          >
            Ver Todos os {selectedSection === 'pizzas' ? 'Sabores' : 'Produtos'}
          </button>
        </div>
      )}

      {/* Mobile WhatsApp CTA */}
      {isMobile && (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
          <MiniCartDropdown />
          <button
            onClick={handleWhatsAppOrder}
            className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-colors hover:shadow-xl"
          >
            <Phone className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* Botão Voltar ao Topo */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 left-4 z-50 bg-gray-800 hover:bg-gray-900 text-white p-3 rounded-full shadow-lg transition-all hover:shadow-xl"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default Menu;
