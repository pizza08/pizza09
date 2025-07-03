
import React, { useState, useEffect } from 'react';
import { Star, Gift, Trophy } from 'lucide-react';

interface LoyaltyProgramProps {
  orderTotal: number;
  onPointsApplied: (pointsUsed: number, discount: number) => void;
}

const LoyaltyProgram = ({ orderTotal, onPointsApplied }: LoyaltyProgramProps) => {
  const [userPoints, setUserPoints] = useState(150); // Mock user points
  const [pointsToUse, setPointsToUse] = useState(0);
  const [earnedPoints, setEarnedPoints] = useState(0);

  useEffect(() => {
    // Calculate points earned from this order (1 point per R$ 1)
    setEarnedPoints(Math.floor(orderTotal));
  }, [orderTotal]);

  const maxPointsToUse = Math.min(userPoints, Math.floor(orderTotal * 10)); // Max 10% of order can be paid with points
  const pointValue = 0.05; // Each point = R$ 0.05
  const discount = pointsToUse * pointValue;

  const applyPoints = () => {
    onPointsApplied(pointsToUse, discount);
  };

  const clearPoints = () => {
    setPointsToUse(0);
    onPointsApplied(0, 0);
  };

  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200">
      <h3 className="font-semibold text-lg mb-4 flex items-center">
        <Star className="w-5 h-5 mr-2 text-yellow-500" />
        Programa de Fidelidade
      </h3>
      
      <div className="space-y-4">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <Trophy className="w-5 h-5 text-yellow-600 mr-2" />
              <span className="font-medium text-yellow-800">Seus Pontos</span>
            </div>
            <span className="text-2xl font-bold text-yellow-600">{userPoints}</span>
          </div>
          
          <div className="text-yellow-700 text-sm">
            <p>• Cada R$ 1 = 1 ponto</p>
            <p>• 100 pontos = R$ 5,00 de desconto</p>
            <p>• Use até 10% do valor do pedido em pontos</p>
          </div>
        </div>
        
        {maxPointsToUse > 0 && (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Usar pontos (máximo: {maxPointsToUse} pontos)
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="0"
                  max={maxPointsToUse}
                  step="10"
                  value={pointsToUse}
                  onChange={(e) => setPointsToUse(Number(e.target.value))}
                  className="flex-1"
                />
                <span className="text-sm font-medium w-16">{pointsToUse} pts</span>
              </div>
            </div>
            
            {pointsToUse > 0 && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <span className="text-green-800">Desconto com pontos:</span>
                  <span className="font-bold text-green-600">
                    -R$ {discount.toFixed(2).replace('.', ',')}
                  </span>
                </div>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={applyPoints}
                    className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm transition-colors"
                  >
                    Aplicar
                  </button>
                  <button
                    onClick={clearPoints}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition-colors"
                  >
                    Limpar
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="flex items-center">
            <Gift className="w-4 h-4 text-blue-600 mr-2" />
            <span className="text-blue-800 text-sm">
              Você ganhará <strong>{earnedPoints} pontos</strong> com este pedido!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoyaltyProgram;
