import React from 'react';
import Banner from './Banner';
import Impacts from './Impacts';
import Community from './Community';
import FeaturedDonations from './FeatureDonations';


const Home = () => {
  return (
    <div>
      <Banner />
      <FeaturedDonations /> {/* ✅ Inserted here */}
      <Impacts />
      <Community />
    </div>
  );
};

export default Home;
