
import React, { useState, useEffect } from 'react';
import { CheckCircle, Clock, MapPin, Star, ShoppingBag, Users, Flame, TrendingUp } from 'lucide-react';

interface Activity {
  id: number;
  type: 'order' | 'review' | 'delivery' | 'repeat' | 'viewing' | 'trending' | 'stock';
  customer: string;
  message: string;
  location: string;
  time: string;
  pizza?: string;
  rating?: number;
  count?: number;
  urgency?: 'low' | 'medium' | 'high';
}

const LiveActivityFeed = () => {
  const [currentActivity, setCurrentActivity] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const activities: Activity[] = [
    {
      id: 1,
      type: 'order',
      customer: 'Marina S.',
      message: 'fez pedido de',
      location: 'Vila Madalena',
      time: 'agora',
      pizza: 'Margherita Premium + Coca 2L',
      urgency: 'high'
    },
    {
      id: 2,
      type: 'stock',
      customer: 'ATENÇÃO',
      message: 'Apenas 2 unidades restantes',
      location: 'Pepperoni Premium',
      time: 'agora',
      pizza: 'Última chance!',
      urgency: 'high'
    },
    {
      id: 3,
      type: 'review',
      customer: 'Carlos M.',
      message: 'avaliou',
      location: 'Pinheiros',
      time: '2 min',
      rating: 5,
      pizza: '"Pizza perfeita, chegou quentinha!"',
      urgency: 'medium'
    },
    {
      id: 4,
      type: 'delivery',
      customer: 'Entrega',
      message: 'finalizada em',
      location: 'Jardim Europa',
      time: '3 min',
      pizza: '12 minutos - Recorde batido!',
      urgency: 'low'
    },
    {
      id: 5,
      type: 'repeat',
      customer: 'João P.',
      message: 'repetiu pedido',
      location: 'Moema',
      time: '5 min',
      pizza: '5ª vez este mês',
      urgency: 'medium'
    },
    {
      id: 6,
      type: 'viewing',
      customer: '47 pessoas',
      message: 'visualizando agora',
      location: 'Online',
      time: 'agora',
      pizza: '12 adicionaram ao carrinho',
      urgency: 'high'
    },
    {
      id: 7,
      type: 'trending',
      customer: 'Calabresa Especial',
      message: 'virou tendência',
      location: 'Mais pedida hoje',
      time: '1 min',
      pizza: '+89% de pedidos vs ontem',
      urgency: 'high'
    },
    {
      id: 8,
      type: 'order',
      customer: 'Ana L.',
      message: 'pediu combo para',
      location: 'Itaim Bibi',
      time: '7 min',
      pizza: '4 pessoas - Festa em casa',
      urgency: 'medium'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentActivity(prev => (prev + 1) % activities.length);
        setIsVisible(true);
      }, 300);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const activity = activities[currentActivity];

  const getIcon = () => {
    switch (activity.type) {
      case 'order':
        return <ShoppingBag className="w-4 h-4 text-green-500" />;
      case 'review':
        return <Star className="w-4 h-4 text-yellow-500 fill-current" />;
      case 'delivery':
        return <CheckCircle className="w-4 h-4 text-blue-500" />;
      case 'repeat':
        return <Users className="w-4 h-4 text-purple-500" />;
      case 'viewing':
        return <Users className="w-4 h-4 text-orange-500" />;
      case 'trending':
        return <TrendingUp className="w-4 h-4 text-pink-500" />;
      case 'stock':
        return <Flame className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getBgColor = () => {
    switch (activity.type) {
      case 'order':
        return 'bg-green-50 border-green-200';
      case 'review':
        return 'bg-yellow-50 border-yellow-200';
      case 'delivery':
        return 'bg-blue-50 border-blue-200';
      case 'repeat':
        return 'bg-purple-50 border-purple-200';
      case 'viewing':
        return 'bg-orange-50 border-orange-200';
      case 'trending':
        return 'bg-pink-50 border-pink-200';
      case 'stock':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const getUrgencyIndicator = () => {
    if (activity.urgency === 'high') {
      return (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse">
          <div className="absolute inset-0 bg-red-500 rounded-full animate-ping"></div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <div
        className={`${getBgColor()} border rounded-xl p-4 shadow-lg backdrop-blur-sm transition-all duration-300 transform relative ${
          isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-95'
        }`}
      >
        {getUrgencyIndicator()}
        
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 mt-0.5 relative">
            {getIcon()}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <p className="text-sm font-bold text-gray-800 truncate">
                {activity.customer}
              </p>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-500 font-medium">{activity.time}</span>
                {activity.urgency === 'high' && (
                  <span className="text-xs bg-red-100 text-red-700 px-1.5 py-0.5 rounded-full font-semibold">
                    🔥
                  </span>
                )}
              </div>
            </div>
            
            <p className="text-sm text-gray-700 leading-tight mb-2">
              <span className="font-medium">{activity.message}</span>
              {activity.pizza && (
                <span className="block mt-1 text-xs text-gray-600 font-medium">
                  🍕 {activity.pizza}
                </span>
              )}
              {activity.rating && (
                <div className="flex items-center mt-1">
                  {Array.from({ length: activity.rating }, (_, i) => (
                    <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                  ))}
                </div>
              )}
            </p>
            
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-500 flex items-center">
                <MapPin className="w-3 h-3 mr-1" />
                {activity.location}
              </p>
              
              {activity.type === 'viewing' && (
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-600 font-semibold">AO VIVO</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveActivityFeed;
