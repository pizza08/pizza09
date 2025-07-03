
import React from 'react';
import HeroSection from '../components/HeroSection';
import ValueProposition from '../components/ValueProposition';
import SmartMenuPreview from '../components/SmartMenuPreview';
import SocialProofSection from '../components/SocialProofSection';
import PracticalInfo from '../components/PracticalInfo';
import LiveNotifications from '../components/LiveNotifications';

const Home = () => {
  return (
    <div>
      <HeroSection />
      <ValueProposition />
      <SmartMenuPreview />
      <SocialProofSection />
      <PracticalInfo />
      <LiveNotifications />
    </div>
  );
};

export default Home;
