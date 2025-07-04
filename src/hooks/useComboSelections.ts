
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface ComboSelectionData {
  comboId: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  selectedPizzas: Array<{
    name: string;
    size: string;
    price: number;
  }>;
  totalPrice: number;
}

export const useComboSelections = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const createComboSelection = async (selectionData: ComboSelectionData) => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('combo_selections')
        .insert({
          combo_id: selectionData.comboId,
          customer_name: selectionData.customerName,
          customer_phone: selectionData.customerPhone,
          customer_email: selectionData.customerEmail || null,
          selected_pizzas: selectionData.selectedPizzas,
          total_price: selectionData.totalPrice,
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      toast({
        title: "🍕 Combo personalizado criado!",
        description: "Seu combo foi registrado com sucesso.",
      });

      return { success: true, data };
      
    } catch (error) {
      console.error('Erro ao criar seleção de combo:', error);
      toast({
        title: "❌ Erro ao personalizar combo",
        description: "Não foi possível registrar seu combo. Tente novamente.",
        variant: "destructive",
      });
      
      return { success: false, error };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createComboSelection,
    isLoading,
  };
};
