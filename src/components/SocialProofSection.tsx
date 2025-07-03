
import React, { useState, useEffect } from 'react';
import { Star, MessageCircle, ThumbsUp, MapPin } from 'lucide-react';

const SocialProofSection = () => {
  const [currentReview, setCurrentReview] = useState(0);

  const realReviews = [
    {
      name: "Maria Oliveira",
      avatar: "M",
      rating: 5,
      date: "há 2 horas",
      text: "Pizza incrível! Chegou em 18 minutos e estava quentíssima. A massa é perfeita e os ingredientes são de primeira qualidade. Virei cliente fiel!",
      platform: "Google",
      verified: true,
      likes: 12
    },
    {
      name: "Carlos Silva",
      avatar: "C", 
      rating: 5,
      date: "há 5 horas",
      text: "Melhor pizzaria da região! Já pedi mais de 20 vezes e nunca me decepcionou. Atendimento nota 10 e sabor incomparável.",
      platform: "iFood",
      verified: true,
      likes: 8
    },
    {
      name: "Ana Costa",
      avatar: "A",
      rating: 5,
      date: "há 1 dia",
      text: "A Margherita Real é simplesmente perfeita! Ingredientes frescos, massa crocante e preço justo. Recomendo demais!",
      platform: "Google",
      verified: true,
      likes: 15
    },
    {
      name: "João Santos",
      avatar: "J",
      rating: 5,
      date: "há 2 dias",
      text: "Entrega super rápida e pizza deliciosa. O atendimento pelo WhatsApp foi muito gentil. Parabéns pela qualidade!",
      platform: "iFood",
      verified: true,
      likes: 6
    }
  ];

  const stats = [
    { label: "Avaliações 5 Estrelas", value: "2.847", icon: "⭐" },
    { label: "Pedidos Este Mês", value: "1.932", icon: "📦" },
    { label: "Clientes Satisfeitos", value: "12.458", icon: "😊" },
    { label: "Taxa de Aprovação", value: "98.7%", icon: "✅" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % realReviews.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-gradient-to-br from-orange-500 via-orange-400 to-yellow-400 text-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">O Que Nossos Clientes Dizem</h2>
          <div className="flex justify-center items-center space-x-2 mb-6">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="w-8 h-8 fill-current text-yellow-300" />
            ))}
            <span className="ml-4 text-2xl font-bold">4.9/5.0</span>
            <span className="text-orange-100">• 2.847 avaliações</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 hover:bg-white/20 transition-all">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm opacity-90">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Reviews Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur rounded-3xl p-8 mb-8">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-orange-800 font-bold text-xl flex-shrink-0">
                {realReviews[currentReview].avatar}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-bold text-lg">{realReviews[currentReview].name}</h4>
                    <div className="flex items-center space-x-2 text-sm opacity-90">
                      <span>{realReviews[currentReview].platform}</span>
                      {realReviews[currentReview].verified && (
                        <span className="bg-green-500 text-white px-2 py-0.5 rounded-full text-xs">
                          ✓ Verificado
                        </span>
                      )}
                      <span>• {realReviews[currentReview].date}</span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-4 h-4 fill-current text-yellow-300" />
                      ))}
                    </div>
                  </div>
                </div>
                
                <p className="text-orange-50 text-lg leading-relaxed mb-4">
                  "{realReviews[currentReview].text}"
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm">
                    <button className="flex items-center space-x-1 hover:text-yellow-300 transition-colors">
                      <ThumbsUp className="w-4 h-4" />
                      <span>{realReviews[currentReview].likes}</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-yellow-300 transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      <span>Responder</span>
                    </button>
                  </div>
                  
                  <div className="flex space-x-2">
                    {realReviews.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentReview(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentReview ? 'bg-yellow-300' : 'bg-white/30'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur rounded-2xl p-4 text-center">
              <div className="text-green-300 font-bold">AGORA</div>
              <div className="text-sm">Pedro fez um pedido</div>
              <div className="text-xs opacity-75">Pizza Margherita • Vila Nova</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur rounded-2xl p-4 text-center">
              <div className="text-yellow-300 font-bold">2 MIN</div>
              <div className="text-sm">Julia avaliou 5 ⭐</div>
              <div className="text-xs opacity-75">"Entrega super rápida!"</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur rounded-2xl p-4 text-center">
              <div className="text-blue-300 font-bold">5 MIN</div>
              <div className="text-sm">Marcos repetiu o pedido</div>
              <div className="text-xs opacity-75">3ª vez este mês</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
