
import React from 'react';
import { CheckCircle, Clock, Home } from 'lucide-react';
import { Button } from './ui/button';

interface PaymentConfirmationProps {
  onContinueShopping: () => void;
  onGoHome: () => void;
}

const PaymentConfirmation = ({ onContinueShopping, onGoHome }: PaymentConfirmationProps) => {
  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg border text-center">
      <div className="bg-green-100 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
        <CheckCircle className="w-12 h-12 text-green-600" />
      </div>
      
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Obrigado pela compra!
      </h2>
      
      <p className="text-lg text-gray-600 mb-8">
        🍕 Sua Pizza chegará em sua casa!
      </p>
      
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-center text-orange-800 mb-2">
          <Clock className="w-5 h-5 mr-2" />
          <span className="font-semibold">Tempo estimado: 25-35 minutos</span>
        </div>
        <p className="text-orange-700 text-sm">
          Você receberá atualizações sobre o status do seu pedido.
        </p>
      </div>
      
      <div className="space-y-3">
        <Button
          onClick={onContinueShopping}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white"
        >
          Fazer outro pedido
        </Button>
        
        <Button
          onClick={onGoHome}
          variant="outline"
          className="w-full border-orange-500 text-orange-500 hover:bg-orange-50"
        >
          <Home className="w-4 h-4 mr-2" />
          Voltar ao início
        </Button>
      </div>
    </div>
  );
};

export default PaymentConfirmation;
