
import React, { useState, useEffect } from 'react';
import { Clock, Flame } from 'lucide-react';

const UrgencyTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 47,
    seconds: 33
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else {
          // Reset timer when it reaches zero
          hours = 2;
          minutes = 47;
          seconds = 33;
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-3 rounded-lg shadow-lg animate-pulse">
      <div className="flex items-center justify-center space-x-2">
        <Flame className="w-5 h-5 animate-bounce" />
        <div className="text-center">
          <div className="text-sm font-medium">🔥 OFERTA ESPECIAL TERMINA EM:</div>
          <div className="text-xl font-bold">
            {String(timeLeft.hours).padStart(2, '0')}:
            {String(timeLeft.minutes).padStart(2, '0')}:
            {String(timeLeft.seconds).padStart(2, '0')}
          </div>
        </div>
        <Clock className="w-5 h-5 animate-spin" />
      </div>
    </div>
  );
};

export default UrgencyTimer;
