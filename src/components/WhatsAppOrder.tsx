
import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

interface WhatsAppOrderProps {
  className?: string;
  text?: string;
  variant?: 'button' | 'cart' | 'quick';
  pizzaName?: string;
  pizzaPrice?: number;
}

const WhatsAppOrder = ({ 
  className = "", 
  text = "Pedir via WhatsApp", 
  variant = "button",
  pizzaName,
  pizzaPrice 
}: WhatsAppOrderProps) => {
  const { state } = useCart();
  const phoneNumber = "5511999999999"; // Número da pizzaria

  const generateWhatsAppMessage = () => {
    let message = "🍕 *Pedido de Pizza*\n\n";
    
    if (variant === 'quick' && pizzaName && pizzaPrice) {
      // Pedido rápido de uma pizza específica
      message += `*${pizzaName}*\n`;
      message += `Preço: R$ ${pizzaPrice.toFixed(2).replace('.', ',')}\n\n`;
      message += "👋 Olá! Gostaria de fazer este pedido.\n";
      message += "Podem me enviar mais detalhes sobre tamanhos e entrega?";
    } else if (state.items.length > 0) {
      // Pedido com itens do carrinho
      message += "*Itens do Pedido:*\n";
      
      state.items.forEach((item, index) => {
        message += `${index + 1}. ${item.name}\n`;
        message += `   Qtd: ${item.quantity} | Preço: R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}\n\n`;
      });
      
      const total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      message += `*Total: R$ ${total.toFixed(2).replace('.', ',')}*\n\n`;
      message += "👋 Olá! Gostaria de finalizar este pedido.\n";
      message += "Podem confirmar o endereço de entrega e forma de pagamento?";
    } else {
      // Mensagem geral
      message += "👋 Olá! Gostaria de fazer um pedido de pizza.\n";
      message += "Podem me enviar o cardápio e informações sobre entrega?";
    }
    
    return encodeURIComponent(message);
  };

  const handleWhatsAppClick = () => {
    const message = generateWhatsAppMessage();
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const getButtonStyles = () => {
    switch (variant) {
      case 'cart':
        return "w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2";
      case 'quick':
        return "bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full transition-colors font-medium flex items-center gap-2";
      default:
        return "bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2 transition-colors";
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
