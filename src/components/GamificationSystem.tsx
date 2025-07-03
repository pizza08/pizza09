
import React, { useState, useEffect } from 'react';
import { Trophy, Star, Award, Target, Gift, Crown, Zap, Medal } from 'lucide-react';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  progress: number;
  maxProgress: number;
  reward: string;
  unlocked: boolean;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface UserStats {
  level: number;
  xp: number;
  xpToNext: number;
  totalOrders: number;
  favoriteCategory: string;
  streak: number;
  badges: string[];
}

const GamificationSystem = () => {
  const [userStats, setUserStats] = useState<UserStats>({
    level: 5,
    xp: 1250,
    xpToNext: 1500,
    totalOrders: 12,
    favoriteCategory: 'Tradicional',
    streak: 3,
    badges: ['first-order', 'pizza-lover', 'weekend-warrior']
  });

  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: 'first-order',
      name: 'Primeira Fatia',
      description: 'Faça seu primeiro pedido',
      icon: <Star className="w-6 h-6" />,
      progress: 1,
      maxProgress: 1,
      reward: '50 XP + 5% desconto no próximo pedido',
      unlocked: true,
      rarity: 'common'
    },
    {
      id: 'pizza-lover',
      name: 'Amante de Pizza',
      description: 'Peça 10 pizzas',
      icon: <Trophy className="w-6 h-6" />,
      progress: 10,
      maxProgress: 10,
      reward: 'Badge especial + Pizza grátis no aniversário',
      unlocked: true,
      rarity: 'rare'
    },
    {
      id: 'weekend-warrior',
      name: 'Guerreiro do Fim de Semana',
      description: 'Peça pizza 3 fins de semana seguidos',
      icon: <Crown className="w-6 h-6" />,
      progress: 3,
      maxProgress: 3,
      reward: 'Status VIP + Entrega grátis aos fins de semana',
      unlocked: true,
      rarity: 'epic'
    },
    {
      id: 'variety-master',
      name: 'Mestre da Variedade',
      description: 'Experimente 5 categorias diferentes',
      icon: <Award className="w-6 h-6" />,
      progress: 3,
      maxProgress: 5,
      reward: '20% desconto em qualquer pizza',
      unlocked: false,
      rarity: 'rare'
    },
    {
      id: 'speed-demon',
      name: 'Demônio da Velocidade',
      description: 'Complete um pedido em menos de 2 minutos',
      icon: <Zap className="w-6 h-6" />,
      progress: 0,
      maxProgress: 1,
      reward: 'Badge Relâmpago + Desconto expresso',
      unlocked: false,
      rarity: 'epic'
    },
    {
      id: 'legend',
      name: 'Lenda da Pizzaria',
      description: 'Alcance o nível 10',
      icon: <Medal className="w-6 h-6" />,
      progress: 5,
      maxProgress: 10,
      reward: 'Status Lendário + Benefícios vitalícios',
      unlocked: false,
      rarity: 'legendary'
    }
  ]);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'from-gray-400 to-gray-600';
      case 'rare': return 'from-blue-400 to-blue-600';
      case 'epic': return 'from-purple-400 to-purple-600';
      case 'legendary': return 'from-yellow-400 to-orange-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getRarityBorder = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-300';
      case 'rare': return 'border-blue-300';
      case 'epic': return 'border-purple-300';
      case 'legendary': return 'border-yellow-300';
      default: return 'border-gray-300';
    }
  };

  const calculateLevel = (xp: number) => {
    return Math.floor(xp / 300) + 1;
  };

  const calculateProgressPercent = (current: number, max: number) => {
    return Math.min((current / max) * 100, 100);
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-2xl">
      <div className="max-w-4xl mx-auto">
        {/* User Level and Stats */}
        <div className="bg-white rounded-xl p-6 mb-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                  <Crown className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">
                  {userStats.level}
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Chef Pizzaiolo</h2>
                <p className="text-gray-600">Nível {userStats.level} • {userStats.xp} XP</p>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-sm text-gray-600 mb-1">Próximo nível</div>
              <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-orange-400 to-red-500 transition-all duration-300"
                  style={{ width: `${(userStats.xp / userStats.xpToNext) * 100}%` }}
                />
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {userStats.xpToNext - userStats.xp} XP restantes
              </div>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{userStats.totalOrders}</div>
              <div className="text-sm text-gray-600">Pedidos</div>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{userStats.streak}</div>
              <div className="text-sm text-gray-600">Sequência</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{userStats.badges.length}</div>
              <div className="text-sm text-gray-600">Badges</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-xl font-bold text-purple-600">{userStats.favoriteCategory}</div>
              <div className="text-sm text-gray-600">Favorita</div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-500" />
            Conquistas
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`relative p-4 rounded-lg border-2 transition-all ${
                  achievement.unlocked 
                    ? `${getRarityBorder(achievement.rarity)} bg-gradient-to-br ${getRarityColor(achievement.rarity)} bg-opacity-10` 
                    : 'border-gray-200 bg-gray-50 opacity-60'
                }`}
              >
                {/* Rarity Indicator */}
                <div className={`absolute top-2 right-2 w-3 h-3 rounded-full bg-gradient-to-r ${getRarityColor(achievement.rarity)}`} />
                
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${
                    achievement.unlocked 
                      ? `bg-gradient-to-r ${getRarityColor(achievement.rarity)} text-white` 
                      : 'bg-gray-200 text-gray-400'
                  }`}>
                    {achievement.icon}
                  </div>
                  
                  <div className="flex-1">
                    <h4 className={`font-bold ${achievement.unlocked ? 'text-gray-800' : 'text-gray-500'}`}>
                      {achievement.name}
                    </h4>
                    <p className={`text-sm ${achievement.unlocked ? 'text-gray-600' : 'text-gray-400'}`}>
                      {achievement.description}
                    </p>
                    
                    {/* Progress Bar */}
                    <div className="mt-2">
                      <div className="flex justify-between text-xs mb-1">
                        <span>{achievement.progress}/{achievement.maxProgress}</span>
                        <span>{calculateProgressPercent(achievement.progress, achievement.maxProgress).toFixed(0)}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-300 ${
                            achievement.unlocked 
                              ? `bg-gradient-to-r ${getRarityColor(achievement.rarity)}` 
                              : 'bg-gray-300'
                          }`}
                          style={{ width: `${calculateProgressPercent(achievement.progress, achievement.maxProgress)}%` }}
                        />
                      </div>
                    </div>
                    
                    {/* Reward */}
                    <div className="mt-2 text-xs text-orange-600 font-medium">
                      <Gift className="w-3 h-3 inline mr-1" />
                      {achievement.reward}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamificationSystem;
