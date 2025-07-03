
import React from 'react';
import { Button } from './ui/button';
import { ArrowRight, Clock, Truck, Shield } from 'lucide-react';

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
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 py-20 sm:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium">
                <Shield className="w-4 h-4" />
                <span>Entrega Garantida</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                As Melhores Pizzas
                <span className="block text-yellow-300">Direto na Sua Casa!</span>
              </h1>
              
              <p className="text-xl sm:text-2xl text-orange-100 font-medium">
                🔥 Sabores únicos, massa artesanal e ingredientes frescos
              </p>
              
              <p className="text-lg text-orange-200 max-w-lg">
                Mais de 10 mil clientes satisfeitos! Entregamos felicidade em cada fatia, 
                com a qualidade que você merece e a rapidez que precisa.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 py-6">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-yellow-300">30min</div>
                <div className="text-sm text-orange-200">Entrega Rápida</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-yellow-300">10k+</div>
                <div className="text-sm text-orange-200">Clientes Felizes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-yellow-300">4.9★</div>
                <div className="text-sm text-orange-200">Avaliação</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                onClick={scrollToMenu}
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-lg px-8 py-4 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
              >
                🍕 Ver Cardápio Completo
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-orange-600 text-lg px-8 py-4 font-semibold"
              >
                📞 (11) 99999-9999
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 pt-4">
              <div className="flex items-center space-x-2 text-orange-200">
                <Clock className="w-5 h-5" />
                <span className="text-sm">Entrega em até 30min</span>
              </div>
              <div className="flex items-center space-x-2 text-orange-200">
                <Truck className="w-5 h-5" />
                <span className="text-sm">Frete grátis acima de R$ 50</span>
              </div>
              <div className="flex items-center space-x-2 text-orange-200">
                <Shield className="w-5 h-5" />
                <span className="text-sm">Satisfação garantida</span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&h=600&fit=crop&crop=center"
                alt="Pizza deliciosa"
                className="w-full h-auto rounded-2xl shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-300"
              />
              
              {/* Floating Badge */}
              <div className="absolute -top-4 -left-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg animate-bounce">
                🔥 Mais Pedida!
              </div>
              
              {/* Price Badge */}
              <div className="absolute -bottom-4 -right-4 bg-green-500 text-white px-6 py-3 rounded-full font-bold shadow-lg">
                A partir de R$ 32,90
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
