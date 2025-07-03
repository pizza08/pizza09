
import React, { useState, useEffect } from 'react';
import { CheckCircle, Clock, MapPin } from 'lucide-react';

interface Notification {
  id: number;
  type: 'order' | 'review' | 'delivery';
  message: string;
  location: string;
  time: string;
}

const LiveNotifications = () => {
  const [currentNotification, setCurrentNotification] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const notifications: Notification[] = [
    {
      id: 1,
      type: 'order',
      message: 'Pedro fez um pedido',
      location: 'Vila Nova',
      time: 'agora'
    },
    {
      id: 2,
      type: 'review',
      message: 'Marina avaliou 5 ⭐',
      location: 'Centro',
      time: '2 min'
    },
    {
      id: 3,
      type: 'delivery',
      message: 'Entrega finalizada',
      location: 'Jardim Europa',
      time: '3 min'
    },
    {
      id: 4,
      type: 'order',
      message: 'Carlos repetiu o pedido',
      location: 'Bela Vista',
      time: '5 min'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentNotification((prev) => (prev + 1) % notifications.length);
        setIsVisible(true);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const notification = notifications[currentNotification];

  const getIcon = () => {
    switch (notification.type) {
      case 'order':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'review':
        return <span className="text-yellow-500">⭐</span>;
      case 'delivery':
        return <MapPin className="w-4 h-4 text-blue-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="fixed bottom-4 left-4 z-50 max-w-sm">
      <div
        className={`bg-white rounded-lg shadow-lg border border-gray-200 p-4 transition-all duration-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}
      >
        <div className="flex items-center space-x-3">
          {getIcon()}
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">
              {notification.message}
            </p>
            <p className="text-xs text-gray-500">
              {notification.location} • há {notification.time}
            </p>
          </div>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default LiveNotifications;
