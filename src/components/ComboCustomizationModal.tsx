
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Pizza, ShoppingCart } from 'lucide-react';
import { pizzas } from '@/data/pizzas';
import { useComboSelections } from '@/hooks/useComboSelections';
import { useLeads } from '@/hooks/useLeads';
import { ButtonLoading } from './LoadingStates';

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
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  
  const { createComboSelection, isLoading: isCreatingCombo } = useComboSelections();
  const { createLead, isLoading: isCreatingLead } = useLeads();

  const handlePizzaSelection = (index: number, pizzaName: string) => {
    const newSelections = [...selectedPizzas];
    newSelections[index] = pizzaName;
    setSelectedPizzas(newSelections);
  };

  const allPizzasSelected = selectedPizzas.every(pizza => pizza !== '');
  const isFormValid = customerName && customerPhone && allPizzasSelected;

  const handleSubmit = async () => {
    if (!isFormValid) return;

    // Criar lead primeiro
    await createLead({
      nome: customerName,
      telefone: customerPhone,
      email: customerEmail,
      interesse: combo.name,
      origem: 'combo-personalizacao'
    });

    // Preparar dados das pizzas selecionadas
    const selectedPizzasData = selectedPizzas.map(pizzaName => {
      const pizza = pizzas.find(p => p.name === pizzaName);
      return {
        name: pizzaName,
        size: 'Grande',
        price: pizza?.price || 0
      };
    });

    // Criar seleção de combo
    const result = await createComboSelection({
      comboId: combo.id,
      customerName,
      customerPhone,
      customerEmail,
      selectedPizzas: selectedPizzasData,
      totalPrice: combo.comboPrice
    });

    if (result.success) {
      onClose();
      resetForm();
    }
  };

  const resetForm = () => {
    setSelectedPizzas(new Array(combo.pizzaCount).fill(''));
    setCustomerName('');
    setCustomerPhone('');
    setCustomerEmail('');
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
                              R$ {pizza.price.toFixed(2).replace('.', ',')}
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
              <li className="flex items-center gap-2">
                🥤 {combo.cokeCount} Coca-Cola 2L
              </li>
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

          {/* Dados do Cliente */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800">Seus dados:</h3>
            
            <div>
              <Label htmlFor="name">Nome completo *</Label>
              <Input
                id="name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Digite seu nome completo"
                required
              />
            </div>

            <div>
              <Label htmlFor="phone">Telefone/WhatsApp *</Label>
              <Input
                id="phone"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="(11) 99999-9999"
                required
              />
            </div>

            <div>
              <Label htmlFor="email">E-mail (opcional)</Label>
              <Input
                id="email"
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="seu@email.com"
              />
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
            
            {isCreatingCombo || isCreatingLead ? (
              <ButtonLoading isLoading={true} className="flex-1">
                Processando...
              </ButtonLoading>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!isFormValid}
                className="flex-1 bg-orange-500 hover:bg-orange-600"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Confirmar Combo
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ComboCustomizationModal;
