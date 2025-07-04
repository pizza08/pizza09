
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
  const whatsappUrl = "https://wa.me/message/6DSN3FA5UPI4G1";

  const handleWhatsAppClick = () => {
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
