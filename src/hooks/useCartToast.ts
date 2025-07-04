
import { toast } from 'sonner';

export const useCartToast = () => {
  const showAddToCartSuccess = (itemName: string) => {
    toast.success(`${itemName} adicionado ao carrinho!`, {
      duration: 2000,
      action: {
        label: "Ver Carrinho",
        onClick: () => window.location.href = '/cart'
      }
    });
  };

  const showRemoveFromCartSuccess = (itemName: string) => {
    toast.info(`${itemName} removido do carrinho`, {
      duration: 1500
    });
  };

  const showWhatsAppRedirect = () => {
    toast.success('Redirecionando para WhatsApp...', {
      duration: 1500
    });
  };

  return {
    showAddToCartSuccess,
    showRemoveFromCartSuccess,
    showWhatsAppRedirect
  };
};
