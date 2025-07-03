
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface OrderData {
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  deliveryAddress: string;
  paymentMethod: string;
  notes?: string;
  items: Array<{
    pizzaName: string;
    pizzaSize: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    customizations?: any;
  }>;
  totalAmount: number;
  deliveryFee: number;
}

export const useOrders = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const createOrder = async (orderData: OrderData) => {
    setIsLoading(true);
    
    try {
      // 1. Criar cliente
      const { data: customerData, error: customerError } = await supabase
        .from('customers')
        .insert({
          name: orderData.customerName,
          phone: orderData.customerPhone,
          email: orderData.customerEmail || null,
        })
        .select()
        .single();

      if (customerError) {
        throw customerError;
      }

      // 2. Criar pedido
      const { data: orderDataResult, error: orderError } = await supabase
        .from('orders')
        .insert({
          customer_id: customerData.id,
          total_amount: orderData.totalAmount,
          delivery_address: orderData.deliveryAddress,
          delivery_fee: orderData.deliveryFee,
          payment_method: orderData.paymentMethod,
          notes: orderData.notes || null,
        })
        .select()
        .single();

      if (orderError) {
        throw orderError;
      }

      // 3. Criar itens do pedido
      const orderItems = orderData.items.map(item => ({
        order_id: orderDataResult.id,
        pizza_name: item.pizzaName,
        pizza_size: item.pizzaSize,
        quantity: item.quantity,
        unit_price: item.unitPrice,
        total_price: item.totalPrice,
        customizations: item.customizations || {},
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) {
        throw itemsError;
      }

      toast({
        title: "🎉 Pedido realizado com sucesso!",
        description: `Seu pedido #${orderDataResult.id.slice(0, 8)} foi confirmado e será preparado em breve.`,
      });

      return { orderId: orderDataResult.id, success: true };
      
    } catch (error) {
      console.error('Erro ao criar pedido:', error);
      toast({
        title: "❌ Erro ao processar pedido",
        description: "Ocorreu um erro ao processar seu pedido. Tente novamente.",
        variant: "destructive",
      });
      
      return { success: false, error };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createOrder,
    isLoading,
  };
};
