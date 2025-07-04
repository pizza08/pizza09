
import React, { useState } from 'react';
import { Plus, Star, Clock } from 'lucide-react';
import WhatsAppOrder from './WhatsAppOrder';
import { ButtonLoading } from './LoadingStates';
import { useCartToast } from '../hooks/useCartToast';

interface DrinkCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  size?: string;
  popular?: boolean;
  onAddToCart: (drink: any) => void;
}

const DrinkCard = ({ id, name, description, price, image, size, popular, onAddToCart }: DrinkCardProps) => {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { showAddToCartSuccess } = useCartToast();

  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAddingToCart(true);
    
    // Simular tempo real de processamento
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const drinkItem = {
      id,
      name,
      price,
      image,
      quantity: 1
    };
    
    onAddToCart(drinkItem);
    showAddToCartSuccess(name);
    
    setIsAddingToCart(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 group">
      {/* Badge de Popular */}
      {popular && (
        <div className="absolute top-2 left-2 z-10">
          <div className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
            🔥 Popular
          </div>
        </div>
      )}

      {/* Imagem com lazy loading */}
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 mb-1">{name}</h3>
        {size && (
          <p className="text-sm text-orange-600 font-medium mb-2">{size}</p>
        )}
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{description}</p>
        
        {/* Preço */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex flex-col">
            <span className="text-xl font-bold text-orange-600">
              R$ {price.toFixed(2).replace('.', ',')}
            </span>
            <div className="flex items-center gap-1 text-xs text-green-600 font-medium">
              <Clock className="w-3 h-3" />
              <span>Entrega rápida</span>
            </div>
          </div>
        </div>
        
        {/* Botões de Ação */}
        <div className="space-y-2">
          {/* WhatsApp - Botão Principal */}
          <WhatsAppOrder 
            variant="quick"
            text="Pedir via WhatsApp"
            drinkName={name}
            drinkPrice={price}
            className="w-full justify-center text-sm"
          />
          
          {/* Botão Adicionar ao Carrinho */}
          {isAddingToCart ? (
            <ButtonLoading isLoading={true} className="w-full text-xs px-4 py-2">
              Adicionando...
            </ButtonLoading>
          ) : (
            <button
              onClick={handleQuickAdd}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full transition-colors font-medium text-sm flex items-center justify-center gap-1 hover:shadow-md"
            >
              <Plus className="w-4 h-4" />
              Adicionar ao Carrinho
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DrinkCard;
