
import React, { useState, useEffect } from 'react';
import { AlertTriangle, Package } from 'lucide-react';

interface StockCounterProps {
  initialStock?: number;
  productName: string;
  className?: string;
  showIcon?: boolean;
}

const StockCounter = ({ 
  initialStock = Math.floor(Math.random() * 8) + 2, // Entre 2 e 9
  productName,
  className = "",
  showIcon = true 
}: StockCounterProps) => {
  const [stock, setStock] = useState(initialStock);
  const [isDecreasing, setIsDecreasing] = useState(false);

  useEffect(() => {
    // Simular diminuição do estoque em intervalos aleatórios
    const interval = setInterval(() => {
      const shouldDecrease = Math.random() > 0.85; // 15% de chance
      
      if (shouldDecrease && stock > 1) {
        setIsDecreasing(true);
        setTimeout(() => {
          setStock(prev => Math.max(1, prev - 1));
          setIsDecreasing(false);
        }, 300);
      }
    }, Math.random() * 30000 + 15000); // Entre 15-45 segundos

    return () => clearInterval(interval);
  }, [stock]);

  const getUrgencyLevel = () => {
    if (stock <= 2) return 'critical';
    if (stock <= 4) return 'high';
    if (stock <= 6) return 'medium';
    return 'low';
  };

  const getStyles = () => {
    const urgency = getUrgencyLevel();
    
    switch (urgency) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-300 animate-pulse';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default:
        return 'bg-green-100 text-green-800 border-green-300';
    }
  };

  const getMessage = () => {
    const urgency = getUrgencyLevel();
    
    switch (urgency) {
      case 'critical':
        return `🚨 Só ${stock} restante${stock === 1 ? '' : 's'}!`;
      case 'high':
        return `⚠️ ${stock} unidades restantes`;
      case 'medium':
        return `${stock} disponíveis`;
      default:
        return `${stock} em estoque`;
    }
  };

  const getIcon = () => {
    const urgency = getUrgencyLevel();
    
    if (urgency === 'critical' || urgency === 'high') {
      return <AlertTriangle className="w-3 h-3" />;
    }
    return <Package className="w-3 h-3" />;
  };

  return (
    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold border transition-all duration-300 ${getStyles()} ${isDecreasing ? 'scale-110' : 'scale-100'} ${className}`}>
      {showIcon && getIcon()}
      <span>{getMessage()}</span>
    </div>
  );
};

export default StockCounter;
