
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface LeadData {
  nome: string;
  telefone: string;
  email?: string;
  interesse?: string;
  mensagem?: string;
  origem?: string;
}

export const useLeads = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const createLead = async (leadData: LeadData) => {
    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from('leads')
        .insert({
          nome: leadData.nome,
          telefone: leadData.telefone,
          email: leadData.email || null,
          interesse: leadData.interesse || null,
          mensagem: leadData.mensagem || null,
          origem: leadData.origem || null,
        });

      if (error) {
        throw error;
      }

      toast({
        title: "✅ Lead capturado!",
        description: "Seus dados foram registrados com sucesso.",
      });

      return { success: true };
      
    } catch (error) {
      console.error('Erro ao criar lead:', error);
      toast({
        title: "❌ Erro ao registrar",
        description: "Não foi possível registrar seus dados. Tente novamente.",
        variant: "destructive",
      });
      
      return { success: false, error };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createLead,
    isLoading,
  };
};
