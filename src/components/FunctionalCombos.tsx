
import React, { useState } from 'react';
import { Plus, ShoppingCart, Star, Clock, Flame, Timer } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useCartToast } from '../hooks/useCartToast';
import WhatsAppOrder from './WhatsAppOrder';
import { ButtonLoading } from './LoadingStates';

interface ComboItem {
  id: string;
  name: string;
  originalPrice: number;
  comboPrice: number;
  savings: number;
  items: {
    name: string;
    image: string;
  }[];
  badge?: 'hot' | 'new' | 'limited';
  timeLeft?: number;
}

const FunctionalCombos = () => {
  const { dispatch } = useCart();
  const { showAddToCartSuccess } = useCartToast();
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
        { name: 'Pizza Grande Margherita', image: '/placeholder.svg' },
        { name: 'Pizza Média Calabresa', image: '/placeholder.svg' },
        { name: 'Refrigerante 2L', image: '/placeholder.svg' }
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
        { name: 'Pizza Doce Chocolate', image: '/placeholder.svg' },
        { name: 'Sorvete 500ml', image: '/placeholder.svg' }
      ]
    },
    {
      id: 'combo-individual',
      name: 'Combo Individual',
      originalPrice: 42.80,
      comboPrice: 35.90,
      savings: 6.90,
      items: [
        { name: 'Pizza Média Portuguesa', image: '/placeholder.svg' },
        { name: 'Refrigerante Lata', image: '/placeholder.svg' }
      ]
    }
  ];

  const handleAddCombo = async (combo: ComboItem) => {
    setIsAddingToCart(combo.id);
    
    await new Promise(resolve => setTimeout(resolve, 600));
    
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
    
    showAddToCartSuccess(combo.name);
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
      case 'hot': return <Flame className="w-3 h-3" />;
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
    <div className="bg-gradient-to-r from-orange-50 to-red-50 py-8 mb-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
            🔥 Combos Especiais
          </h2>
          <p className="text-gray-600">
            Economize até R$ 20 com nossos combos exclusivos!
          </p>
        </div>

        {/* Layout horizontal com scroll e altura consistente */}
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide items-stretch">
          {combos.map((combo) => (
            <div key={combo.id} className="flex-shrink-0 w-72 h-[420px] bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col">
              
              {/* Header com badges */}
              <div className="relative p-4 pb-2 flex-shrink-0">
                {combo.badge && (
                  <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${getBadgeColor(combo.badge)}`}>
                    {getBadgeIcon(combo.badge)}
                    {combo.badge === 'hot' ? 'QUENTE' : combo.badge === 'new' ? 'NOVO' : 'LIMITADO'}
                  </div>
                )}
                
                {combo.timeLeft && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <Timer className="w-3 h-3" />
                    {formatTime(combo.timeLeft)}
                  </div>
                )}
              </div>

              {/* Imagens dos itens */}
              <div className="px-4 mb-3 flex-shrink-0">
                <div className="flex gap-1 justify-center">
                  {combo.items.slice(0, 3).map((item, index) => (
                    <img
                      key={index}
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg border-2 border-white shadow-sm"
                    />
                  ))}
                </div>
              </div>

              {/* Conteúdo flexível */}
              <div className="px-4 pb-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{combo.name}</h3>
                  
                  {/* Lista de itens */}
                  <div className="mb-3">
                    {combo.items.map((item, index) => (
                      <div key={index} className="text-xs text-gray-600 flex items-center">
                        <Plus className="w-3 h-3 mr-1 text-orange-500" />
                        {item.name}
                      </div>
                    ))}
                  </div>

                  {/* Preços */}
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-sm line-through text-gray-400">
                        R$ {combo.originalPrice.toFixed(2).replace('.', ',')}
                      </span>
                      <div className="text-xl font-bold text-orange-500">
                        R$ {combo.comboPrice.toFixed(2).replace('.', ',')}
                      </div>
                    </div>
                    <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-bold">
                      Economize R$ {combo.savings.toFixed(2).replace('.', ',')}
                    </div>
                  </div>
                </div>

                {/* Botões de ação sempre no final */}
                <div className="space-y-2 mt-auto">
                  <WhatsAppOrder 
                    variant="quick"
                    text="Pedir Combo"
                    pizzaName={combo.name}
                    pizzaPrice={combo.comboPrice}
                    className="w-full justify-center text-sm"
                  />
                  
                  {isAddingToCart === combo.id ? (
                    <ButtonLoading isLoading={true} className="w-full text-sm px-4 py-2">
                      Adicionando...
                    </ButtonLoading>
                  ) : (
                    <button
                      onClick={() => handleAddCombo(combo)}
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full transition-colors font-medium text-sm flex items-center justify-center gap-1 hover:shadow-md"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Adicionar ao Carrinho
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Indicador de scroll para mobile */}
        <div className="text-center mt-4 md:hidden">
          <p className="text-xs text-gray-500">
            ← Deslize para ver mais combos →
          </p>
        </div>
      </div>
    </div>
  );
};

export default FunctionalCombos;
