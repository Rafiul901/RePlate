import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const ManageRequest = () => {
  const [requests, setRequests] = useState([]);

  // Fetch requests on load
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get('http://localhost:3000/charity-requests');
        setRequests(res.data);
      } catch (err) {
        console.error('Failed to fetch requests', err);
      }
    };
    fetchRequests();
  }, []);

  // Handle Delete
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'This will permanently delete the request.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e3342f',
      confirmButtonText: 'Yes, delete it!',
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`http://localhost:3000/charity-requests/${id}`);
        setRequests(prev => prev.filter(r => r._id !== id));

        Swal.fire('Deleted!', 'The request has been removed.', 'success');
      } catch (err) {
        Swal.fire('Error', 'Failed to delete the request.', 'error');
      }
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Requests</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Donation Title</th>
              <th className="px-4 py-2 text-left">Charity Name</th>
              <th className="px-4 py-2 text-left">Charity Email</th>
              <th className="px-4 py-2 text-left">Description</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req._id} className="border-t">
                <td className="px-4 py-2">{req.donationTitle}</td>
                <td className="px-4 py-2">{req.charityName}</td>
                <td className="px-4 py-2">{req.charityEmail}</td>
                <td className="px-4 py-2">{req.description}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDelete(req._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {requests.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageRequest;
