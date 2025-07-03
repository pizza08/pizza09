
import React, { useState, useEffect } from 'react';
import { Users, Eye } from 'lucide-react';

const LiveVisitorCounter = () => {
  const [visitors, setVisitors] = useState(23);
  const [todayOrders, setTodayOrders] = useState(247);

  useEffect(() => {
    // Simular mudanças no contador de visitantes
    const visitorInterval = setInterval(() => {
      setVisitors(prev => {
        const change = Math.random() > 0.5 ? 1 : -1;
        const newValue = prev + change;
        return Math.max(15, Math.min(35, newValue));
      });
    }, 8000);

    // Simular incremento nos pedidos do dia
    const orderInterval = setInterval(() => {
      setTodayOrders(prev => prev + 1);
    }, 45000);

    return () => {
      clearInterval(visitorInterval);
      clearInterval(orderInterval);
    };
  }, []);

  return (
    <div className="inline-flex items-center space-x-6 bg-white/10 backdrop-blur rounded-full px-4 py-2 text-sm">
      <div className="flex items-center space-x-2">
        <Eye className="w-4 h-4" />
        <span className="font-medium">{visitors} pessoas vendo</span>
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Users className="w-4 h-4" />
        <span className="font-medium">{todayOrders} pedidos hoje</span>
      </div>
    </div>
  );
};

export default LiveVisitorCounter;
