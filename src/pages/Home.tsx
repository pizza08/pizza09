
import React from 'react';
import HeroSection from '../components/HeroSection';
import ValueProposition from '../components/ValueProposition';
import SmartMenuPreview from '../components/SmartMenuPreview';
import SocialProofSection from '../components/SocialProofSection';
import PracticalInfo from '../components/PracticalInfo';

const Home = () => {
  return (
    <div>
      <HeroSection />
      <ValueProposition />
      <SmartMenuPreview />
      <SocialProofSection />
      <PracticalInfo />
    </div>
  );
};

export default Home;
