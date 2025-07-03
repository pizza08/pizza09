
import React from 'react';
import { Clock, Shield, Truck, Award, Thermometer, Star } from 'lucide-react';

const ValueProposition = () => {
  const values = [
    {
      icon: <Clock className="w-8 h-8 text-white" />,
      title: "Entrega em 20min",
      description: "Garantimos entrega rápida ou pizza grátis",
      badge: "Garantia"
    },
    {
      icon: <Thermometer className="w-8 h-8 text-white" />,
      title: "Sempre Quentinha",
      description: "Bag térmica profissional e embalagem especial",
      badge: "Exclusivo"
    },
    {
      icon: <Award className="w-8 h-8 text-white" />,
      title: "Ingredientes Premium",
      description: "Mozzarella importada e ingredientes selecionados",
      badge: "Premium"
    },
    {
      icon: <Shield className="w-8 h-8 text-white" />,
      title: "100% Seguro",
      description: "Pagamento seguro e satisfação garantida",
      badge: "Confiança"
    },
    {
      icon: <Truck className="w-8 h-8 text-white" />,
      title: "Frete Grátis",
      description: "Delivery gratuito para pedidos acima de R$ 40",
      badge: "Economia"
    },
    {
      icon: <Star className="w-8 h-8 text-white" />,
      title: "5 Estrelas",
      description: "Nota máxima no Google e iFood há 2 anos",
      badge: "Top Rated"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Por que Escolher o Forno Nobre?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Mais de 50.000 clientes satisfeitos confiam na nossa qualidade e rapidez
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((item, index) => (
            <div key={index} className="group">
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden">
                {/* Badge */}
                <div className="absolute top-4 right-4">
                  <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                    {item.badge}
                  </span>
                </div>
                
                {/* Icon */}
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                
                <h3 className="text-xl font-bold mb-2 text-center">{item.title}</h3>
                <p className="text-gray-600 text-center leading-relaxed">{item.description}</p>
                
                {/* Decorative element */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-yellow-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Trust badges */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 mb-4">Certificações e Parcerias:</p>
          <div className="flex justify-center items-center space-x-8 opacity-60">
            <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
              🏆 iFood Partner
            </div>
            <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
              ⭐ Google 5.0
            </div>
            <div className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold">
              🛡️ Visa Seguro
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
