import React, { useEffect, useState } from 'react';
import DonationCard from '../RootLayout/DonationCard';


const FeaturedDonations = () => {
  const [featuredDonations, setFeaturedDonations] = useState([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch('http://localhost:3000/donations/featured');
        const data = await res.json();
        setFeaturedDonations(data);
      } catch (err) {
        console.error('Error fetching featured donations:', err);
      }
    };

    fetchFeatured();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-5 py-12 ">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-3">🌟 Featured Donations</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Recent or highlighted food donations from our community.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {featuredDonations.map((donation) => (
          <DonationCard key={donation._id} donation={donation} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedDonations;
