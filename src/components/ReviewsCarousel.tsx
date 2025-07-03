import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

interface Review {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
  pizzaOrdered: string;
}

const mockReviews: Review[] = [
  {
    id: '1',
    name: 'Maria Silva',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332b675?w=100&h=100&fit=crop&crop=face',
    rating: 5,
    comment: 'A melhor pizza da cidade! Massa crocante e ingredientes frescos. Já virei cliente fiel!',
    date: 'Hoje',
    pizzaOrdered: 'Margherita'
  },
  {
    id: '2',
    name: 'João Santos',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    rating: 5,
    comment: 'Entrega super rápida e pizza quentinha! O sabor é incrível, recomendo demais.',
    date: '2 horas atrás',
    pizzaOrdered: 'Pepperoni'
  },
  {
    id: '3',
    name: 'Ana Costa',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    rating: 5,
    comment: 'As pizzas doces são maravilhosas! A de Nutella com morango é divina.',
    date: '1 dia atrás',
    pizzaOrdered: 'Nutella com Morango'
  },
  {
    id: '4',
    name: 'Carlos Oliveira',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    rating: 4,
    comment: 'Ótima qualidade! Preço justo e sabor excepcional. Delivery pontual.',
    date: '2 dias atrás',
    pizzaOrdered: 'Calabresa'
  },
  {
    id: '5',
    name: 'Fernanda Lima',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face',
    rating: 5,
    comment: 'Surpreendente! A massa é perfeita e o recheio é generoso. Parabéns!',
    date: '3 dias atrás',
    pizzaOrdered: 'Quatro Queijos'
  }
];

const ReviewsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % mockReviews.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % mockReviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + mockReviews.length) % mockReviews.length);
  };

  return (
    <section className="py-12 bg-gradient-to-br from-orange-50 to-yellow-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            O que nossos clientes dizem
          </h2>
          <p className="text-gray-600">
            Mais de 2.500 clientes satisfeitos este mês
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className="bg-white rounded-2xl shadow-lg p-8 mx-8">
            <div className="flex items-center space-x-4 mb-6">
              <img
                src={mockReviews[currentIndex].avatar}
                alt={mockReviews[currentIndex].name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-800">
                  {mockReviews[currentIndex].name}
                </h3>
                <div className="flex items-center space-x-2 mb-1">
                  <div className="flex space-x-1">
                    {renderStars(mockReviews[currentIndex].rating)}
                  </div>
                  <span className="text-sm text-gray-500">
                    {mockReviews[currentIndex].date}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Pediu: {mockReviews[currentIndex].pizzaOrdered}
                </p>
              </div>
            </div>
            
            <p className="text-gray-700 text-lg leading-relaxed">
              "{mockReviews[currentIndex].comment}"
            </p>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevReview}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          
          <button
            onClick={nextReview}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {mockReviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex ? 'bg-orange-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Trust Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">4.9★</div>
            <div className="text-sm text-gray-600">Avaliação Média</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">2.5k+</div>
            <div className="text-sm text-gray-600">Avaliações</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">98%</div>
            <div className="text-sm text-gray-600">Satisfação</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">15min</div>
            <div className="text-sm text-gray-600">Entrega Média</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsCarousel;