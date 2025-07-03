
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Flame, Clock, TrendingUp } from 'lucide-react';
import PizzaCard from './PizzaCard';
import DynamicBadge from './DynamicBadge';
import { pizzas } from '../data/pizzas';
import { useCart } from '../contexts/CartContext';

const SmartMenuPreview = () => {
  const { dispatch } = useCart();
  const [activeFilter, setActiveFilter] = useState('populares');

  const handleAddToCart = (pizza: any) => {
    dispatch({ type: 'ADD_ITEM', payload: pizza });
  };

  const filters = [
    { id: 'populares', name: 'Mais Pedidas', icon: <Flame className="w-4 h-4" /> },
    { id: 'rapidas', name: 'Entrega Rápida', icon: <Clock className="w-4 h-4" /> },
    { id: 'trending', name: 'Em Alta', icon: <TrendingUp className="w-4 h-4" /> }
  ];

  const getFilteredPizzas = () => {
    switch (activeFilter) {
      case 'populares':
        return pizzas.slice(0, 6).sort((a, b) => b.rating - a.rating);
      case 'rapidas':
        return pizzas.slice(0, 6);
      case 'trending':
        return pizzas.slice(2, 8);
      default:
        return pizzas.slice(0, 6);
    }
  };

  const filteredPizzas = getFilteredPizzas();

  return (
    <section id="menu-section" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Header with urgency */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-semibold mb-4 animate-bounce-gentle">
            <Clock className="w-4 h-4 mr-2" />
            Últimas 5 pizzas com 45% OFF - Promoção válida por tempo limitado!
          </div>
          
          <h2 className="text-4xl font-bold text-gray-800 mb-4 font-serif">Cardápio Especial</h2>
          <p className="text-xl text-gray-600">10 Tradicionais + 8 Doces Gourmet • Preços a partir de R$ 25</p>
        </div>

        {/* Smart Filters */}
        <div className="flex justify-center mb-8 animate-slide-up">
          <div className="bg-gray-100 p-1 rounded-full">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`inline-flex items-center px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeFilter === filter.id
                    ? 'bg-orange-500 text-white shadow-lg scale-105'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-200'
                }`}
              >
                {filter.icon}
                <span className="ml-2">{filter.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Enhanced Live Stats */}
        <div className="bg-gradient-to-r from-orange-500 to-yellow-400 rounded-2xl p-6 mb-8 text-white animate-glow">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="hover:scale-105 transition-transform duration-300">
              <div className="text-2xl font-bold">🔥 157</div>
              <div className="text-sm opacity-90">Vendidas hoje</div>
            </div>
            <div className="hover:scale-105 transition-transform duration-300">
              <div className="text-2xl font-bold">⚡ 12min</div>
              <div className="text-sm opacity-90">Tempo preparo</div>
            </div>
            <div className="hover:scale-105 transition-transform duration-300">
              <div className="text-2xl font-bold">🚚 7</div>
              <div className="text-sm opacity-90">Saindo agora</div>
            </div>
            <div className="hover:scale-105 transition-transform duration-300">
              <div className="text-2xl font-bold">👥 89</div>
              <div className="text-sm opacity-90">Pessoas vendo</div>
            </div>
          </div>
        </div>

        {/* Pizza Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredPizzas.map((pizza, index) => (
            <div key={pizza.id} className="relative group animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
              {/* Dynamic badges based on pizza properties */}
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                {pizza.rating >= 4.8 && <DynamicBadge type="bestseller" />}
                {index < 2 && <DynamicBadge type="hot" />}
                {index === 0 && <DynamicBadge type="trending" />}
              </div>
              
              <div className="hover:scale-105 transition-all duration-300 hover:shadow-2xl">
                <PizzaCard
                  {...pizza}
                  onAddToCart={handleAddToCart}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced CTA Section */}
        <div className="text-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 animate-fade-in">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 font-serif">
            Mais de 30 Sabores Disponíveis
          </h3>
          <p className="text-gray-600 mb-6">
            Descubra nosso cardápio completo com opções para todos os gostos
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/menu"
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 inline-flex items-center justify-center group hover:scale-105 hover:shadow-xl"
            >
              Ver Cardápio Completo
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <a
              href="https://wa.me/5511999999999?text=Olá! Gostaria de fazer um pedido com 45% OFF!"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105"
            >
              Pedido via WhatsApp - 45% OFF
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SmartMenuPreview;
