import React, { useEffect, useState } from 'react';
import DonationCard from '../RootLayout/DonationCard';

const AllDonation = () => {
  const [donations, setDonations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('none');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonations = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (searchTerm) params.append('search', searchTerm);
        if (sortBy && sortBy !== 'none') params.append('sort', sortBy);

        const res = await fetch(`https://replate-backend.vercel.app/donations/filtered?${params}`);
        const data = await res.json();
        setDonations(data);
      } catch (error) {
        console.error('Error fetching donations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, [searchTerm, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-5 py-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">All Donations</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Browse through all available donations. Your contribution can make a difference in someone's life.
        </p>
      </div>

      {/* Search and Sort Section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search donations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <label htmlFor="sort-by" className="font-medium text-gray-700 whitespace-nowrap">Sort by:</label>
          <select
            id="sort-by"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
          >
            <option value="none">Default</option>
            <option value="quantity-asc">Quantity (Low to High)</option>
            <option value="quantity-desc">Quantity (High to Low)</option>
            <option value="time-asc">Pickup Time (Oldest First)</option>
            <option value="time-desc">Pickup Time (Newest First)</option>
          </select>
        </div>
      </div>

      {/* Results */}
      <div className="mb-6 text-gray-600">
        Showing {donations.length} donations
        {sortBy !== 'none' && (
          <span className="ml-2 text-indigo-600">
            (Sorted by {sortBy.replace('-', ' ').replace('asc', 'ascending').replace('desc', 'descending')})
          </span>
        )}
      </div>

      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : donations.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10">
          {donations.map((donation) => (
            <DonationCard key={donation._id} donation={donation} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-gray-700">No donations found</h3>
          <p className="text-gray-500 mt-2">Try adjusting your search term</p>
        </div>
      )}
    </div>
  );
};

export default AllDonation;
