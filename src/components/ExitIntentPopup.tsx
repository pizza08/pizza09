
import React, { useState, useEffect } from 'react';
import { X, Gift, Clock, Star, Shield, Truck } from 'lucide-react';

interface ExitIntentPopupProps {
  onClose: () => void;
  onAccept: (couponCode: string) => void;
}

const ExitIntentPopup = ({ onClose, onAccept }: ExitIntentPopupProps) => {
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutos
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
    onAccept('VOLTA15');
    handleClose();
  };

  // Auto-close quando o timer zerar
  useEffect(() => {
    if (timeLeft === 0) {
      handleClose();
    }
  }, [timeLeft]);

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 transition-all duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`}>
      <div className={`bg-white rounded-2xl max-w-md w-full transform transition-all duration-300 relative overflow-hidden ${isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}>
        
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-orange-100 to-transparent rounded-full transform translate-x-8 -translate-y-8"></div>
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-6 relative">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
              <Gift className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              🍕 Espera! Não vá embora!
            </h2>
            <p className="text-gray-600 text-lg">
              Temos uma <strong className="text-orange-600">oferta especial</strong> só para você!
            </p>
          </div>

          {/* Offer */}
          <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-5 mb-6 border-2 border-orange-200 relative overflow-hidden">
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold animate-pulse">
              EXCLUSIVO
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">
                15% OFF
              </div>
              <p className="text-gray-700 font-semibold text-lg mb-3">
                Na sua primeira compra + Frete GRÁTIS
              </p>
              <div className="bg-white rounded-lg px-4 py-3 border-2 border-dashed border-orange-300 mb-3">
                <div className="text-sm text-gray-600 mb-1">Use o cupom:</div>
                <code className="text-xl font-bold text-orange-600 tracking-wider">VOLTA15</code>
              </div>
              <p className="text-sm text-gray-600">
                ✅ Válido para qualquer pizza • ✅ Sem valor mínimo
              </p>
            </div>
          </div>

          {/* Timer */}
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 mb-6 text-center">
            <div className="flex items-center justify-center gap-2 text-red-600 mb-2">
              <Clock className="w-5 h-5 animate-spin" />
              <span className="font-bold text-lg">Oferta expira em:</span>
            </div>
            <div className="text-3xl font-bold text-red-700 font-mono">
              {formatTime(timeLeft)}
            </div>
            <p className="text-sm text-red-600 mt-1">Não perca essa oportunidade!</p>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-2 gap-3 mb-6 text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <Truck className="w-4 h-4 text-green-500" />
              <span>Entrega em 20min</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Shield className="w-4 h-4 text-blue-500" />
              <span>Pagamento seguro</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Star className="w-4 h-4 text-yellow-500" />
              <span>+15.000 clientes</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Gift className="w-4 h-4 text-orange-500" />
              <span>Satisfação garantida</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleAccept}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 px-6 rounded-full transition-all transform hover:scale-105 shadow-lg text-lg"
            >
              🎉 SIM! Quero Minha Pizza com 15% OFF
            </button>
            <button
              onClick={handleClose}
              className="w-full text-gray-500 hover:text-gray-700 py-2 transition-colors text-sm underline"
            >
              Não, obrigado. Prefiro pagar o preço cheio.
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="text-center mt-4 text-xs text-gray-500 border-t border-gray-100 pt-3">
            <p>🔒 Dados protegidos • 🚀 Ativação instantânea • ⭐ Avaliação 4.9/5</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExitIntentPopup;
