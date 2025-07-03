
import React from 'react';
import { X, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerFooter,
} from './ui/drawer';
import { useIsMobile } from '../hooks/use-mobile';

interface MobileCartDrawerProps {
  cartItemCount: number;
}

const MobileCartDrawer = ({ cartItemCount }: MobileCartDrawerProps) => {
  const { state, dispatch } = useCart();
  const isMobile = useIsMobile();

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      dispatch({ type: 'REMOVE_ITEM', payload: id });
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity: newQuantity } });
    }
  };

  const total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (!isMobile) {
    return (
      <Link to="/cart" className="relative p-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors">
        <ShoppingCart className="w-5 h-5" />
        {cartItemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
            {cartItemCount}
          </span>
        )}
      </Link>
    );
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button className="relative p-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors">
          <ShoppingCart className="w-5 h-5" />
          {cartItemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
              {cartItemCount}
            </span>
          )}
        </button>
      </DrawerTrigger>
      
      <DrawerContent className="max-h-[80vh]">
        <DrawerHeader>
          <DrawerTitle className="flex items-center justify-between">
            <span>Seu Carrinho ({cartItemCount} {cartItemCount === 1 ? 'item' : 'itens'})</span>
          </DrawerTitle>
        </DrawerHeader>
        
        <div className="flex-1 overflow-y-auto px-4">
          {state.items.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingCart className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500">Seu carrinho está vazio</p>
              <DrawerClose asChild>
                <Link
                  to="/menu"
                  className="inline-block mt-3 text-orange-500 hover:text-orange-600 font-medium"
                >
                  Ver cardápio
                </Link>
              </DrawerClose>
            </div>
          ) : (
            <div className="space-y-4">
              {state.items.map((item) => (
                <div key={item.id} className="flex items-center space-x-3 bg-gray-50 rounded-lg p-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm text-gray-800 truncate">{item.name}</h4>
                    <p className="text-orange-600 font-bold">
                      R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 bg-gray-200 hover:bg-gray-300 rounded-full transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 bg-gray-200 hover:bg-gray-300 rounded-full transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {state.items.length > 0 && (
          <DrawerFooter className="px-4 pb-4">
            <div className="bg-orange-50 rounded-lg p-4 mb-4">
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total:</span>
                <span className="text-orange-600">
                  R$ {total.toFixed(2).replace('.', ',')}
                </span>
              </div>
            </div>
            
            <DrawerClose asChild>
              <Link
                to="/checkout"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-lg font-medium text-center transition-colors"
              >
                Finalizar Pedido
              </Link>
            </DrawerClose>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default MobileCartDrawer;
