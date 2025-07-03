
import React, { useState } from 'react';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import WhatsAppOrder from '../components/WhatsAppOrder';

const Cart = () => {
  const { state, dispatch } = useCart();
  const [deliveryFee] = useState(8.00); // Taxa fixa realista

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const subtotal = state.total;
  const total = subtotal + (subtotal >= 50 ? 0 : deliveryFee);
  const isFreeDelivery = subtotal >= 50;

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Seu carrinho está vazio</h2>
          <p className="text-gray-600 mb-8">Que tal escolher uma deliciosa pizza?</p>
          
          <div className="space-y-4">
            <WhatsAppOrder 
              text="🍕 Ver Pizzas no WhatsApp"
              className="w-full justify-center py-3"
            />
            <Link 
              to="/menu"
              className="block bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-medium transition-colors"
            >
              Ver Cardápio Completo
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Seu Carrinho</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              {state.items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 py-4 border-b border-gray-200 last:border-b-0">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-orange-500 font-bold">
                      R$ {item.price.toFixed(2).replace('.', ',')}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    
                    <span className="font-semibold min-w-[2rem] text-center">
                      {item.quantity}
                    </span>
                    
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                    
                    <button
                      onClick={() => removeItem(item.id)}
                      className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center hover:bg-red-200 transition-colors text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Resumo do Pedido</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">R$ {subtotal.toFixed(2).replace('.', ',')}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Taxa de entrega</span>
                  <span className={`font-semibold ${isFreeDelivery ? 'text-green-600' : ''}`}>
                    {isFreeDelivery ? 'GRÁTIS' : `R$ ${deliveryFee.toFixed(2).replace('.', ',')}`}
                  </span>
                </div>
                
                {!isFreeDelivery && (
                  <p className="text-sm text-orange-600">
                    Faltam R$ {(50 - subtotal).toFixed(2).replace('.', ',')} para frete grátis!
                  </p>
                )}
                
                <hr className="my-4" />
                
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>R$ {total.toFixed(2).replace('.', ',')}</span>
                </div>
              </div>
              
              {/* Botão WhatsApp Principal */}
              <WhatsAppOrder 
                variant="cart"
                text="🍕 Finalizar via WhatsApp"
                className="mb-3"
              />
              
              {/* Checkout Tradicional */}
              <Link
                to="/checkout"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-medium text-center transition-colors block mb-3"
              >
                Checkout Tradicional
              </Link>
              
              <Link
                to="/menu"
                className="w-full border-2 border-orange-500 text-orange-500 hover:bg-orange-50 py-3 rounded-lg font-medium text-center transition-colors block"
              >
                Adicionar Mais Itens
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
