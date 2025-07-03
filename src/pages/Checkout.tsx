import React, { useState } from 'react';
import { CreditCard, MapPin, Clock, Check, Percent } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import CouponSystem from '../components/CouponSystem';
import LoyaltyProgram from '../components/LoyaltyProgram';
import PaymentMethods from '../components/PaymentMethods';

interface Coupon {
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  minOrder: number;
  description: string;
}

const Checkout = () => {
  const { state, dispatch } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [loyaltyDiscount, setLoyaltyDiscount] = useState({ points: 0, discount: 0 });
  const [formData, setFormData] = useState({
    // Delivery Info
    name: '',
    phone: '',
    address: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    zipCode: '',
    
    // Payment Info
    paymentMethod: 'credit',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    
    // Additional
    notes: ''
  });

  const deliveryFee = 5.99;
  const subtotal = state.total;
  
  // Calculate discounts
  let couponDiscount = 0;
  if (appliedCoupon) {
    couponDiscount = appliedCoupon.type === 'percentage' 
      ? (subtotal * appliedCoupon.discount) / 100
      : appliedCoupon.discount;
  }
  
  const pixDiscount = formData.paymentMethod === 'pix' && subtotal >= 50 ? subtotal * 0.05 : 0;
  const totalDiscounts = couponDiscount + loyaltyDiscount.discount + pixDiscount;
  const finalSubtotal = subtotal - totalDiscounts;
  const total = finalSubtotal + (finalSubtotal >= 40 ? 0 : deliveryFee);
  const isFreeDelivery = finalSubtotal >= 40;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCouponApplied = (coupon: Coupon | null) => {
    setAppliedCoupon(coupon);
  };

  const handleLoyaltyPoints = (points: number, discount: number) => {
    setLoyaltyDiscount({ points, discount });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Process order
      dispatch({ type: 'CLEAR_CART' });
      navigate('/order-success');
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <MapPin className="w-6 h-6 mr-2 text-orange-500" />
              Informações de Entrega
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefone *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Endereço *
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Número *
                </label>
                <input
                  type="text"
                  name="number"
                  value={formData.number}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Complemento
                </label>
                <input
                  type="text"
                  name="complement"
                  value={formData.complement}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bairro *
                </label>
                <input
                  type="text"
                  name="neighborhood"
                  value={formData.neighborhood}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <Percent className="w-6 h-6 mr-2 text-orange-500" />
              Descontos e Benefícios
            </h2>
            
            <CouponSystem 
              onCouponApplied={handleCouponApplied}
              orderTotal={subtotal}
            />
            
            <LoyaltyProgram 
              orderTotal={subtotal}
              onPointsApplied={handleLoyaltyPoints}
            />
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <CreditCard className="w-6 h-6 mr-2 text-orange-500" />
              Forma de Pagamento
            </h2>
            
            <PaymentMethods 
              selectedMethod={formData.paymentMethod}
              onMethodSelect={(method) => setFormData({...formData, paymentMethod: method})}
              orderTotal={subtotal}
            />
            
            {(formData.paymentMethod === 'credit' || formData.paymentMethod === 'debit') && (
              <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Número do Cartão *
                  </label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    placeholder="1234 5678 9012 3456"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome no Cartão *
                  </label>
                  <input
                    type="text"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Validade *
                    </label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      placeholder="MM/AA"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CVV *
                    </label>
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      placeholder="123"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Observações
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows={3}
                placeholder="Alguma observação especial?"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <Check className="w-6 h-6 mr-2 text-orange-500" />
              Confirmar Pedido
            </h2>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-4">Resumo do Pedido</h3>
              {state.items.map((item) => (
                <div key={item.id} className="flex justify-between items-center py-2">
                  <span>{item.quantity}x {item.name}</span>
                  <span>R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}</span>
                </div>
              ))}
              
              <hr className="my-4" />
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
                </div>
                
                {/* Show all discounts */}
                {appliedCoupon && (
                  <div className="flex justify-between text-green-600">
                    <span>Cupom {appliedCoupon.code}</span>
                    <span>-R$ {couponDiscount.toFixed(2).replace('.', ',')}</span>
                  </div>
                )}
                
                {loyaltyDiscount.discount > 0 && (
                  <div className="flex justify-between text-yellow-600">
                    <span>Pontos de fidelidade ({loyaltyDiscount.points} pts)</span>
                    <span>-R$ {loyaltyDiscount.discount.toFixed(2).replace('.', ',')}</span>
                  </div>
                )}
                
                {pixDiscount > 0 && (
                  <div className="flex justify-between text-blue-600">
                    <span>Desconto PIX (5%)</span>
                    <span>-R$ {pixDiscount.toFixed(2).replace('.', ',')}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span>Taxa de entrega</span>
                  <span className={isFreeDelivery ? 'text-green-600' : ''}>
                    {isFreeDelivery ? 'GRÁTIS' : `R$ ${deliveryFee.toFixed(2).replace('.', ',')}`}
                  </span>
                </div>
                
                <div className="flex justify-between font-bold text-lg pt-2 border-t">
                  <span>Total</span>
                  <span>R$ {total.toFixed(2).replace('.', ',')}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-4">Dados de Entrega</h3>
              <p><strong>Nome:</strong> {formData.name}</p>
              <p><strong>Telefone:</strong> {formData.phone}</p>
              <p><strong>Endereço:</strong> {formData.address}, {formData.number}</p>
              <p><strong>Bairro:</strong> {formData.neighborhood}</p>
              {formData.complement && <p><strong>Complemento:</strong> {formData.complement}</p>}
            </div>
            
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex items-center">
              <Clock className="w-5 h-5 text-orange-500 mr-2" />
              <span className="text-orange-800">
                Tempo estimado de entrega: <strong>25-35 minutos</strong>
              </span>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {[1, 2, 3, 4].map((stepNumber) => (
                <div key={stepNumber} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    step >= stepNumber ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    {stepNumber}
                  </div>
                  {stepNumber < 4 && (
                    <div className={`w-20 h-1 mx-2 ${
                      step > stepNumber ? 'bg-orange-500' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-600">
              <span>Entrega</span>
              <span>Descontos</span>
              <span>Pagamento</span>
              <span>Confirmação</span>
            </div>
          </div>
          
          {/* Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <form onSubmit={handleSubmit}>
              {renderStepContent()}
              
              <div className="flex justify-between mt-8">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition-colors"
                  >
                    Voltar
                  </button>
                )}
                
                <button
                  type="submit"
                  className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-bold transition-colors ml-auto"
                >
                  {step === 4 ? 'Confirmar Pedido' : 'Continuar'}
                </button>
              </div>
            </form>
          </div>
          
          {/* Order Summary Sidebar */}
          <div className="mt-6 bg-white rounded-2xl shadow-lg p-6">
            <h3 className="font-semibold text-lg mb-4">Resumo Rápido</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
              </div>
              
              {totalDiscounts > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Descontos:</span>
                  <span>-R$ {totalDiscounts.toFixed(2).replace('.', ',')}</span>
                </div>
              )}
              
              <div className="flex justify-between text-lg font-bold pt-2 border-t">
                <span>Total:</span>
                <span>R$ {total.toFixed(2).replace('.', ',')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
