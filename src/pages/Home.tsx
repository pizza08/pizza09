
import React from 'react';
import HeroSection from '../components/HeroSection';
import ValueProposition from '../components/ValueProposition';
import SmartMenuPreview from '../components/SmartMenuPreview';
import SocialProofSection from '../components/SocialProofSection';
import PracticalInfo from '../components/PracticalInfo';
import LiveNotifications from '../components/LiveNotifications';
import LiveActivityFeed from '../components/LiveActivityFeed';
import UrgencyTimer from '../components/UrgencyTimer';
import ExitIntentPopup from '../components/ExitIntentPopup';
import ReviewsCarousel from '../components/ReviewsCarousel';
import TrustSignals from '../components/TrustSignals';
import { useExitIntent } from '../hooks/useExitIntent';
import { useToast } from '../hooks/use-toast';

const Home = () => {
  const { showPopup, closePopup } = useExitIntent();
  const { toast } = useToast();

  const handleCouponAccept = (couponCode: string) => {
    // Salvar cupom no localStorage para uso posterior
    localStorage.setItem('appliedCoupon', couponCode);
    
    toast({
      title: "🎉 Cupom Ativado!",
      description: `Seu desconto de 15% com o código ${couponCode} foi aplicado! Válido por 24h.`,
      duration: 5000,
    });

    // Opcional: redirecionar para o menu
    // window.location.href = '/menu';
  };

  return (
    <div className="relative">
      <HeroSection />
      
      {/* Timer de urgência global - mais prominente */}
      <div className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 py-3 sticky top-0 z-40 shadow-lg">
        <div className="container mx-auto px-4 flex justify-center">
          <UrgencyTimer />
        </div>
      </div>
      
      <TrustSignals />
      <ValueProposition />
      <SmartMenuPreview />
      <ReviewsCarousel />
      <SocialProofSection />
      <PracticalInfo />
      
      {/* Componentes de notificação live - agora mais realistas */}
      <LiveNotifications />
      <LiveActivityFeed />

      {/* Exit Intent Popup */}
      {showPopup && (
        <ExitIntentPopup
          onClose={closePopup}
          onAccept={handleCouponAccept}
        />
      )}
    </div>
  );
};

export default Home;
