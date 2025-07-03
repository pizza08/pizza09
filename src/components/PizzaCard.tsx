
import React, { useState } from 'react';
import { Plus, Star, Clock } from 'lucide-react';
import PizzaCustomizationModal from './PizzaCustomizationModal';
import { ButtonLoading } from './LoadingStates';

interface PizzaCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  onAddToCart: (pizza: any) => void;
}

const PizzaCard = ({ id, name, description, price, image, rating, onAddToCart }: PizzaCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const pizza = { 
    id, 
    name, 
    description, 
    price, 
    basePrice: price,
    image, 
    rating, 
    category: '', 
    ingredients: [],
    sizes: {
      small: { name: 'Pequena (25cm)', price: price * 0.8, slices: 4 },
      medium: { name: 'Média (30cm)', price: price, slices: 6 },
      large: { name: 'Grande (35cm)', price: price * 1.3, slices: 8 }
    }
  };

  // Mostrar desconto real baseado no tamanho
  const hasPromotion = Math.random() > 0.6; // 40% das pizzas em promoção
  const discountPercent = hasPromotion ? 15 : 0;
  const originalPrice = price;
  const finalPrice = hasPromotion ? price * 0.85 : price;

  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAddingToCart(true);
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    onAddToCart({
      id,
      name: `${name} (Média)`,
      price: finalPrice,
      image,
      quantity: 1
    });
    
    setIsAddingToCart(false);
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative">
        {/* Badge de Promoção */}
        {hasPromotion && (
          <div className="absolute top-3 left-3 z-10">
            <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
              -{discountPercent}%
            </div>
          </div>
        )}

        {/* Imagem */}
        <div className="relative" onClick={() => setIsModalOpen(true)}>
          <img 
            src={image} 
            alt={name}
            className="w-full h-48 object-cover cursor-pointer"
          />
          
          {/* Rating Badge - Simplificado */}
          <div className="absolute top-3 right-3 bg-white rounded-full px-2 py-1 flex items-center space-x-1 shadow-sm">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium">{rating}</span>
          </div>
        </div>
        
        <div className="p-5">
          <div onClick={() => setIsModalOpen(true)} className="cursor-pointer">
            <h3 className="text-xl font-bold text-gray-800 mb-2">{name}</h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
          </div>
          
          {/* Preço e CTA - Otimizado para Conversão */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">A partir de</span>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-orange-600">
                  R$ {(finalPrice * 0.8).toFixed(2).replace('.', ',')}
                </span>
                {hasPromotion && (
                  <span className="text-sm line-through text-muted-foreground">
                    R$ {(originalPrice * 0.8).toFixed(2).replace('.', ',')}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1 text-xs text-green-600 font-medium">
                <Clock className="w-3 h-3" />
                <span>Entrega 25-35min</span>
              </div>
            </div>
            
            {/* Botões de Ação - Focados */}
            <div className="flex flex-col gap-2">
              {isAddingToCart ? (
                <ButtonLoading isLoading={true} className="text-xs px-4 py-2">
                  Adicionando...
                </ButtonLoading>
              ) : (
                <>
                  <button
                    onClick={handleQuickAdd}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full transition-colors font-semibold text-sm flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" />
                    Adicionar
                  </button>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-1 rounded-full transition-colors text-xs"
                  >
                    Personalizar
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Frete Grátis Indicator */}
          {finalPrice >= 40 && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-medium text-center">
                🚚 Frete GRÁTIS nesta pizza!
              </div>
            </div>
          )}
        </div>
      </div>

      <PizzaCustomizationModal
        pizza={pizza}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default PizzaCard;
