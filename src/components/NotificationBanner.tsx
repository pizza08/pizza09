
import React, { useState, useEffect } from 'react';
import { X, Clock, Truck, Gift } from 'lucide-react';

interface Notification {
  id: string;
  type: 'promotion' | 'delivery' | 'general';
  title: string;
  message: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
  dismissible: boolean;
}

const NotificationBanner = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'promotion',
      title: 'Promoção Especial!',
      message: '2 pizzas grandes por R$ 89,90 - Válido até meia-noite!',
      icon: Gift,
      color: 'text-red-600',
      bgColor: 'bg-red-50 border-red-200',
      dismissible: true
    },
    {
      id: '2',
      type: 'delivery',
      title: 'Entrega Rápida',
      message: 'Pedidos até 22h entregues em até 45 minutos',
      icon: Truck,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 border-blue-200',
      dismissible: true
    }
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (notifications.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % notifications.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [notifications.length]);

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    if (currentIndex >= notifications.length - 1) {
      setCurrentIndex(0);
    }
  };

  if (notifications.length === 0) return null;

  const currentNotification = notifications[currentIndex];
  const Icon = currentNotification.icon;

  return (
    <div className={`border rounded-lg p-4 mb-6 ${currentNotification.bgColor}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Icon className={`w-5 h-5 ${currentNotification.color}`} />
          <div className="flex-1">
            <div className={`font-semibold ${currentNotification.color}`}>
              {currentNotification.title}
            </div>
            <div className="text-gray-700 text-sm">
              {currentNotification.message}
            </div>
          </div>
        </div>
        
        {currentNotification.dismissible && (
          <button
            onClick={() => dismissNotification(currentNotification.id)}
            className="p-1 hover:bg-white rounded-full transition-colors"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        )}
      </div>
      
      {notifications.length > 1 && (
        <div className="flex justify-center mt-3 space-x-2">
          {notifications.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-gray-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationBanner;
