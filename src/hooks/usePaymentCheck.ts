
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface PaymentCheckResponse {
  success: boolean;
  status?: string;
  expiresAt?: string;
  error?: string;
}

export const usePaymentCheck = () => {
  const [isChecking, setIsChecking] = useState(false);
  const { toast } = useToast();

  const checkPayment = async (paymentId: string): Promise<PaymentCheckResponse> => {
    setIsChecking(true);
    
    try {
      console.log('Checking payment status for:', paymentId);

      const { data, error } = await supabase.functions.invoke('check-payment', {
        body: { paymentId }
      });

      if (error) {
        throw error;
      }

      if (!data.success) {
        throw new Error(data.error || 'Erro ao verificar pagamento');
      }

      return data;
      
    } catch (error) {
      console.error('Erro ao verificar pagamento:', error);
      toast({
        title: "❌ Erro na verificação",
        description: "Não foi possível verificar o status do pagamento.",
        variant: "destructive",
      });
      
      return { success: false, error: error.message };
    } finally {
      setIsChecking(false);
    }
  };

  return {
    checkPayment,
    isChecking,
  };
};
