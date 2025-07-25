import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const FeatureDonation = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVerifiedDonations();
  }, []);

  const fetchVerifiedDonations = async () => {
    try {
      const res = await axios.get('http://localhost:3000/verified-donations');
      setDonations(res.data);
    } catch (error) {
      console.error('Failed to fetch donations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFeature = async (donationId) => {
    try {
      const res = await axios.patch(`http://localhost:3000/donations/${donationId}/feature`, {
        isFeatured: true
      });

      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: 'success',
          title: 'Donation Featured!',
          toast: true,
          timer: 2000,
          position: 'top-end',
          showConfirmButton: false,
        });
        fetchVerifiedDonations();
      } else {
        Swal.fire({
          icon: 'info',
          title: 'Already Featured',
          toast: true,
          timer: 2000,
          position: 'top-end',
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error('Error featuring donation:', error);
      Swal.fire('Error', 'Failed to feature donation.', 'error');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Feature Donations</h2>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="table-auto w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Food Type</th>
              <th className="px-4 py-2">Restaurant</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation) => (
              <tr key={donation._id} className="border-t">
                <td className="px-4 py-2">
                  <img
                    src={donation.image}
                    alt={donation.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-2">{donation.title}</td>
                <td className="px-4 py-2">{donation.foodType}</td>
                <td className="px-4 py-2">{donation.restaurantName}</td>
                <td className="px-4 py-2">
                  {!donation.isFeatured ? (
                    <button
                      onClick={() => handleFeature(donation._id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded"
                    >
                      Feature
                    </button>
                  ) : (
                    <span className="text-green-600 font-semibold">Featured</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!loading && donations.length === 0 && (
          <p className="text-center p-4 text-gray-500">
            No verified donations found.
          </p>
        )}
      </div>
    </div>
  );
};

export default FeatureDonation;
