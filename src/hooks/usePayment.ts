
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface PaymentData {
  amount: number;
  description: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  customerCPF: string;
  orderId: string;
}

interface PaymentResponse {
  success: boolean;
  paymentId?: string;
  qrCode?: string;
  qrCodeImage?: string;
  amount?: number;
  status?: string;
  expiresAt?: string;
  error?: string;
}

export const usePayment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const createPayment = async (paymentData: PaymentData): Promise<PaymentResponse> => {
    setIsLoading(true);
    
    try {
      console.log('Sending payment data:', paymentData);

      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: paymentData
      });

      if (error) {
        throw error;
      }

      if (!data.success) {
        throw new Error(data.error || 'Erro ao criar pagamento');
      }

      toast({
        title: "✅ QR Code gerado!",
        description: "Escaneie o código para efetuar o pagamento.",
      });

      return data;
      
    } catch (error) {
      console.error('Erro ao criar pagamento:', error);
      toast({
        title: "❌ Erro no pagamento",
        description: "Não foi possível gerar o QR Code. Tente novamente.",
        variant: "destructive",
      });
      
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createPayment,
    isLoading,
  };
};
