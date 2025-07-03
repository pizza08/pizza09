
import React, { useState } from 'react';
import { MapPin, Clock, Truck } from 'lucide-react';

interface DeliveryInfo {
  time: string;
  fee: number;
  available: boolean;
}

const DeliveryCalculator = () => {
  const [cep, setCep] = useState('');
  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo | null>(null);
  const [loading, setLoading] = useState(false);

  const calculateDelivery = async () => {
    if (cep.length !== 8 && cep.length !== 9) return;
    
    setLoading(true);
    
    // Simular consulta de CEP
    setTimeout(() => {
      const cleanCep = cep.replace(/\D/g, '');
      const firstThree = parseInt(cleanCep.substring(0, 3));
      
      // Simular diferentes áreas de entrega
      let info: DeliveryInfo;
      
      if (firstThree >= 10000 && firstThree <= 15000) {
        info = { time: '25-35 min', fee: 0, available: true };
      } else if (firstThree >= 15001 && firstThree <= 20000) {
        info = { time: '35-45 min', fee: 3.99, available: true };
      } else if (firstThree >= 20001 && firstThree <= 25000) {
        info = { time: '45-60 min', fee: 7.99, available: true };
      } else {
        info = { time: '', fee: 0, available: false };
      }
      
      setDeliveryInfo(info);
      setLoading(false);
    }, 1000);
  };

  const formatCep = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{5})(\d{3})/, '$1-$2');
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg mb-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Truck className="w-5 h-5 mr-2 text-orange-500" />
        Calcular Entrega
      </h3>
      
      <div className="flex gap-3">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Digite seu CEP"
            value={cep}
            onChange={(e) => setCep(formatCep(e.target.value))}
            maxLength={9}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <button
          onClick={calculateDelivery}
          disabled={cep.length < 8 || loading}
          className="px-6 py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white rounded-lg font-medium transition-colors"
        >
          {loading ? 'Calculando...' : 'Calcular'}
        </button>
      </div>
      
      {deliveryInfo && (
        <div className="mt-4 p-4 rounded-lg border">
          {deliveryInfo.available ? (
            <div className="space-y-2">
              <div className="flex items-center text-green-600">
                <MapPin className="w-4 h-4 mr-2" />
                <span className="font-medium">Entregamos na sua região!</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-700">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>Tempo: {deliveryInfo.time}</span>
                </div>
                <div className="font-medium">
                  Taxa: {deliveryInfo.fee === 0 ? (
                    <span className="text-green-600">GRÁTIS</span>
                  ) : (
                    <span>R$ {deliveryInfo.fee.toFixed(2).replace('.', ',')}</span>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-red-600 flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              <span>Desculpe, não entregamos nesta região.</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DeliveryCalculator;
