import React from 'react';
import { Shield, Clock, Award, Users, Phone, CreditCard } from 'lucide-react';

const TrustSignals = () => {
  const signals = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Pagamento Seguro',
      description: 'SSL e criptografia de ponta'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Entrega Garantida',
      description: 'Ou devolvemos seu dinheiro'
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Melhor da Cidade',
      description: 'Prêmio Melhor Pizza 2024'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: '50k+ Clientes',
      description: 'Servindo com excelência'
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Suporte 24/7',
      description: 'Atendimento sempre disponível'
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: 'Pix e Cartão',
      description: 'Todas as formas de pagamento'
    }
  ];

  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {signals.map((signal, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center"
            >
              <div className="text-green-600 mb-2 flex justify-center">
                {signal.icon}
              </div>
              <h3 className="font-semibold text-sm text-gray-800 mb-1">
                {signal.title}
              </h3>
              <p className="text-xs text-gray-600">
                {signal.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSignals;