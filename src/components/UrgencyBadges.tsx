
import React from 'react';
import { Clock, Fire, TrendingUp, Users, AlertCircle } from 'lucide-react';

interface UrgencyBadgeProps {
  type: 'bestseller' | 'limited' | 'trending' | 'lastunits' | 'timer';
  value?: string | number;
  className?: string;
}

const UrgencyBadges = ({ type, value, className = "" }: UrgencyBadgeProps) => {
  const getBadgeConfig = () => {
    switch (type) {
      case 'bestseller':
        return {
          icon: <Fire className="w-3 h-3" />,
          text: 'Mais Vendido',
          bgColor: 'bg-red-500',
          textColor: 'text-white',
          pulseColor: 'animate-pulse'
        };
      case 'limited':
        return {
          icon: <Clock className="w-3 h-3" />,
          text: 'Oferta Limitada',
          bgColor: 'bg-purple-500',
          textColor: 'text-white',
          pulseColor: 'animate-pulse'
        };
      case 'trending':
        return {
          icon: <TrendingUp className="w-3 h-3" />,
          text: 'Em Alta',
          bgColor: 'bg-green-500',
          textColor: 'text-white',
          pulseColor: ''
        };
      case 'lastunits':
        return {
          icon: <AlertCircle className="w-3 h-3" />,
          text: `Só ${value} restantes`,
          bgColor: 'bg-orange-500',
          textColor: 'text-white',
          pulseColor: 'animate-pulse'
        };
      case 'timer':
        return {
          icon: <Clock className="w-3 h-3" />,
          text: `${value}`,
          bgColor: 'bg-red-600',
          textColor: 'text-white',
          pulseColor: 'animate-pulse'
        };
      default:
        return {
          icon: null,
          text: '',
          bgColor: 'bg-gray-500',
          textColor: 'text-white',
          pulseColor: ''
        };
    }
  };

  const config = getBadgeConfig();

  return (
    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${config.bgColor} ${config.textColor} ${config.pulseColor} ${className}`}>
      {config.icon}
      <span>{config.text}</span>
    </div>
  );
};

export default UrgencyBadges;
