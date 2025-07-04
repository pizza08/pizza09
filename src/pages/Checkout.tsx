
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useOrders } from '../hooks/useOrders';
import { usePayment } from '../hooks/usePayment';
import { Button } from '../components/ui/button';
import { Separator } from '../components/ui/separator';
import PaymentMethods from '../components/PaymentMethods';
import PaymentQRCode from '../components/PaymentQRCode';
import PixDeliveryModal, { PixDeliveryData } from '../components/PixDeliveryModal';
import { ArrowLeft, CheckCircle, CreditCard } from 'lucide-react';

const Checkout = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useCart();
  const { createOrder, isLoading: isCreatingOrder } = useOrders();
  const { createPayment, isLoading: isCreatingPayment } = usePayment();
  
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [showPixModal, setShowPixModal] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [deliveryData, setDeliveryData] = useState<PixDeliveryData | null>(null);
  const [paymentData, setPaymentData] = useState<{
    paymentId: string;
    qrCode: string;  
    qrCodeImage: string;
    amount: number;
  } | null>(null);

  const deliveryFee = 5.00;
  const subtotal = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = subtotal + deliveryFee;

  const handlePaymentMethodSelect = (method: string) => {
    setSelectedPaymentMethod(method);
  };

  const handleFinalizarPedido = () => {
    if (!selectedPaymentMethod) {
      alert('Selecione uma forma de pagamento');
      return;
    }

    if (state.items.length === 0) {
      alert('Seu carrinho está vazio!');
      return;
    }

    if (selectedPaymentMethod === 'pix') {
      setShowPixModal(true);
    } else {
      // Para outros métodos de pagamento, criar pedido diretamente
      createOrderDirectly();
    }
  };

  const handlePixDeliveryConfirm = async (data: PixDeliveryData) => {
    setDeliveryData(data);
    
    const paymentResponse = await createPayment({
      amount: total,
      description: `Pedido Pizzaria - ${state.items.length} item(s)`,
      customerName: data.name,
      customerPhone: data.phone,
      orderId: `temp_${Date.now()}`
    });

    if (paymentResponse.success && paymentResponse.qrCode && paymentResponse.qrCodeImage) {
      setPaymentData({
        paymentId: paymentResponse.paymentId!,
        qrCode: paymentResponse.qrCode,
        qrCodeImage: paymentResponse.qrCodeImage,
        amount: paymentResponse.amount!
      });
      setShowPixModal(false);
      setShowQRCode(true);
    }
  };

  const createOrderDirectly = async () => {
    if (!deliveryData) return;

    const orderData = {
      customerName: deliveryData.name,
      customerPhone: deliveryData.phone,
      customerEmail: undefined,
      deliveryAddress: deliveryData.address,
      paymentMethod: selectedPaymentMethod,
      notes: undefined,
      items: state.items.map(item => ({
        pizzaName: item.name,
        pizzaSize: 'Média',
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

  const handlePaymentConfirmed = async () => {
    await createOrderDirectly();
  };

  const handleCancelPayment = () => {
    setShowQRCode(false);
    setPaymentData(null);
    setDeliveryData(null);
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

  // Se estiver mostrando QR Code
  if (showQRCode && paymentData) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <Button
            variant="ghost"
            onClick={handleCancelPayment}
            className="text-orange-600 hover:text-orange-700 hover:bg-orange-50 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao Checkout
          </Button>
        </div>
        
        <PaymentQRCode
          paymentId={paymentData.paymentId}
          qrCode={paymentData.qrCode}
          qrCodeImage={paymentData.qrCodeImage}
          amount={paymentData.amount}
          onPaymentConfirmed={handlePaymentConfirmed}
          onCancel={handleCancelPayment}
        />
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
        <p className="text-gray-600">Selecione a forma de pagamento para continuar 🍕</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Forma de Pagamento */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md border">
            <div className="flex items-center mb-4">
              <CreditCard className="w-5 h-5 text-orange-500 mr-2" />
              <h2 className="text-xl font-semibold">Forma de Pagamento</h2>
            </div>
            
            <PaymentMethods
              selectedMethod={selectedPaymentMethod}
              onMethodSelect={handlePaymentMethodSelect}
              orderTotal={total}
            />
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
              onClick={handleFinalizarPedido}
              disabled={!selectedPaymentMethod || isCreatingOrder || isCreatingPayment}
              className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 text-lg"
            >
              {isCreatingOrder || isCreatingPayment ? (
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
      </div>

      {/* Modal PIX */}
      <PixDeliveryModal
        isOpen={showPixModal}
        onClose={() => setShowPixModal(false)}
        onConfirm={handlePixDeliveryConfirm}
        isLoading={isCreatingPayment}
      />
    </div>
  );
};

export default Checkout;
