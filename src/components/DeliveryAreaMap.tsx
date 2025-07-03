
import React, { useState } from 'react';
import { MapPin, X } from 'lucide-react';

const DeliveryAreaMap = () => {
  const [showModal, setShowModal] = useState(false);

  const deliveryAreas = [
    { name: 'Centro', time: '25-35 min', fee: 'Grátis' },
    { name: 'Zona Norte', time: '35-45 min', fee: 'R$ 3,99' },
    { name: 'Zona Sul', time: '30-40 min', fee: 'R$ 2,99' },
    { name: 'Zona Leste', time: '40-50 min', fee: 'R$ 5,99' },
    { name: 'Zona Oeste', time: '45-60 min', fee: 'R$ 7,99' },
  ];

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
      >
        <MapPin className="w-4 h-4 mr-2" />
        Ver Área de Entrega
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Área de Entrega</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mapa simulado */}
              <div className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg p-8 mb-6 text-center">
                <MapPin className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                <p className="text-gray-700 text-lg">
                  Mapa interativo das áreas de entrega
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  (Integração com mapa será implementada)
                </p>
              </div>

              {/* Lista de áreas */}
              <div className="space-y-3">
                <h3 className="font-semibold text-lg mb-4">Regiões Atendidas</h3>
                {deliveryAreas.map((area, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 text-orange-500 mr-3" />
                      <span className="font-medium">{area.name}</span>
                    </div>
                    <div className="text-right text-sm">
                      <div className="text-gray-600">{area.time}</div>
                      <div className="font-medium text-orange-500">{area.fee}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-blue-800 text-sm">
                  <strong>Dica:</strong> Pedidos acima de R$ 40,00 têm frete grátis para todas as regiões!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeliveryAreaMap;
