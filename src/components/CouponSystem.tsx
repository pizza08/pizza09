
import React, { useState } from 'react';
import { Tag, Percent, Gift } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Coupon {
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  minOrder: number;
  description: string;
}

interface CouponSystemProps {
  onCouponApplied: (coupon: Coupon | null) => void;
  orderTotal: number;
}

const CouponSystem = ({ onCouponApplied, orderTotal }: CouponSystemProps) => {
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Mock coupons - in a real app, these would come from your backend
  const availableCoupons: Coupon[] = [
    { code: 'PIZZA10', discount: 10, type: 'percentage', minOrder: 30, description: '10% off em pedidos acima de R$ 30' },
    { code: 'WELCOME15', discount: 15, type: 'percentage', minOrder: 50, description: '15% off para novos clientes' },
    { code: 'FIXO5', discount: 5, type: 'fixed', minOrder: 25, description: 'R$ 5 off em pedidos acima de R$ 25' },
    { code: 'PROMO20', discount: 20, type: 'percentage', minOrder: 80, description: '20% off em pedidos acima de R$ 80' }
  ];

  const applyCoupon = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const coupon = availableCoupons.find(c => c.code.toLowerCase() === couponCode.toLowerCase());
      
      if (!coupon) {
        toast({
          title: "Cupom inválido",
          description: "O código inserido não é válido.",
          variant: "destructive"
        });
        setLoading(false);
        return;
      }
      
      if (orderTotal < coupon.minOrder) {
        toast({
          title: "Pedido mínimo não atingido",
          description: `Pedido mínimo de R$ ${coupon.minOrder.toFixed(2).replace('.', ',')} para este cupom.`,
          variant: "destructive"
        });
        setLoading(false);
        return;
      }
      
      setAppliedCoupon(coupon);
      onCouponApplied(coupon);
      toast({
        title: "Cupom aplicado!",
        description: `${coupon.description} aplicado com sucesso.`
      });
      setLoading(false);
    }, 1000);
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    onCouponApplied(null);
    setCouponCode('');
    toast({
      title: "Cupom removido",
      description: "O desconto foi removido do seu pedido."
    });
  };

  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200">
      <h3 className="font-semibold text-lg mb-4 flex items-center">
        <Tag className="w-5 h-5 mr-2 text-orange-500" />
        Cupom de Desconto
      </h3>
      
      {!appliedCoupon ? (
        <div className="space-y-4">
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Digite seu cupom"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button
              onClick={applyCoupon}
              disabled={!couponCode || loading}
              className="px-6 py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white rounded-lg font-medium transition-colors"
            >
              {loading ? 'Verificando...' : 'Aplicar'}
            </button>
          </div>
          
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
            <p className="text-orange-800 text-sm font-medium mb-2">Cupons disponíveis:</p>
            <div className="space-y-1">
              {availableCoupons.map((coupon) => (
                <div key={coupon.code} className="text-orange-700 text-xs">
                  <span className="font-mono bg-orange-100 px-2 py-1 rounded mr-2">{coupon.code}</span>
                  {coupon.description}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Percent className="w-5 h-5 text-green-600 mr-2" />
              <div>
                <p className="font-medium text-green-800">
                  Cupom {appliedCoupon.code} aplicado!
                </p>
                <p className="text-green-600 text-sm">{appliedCoupon.description}</p>
              </div>
            </div>
            <button
              onClick={removeCoupon}
              className="text-red-600 hover:text-red-800 text-sm underline"
            >
              Remover
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CouponSystem;
