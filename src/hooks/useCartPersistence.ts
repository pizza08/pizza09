
import { useEffect } from 'react';
import { useCart } from '../contexts/CartContext';

export const useCartPersistence = () => {
  const { state, dispatch } = useCart();

  // Carregar carrinho do localStorage na inicialização
  useEffect(() => {
    const savedCart = localStorage.getItem('fornob_cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        if (parsedCart.items && parsedCart.items.length > 0) {
          parsedCart.items.forEach((item: any) => {
            dispatch({ type: 'ADD_ITEM', payload: item });
          });
        }
      } catch (error) {
        console.error('Erro ao carregar carrinho:', error);
        localStorage.removeItem('fornob_cart');
      }
    }
  }, []);

  // Salvar carrinho no localStorage sempre que mudar
  useEffect(() => {
    if (state.items.length > 0) {
      localStorage.setItem('fornob_cart', JSON.stringify(state));
    } else {
      localStorage.removeItem('fornob_cart');
    }
  }, [state]);

  return { state, dispatch };
};
