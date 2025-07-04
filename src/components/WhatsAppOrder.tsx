
import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useCartToast } from '../hooks/useCartToast';

interface WhatsAppOrderProps {
  className?: string;
  text?: string;
  variant?: 'button' | 'cart' | 'quick';
  pizzaName?: string;
  pizzaPrice?: number;
  drinkName?: string;
  drinkPrice?: number;
}

const WhatsAppOrder = ({ 
  className = "", 
  text = "Pedir via WhatsApp", 
  variant = "button",
  pizzaName,
  pizzaPrice,
  drinkName,
  drinkPrice
}: WhatsAppOrderProps) => {
  const { state } = useCart();
  const { showWhatsAppRedirect } = useCartToast();
  const whatsappUrl = "https://wa.me/message/6DSN3FA5UPI4G1";

  const handleWhatsAppClick = () => {
    showWhatsAppRedirect();
    
    // Verificar se temos dados do cliente
    const customerName = localStorage.getItem('customer_name');
    const greeting = customerName ? `Oi! Sou ${customerName} e gostaria` : "Olá! Gostaria";
    
    let message = `${greeting} de fazer um pedido:\n\n`;
    
    // Se for um produto específico
    if (pizzaName && pizzaPrice) {
      message += `🍕 ${pizzaName}\n`;
      message += `💰 R$ ${pizzaPrice.toFixed(2).replace('.', ',')}\n\n`;
    } else if (drinkName && drinkPrice) {
      message += `🥤 ${drinkName}\n`;
      message += `💰 R$ ${drinkPrice.toFixed(2).replace('.', ',')}\n\n`;
    }
    
    // Se for do carrinho, incluir todos os itens
    if (variant === 'cart' && state.items.length > 0) {
      message += "📋 Meu carrinho:\n";
      state.items.forEach(item => {
        message += `• ${item.name} (${item.quantity}x) - R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}\n`;
      });
      message += `\n💰 Total: R$ ${state.total.toFixed(2).replace('.', ',')}\n\n`;
    }
    
    message += "Podem me ajudar com o pedido? 😊";
    
    const encodedMessage = encodeURIComponent(message);
    const finalUrl = `${whatsappUrl}?text=${encodedMessage}`;
    
    window.open(finalUrl, '_blank');
  };

  const getButtonStyles = () => {
    switch (variant) {
      case 'cart':
        return "w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2 hover:shadow-lg transition-all";
      case 'quick':
        return "bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full transition-colors font-medium flex items-center gap-2 hover:shadow-md";
      default:
        return "bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2 transition-colors hover:shadow-lg";
    }
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className={`${getButtonStyles()} ${className}`}
    >
      <MessageCircle className="w-5 h-5" />
      {text}
    </button>
  );
};

export default WhatsAppOrder;
