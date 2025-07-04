import React, { useState, useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ShoppingCart, Clock, Gift, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CartRecoverySystem = () => {
  const { state } = useCart();
  const { toast } = useToast();
  const [showRecoveryBanner, setShowRecoveryBanner] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10 * 60); // 10 minutos
  const [customerName, setCustomerName] = useState('');

  useEffect(() => {
    const name = localStorage.getItem('customer_name');
    if (name) {
      setCustomerName(name);
    }
  }, []);

  useEffect(() => {
    if (state.items.length > 0) {
      // Iniciar timer de abandono de carrinho
      const abandonTimer = setTimeout(() => {
        setShowRecoveryBanner(true);
        toast({
          title: customerName ? `${customerName}, não esqueça seu pedido! 🍕` : "Não esqueça seu pedido! 🍕",
          description: "Suas pizzas estão esperando por você no carrinho",
          duration: 5000,
        });
      }, 3 * 60 * 1000); // 3 minutos

      return () => clearTimeout(abandonTimer);
    }
  }, [state.items.length, customerName, toast]);

  // Timer countdown
  useEffect(() => {
    if (showRecoveryBanner && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [showRecoveryBanner, timeLeft]);

  // Auto hide banner when timer ends
  useEffect(() => {
    if (timeLeft === 0) {
      setShowRecoveryBanner(false);
    }
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleWhatsAppRecovery = () => {
    const items = state.items.map(item => 
      `• ${item.name} (${item.quantity}x) - R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}`
    ).join('\n');

    const message = `${customerName ? `Oi! Sou ${customerName} e` : 'Olá! Eu'} estava montando um pedido no site e gostaria de finalizar:\n\n${items}\n\n💰 Total: R$ ${state.total.toFixed(2).replace('.', ',')}\n\nPode me ajudar a finalizar? 😊`;
    
    const whatsappUrl = `https://wa.me/5547992809169?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    setShowRecoveryBanner(false);
  };

  const handleDismiss = () => {
    setShowRecoveryBanner(false);
    localStorage.setItem('recovery_dismissed', Date.now().toString());
  };

  // Não mostrar se não há itens ou se foi dispensado recentemente
  if (state.items.length === 0 || !showRecoveryBanner) {
    return null;
  }

  const recentDismissal = localStorage.getItem('recovery_dismissed');
  if (recentDismissal && Date.now() - parseInt(recentDismissal) < 30 * 60 * 1000) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 shadow-2xl animate-pulse">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              <span className="font-bold">
                {customerName ? `${customerName}, ` : ''}Carrinho Esperando!
              </span>
            </div>
            <button 
              onClick={handleDismiss} 
              className="text-white/80 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-sm opacity-90">
                Você tem {state.items.length} {state.items.length === 1 ? 'item' : 'itens'} no carrinho
              </p>
              <p className="font-bold text-lg">
                Total: R$ {state.total.toFixed(2).replace('.', ',')}
              </p>
            </div>

            {/* Timer de urgência */}
            <div className="bg-white/20 rounded-lg p-2 text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-medium">Oferta expira em:</span>
              </div>
              <div className="text-xl font-bold">
                {formatTime(timeLeft)}
              </div>
            </div>

            {/* Oferta especial */}
            <div className="bg-yellow-400 text-yellow-900 rounded-lg p-2 text-center">
              <Gift className="w-4 h-4 mx-auto mb-1" />
              <p className="text-xs font-bold">
                FRETE GRÁTIS se finalizar agora!
              </p>
            </div>

            <Button 
              onClick={handleWhatsAppRecovery}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold"
            >
              🍕 Finalizar no WhatsApp
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CartRecoverySystem;