
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, MapPin, Users } from 'lucide-react';

const HeroSection = () => {
  const [currentOffer, setCurrentOffer] = useState(0);
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hora em segundos

  const offers = [
    {
      title: "Pizza Gigante por R$ 39,90",
      subtitle: "Válida até 22h - Apenas hoje!",
      bgColor: "from-red-500 to-red-600"
    },
    {
      title: "2 Pizzas Médias = R$ 59,90",
      subtitle: "Economize R$ 20 - Oferta limitada",
      bgColor: "from-green-500 to-green-600"
    },
    {
      title: "Frete Grátis acima de R$ 45",
      subtitle: "Em toda a cidade - Hoje e amanhã",
      bgColor: "from-blue-500 to-blue-600"
    }
  ];

  useEffect(() => {
    const offerInterval = setInterval(() => {
      setCurrentOffer((prev) => (prev + 1) % offers.length);
    }, 4000);

    const timerInterval = setInterval(() => {
      setTimeLeft((prev) => prev > 0 ? prev - 1 : 3600);
    }, 1000);

    return () => {
      clearInterval(offerInterval);
      clearInterval(timerInterval);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <section className="relative bg-gradient-to-br from-orange-500 via-orange-400 to-yellow-400 text-white py-16 overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Banner rotativo de ofertas */}
      <div className="relative z-20 mb-8">
        <div className={`bg-gradient-to-r ${offers[currentOffer].bgColor} py-3 text-center`}>
          <div className="container mx-auto px-4">
            <h2 className="text-lg font-bold">{offers[currentOffer].title}</h2>
            <p className="text-sm opacity-90">{offers[currentOffer].subtitle}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              A Melhor Pizza
              <span className="block text-yellow-200">da Cidade!</span>
            </h1>
            
            <div className="bg-white/10 backdrop-blur rounded-2xl p-4 mb-6">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Pedidos até 22h ganham desconto</span>
                </div>
                <div className="bg-red-500 px-3 py-1 rounded-full font-bold">
                  {formatTime(timeLeft)}
                </div>
              </div>
            </div>

            <p className="text-xl mb-8 text-orange-100">
              Ingredientes frescos, massa artesanal e sabores únicos. 
              Entregamos felicidade na sua porta em até 30 minutos!
            </p>

            {/* Stats em tempo real */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold">247</div>
                <div className="text-sm opacity-80">Pedidos hoje</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">15min</div>
                <div className="text-sm opacity-80">Tempo médio</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold flex items-center justify-center gap-1">
                  <Users className="w-5 h-5" />
                  <span>23</span>
                </div>
                <div className="text-sm opacity-80">Vendo agora</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/menu"
                className="bg-white text-orange-500 px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-50 transition-colors inline-flex items-center justify-center group"
              >
                Ver Cardápio
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-orange-500 transition-colors inline-flex items-center justify-center"
              >
                <MapPin className="mr-2 w-5 h-5" />
                WhatsApp Direto
              </a>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-300 to-yellow-300 rounded-full opacity-20 blur-3xl animate-pulse"></div>
            <img 
              src="/lovable-uploads/5f13c750-242a-42a7-9fa5-c4f873116f03.png" 
              alt="Forno Nobre Logo"
              className="relative z-10 w-64 h-64 mx-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
