
import React, { useState } from 'react';
import { MapPin, Clock, CreditCard, Phone, MessageCircle, Car } from 'lucide-react';

const PracticalInfo = () => {
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('');

  const deliveryAreas = [
    { name: 'Centro', time: '15-20 min', fee: 'Grátis' },
    { name: 'Vila Nova', time: '20-25 min', fee: 'Grátis' },
    { name: 'Jardim Europa', time: '25-30 min', fee: 'Grátis' },
    { name: 'Bela Vista', time: '15-25 min', fee: 'Grátis' },
    { name: 'Outros bairros', time: '30-40 min', fee: 'R$ 5,00' }
  ];

  const paymentMethods = [
    { name: 'PIX', icon: '💳', discount: '5% OFF' },
    { name: 'Cartão Crédito', icon: '💳', discount: '' },
    { name: 'Cartão Débito', icon: '💳', discount: '' },
    { name: 'Dinheiro', icon: '💵', discount: '' },
    { name: 'Vale Refeição', icon: '🎫', discount: '' }
  ];

  const schedules = [
    { day: 'Segunda a Quinta', hours: '17:00 - 23:30' },
    { day: 'Sexta e Sábado', hours: '17:00 - 00:30' },
    { day: 'Domingo', hours: '17:00 - 23:00' }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Informações Úteis
          </h2>
          <p className="text-xl text-gray-600">
            Tudo que você precisa saber para fazer seu pedido
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Área de Entrega */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <div className="bg-orange-500 p-3 rounded-full mr-4">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold">Área de Entrega</h3>
            </div>

            <div className="space-y-3">
              {deliveryAreas.map((area, index) => (
                <div 
                  key={index}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    selectedNeighborhood === area.name 
                      ? 'border-orange-500 bg-orange-50' 
                      : 'border-gray-200 hover:border-orange-300'
                  }`}
                  onClick={() => setSelectedNeighborhood(area.name)}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{area.name}</span>
                    <div className="text-right text-sm">
                      <div className="text-gray-600">{area.time}</div>
                      <div className={`font-semibold ${area.fee === 'Grátis' ? 'text-green-600' : 'text-orange-600'}`}>
                        {area.fee}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center text-blue-800">
                <Car className="w-5 h-5 mr-2" />
                <span className="font-semibold">Frete grátis acima de R$ 40</span>
              </div>
            </div>
          </div>

          {/* Horários e Contato */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <div className="bg-green-500 p-3 rounded-full mr-4">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold">Horário de Funcionamento</h3>
            </div>

            <div className="space-y-3 mb-6">
              {schedules.map((schedule, index) => (
                <div key={index} className="flex justify-between items-center py-2">
                  <span className="text-gray-600">{schedule.day}</span>
                  <span className="font-semibold text-green-600">{schedule.hours}</span>
                </div>
              ))}
            </div>

            <div className="border-t pt-6">
              <h4 className="font-bold mb-4">Contato Direto</h4>
              
              <div className="space-y-3">
                <a
                  href="tel:11999999999"
                  className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Phone className="w-5 h-5 text-blue-600 mr-3" />
                  <div>
                    <div className="font-semibold">(11) 9999-9999</div>
                    <div className="text-sm text-gray-600">Ligação direta</div>
                  </div>
                </a>

                <a
                  href="https://wa.me/5511999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                >
                  <MessageCircle className="w-5 h-5 text-green-600 mr-3" />
                  <div>
                    <div className="font-semibold">WhatsApp</div>
                    <div className="text-sm text-gray-600">Resposta imediata</div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Formas de Pagamento */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <div className="bg-blue-500 p-3 rounded-full mr-4">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold">Formas de Pagamento</h3>
            </div>

            <div className="space-y-3">
              {paymentMethods.map((method, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{method.icon}</span>
                    <span className="font-medium">{method.name}</span>
                  </div>
                  {method.discount && (
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                      {method.discount}
                    </span>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
              <div className="text-yellow-800 font-semibold mb-2">💰 Dica de Economia:</div>
              <div className="text-yellow-700 text-sm">
                Pagando via PIX você ganha 5% de desconto em todos os pedidos!
              </div>
            </div>

            <div className="mt-4 p-4 bg-green-50 rounded-lg">
              <div className="text-green-800 font-semibold mb-2">🔒 Pagamento Seguro</div>
              <div className="text-green-700 text-sm">
                Todas as transações são protegidas por criptografia SSL
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="mt-8 bg-gradient-to-r from-orange-500 to-yellow-400 rounded-2xl p-6 text-white text-center">
          <h3 className="text-xl font-bold mb-2">Precisa de Ajuda?</h3>
          <p className="mb-4">Nossa equipe está sempre pronta para te atender!</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/5511999999999?text=Olá! Preciso de ajuda"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-orange-500 px-6 py-3 rounded-full font-bold hover:bg-orange-50 transition-colors"
            >
              💬 Chat de Suporte
            </a>
            <a
              href="tel:11999999999"
              className="border-2 border-white text-white px-6 py-3 rounded-full font-bold hover:bg-white hover:text-orange-500 transition-colors"
            >
              📞 Ligar Agora
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PracticalInfo;
