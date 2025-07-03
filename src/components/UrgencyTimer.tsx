
import React, { useState, useEffect } from 'react';
import { Clock, Flame, AlertTriangle } from 'lucide-react';

const UrgencyTimer = () => {
  const [timeLeft, setTimeLeft] = useState(() => {
    // Verificar se há um timer salvo no localStorage
    const savedTime = localStorage.getItem('urgencyTimer');
    if (savedTime) {
      const saved = JSON.parse(savedTime);
      const now = Date.now();
      const elapsed = Math.floor((now - saved.startTime) / 1000);
      const remaining = Math.max(0, saved.totalTime - elapsed);
      return {
        hours: Math.floor(remaining / 3600),
        minutes: Math.floor((remaining % 3600) / 60),
        seconds: remaining % 60,
        total: remaining
      };
    }
    
    // Timer inicial de 2h47min33s se não houver timer salvo
    const initialTime = 2 * 3600 + 47 * 60 + 33;
    return {
      hours: 2,
      minutes: 47,
      seconds: 33,
      total: initialTime
    };
  });

  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    // Salvar timer inicial no localStorage se não existir
    if (!localStorage.getItem('urgencyTimer')) {
      localStorage.setItem('urgencyTimer', JSON.stringify({
        startTime: Date.now(),
        totalTime: timeLeft.total
      }));
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let newTotal = prev.total - 1;
        
        // Se chegou a zero, resetar para um novo ciclo
        if (newTotal <= 0) {
          newTotal = 2 * 3600 + 47 * 60 + 33; // Reset para 2:47:33
          localStorage.setItem('urgencyTimer', JSON.stringify({
            startTime: Date.now(),
            totalTime: newTotal
          }));
        } else {
          // Atualizar localStorage a cada minuto
          if (newTotal % 60 === 0) {
            const saved = JSON.parse(localStorage.getItem('urgencyTimer') || '{}');
            localStorage.setItem('urgencyTimer', JSON.stringify({
              ...saved,
              totalTime: newTotal
            }));
          }
        }

        return {
          hours: Math.floor(newTotal / 3600),
          minutes: Math.floor((newTotal % 3600) / 60),
          seconds: newTotal % 60,
          total: newTotal
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Efeito de piscar quando o tempo está baixo (menos de 30 minutos)
  useEffect(() => {
    const shouldBlink = timeLeft.total < 30 * 60; // Menos de 30 minutos
    setIsBlinking(shouldBlink);
  }, [timeLeft.total]);

  // Determinar urgência baseada no tempo restante
  const getUrgencyLevel = () => {
    if (timeLeft.total < 15 * 60) return 'critical'; // Menos de 15 min
    if (timeLeft.total < 30 * 60) return 'high';     // Menos de 30 min
    if (timeLeft.total < 60 * 60) return 'medium';   // Menos de 1 hora
    return 'low';
  };

  const urgencyLevel = getUrgencyLevel();

  const getTimerStyles = () => {
    switch (urgencyLevel) {
      case 'critical':
        return 'bg-gradient-to-r from-red-600 to-red-700 animate-pulse shadow-red-500/50';
      case 'high':
        return 'bg-gradient-to-r from-red-500 to-orange-600 shadow-red-400/40';
      case 'medium':
        return 'bg-gradient-to-r from-orange-500 to-yellow-500 shadow-orange-400/40';
      default:
        return 'bg-gradient-to-r from-orange-500 to-red-500 shadow-orange-400/30';
    }
  };

  const getTimerMessage = () => {
    switch (urgencyLevel) {
      case 'critical':
        return '🚨 ÚLTIMOS MINUTOS - OFERTA TERMINA!';
      case 'high':
        return '⚠️ POUCO TEMPO RESTANTE - APROVEITE!';
      case 'medium':
        return '🔥 OFERTA ESPECIAL TERMINA EM:';
      default:
        return '🔥 OFERTA ESPECIAL TERMINA EM:';
    }
  };

  const getAdditionalInfo = () => {
    switch (urgencyLevel) {
      case 'critical':
        return 'Apenas 3 pizzas restantes com desconto!';
      case 'high':
        return 'Últimas 7 pizzas com 45% OFF!';
      case 'medium':
        return '45% OFF + Frete Grátis - Aproveite!';
      default:
        return '45% OFF em todas as pizzas';
    }
  };

  return (
    <div className={`${getTimerStyles()} text-white px-6 py-4 rounded-2xl shadow-2xl transform transition-all duration-300 hover:scale-105 ${isBlinking ? 'animate-pulse' : ''}`}>
      <div className="flex items-center justify-center space-x-4">
        <div className="flex items-center space-x-2">
          {urgencyLevel === 'critical' ? (
            <AlertTriangle className="w-6 h-6 animate-bounce text-yellow-300" />
          ) : (
            <Flame className="w-6 h-6 animate-bounce" />
          )}
          
          <div className="text-center">
            <div className="text-sm font-bold mb-1">
              {getTimerMessage()}
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-mono tracking-wider">
              {String(timeLeft.hours).padStart(2, '0')}:
              {String(timeLeft.minutes).padStart(2, '0')}:
              {String(timeLeft.seconds).padStart(2, '0')}
            </div>
            <div className="text-xs mt-1 opacity-90">
              {getAdditionalInfo()}
            </div>
          </div>
          
          <Clock className={`w-6 h-6 ${urgencyLevel === 'critical' ? 'animate-spin' : 'animate-pulse'}`} />
        </div>
      </div>
      
      {/* Barra de progresso visual */}
      <div className="mt-3 bg-white/20 rounded-full h-2 overflow-hidden">
        <div 
          className="bg-white h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${Math.max(5, (timeLeft.total / (2 * 3600 + 47 * 60 + 33)) * 100)}%`
          }}
        />
      </div>
    </div>
  );
};

export default UrgencyTimer;
