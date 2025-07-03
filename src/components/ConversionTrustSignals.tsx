
import React from 'react';
import { Shield, Clock, Award, Phone, Star, Truck } from 'lucide-react';

const ConversionTrustSignals = () => {
  return (
    <section className="py-6 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <div className="bg-white p-3 rounded-lg shadow-sm text-center">
            <div className="text-green-600 mb-1 flex justify-center">
              <Truck className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-xs text-gray-800 mb-1">
              Frete Grátis
            </h3>
            <p className="text-xs text-gray-600">
              Acima de R$ 40
            </p>
          </div>

          <div className="bg-white p-3 rounded-lg shadow-sm text-center">
            <div className="text-orange-600 mb-1 flex justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-xs text-gray-800 mb-1">
              25-35 min
            </h3>
            <p className="text-xs text-gray-600">
              Entrega rápida
            </p>
          </div>

          <div className="bg-white p-3 rounded-lg shadow-sm text-center">
            <div className="text-yellow-600 mb-1 flex justify-center">
              <Star className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-xs text-gray-800 mb-1">
              4.8/5
            </h3>
            <p className="text-xs text-gray-600">
              +2.500 avaliações
            </p>
          </div>

          <div className="bg-white p-3 rounded-lg shadow-sm text-center">
            <div className="text-red-600 mb-1 flex justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-xs text-gray-800 mb-1">
              #1 Região
            </h3>
            <p className="text-xs text-gray-600">
              Melhor pizza
            </p>
          </div>

          <div className="bg-white p-3 rounded-lg shadow-sm text-center">
            <div className="text-blue-600 mb-1 flex justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-xs text-gray-800 mb-1">
              WhatsApp
            </h3>
            <p className="text-xs text-gray-600">
              Pedido fácil
            </p>
          </div>

          <div className="bg-white p-3 rounded-lg shadow-sm text-center">
            <div className="text-green-600 mb-1 flex justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-xs text-gray-800 mb-1">
              Pagamento
            </h3>
            <p className="text-xs text-gray-600">
              100% seguro
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConversionTrustSignals;
