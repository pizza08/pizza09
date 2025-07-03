
import React from 'react';
import HeroSection from '../components/HeroSection';
import ValueProposition from '../components/ValueProposition';
import SmartMenuPreview from '../components/SmartMenuPreview';
import SocialProofSection from '../components/SocialProofSection';
import PracticalInfo from '../components/PracticalInfo';
import LiveNotifications from '../components/LiveNotifications';
import LiveActivityFeed from '../components/LiveActivityFeed';
import UrgencyTimer from '../components/UrgencyTimer';

const Home = () => {
  return (
    <div>
      <HeroSection />
      <ValueProposition />
      
      {/* Timer de urgência */}
      <div className="bg-gray-100 py-4">
        <div className="container mx-auto px-4 flex justify-center">
          <UrgencyTimer />
        </div>
      </div>
      
      <SmartMenuPreview />
      <SocialProofSection />
      <PracticalInfo />
      
      {/* Componentes de notificação live */}
      <LiveNotifications />
      <LiveActivityFeed />
    </div>
  );
};

export default Home;
