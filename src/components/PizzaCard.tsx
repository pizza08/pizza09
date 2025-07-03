
import React, { useState } from 'react';
import { Plus, Star } from 'lucide-react';
import PizzaCustomizationModal from './PizzaCustomizationModal';
import RatingSystem from './RatingSystem';
import SocialShare from './SocialShare';
import ImageGallery from './ImageGallery';
import UrgencyBadges from './UrgencyBadges';
import StockCounter from './StockCounter';
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
  const [showRating, setShowRating] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const pizza = { 
    id, 
    name, 
    description, 
    price, 
    basePrice: price, // Use price as basePrice
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

  // Mock data for enhanced features
  const images = [image, image, image]; // Multiple angles/views
  const isBestseller = rating >= 4.5;
  const isLimited = Math.random() > 0.7;
  const lastUnits = isLimited ? Math.floor(Math.random() * 5) + 1 : null;
  const isTrending = Math.random() > 0.8;

  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAddingToCart(true);
    
    // Simular delay da operação
    await new Promise(resolve => setTimeout(resolve, 800));
    
    onAddToCart({
      id,
      name: `${name} (Média)`,
      price,
      image,
      quantity: 1
    });
    
    setIsAddingToCart(false);
  };

  const handleRatingSubmitted = (ratingValue: number, comment: string) => {
    console.log(`Pizza ${name} avaliada com ${ratingValue} estrelas: ${comment}`);
    // Aqui você implementaria a lógica para salvar a avaliação
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="relative" onClick={() => setIsModalOpen(true)}>
          {/* Enhanced Image Gallery */}
          <ImageGallery
            images={images}
            alt={name}
            className="w-full h-48 object-cover cursor-pointer"
          />
          
          {/* Urgency Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {isBestseller && <UrgencyBadges type="bestseller" />}
            {isTrending && <UrgencyBadges type="trending" />}
            {isLimited && <UrgencyBadges type="limited" />}
            {lastUnits && <UrgencyBadges type="lastunits" value={lastUnits} />}
          </div>
          
          {/* Rating Badge */}
          <div className="absolute top-3 right-3 bg-white rounded-full px-2 py-1 flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium">{rating}</span>
          </div>
        </div>
        
          <div className="p-5">
          <div onClick={() => setIsModalOpen(true)} className="cursor-pointer">
            <h3 className="text-xl font-bold text-gray-800 mb-2">{name}</h3>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{description}</p>
            
            {/* Stock Counter */}
            <div className="mb-3">
              <StockCounter productName={name} className="text-xs" />
            </div>
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">A partir de</span>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-orange-500">
                  R$ {(price * 0.8).toFixed(2).replace('.', ',')}
                </span>
                {isLimited && (
                  <span className="text-sm line-through text-gray-400">
                    R$ {price.toFixed(2).replace('.', ',')}
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex space-x-2">
              {isAddingToCart ? (
                <ButtonLoading isLoading={true}>Adicionando...</ButtonLoading>
              ) : (
                <>
                  <button
                    onClick={handleQuickAdd}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-full transition-colors"
                    title="Adicionar tamanho médio"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full transition-colors font-medium"
                  >
                    Personalizar
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Enhanced Social Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-3 border-t border-gray-100">
            <div className="flex-1">
              <SocialShare 
                pizzaName={name}
                pizzaImage={image}
                pizzaPrice={price}
              />
            </div>
            <button
              onClick={() => setShowRating(!showRating)}
              className="text-orange-500 hover:text-orange-600 text-sm font-medium transition-colors"
            >
              {showRating ? 'Ocultar Avaliação' : 'Avaliar Pizza'}
            </button>
          </div>

          {/* Sistema de avaliação */}
          {showRating && (
            <div className="mt-4">
              <RatingSystem
                pizzaId={id}
                pizzaName={name}
                onRatingSubmitted={handleRatingSubmitted}
              />
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
