
import React from 'react';
import { Plus, Star } from 'lucide-react';

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
  const handleAddToCart = () => {
    onAddToCart({
      id,
      name,
      price,
      image,
      quantity: 1
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative">
        <img 
          src={image} 
          alt={name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 right-3 bg-white rounded-full px-2 py-1 flex items-center space-x-1">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="text-sm font-medium">{rating}</span>
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-orange-500">
              R$ {price.toFixed(2).replace('.', ',')}
            </span>
          </div>
          
          <button
            onClick={handleAddToCart}
            className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full transition-colors group"
          >
            <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PizzaCard;
