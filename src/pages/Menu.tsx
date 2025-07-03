import React, { useState, useMemo } from 'react';
import PizzaCard from '../components/PizzaCard';
import NotificationBanner from '../components/NotificationBanner';
import MobileSearchBar from '../components/MobileSearchBar';
import ComboSection from '../components/ComboSection';
import RecommendationEngine from '../components/RecommendationEngine';
import GamificationSystem from '../components/GamificationSystem';
import { MenuLoadingSkeleton } from '../components/LoadingStates';
import { pizzas } from '../data/pizzas';
import { useCart } from '../contexts/CartContext';
import { useIsMobile } from '../hooks/use-mobile';
import { Search } from 'lucide-react';
const Menu = () => {
  const {
    dispatch,
    state
  } = useCart();
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todas');
  const [isLoading, setIsLoading] = useState(true);
  const [showGamification, setShowGamification] = useState(false);

  // Simular carregamento inicial
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);
  const handleAddToCart = (pizza: any) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: pizza
    });
  };
  const categories = [{
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
      const matchesCategory = selectedCategory === 'todas' || pizza.category.toLowerCase() === selectedCategory.toLowerCase() || selectedCategory === 'tradicionais' && pizza.category === 'Tradicionais' || selectedCategory === 'doces' && pizza.category === 'Doces';
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);
  if (isLoading) {
    return <MenuLoadingSkeleton />;
  }
  return <div className="container mx-auto px-4 py-8">
      <NotificationBanner />
      
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
          Nosso Cardápio
        </h1>
        <p className="text-xl text-gray-600">
          Sabores únicos preparados com ingredientes frescos
        </p>
        
        {/* Simplified Progress - Hidden by default */}
        <div className="mt-4">
          <button onClick={() => setShowGamification(!showGamification)} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            {showGamification ? 'Ocultar' : 'Ver'} Progresso 🏆
          </button>
        </div>
      </div>

      {/* Gamification System */}
      {showGamification && <div className="mb-12">
          <GamificationSystem />
        </div>}

      {/* Simplified Combos - Top 3 only */}
      <div className="mb-8 bg-muted/30 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-center mb-4">🔥 Combos Mais Pedidos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          <div className="bg-background rounded-lg p-4 border border-primary/20">
            <h3 className="font-semibold text-primary">Combo Família</h3>
            <p className="text-sm text-muted-foreground mb-2">2 Pizzas G + 2 Refrigerantes</p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold">R$ 89,90</span>
              <span className="text-xs text-success">Economia de R$ 15</span>
            </div>
          </div>
          <div className="bg-background rounded-lg p-4 border border-secondary/20">
            <h3 className="font-semibold text-secondary">Combo Casal</h3>
            <p className="text-sm text-muted-foreground mb-2">1 Pizza G + 1 Refrigerantes</p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold">R$ 54,90</span>
              <span className="text-xs text-success">Economia de R$ 8</span>
            </div>
          </div>
          <div className="bg-background rounded-lg p-4 border border-accent/20">
            <h3 className="font-semibold text-accent-foreground">Combo Individual</h3>
            <p className="text-sm text-muted-foreground mb-2">1 Pizza M + 1 Refrigerante</p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold">R$ 35,90</span>
              <span className="text-xs text-success">Economia de R$ 5</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      {isMobile ? <MobileSearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} categories={categories.map(cat => cat.name)} /> : <div className="mb-8">
          {/* Desktop Search */}
          <div className="relative max-w-md mx-auto mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input type="text" placeholder="Buscar pizzas..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent" />
          </div>

          {/* Desktop Categories */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map(category => <button key={category.id} onClick={() => setSelectedCategory(category.id)} className={`px-6 py-3 rounded-full font-medium transition-all ${selectedCategory === category.id ? 'bg-orange-500 text-white shadow-lg' : 'bg-white text-gray-700 hover:bg-orange-50 border border-gray-200'}`}>
                {category.name} ({category.count})
              </button>)}
          </div>
        </div>}

      {/* Pizza Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredPizzas.map(pizza => <PizzaCard key={pizza.id} {...pizza} onAddToCart={handleAddToCart} />)}
      </div>

      {/* No Results */}
      {filteredPizzas.length === 0 && <div className="text-center py-16">
          <div className="text-6xl mb-4">🍕</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            Nenhuma pizza encontrada
          </h3>
          <p className="text-gray-600 mb-6">
            Tente buscar por outros termos ou explore nossas categorias
          </p>
          <button onClick={() => {
        setSearchTerm('');
        setSelectedCategory('todas');
      }} className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-medium transition-colors">
            Ver Todas as Pizzas
          </button>
        </div>}

      {/* Recommendations */}
      <RecommendationEngine cartItems={state.items} className="mt-12" />
    </div>;
};
export default Menu;