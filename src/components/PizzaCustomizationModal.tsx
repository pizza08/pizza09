
import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingCart } from 'lucide-react';
import { Pizza, PizzaSize, Ingredient, pizzaSizes, availableIngredients } from '../data/pizzas';
import { useCart } from '../contexts/CartContext';

interface PizzaCustomizationModalProps {
  pizza: Pizza;
  isOpen: boolean;
  onClose: () => void;
}

const PizzaCustomizationModal = ({ pizza, isOpen, onClose }: PizzaCustomizationModalProps) => {
  const [selectedSize, setSelectedSize] = useState<PizzaSize>(pizzaSizes[1]); // Default: Média
  const [extraIngredients, setExtraIngredients] = useState<string[]>([]);
  const [removedIngredients, setRemovedIngredients] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const { dispatch } = useCart();

  if (!isOpen) return null;

  const toggleExtraIngredient = (ingredientId: string) => {
    setExtraIngredients(prev => 
      prev.includes(ingredientId) 
        ? prev.filter(id => id !== ingredientId)
        : [...prev, ingredientId]
    );
  };

  const toggleRemovedIngredient = (ingredientId: string) => {
    setRemovedIngredients(prev => 
      prev.includes(ingredientId) 
        ? prev.filter(id => id !== ingredientId)
        : [...prev, ingredientId]
    );
  };

  const calculateTotalPrice = () => {
    const basePrice = pizza.basePrice * selectedSize.multiplier;
    const extrasPrice = extraIngredients.reduce((total, ingredientId) => {
      const ingredient = availableIngredients.find(i => i.id === ingredientId);
      return total + (ingredient?.price || 0);
    }, 0);
    return (basePrice + extrasPrice) * quantity;
  };

  const handleAddToCart = () => {
    const customPizza = {
      id: `${pizza.id}-${Date.now()}`,
      name: `${pizza.name} (${selectedSize.name})`,
      price: calculateTotalPrice() / quantity,
      image: pizza.image,
      quantity,
      customization: {
        size: selectedSize,
        extraIngredients,
        removedIngredients,
        originalPizza: pizza
      }
    };

    dispatch({ type: 'ADD_ITEM', payload: customPizza });
    onClose();
  };

  const groupedIngredients = availableIngredients.reduce((groups, ingredient) => {
    if (!groups[ingredient.category]) {
      groups[ingredient.category] = [];
    }
    groups[ingredient.category].push(ingredient);
    return groups;
  }, {} as Record<string, Ingredient[]>);

  const categoryNames = {
    cheese: 'Queijos',
    meat: 'Carnes',
    vegetable: 'Vegetais',
    sauce: 'Molhos'
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img src={pizza.image} alt={pizza.name} className="w-16 h-16 rounded-lg object-cover" />
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{pizza.name}</h2>
              <p className="text-gray-600">{pizza.description}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Size Selection */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Escolha o Tamanho</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {pizzaSizes.map((size) => (
                <button
                  key={size.id}
                  onClick={() => setSelectedSize(size)}
                  className={`p-4 rounded-lg border-2 text-center transition-colors ${
                    selectedSize.id === size.id
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-orange-300'
                  }`}
                >
                  <div className="font-semibold">{size.name}</div>
                  <div className="text-sm text-gray-600">{size.description}</div>
                  <div className="text-orange-500 font-bold mt-1">
                    R$ {(pizza.basePrice * size.multiplier).toFixed(2).replace('.', ',')}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Current Ingredients */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Ingredientes Inclusos</h3>
            <div className="flex flex-wrap gap-2">
              {pizza.ingredients.map((ingredientId) => {
                const ingredient = availableIngredients.find(i => i.id === ingredientId);
                if (!ingredient) return null;
                
                const isRemoved = removedIngredients.includes(ingredientId);
                return (
                  <button
                    key={ingredientId}
                    onClick={() => toggleRemovedIngredient(ingredientId)}
                    className={`px-3 py-2 rounded-full text-sm transition-colors ${
                      isRemoved
                        ? 'bg-red-100 text-red-700 line-through'
                        : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {ingredient.name} {isRemoved && '(Removido)'}
                  </button>
                );
              })}
            </div>
            <p className="text-sm text-gray-500 mt-2">Clique para remover ingredientes</p>
          </div>

          {/* Extra Ingredients */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Ingredientes Extras</h3>
            {Object.entries(groupedIngredients).map(([category, ingredients]) => (
              <div key={category} className="mb-6">
                <h4 className="text-lg font-medium mb-3 text-gray-700">
                  {categoryNames[category as keyof typeof categoryNames]}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {ingredients.map((ingredient) => {
                    const isSelected = extraIngredients.includes(ingredient.id);
                    const isIncluded = pizza.ingredients.includes(ingredient.id);
                    
                    if (isIncluded) return null; // Don't show ingredients already included
                    
                    return (
                      <button
                        key={ingredient.id}
                        onClick={() => toggleExtraIngredient(ingredient.id)}
                        className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
                          isSelected
                            ? 'border-orange-500 bg-orange-50'
                            : 'border-gray-200 hover:border-orange-300'
                        }`}
                      >
                        <span className="font-medium">{ingredient.name}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-orange-500">
                            +R$ {ingredient.price.toFixed(2).replace('.', ',')}
                          </span>
                          {isSelected && <Plus className="w-4 h-4 text-orange-500" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Quantity and Add to Cart */}
          <div className="sticky bottom-0 bg-white border-t pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="font-medium">Quantidade:</span>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-semibold text-xl min-w-[2rem] text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-sm text-gray-600">Total</div>
                <div className="text-2xl font-bold text-orange-500">
                  R$ {calculateTotalPrice().toFixed(2).replace('.', ',')}
                </div>
              </div>
            </div>
            
            <button
              onClick={handleAddToCart}
              className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-full font-bold flex items-center justify-center space-x-2 transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Adicionar ao Carrinho</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PizzaCustomizationModal;
