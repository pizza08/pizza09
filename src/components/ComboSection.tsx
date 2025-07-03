
import React, { useState } from 'react';
import { Plus, Minus, ShoppingCart, Star, Clock, Fire } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import ImageWithFallback from './ImageWithFallback';
import { ButtonLoading } from './LoadingStates';

interface ComboItem {
  id: string;
  name: string;
  originalPrice: number;
  comboPrice: number;
  savings: number;
  items: {
    id: string;
    name: string;
    image: string;
    category: string;
  }[];
  badge?: 'hot' | 'new' | 'limited';
  timeLeft?: number; // em minutos
}

const ComboSection = () => {
  const { dispatch } = useCart();
  const [isAddingToCart, setIsAddingToCart] = useState<string | null>(null);

  const combos: ComboItem[] = [
    {
      id: 'combo-familia',
      name: 'Combo Família Feliz',
      originalPrice: 89.90,
      comboPrice: 69.90,
      savings: 20.00,
      badge: 'hot',
      timeLeft: 45,
      items: [
        { id: '1', name: 'Pizza Grande Margherita', image: '/placeholder.svg', category: 'tradicional' },
        { id: '2', name: 'Pizza Média Calabresa', image: '/placeholder.svg', category: 'tradicional' },
        { id: 'refri', name: 'Refrigerante 2L', image: '/placeholder.svg', category: 'bebida' }
      ]
    },
    {
      id: 'combo-doce',
      name: 'Combo Sobremesa',
      originalPrice: 45.80,
      comboPrice: 35.90,
      savings: 9.90,
      badge: 'new',
      items: [
        { id: '8', name: 'Pizza Doce Chocolate', image: '/placeholder.svg', category: 'doce' },
        { id: 'sorvete', name: 'Sorvete 500ml', image: '/placeholder.svg', category: 'sobremesa' }
      ]
    },
    {
      id: 'combo-vegano',
      name: 'Combo Verde',
      originalPrice: 65.80,
      comboPrice: 55.90,
      savings: 9.90,
      badge: 'limited',
      timeLeft: 120,
      items: [
        { id: '12', name: 'Pizza Vegana Mediterrânea', image: '/placeholder.svg', category: 'vegana' },
        { id: 'salada', name: 'Salada Verde', image: '/placeholder.svg', category: 'entrada' }
      ]
    }
  ];

  const handleAddCombo = async (combo: ComboItem) => {
    setIsAddingToCart(combo.id);
    
    // Simular delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: combo.id,
        name: combo.name,
        price: combo.comboPrice,
        image: combo.items[0].image,
        quantity: 1
      }
    });
    
    setIsAddingToCart(null);
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'hot': return 'bg-red-500 text-white';
      case 'new': return 'bg-green-500 text-white';
      case 'limited': return 'bg-purple-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getBadgeIcon = (badge: string) => {
    switch (badge) {
      case 'hot': return <Fire className="w-3 h-3" />;
      case 'new': return <Star className="w-3 h-3" />;
      case 'limited': return <Clock className="w-3 h-3" />;
      default: return null;
    }
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}min` : `${mins}min`;
  };

  return (
    <div className="bg-gradient-to-r from-orange-50 to-red-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            🔥 Combos Especiais
          </h2>
          <p className="text-lg text-gray-600">
            Economize até R$ 20 com nossos combos exclusivos!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {combos.map((combo) => (
            <div key={combo.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              {/* Badge */}
              {combo.badge && (
                <div className="relative">
                  <div className={`absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${getBadgeColor(combo.badge)}`}>
                    {getBadgeIcon(combo.badge)}
                    {combo.badge === 'hot' ? 'QUENTE' : combo.badge === 'new' ? 'NOVO' : 'LIMITADO'}
                  </div>
                </div>
              )}

              {/* Timer */}
              {combo.timeLeft && (
                <div className="absolute top-4 right-4 z-10 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {formatTime(combo.timeLeft)}
                </div>
              )}

              {/* Images Grid */}
              <div className="grid grid-cols-2 gap-1 p-2">
                {combo.items.slice(0, 4).map((item, index) => (
                  <ImageWithFallback
                    key={index}
                    src={item.image}
                    alt={item.name}
                    className={`${index === 0 && combo.items.length === 2 ? 'col-span-2' : ''} h-24 object-cover rounded-lg`}
                  />
                ))}
              </div>

              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{combo.name}</h3>
                
                {/* Items List */}
                <div className="mb-4">
                  {combo.items.map((item, index) => (
                    <div key={index} className="text-sm text-gray-600 flex items-center">
                      <Plus className="w-3 h-3 mr-1 text-orange-500" />
                      {item.name}
                    </div>
                  ))}
                </div>

                {/* Pricing */}
                <div className="mb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg line-through text-gray-400">
                        R$ {combo.originalPrice.toFixed(2).replace('.', ',')}
                      </span>
                      <div className="text-2xl font-bold text-orange-500">
                        R$ {combo.comboPrice.toFixed(2).replace('.', ',')}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-bold">
                        Economize R$ {combo.savings.toFixed(2).replace('.', ',')}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Add Button */}
                <div className="flex gap-2">
                  {isAddingToCart === combo.id ? (
                    <ButtonLoading isLoading={true}>Adicionando...</ButtonLoading>
                  ) : (
                    <button
                      onClick={() => handleAddCombo(combo)}
                      className="flex-1 bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-full font-bold transition-colors flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Adicionar Combo
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComboSection;
