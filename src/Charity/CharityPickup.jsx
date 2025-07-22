import React, { useEffect, useState, useContext } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../Authentication/AuthContext';

const CharityPickup = () => {
  const { user } = useContext(AuthContext);
  const [pickups, setPickups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmingId, setConfirmingId] = useState(null);

  const fetchPickups = async () => {
    if (!user?.email) return;
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/pickups/${user.email}`);
      if (!res.ok) throw new Error('Failed to fetch pickups');
      const data = await res.json();
      setPickups(data);
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Could not load pickups.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPickups();
  }, [user?.email]);

  const confirmPickup = async (requestId) => {
    setConfirmingId(requestId);
    try {
      const res = await fetch(`http://localhost:3000/pickups/${requestId}/confirm`, {
        method: 'PATCH',
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to confirm pickup');
      }
      Swal.fire('Success', 'Pickup confirmed!', 'success');
      fetchPickups();
    } catch (err) {
      console.error(err);
      Swal.fire('Error', err.message || 'Could not confirm pickup.', 'error');
    } finally {
      setConfirmingId(null);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
    </div>
  );

  if (!pickups.length) return (
    <div className="text-center mt-20 text-green-800">
      <h2 className="text-2xl font-bold mb-2">No pickups assigned</h2>
      <p>You currently have no accepted donation requests to pick up.</p>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-green-900 mb-6">My Pickups</h1>
      <div className="space-y-6">
        {pickups.map(pickup => (
          <div key={pickup._id} className="border rounded-xl shadow-md p-6 bg-lime-50 border-lime-400">
            <h2 className="text-xl font-semibold text-green-900 mb-1">{pickup.donationTitle}</h2>
            <p className="text-green-800 mb-1">
              <strong>Restaurant:</strong> {pickup.restaurantName} — {pickup.location || 'Location not specified'}
            </p>
            <p className="text-green-800 mb-1"><strong>Food type:</strong> {pickup.foodType || 'Not specified'}</p>
            <p className="text-green-800 mb-1"><strong>Quantity:</strong> {pickup.quantity} kg</p>
            <p className="text-green-800 mb-2"><strong>Pickup time:</strong> {new Date(pickup.pickupTime).toLocaleString()}</p>
            <p className={`font-semibold mb-3 ${pickup.status === 'Picked Up' ? 'text-gray-600' : 'text-amber-700'}`}>
              Status: {pickup.status === 'Assigned' ? 'Assigned' : 'Picked Up'}
            </p>
            {pickup.status === 'Assigned' && (
              <button
                onClick={() => confirmPickup(pickup._id)}
                disabled={confirmingId === pickup._id}
                className="bg-gradient-to-br from-lime-500 to-amber-500 text-white py-2 px-4 rounded-lg font-bold hover:shadow-lg transition-shadow disabled:opacity-50"
              >
                {confirmingId === pickup._id ? 'Confirming...' : 'Confirm Pickup'}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CharityPickup;
