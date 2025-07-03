
import React, { useState, useEffect } from 'react';
import { Star, Users, TrendingUp, Heart } from 'lucide-react';
import PizzaCard from './PizzaCard';
import { pizzas } from '../data/pizzas';

interface RecommendationEngineProps {
  currentPizzaId?: string;
  userId?: string;
  cartItems?: any[];
  className?: string;
}

const RecommendationEngine = ({ currentPizzaId, userId, cartItems = [], className = "" }: RecommendationEngineProps) => {
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [recommendationType, setRecommendationType] = useState<'similar' | 'popular' | 'personalized' | 'complementary'>('similar');

  useEffect(() => {
    generateRecommendations();
  }, [currentPizzaId, cartItems, recommendationType]);

  const generateRecommendations = () => {
    let filtered: any[] = [];
    
    switch (recommendationType) {
      case 'similar':
        if (currentPizzaId) {
          const currentPizza = pizzas.find(p => p.id === currentPizzaId);
          if (currentPizza) {
            filtered = pizzas.filter(p => 
              p.id !== currentPizzaId && 
              p.category === currentPizza.category
            );
          }
        }
        break;
        
      case 'popular':
        filtered = pizzas
          .filter(p => p.rating >= 4.5)
          .sort((a, b) => b.rating - a.rating);
        break;
        
      case 'personalized':
        // Simular personalização baseada em histórico
        const userPreferences = ['tradicional', 'especial'];
        filtered = pizzas.filter(p => userPreferences.includes(p.category));
        break;
        
      case 'complementary':
        // Pizzas que complementam o carrinho atual
        const cartCategories = cartItems.map(item => 
          pizzas.find(p => p.id === item.id)?.category
        ).filter(Boolean);
        
        if (cartCategories.includes('doce')) {
          filtered = pizzas.filter(p => p.category !== 'doce');
        } else {
          filtered = pizzas.filter(p => p.category === 'doce');
        }
        break;
    }
    
    // Limitar a 4 recomendações
    setRecommendations(filtered.slice(0, 4));
  };

  const getRecommendationTitle = () => {
    switch (recommendationType) {
      case 'similar':
        return 'Pizzas Similares';
      case 'popular':
        return 'Mais Populares';
      case 'personalized':
        return 'Recomendado Para Você';
      case 'complementary':
        return 'Perfeito Para Acompanhar';
      default:
        return 'Recomendações';
    }
  };

  const getRecommendationIcon = () => {
    switch (recommendationType) {
      case 'similar':
        return <Heart className="w-5 h-5 text-pink-500" />;
      case 'popular':
        return <TrendingUp className="w-5 h-5 text-green-500" />;
      case 'personalized':
        return <Star className="w-5 h-5 text-yellow-500" />;
      case 'complementary':
        return <Users className="w-5 h-5 text-blue-500" />;
      default:
        return null;
    }
  };

  if (recommendations.length === 0) {
    return null;
  }

  const handleAddToCart = (pizza: any) => {
    console.log('Add to cart from recommendations:', pizza);
  };

  return (
    <div className={`bg-gray-50 py-8 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            {getRecommendationIcon()}
            <h3 className="text-2xl font-bold text-gray-800">
              {getRecommendationTitle()}
            </h3>
          </div>
          
          {/* Recommendation Type Selector */}
          <div className="hidden md:flex gap-2">
            {['similar', 'popular', 'personalized', 'complementary'].map((type) => (
              <button
                key={type}
                onClick={() => setRecommendationType(type as any)}
                className={`px-3 py-1 rounded-full text-sm transition-all ${
                  recommendationType === type
                    ? 'bg-orange-500 text-white'
                    : 'bg-white text-gray-600 hover:bg-orange-100'
                }`}
              >
                {type === 'similar' && 'Similares'}
                {type === 'popular' && 'Populares'}
                {type === 'personalized' && 'Para Você'}
                {type === 'complementary' && 'Complementares'}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendations.map((pizza) => (
            <PizzaCard
              key={pizza.id}
              {...pizza}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendationEngine;
