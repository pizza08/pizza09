
import React from 'react';
import { CheckCircle, Clock, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
  const orderNumber = Math.random().toString(36).substr(2, 9).toUpperCase();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center p-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Pedido Confirmado!
          </h1>
          
          <p className="text-gray-600 mb-6">
            Seu pedido foi recebido com sucesso e está sendo preparado.
          </p>
          
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
            <p className="text-orange-800 font-semibold">
              Número do Pedido: #{orderNumber}
            </p>
          </div>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-center justify-center text-gray-600">
              <Clock className="w-5 h-5 mr-2 text-orange-500" />
              <span>Tempo estimado: 25-35 minutos</span>
            </div>
            
            <div className="flex items-center justify-center text-gray-600">
              <Phone className="w-5 h-5 mr-2 text-orange-500" />
              <span>Acompanhe pelo: (11) 9999-9999</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <Link
              to="/menu"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-full font-bold transition-colors block"
            >
              Fazer Novo Pedido
            </Link>
            
            <Link
              to="/"
              className="w-full border-2 border-orange-500 text-orange-500 hover:bg-orange-50 py-3 rounded-full font-medium transition-colors block"
            >
              Voltar ao Início
            </Link>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            Obrigado por escolher a Pizza Royal! 🍕👑
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
