import React from 'react';
import { useLoaderData } from 'react-router';
import DonationCard from '../RootLayout/DonationCard';

const AllDonation = () => {
const data = useLoaderData();
console.log(data);

  return (
  <div className="max-w-7xl mx-auto px-5 py-10">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10">
    {data.map((donation) => (
      <DonationCard key={donation.id} {...donation} />
    ))}
  </div>
</div>



  );
};

export default AllDonation;