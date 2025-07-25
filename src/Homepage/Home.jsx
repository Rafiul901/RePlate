import React from 'react';
import Banner from './Banner';
import Impacts from './Impacts';
import Community from './Community';
import FeaturedDonations from './FeatureDonations';
import LatestCharityRequests from './LatestCharityRequests';


const Home = () => {
  return (
    <div>
      <Banner />
      <FeaturedDonations /> 
      <LatestCharityRequests></LatestCharityRequests>
      <Impacts />
      <Community />
    </div>
  );
};

export default Home;
