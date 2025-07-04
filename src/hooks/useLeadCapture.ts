import { useState, useEffect } from 'react';

export const useLeadCapture = () => {
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [customerData, setCustomerData] = useState({
    name: '',
    phone: ''
  });

  useEffect(() => {
    // Verificar se já foi capturado ou se modal já foi mostrado
    const leadCaptured = localStorage.getItem('lead_captured');
    const modalShown = localStorage.getItem('lead_modal_shown');
    const customerName = localStorage.getItem('customer_name');
    const customerPhone = localStorage.getItem('customer_phone');

    if (customerName && customerPhone) {
      setCustomerData({
        name: customerName,
        phone: customerPhone
      });
    }

    // Mostrar modal após 5 segundos se não foi capturado ainda
    if (!leadCaptured && !modalShown) {
      const timer = setTimeout(() => {
        setShowLeadModal(true);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleLeadCaptured = (name: string, phone: string) => {
    setCustomerData({ name, phone });
    setShowLeadModal(false);
  };

  const closeLeadModal = () => {
    setShowLeadModal(false);
  };

  const isPersonalized = Boolean(customerData.name);

  return {
    showLeadModal,
    customerData,
    isPersonalized,
    handleLeadCaptured,
    closeLeadModal
  };
};