import React from 'react';
import Banner from './Banner';
import Impacts from './Impacts';
import Community from './Community';
import FeaturedDonations from './FeatureDonations';
import LatestCharityRequests from './LatestCharityRequests';
import FAQSection from './FAQSection';
import CommunityEvents from './CommunityEvents';
import Security from './Security';


const Home = () => {
  return (
    <div>
      <Banner />
      <FeaturedDonations /> 
      <LatestCharityRequests></LatestCharityRequests>
      <Impacts />
      <Community />
      <FAQSection></FAQSection>
      <Security></Security>
      <CommunityEvents></CommunityEvents>
    </div>
  );
};

export default Home;
