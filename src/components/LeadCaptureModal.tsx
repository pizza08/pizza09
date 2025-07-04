import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Gift, Star, Users } from 'lucide-react';
import { useLeads } from '@/hooks/useLeads';

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLeadCaptured: (name: string, phone: string) => void;
}

const LeadCaptureModal = ({ isOpen, onClose, onLeadCaptured }: LeadCaptureModalProps) => {
  const [formData, setFormData] = useState({
    nome: '',
    telefone: ''
  });
  const { createLead, isLoading } = useLeads();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = await createLead({
      ...formData,
      origem: 'modal_boas_vindas',
      interesse: 'desconto_primeira_compra'
    });
    
    if (result.success) {
      // Salvar dados no localStorage para personalização
      localStorage.setItem('customer_name', formData.nome);
      localStorage.setItem('customer_phone', formData.telefone);
      localStorage.setItem('lead_captured', 'true');
      
      onLeadCaptured(formData.nome, formData.telefone);
      onClose();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSkip = () => {
    localStorage.setItem('lead_modal_shown', 'true');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            🍕 Bem-vindo ao Forno Nobre!
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Oferta especial */}
          <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-lg text-center">
            <Gift className="w-8 h-8 mx-auto mb-2" />
            <h3 className="font-bold text-lg mb-1">OFERTA ESPECIAL!</h3>
            <p className="text-sm">
              <strong>10% OFF</strong> na sua primeira compra
            </p>
          </div>

          {/* Social proof */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="font-bold">4.8/5</span>
            </div>
            <p className="text-sm text-gray-600 flex items-center justify-center gap-2">
              <Users className="w-4 h-4" />
              Mais de 500 clientes satisfeitos
            </p>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Qual é o seu nome?
              </label>
              <Input
                name="nome"
                value={formData.nome}
                onChange={handleInputChange}
                required
                placeholder="Seu primeiro nome"
                className="text-center"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                WhatsApp para ofertas exclusivas
              </label>
              <Input
                name="telefone"
                value={formData.telefone}
                onChange={handleInputChange}
                required
                placeholder="(47) 99999-9999"
                className="text-center"
              />
            </div>

            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-lg py-3"
            >
              {isLoading ? 'Salvando...' : '🎁 Quero meu desconto!'}
            </Button>
          </form>

          {/* Skip option */}
          <div className="text-center">
            <button
              onClick={handleSkip}
              className="text-sm text-gray-500 hover:text-gray-700 underline"
            >
              Agora não, obrigado
            </button>
          </div>

          {/* Garantias */}
          <div className="text-xs text-gray-500 text-center space-y-1">
            <p>✅ Seus dados estão seguros conosco</p>
            <p>✅ Enviaremos apenas ofertas especiais</p>
            <p>✅ Você pode cancelar a qualquer momento</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LeadCaptureModal;