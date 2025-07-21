import { useEffect, useState } from 'react';
import axios from 'axios';

import Swal from 'sweetalert2';
import { useContext } from 'react';
import { AuthContext } from '../Authentication/AuthContext';
import { useNavigate } from 'react-router';

const MyDonations = () => {
  const { user } = useContext(AuthContext);
  const [donations, setDonations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/pending-donations?email=${user?.email}`).then(res => setDonations(res.data));
  }, [user]);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'This donation will be permanently deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    });

    if (confirm.isConfirmed) {
      await axios.delete(`/pending-donations/${id}`);
      setDonations(prev => prev.filter(d => d._id !== id));
      Swal.fire('Deleted!', 'Donation has been deleted.', 'success');
    }
  };

  const handleUpdate = (donation) => {
    navigate(`/restaurantDashboard/update-donation/${donation._id}`, { state: donation });
  };

  return (
<div className="p-6">
  <h2 className="text-3xl font-bold mb-6 text-gray-800">My Donations</h2>
  
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
    {donations.map(donation => (
      <div key={donation._id} className="w-full h-64 bg-white rounded-xl shadow-lg border border-gray-200 flex">
        {/* Image on left */}
        <div className="w-1/3 h-full">
          <img 
            src={donation.image} 
            alt={donation.title} 
            className="w-full h-full object-cover rounded-l-xl"
          />
        </div>
        
        {/* Content on right */}
        <div className="w-2/3 p-4 flex flex-col">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{donation.title}</h3>
          
          <div className="grid grid-cols-2 gap-2 flex-grow">
            <div className="flex items-center">
              <span className="text-lg mr-2">🍱</span>
              <span className="text-sm text-gray-600">{donation.foodType}</span>
            </div>
            
            <div className="flex items-center">
              <span className="text-lg mr-2">📦</span>
              <span className="text-sm text-gray-600">Qty: {donation.quantity}</span>
            </div>
            
            <div className="flex items-center col-span-2">
              <span className="text-lg mr-2">🏪</span>
              <span className="text-sm text-gray-600">{donation.restaurantName}</span>
            </div>
            
            <div className="flex items-center col-span-2">
              <span className="text-lg mr-2">🔎</span>
              <span className="text-sm text-gray-600">Status: </span>
              <span className={`text-sm font-semibold ml-1 ${
                donation.status === 'Rejected' ? 'text-red-500' : 
                donation.status === 'Verified' ? 'text-green-500' : 
                'text-yellow-500'
              }`}>
                {donation.status}
              </span>
            </div>
          </div>
          
          <div className="flex space-x-2 mt-auto">
            {donation.status !== 'Rejected' && (
              <button
                onClick={() => handleUpdate(donation)}
                className="flex-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm transition-colors"
              >
                Update
              </button>
            )}
            <button
              onClick={() => handleDelete(donation._id)}
              className="flex-1 px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
  );
};

export default MyDonations;
