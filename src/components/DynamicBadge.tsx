
import React from 'react';
import { Flame, TrendingUp, Clock, Star, Zap } from 'lucide-react';

interface DynamicBadgeProps {
  type: 'hot' | 'trending' | 'limited' | 'bestseller' | 'new';
  text?: string;
  className?: string;
}

const DynamicBadge = ({ type, text, className = "" }: DynamicBadgeProps) => {
  const getBadgeConfig = () => {
    switch (type) {
      case 'hot':
        return {
          icon: <Flame className="w-3 h-3" />,
          text: text || 'Mais Pedida',
          bg: 'bg-gradient-to-r from-red-500 to-orange-500',
          animation: 'animate-glow'
        };
      case 'trending':
        return {
          icon: <TrendingUp className="w-3 h-3" />,
          text: text || 'Em Alta',
          bg: 'bg-gradient-to-r from-green-500 to-emerald-500',
          animation: 'animate-bounce-gentle'
        };
      case 'limited':
        return {
          icon: <Clock className="w-3 h-3" />,
          text: text || 'Oferta Limitada',
          bg: 'bg-gradient-to-r from-purple-500 to-pink-500',
          animation: 'animate-pulse'
        };
      case 'bestseller':
        return {
          icon: <Star className="w-3 h-3" />,
          text: text || 'Mais Vendida',
          bg: 'bg-gradient-to-r from-yellow-500 to-orange-500',
          animation: 'animate-glow'
        };
      case 'new':
        return {
          icon: <Zap className="w-3 h-3" />,
          text: text || 'Novidade',
          bg: 'bg-gradient-to-r from-blue-500 to-cyan-500',
          animation: 'animate-bounce-gentle'
        };
      default:
        return {
          icon: null,
          text: text || '',
          bg: 'bg-gray-500',
          animation: ''
        };
    }
  };

  const config = getBadgeConfig();

  return (
    <div className={`
      inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold text-white
      ${config.bg} ${config.animation} ${className}
    `}>
      {config.icon}
      <span>{config.text}</span>
    </div>
  );
};

export default DynamicBadge;
