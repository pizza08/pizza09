
import React, { useState, useEffect } from 'react';
import { X, Gift, Clock, Star } from 'lucide-react';

interface ExitIntentPopupProps {
  onClose: () => void;
  onAccept: (couponCode: string) => void;
}

const ExitIntentPopup = ({ onClose, onAccept }: ExitIntentPopupProps) => {
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 300);
  };

  const handleAccept = () => {
    onAccept('VOLTA10');
    handleClose();
  };

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 transition-all duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`}>
      <div className={`bg-white rounded-2xl max-w-md w-full p-6 transform transition-all duration-300 ${isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}>
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Gift className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Espera! Não vá embora! 🍕
          </h2>
          <p className="text-gray-600">
            Temos uma oferta especial só para você!
          </p>
        </div>

        {/* Offer */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4 mb-6 border-2 border-orange-200">
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">
              10% OFF
            </div>
            <p className="text-gray-700 font-medium">
              Na sua primeira compra
            </p>
            <div className="bg-white rounded-lg px-3 py-2 mt-3 border-2 border-dashed border-orange-300">
              <code className="text-lg font-bold text-orange-600">VOLTA10</code>
            </div>
          </div>
        </div>

        {/* Timer */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-6">
          <div className="flex items-center justify-center gap-2 text-red-600">
            <Clock className="w-4 h-4" />
            <span className="font-bold">Oferta expira em: {formatTime(timeLeft)}</span>
          </div>
        </div>

        {/* Benefits */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Star className="w-4 h-4 text-yellow-500" />
            <span>Entrega rápida em toda a cidade</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Star className="w-4 h-4 text-yellow-500" />
            <span>Ingredientes frescos e selecionados</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Star className="w-4 h-4 text-yellow-500" />
            <span>Mais de 1000 clientes satisfeitos</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleAccept}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 px-6 rounded-full transition-all transform hover:scale-105"
          >
            🎉 Quero Aproveitar a Oferta!
          </button>
          <button
            onClick={handleClose}
            className="w-full text-gray-500 hover:text-gray-700 py-2 transition-colors text-sm"
          >
            Não, obrigado. Talvez depois.
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="text-center mt-4 text-xs text-gray-500">
          <p>✓ Sem taxas ocultas • ✓ Cancelamento grátis • ✓ Suporte 24/7</p>
        </div>
      </div>
    </div>
  );
};

// Hook para detectar intenção de saída
export const useExitIntent = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        setShowPopup(true);
        setHasShown(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [hasShown]);

  const closePopup = () => setShowPopup(false);

  return { showPopup, closePopup };
};

export default ExitIntentPopup;
