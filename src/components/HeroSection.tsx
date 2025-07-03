
import React from 'react';
import { Button } from './ui/button';
import { ArrowRight, Clock, Truck, Shield, Star } from 'lucide-react';

const HeroSection = () => {
  const scrollToMenu = () => {
    const element = document.getElementById('menu-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-orange-600 via-orange-500 to-red-500 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 py-20 sm:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-red-600 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-bold animate-pulse">
                <Shield className="w-4 h-4" />
                <span>🚨 ÚLTIMAS 5 PIZZAS COM 45% OFF - APENAS HOJE!</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="block">Pizzas Artesanais</span>
                <span className="block text-yellow-300">Irresistíveis!</span>
              </h1>
              
              <p className="text-xl sm:text-2xl text-orange-100 font-medium">
                🍕 Massa fermentada 24h • Ingredientes importados • Forno à lenha
              </p>
              
              <div className="bg-red-600/30 backdrop-blur-sm rounded-xl p-4 border border-red-400/50">
                <p className="text-lg text-white font-bold">
                  ⚠️ <strong>ATENÇÃO:</strong> Apenas 5 pizzas restantes com desconto de 45%!
                </p>
                <p className="text-orange-200 mt-2">
                  Mais de 15.247 clientes já provaram. 89 pessoas visualizando agora.
                  <strong className="text-yellow-300"> Não perca essa oportunidade única!</strong>
                </p>
              </div>
            </div>

            {/* Urgency Stats */}
            <div className="grid grid-cols-3 gap-6 py-6 border-y border-white/20">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-yellow-300">12min</div>
                <div className="text-sm text-orange-200">Entrega Expressa</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-yellow-300">15.2k+</div>
                <div className="text-sm text-orange-200">Clientes Satisfeitos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-yellow-300 flex items-center justify-center">
                  4.9 <Star className="w-5 h-5 ml-1 fill-current" />
                </div>
                <div className="text-sm text-orange-200">Avaliação Perfeita</div>
              </div>
            </div>

            {/* Enhanced Social Proof */}
            <div className="bg-red-500/20 backdrop-blur-sm rounded-xl p-4 mb-6 border border-red-400/30">
              <div className="flex items-center space-x-3">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-yellow-400 border-2 border-white flex items-center justify-center text-xs">😋</div>
                  <div className="w-8 h-8 rounded-full bg-green-400 border-2 border-white flex items-center justify-center text-xs">🤤</div>
                  <div className="w-8 h-8 rounded-full bg-blue-400 border-2 border-white flex items-center justify-center text-xs">😍</div>
                  <div className="w-8 h-8 rounded-full bg-purple-400 border-2 border-white flex items-center justify-center text-xs font-bold text-white">+85</div>
                </div>
                <div className="text-sm">
                  <strong className="text-yellow-300">APENAS 5 PIZZAS RESTANTES</strong> com 45% OFF!
                  <br />
                  <span className="text-orange-200">
                    <strong>89 pessoas</strong> visualizando • <strong>12 pedidos</strong> na última hora
                  </span>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                onClick={scrollToMenu}
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-lg px-8 py-4 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200 animate-pulse"
              >
                🍕 GARANTIR PIZZA - 45% OFF
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-orange-600 text-lg px-8 py-4 font-semibold"
              >
                📞 WhatsApp: (11) 99999-9999
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 pt-4">
              <div className="flex items-center space-x-2 text-orange-200">
                <Clock className="w-5 h-5" />
                <span className="text-sm">Entrega em até 12min</span>
              </div>
              <div className="flex items-center space-x-2 text-orange-200">
                <Truck className="w-5 h-5" />
                <span className="text-sm">Frete grátis acima de R$ 30</span>
              </div>
              <div className="flex items-center space-x-2 text-orange-200">
                <Shield className="w-5 h-5" />
                <span className="text-sm">Satisfação 100% garantida</span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&h=600&fit=crop&crop=center"
                alt="Pizza artesanal deliciosa"
                className="w-full h-auto rounded-2xl shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-300"
              />
              
              {/* Floating Badge */}
              <div className="absolute -top-4 -left-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg animate-bounce">
                🔥 SÓ 5 RESTAM!
              </div>
              
              {/* Price Badge */}
              <div className="absolute -bottom-4 -right-4 bg-green-500 text-white px-6 py-3 rounded-full font-bold shadow-lg">
                <div className="text-xs line-through opacity-75">R$ 52,90</div>
                <div>R$ 29,10</div>
                <div className="text-xs">45% OFF</div>
              </div>

              {/* Reviews Badge */}
              <div className="absolute top-4 right-4 bg-white text-gray-800 px-3 py-2 rounded-full shadow-lg">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-bold">4.9</span>
                </div>
                <div className="text-xs text-gray-600">2.847 reviews</div>
              </div>
            </div>
            
            {/* Background Decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl transform rotate-6 scale-105 opacity-20"></div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg className="relative block w-full h-12" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" className="fill-white"></path>
        </svg>
      </div>
    </div>
  );
};

export default HeroSection;
