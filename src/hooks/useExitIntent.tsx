
import { useState, useEffect } from 'react';

export const useExitIntent = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Verificar se já foi mostrado na sessão
    const hasShownInSession = sessionStorage.getItem('exitIntentShown');
    if (hasShownInSession) {
      setHasShown(true);
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // Só ativa se o mouse sair pela parte superior da tela
      if (e.clientY <= 0 && !hasShown && !showPopup) {
        setShowPopup(true);
        setHasShown(true);
        sessionStorage.setItem('exitIntentShown', 'true');
      }
    };

    const handleBeforeUnload = () => {
      if (!hasShown && !showPopup) {
        setShowPopup(true);
        setHasShown(true);
      }
    };

    // Adicionar listeners apenas se não foi mostrado ainda
    if (!hasShown) {
      document.addEventListener('mouseleave', handleMouseLeave);
      window.addEventListener('beforeunload', handleBeforeUnload);
    }

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [hasShown, showPopup]);

  const closePopup = () => {
    setShowPopup(false);
  };

  const resetExitIntent = () => {
    setHasShown(false);
    setShowPopup(false);
    sessionStorage.removeItem('exitIntentShown');
  };

  return { showPopup, closePopup, resetExitIntent, hasShown };
};
