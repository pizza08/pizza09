
import React from 'react';
import { CreditCard, QrCode } from 'lucide-react';

interface PaymentMethodsProps {
  selectedMethod: string;
  onMethodSelect: (method: string) => void;
  orderTotal: number;
}

const PaymentMethods = ({ selectedMethod, onMethodSelect, orderTotal }: PaymentMethodsProps) => {
  const paymentMethods = [
    {
      id: 'credit',
      name: 'Cartão de Crédito',
      icon: CreditCard,
      description: 'Visa, Mastercard, Elo',
      available: true
    },
    {
      id: 'debit',
      name: 'Cartão de Débito',
      icon: CreditCard,
      description: 'Débito à vista',
      available: true
    },
    {
      id: 'pix',
      name: 'PIX',
      icon: QrCode,
      description: 'Pagamento instantâneo',
      available: true,
      discount: orderTotal >= 50 ? 5 : 0
    }
  ];

  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-lg mb-4">Forma de Pagamento</h3>
      
      {paymentMethods.map((method) => {
        const Icon = method.icon;
        return (
          <div
            key={method.id}
            onClick={() => method.available && onMethodSelect(method.id)}
            className={`relative p-4 border-2 rounded-lg cursor-pointer transition-all ${
              selectedMethod === method.id
                ? 'border-orange-500 bg-orange-50'
                : method.available
                ? 'border-gray-200 hover:border-orange-300 hover:bg-orange-25'
                : 'border-gray-100 bg-gray-50 cursor-not-allowed opacity-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Icon className={`w-6 h-6 mr-3 ${
                  selectedMethod === method.id ? 'text-orange-500' : 'text-gray-500'
                }`} />
                <div>
                  <p className={`font-medium ${
                    selectedMethod === method.id ? 'text-orange-800' : 'text-gray-800'
                  }`}>
                    {method.name}
                  </p>
                  <p className="text-sm text-gray-600">{method.description}</p>
                </div>
              </div>
              
              {method.discount && method.discount > 0 && (
                <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                  -{method.discount}%
                </div>
              )}
              
              {selectedMethod === method.id && (
                <div className="absolute top-2 right-2">
                  <div className="w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
      
      {selectedMethod === 'pix' && orderTotal >= 50 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-3">
          <p className="text-green-800 text-sm">
            🎉 <strong>Desconto PIX:</strong> 5% de desconto em pedidos acima de R$ 50!
          </p>
        </div>
      )}
    </div>
  );
};

export default PaymentMethods;
