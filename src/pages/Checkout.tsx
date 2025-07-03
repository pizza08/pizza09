
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useOrders } from '../hooks/useOrders';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Separator } from '../components/ui/separator';
import PaymentMethods from '../components/PaymentMethods';
import { ArrowLeft, MapPin, CreditCard, CheckCircle } from 'lucide-react';

const Checkout = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useCart();
  const { createOrder, isLoading } = useOrders();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    notes: '',
    paymentMethod: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const deliveryFee = 5.00;
  const subtotal = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = subtotal + deliveryFee;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Nome é obrigatório';
    if (!formData.phone.trim()) newErrors.phone = 'Telefone é obrigatório';
    if (!formData.address.trim()) newErrors.address = 'Endereço é obrigatório';
    if (!formData.paymentMethod) newErrors.paymentMethod = 'Selecione uma forma de pagamento';

    // Validação de telefone básica
    if (formData.phone && !/^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(formData.phone)) {
      newErrors.phone = 'Formato inválido. Use: (11) 99999-9999';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const formatPhone = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{4,5})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return value;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    if (state.items.length === 0) {
      alert('Seu carrinho está vazio!');
      return;
    }

    const orderData = {
      customerName: formData.name,
      customerPhone: formData.phone,
      customerEmail: formData.email || undefined,
      deliveryAddress: formData.address,
      paymentMethod: formData.paymentMethod,
      notes: formData.notes || undefined,
      items: state.items.map(item => ({
        pizzaName: item.name,
        pizzaSize: 'Média', // Por enquanto fixo, pode ser melhorado
        quantity: item.quantity,
        unitPrice: item.price,
        totalPrice: item.price * item.quantity,
      })),
      totalAmount: total,
      deliveryFee: deliveryFee,
    };

    const result = await createOrder(orderData);
    
    if (result.success) {
      dispatch({ type: 'CLEAR_CART' });
      navigate('/order-success', { 
        state: { orderId: result.orderId }
      });
    }
  };

  if (state.items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Seu carrinho está vazio</h2>
        <p className="text-gray-600 mb-8">Adicione algumas pizzas deliciosas antes de finalizar o pedido!</p>
        <Button onClick={() => navigate('/menu')} className="bg-orange-500 hover:bg-orange-600">
          Ver Cardápio
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="text-orange-600 hover:text-orange-700 hover:bg-orange-50 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Finalizar Pedido</h1>
        <p className="text-gray-600">Preencha seus dados para receber suas pizzas quentinhas! 🍕</p>
      </div>

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 gap-8">
        {/* Dados do Cliente */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md border">
            <div className="flex items-center mb-4">
              <MapPin className="w-5 h-5 text-orange-500 mr-2" />
              <h2 className="text-xl font-semibold">Dados de Entrega</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome Completo *
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Seu nome completo"
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Telefone *
                </label>
                <Input
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', formatPhone(e.target.value))}
                  placeholder="(11) 99999-9999"
                  className={errors.phone ? 'border-red-500' : ''}
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  E-mail (opcional)
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Endereço Completo *
                </label>
                <Textarea
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Rua, número, bairro, cidade..."
                  className={errors.address ? 'border-red-500' : ''}
                  rows={3}
                />
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Observações (opcional)
                </label>
                <Textarea
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder="Alguma observação especial?"
                  rows={2}
                />
              </div>
            </div>
          </div>

          {/* Forma de Pagamento */}
          <div className="bg-white p-6 rounded-lg shadow-md border">
            <div className="flex items-center mb-4">
              <CreditCard className="w-5 h-5 text-orange-500 mr-2" />
              <h2 className="text-xl font-semibold">Pagamento</h2>
            </div>
            
            <PaymentMethods
              selectedMethod={formData.paymentMethod}
              onMethodSelect={(method) => handleInputChange('paymentMethod', method)}
              orderTotal={total}
            />
            {errors.paymentMethod && (
              <p className="text-red-500 text-sm mt-2">{errors.paymentMethod}</p>
            )}
          </div>
        </div>

        {/* Resumo do Pedido */}
        <div className="lg:sticky lg:top-8 lg:h-fit">
          <div className="bg-white p-6 rounded-lg shadow-md border">
            <h2 className="text-xl font-semibold mb-4">Resumo do Pedido</h2>
            
            <div className="space-y-3 mb-4">
              {state.items.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-600">Qtd: {item.quantity}</p>
                  </div>
                  <p className="font-semibold text-orange-600">
                    R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                  </p>
                </div>
              ))}
            </div>

            <Separator className="my-4" />

            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxa de entrega</span>
                <span>R$ {deliveryFee.toFixed(2).replace('.', ',')}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-orange-600">R$ {total.toFixed(2).replace('.', ',')}</span>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 text-lg"
            >
              {isLoading ? (
                'Processando...'
              ) : (
                <>
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Finalizar Pedido
                </>
              )}
            </Button>

            <p className="text-xs text-gray-500 text-center mt-3">
              🔒 Seus dados estão seguros conosco
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
