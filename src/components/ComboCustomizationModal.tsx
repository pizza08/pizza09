
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { X, Pizza, ShoppingCart } from 'lucide-react';
import { pizzas } from '@/data/pizzas';
import { drinks } from '@/data/drinks';
import { useCart } from '@/contexts/CartContext';
import { useCartToast } from '@/hooks/useCartToast';

interface ComboItem {
  id: string;
  name: string;
  originalPrice: number;
  comboPrice: number;
  pizzaCount: number;
  cokeCount: number;
}

interface ComboCustomizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  combo: ComboItem;
}

const ComboCustomizationModal = ({ isOpen, onClose, combo }: ComboCustomizationModalProps) => {
  const [selectedPizzas, setSelectedPizzas] = useState<string[]>(new Array(combo.pizzaCount).fill(''));
  const [selectedDrinks, setSelectedDrinks] = useState<string[]>(new Array(combo.cokeCount).fill(''));
  const { dispatch } = useCart();
  const { showAddToCartSuccess } = useCartToast();

  // Filtrar apenas refrigerantes de 2L
  const availableDrinks = drinks.filter(drink => 
    drink.category === 'refrigerante' && drink.size === '2L'
  );

  const handlePizzaSelection = (index: number, pizzaName: string) => {
    const newSelections = [...selectedPizzas];
    newSelections[index] = pizzaName;
    setSelectedPizzas(newSelections);
  };

  const handleDrinkSelection = (index: number, drinkName: string) => {
    const newSelections = [...selectedDrinks];
    newSelections[index] = drinkName;
    setSelectedDrinks(newSelections);
  };

  const allPizzasSelected = selectedPizzas.every(pizza => pizza !== '');
  const allDrinksSelected = selectedDrinks.every(drink => drink !== '');
  const isFormValid = allPizzasSelected && allDrinksSelected;

  const handleAddToCart = () => {
    if (!isFormValid) return;

    const customCombo = {
      id: `${combo.id}-${Date.now()}`,
      name: combo.name,
      price: combo.comboPrice,
      image: pizzas.find(p => p.name === selectedPizzas[0])?.image || '/placeholder.svg',
      quantity: 1,
      customization: {
        pizzas: selectedPizzas,
        drinks: selectedDrinks,
        originalCombo: combo
      }
    };

    dispatch({ type: 'ADD_ITEM', payload: customCombo });
    showAddToCartSuccess(combo.name);
    onClose();
    resetForm();
  };

  const resetForm = () => {
    setSelectedPizzas(new Array(combo.pizzaCount).fill(''));
    setSelectedDrinks(new Array(combo.cokeCount).fill(''));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Pizza className="w-5 h-5 text-orange-500" />
            Personalizar {combo.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Seleção de Pizzas */}
          <div>
            <h3 className="font-semibold mb-4 text-gray-800">
              Escolha {combo.pizzaCount} pizza{combo.pizzaCount > 1 ? 's' : ''} grande{combo.pizzaCount > 1 ? 's' : ''}:
            </h3>
            <div className="space-y-3">
              {Array.from({ length: combo.pizzaCount }, (_, index) => (
                <div key={index}>
                  <Label className="text-sm font-medium">Pizza {index + 1}</Label>
                  <Select
                    value={selectedPizzas[index]}
                    onValueChange={(value) => handlePizzaSelection(index, value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione uma pizza" />
                    </SelectTrigger>
                    <SelectContent>
                      {pizzas.map((pizza) => (
                        <SelectItem key={pizza.id} value={pizza.name}>
                          <div className="flex items-center justify-between w-full">
                            <span>{pizza.name}</span>
                            <span className="text-sm text-gray-500 ml-2">
                              R$ {pizza.sizes.large.price.toFixed(2).replace('.', ',')}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>
          </div>

          {/* Seleção de Bebidas */}
          <div>
            <h3 className="font-semibold mb-4 text-gray-800">
              Escolha {combo.cokeCount} bebida{combo.cokeCount > 1 ? 's' : ''} de 2L:
            </h3>
            <div className="space-y-3">
              {Array.from({ length: combo.cokeCount }, (_, index) => (
                <div key={index}>
                  <Label className="text-sm font-medium">Bebida {index + 1}</Label>
                  <Select
                    value={selectedDrinks[index]}
                    onValueChange={(value) => handleDrinkSelection(index, value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione uma bebida" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableDrinks.map((drink) => (
                        <SelectItem key={drink.id} value={drink.name}>
                          <div className="flex items-center justify-between w-full">
                            <span>{drink.name}</span>
                            <span className="text-sm text-gray-500 ml-2">
                              R$ {drink.price.toFixed(2).replace('.', ',')}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>
          </div>

          {/* Resumo do Combo */}
          <div className="bg-orange-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">Resumo do Combo:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              {selectedPizzas.map((pizza, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Pizza className="w-4 h-4 text-orange-500" />
                  {pizza || `Pizza ${index + 1} - Não selecionada`}
                </li>
              ))}
              {selectedDrinks.map((drink, index) => (
                <li key={index} className="flex items-center gap-2">
                  🥤 {drink || `Bebida ${index + 1} - Não selecionada`}
                </li>
              ))}
            </ul>
            <div className="mt-3 pt-3 border-t border-orange-200">
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg">Total:</span>
                <span className="font-bold text-xl text-orange-600">
                  R$ {combo.comboPrice.toFixed(2).replace('.', ',')}
                </span>
              </div>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancelar
            </Button>
            
            <Button
              onClick={handleAddToCart}
              disabled={!isFormValid}
              className="flex-1 bg-orange-500 hover:bg-orange-600"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Adicionar ao Carrinho
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ComboCustomizationModal;
