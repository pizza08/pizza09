import React, { useState, useEffect } from 'react';
import { CheckCircle, Clock, MapPin, Star, ShoppingBag, Users } from 'lucide-react';
interface Activity {
  id: number;
  type: 'order' | 'review' | 'delivery' | 'repeat' | 'viewing';
  customer: string;
  message: string;
  location: string;
  time: string;
  pizza?: string;
  rating?: number;
}
const LiveActivityFeed = () => {
  const [currentActivity, setCurrentActivity] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const activities: Activity[] = [{
    id: 1,
    type: 'order',
    customer: 'Marina',
    message: 'fez um pedido',
    location: 'Vila Madalena',
    time: 'agora',
    pizza: 'Margherita Premium'
  }, {
    id: 2,
    type: 'review',
    customer: 'Carlos',
    message: 'avaliou',
    location: 'Pinheiros',
    time: '2 min',
    rating: 5,
    pizza: 'Pepperoni Premium'
  }, {
    id: 3,
    type: 'delivery',
    customer: 'Entrega',
    message: 'finalizada',
    location: 'Jardim Europa',
    time: '3 min',
    pizza: 'Quatro Queijos'
  }, {
    id: 4,
    type: 'repeat',
    customer: 'João',
    message: 'repetiu o pedido',
    location: 'Moema',
    time: '5 min',
    pizza: 'Calabresa Especial'
  }, {
    id: 5,
    type: 'viewing',
    customer: '23 pessoas',
    message: 'visualizando',
    location: 'Online',
    time: 'agora',
    pizza: 'este cardápio'
  }, {
    id: 6,
    type: 'order',
    customer: 'Ana',
    message: 'fez pedido de',
    location: 'Itaim Bibi',
    time: '7 min',
    pizza: '3 pizzas grandes'
  }];
  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentActivity(prev => (prev + 1) % activities.length);
        setIsVisible(true);
      }, 300);
    }, 4500);
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
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };
  return <div className="fixed bottom-4 left-4 z-50 max-w-sm">
      
    </div>;
};
export default LiveActivityFeed;