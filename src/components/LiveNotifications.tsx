
import React, { useState, useEffect } from 'react';
import { CheckCircle, Clock, MapPin, ShoppingBag, Star, Users, Flame } from 'lucide-react';

interface Notification {
  id: number;
  type: 'order' | 'review' | 'delivery' | 'viewing' | 'stock';
  message: string;
  location: string;
  time: string;
  customer?: string;
  pizza?: string;
  rating?: number;
  urgency?: 'low' | 'medium' | 'high';
}

const LiveNotifications = () => {
  const [currentNotification, setCurrentNotification] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const notifications: Notification[] = [
    {
      id: 1,
      type: 'order',
      message: 'Marina acabou de pedir uma',
      location: 'Vila Madalena',
      time: 'agora',
      customer: 'Marina S.',
      pizza: 'Margherita Premium',
      urgency: 'high'
    },
    {
      id: 2,
      type: 'review',
      message: 'Carlos avaliou com',
      location: 'Pinheiros',
      time: '2 min',
      customer: 'Carlos M.',
      pizza: 'Pepperoni Especial',
      rating: 5,
      urgency: 'medium'
    },
    {
      id: 3,
      type: 'delivery',
      message: 'Entrega finalizada para',
      location: 'Jardim Europa',
      time: '3 min',
      customer: 'Ana L.',
      pizza: 'Quatro Queijos',
      urgency: 'low'
    },
    {
      id: 4,
      type: 'viewing',
      message: '23 pessoas visualizando',
      location: 'Online agora',
      time: 'agora',
      pizza: 'este cardápio',
      urgency: 'high'
    },
    {
      id: 5,
      type: 'stock',
      message: 'Apenas 3 unidades restantes',
      location: 'Margherita Premium',
      time: 'agora',
      pizza: 'Corre antes que acabe!',
      urgency: 'high'
    },
    {
      id: 6,
      type: 'order',
      message: 'João repetiu o pedido de',
      location: 'Moema',
      time: '5 min',
      customer: 'João P.',
      pizza: '2 pizzas grandes',
      urgency: 'medium'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentNotification(prev => (prev + 1) % notifications.length);
        setIsVisible(true);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const notification = notifications[currentNotification];

  const getIcon = () => {
    switch (notification.type) {
      case 'order':
        return <ShoppingBag className="w-4 h-4 text-green-500" />;
      case 'review':
        return <Star className="w-4 h-4 text-yellow-500 fill-current" />;
      case 'delivery':
        return <CheckCircle className="w-4 h-4 text-blue-500" />;
      case 'viewing':
        return <Users className="w-4 h-4 text-orange-500" />;
      case 'stock':
        return <Flame className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getBgColor = () => {
    switch (notification.urgency) {
      case 'high':
        return 'bg-red-50 border-red-200 shadow-red-100';
      case 'medium':
        return 'bg-orange-50 border-orange-200 shadow-orange-100';
      default:
        return 'bg-green-50 border-green-200 shadow-green-100';
    }
  };

  const getTextColor = () => {
    switch (notification.urgency) {
      case 'high':
        return 'text-red-800';
      case 'medium':
        return 'text-orange-800';
      default:
        return 'text-green-800';
    }
  };

  return (
    <div className="fixed bottom-4 left-4 z-50 max-w-sm">
      <div
        className={`${getBgColor()} ${getTextColor()} border rounded-lg p-4 shadow-lg backdrop-blur-sm transition-all duration-300 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}
      >
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 mt-0.5">
            {getIcon()}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <p className="text-sm font-semibold truncate">
                {notification.customer && `👤 ${notification.customer}`}
              </p>
              <span className="text-xs opacity-75">{notification.time}</span>
            </div>
            
            <p className="text-sm leading-tight">
              <strong>{notification.message}</strong>
              {notification.pizza && (
                <span className="block text-xs mt-1 opacity-90">
                  🍕 {notification.pizza}
                </span>
              )}
              {notification.rating && (
                <span className="inline-flex items-center ml-1">
                  {Array.from({ length: notification.rating }, (_, i) => (
                    <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                  ))}
                </span>
              )}
            </p>
            
            <div className="flex items-center justify-between mt-2">
              <p className="text-xs opacity-75 flex items-center">
                <MapPin className="w-3 h-3 mr-1" />
                {notification.location}
              </p>
              
              {notification.urgency === 'high' && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 animate-pulse">
                  🔥 Urgente
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveNotifications;
