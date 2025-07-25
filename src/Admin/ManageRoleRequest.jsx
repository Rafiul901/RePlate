import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const ManageRoleRequest = () => {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const res = await axios.get('https://replate-backend.vercel.app/role-requests');
      setRequests(res.data);
    } catch (err) {
      console.error('Failed to fetch role requests:', err);
    }
  };

  const handleAction = async (req, action) => {
    const confirmed = await Swal.fire({
      title: `Are you sure you want to ${action} this request?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: `Yes, ${action} it!`,
    });

    if (!confirmed.isConfirmed) return;

    try {
      // Update request status
      await axios.patch(`https://replate-backend.vercel.app/role-requests/${req._id}`, {
        status: action === 'approve' ? 'Approved' : 'Rejected',
      });

      // Assign role if approved
      if (action === 'approve') {
        await axios.patch(`https://replate-backend.vercel.app/users/${req.email}/role`, {
          role: 'Charity',
        });
      }

      Swal.fire(`${action}d!`, `The request has been ${action}d.`, 'success');
      fetchRequests();
    } catch (err) {
      console.error(`Failed to ${action} request:`, err);
      Swal.fire('Error', `Could not ${action} the request`, 'error');
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Manage Role Requests</h2>
      <div className="overflow-x-auto bg-white  shadow">
        <table className="min-w-full text-sm text-left border">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Organization</th>
              <th className="px-4 py-2 border">Mission</th>
              <th className="px-4 py-2 border">Transaction ID</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req._id} className="border-t">
                <td className="px-4 py-2">{req.name}</td>
                <td className="px-4 py-2">{req.email}</td>
                <td className="px-4 py-2">{req.organizationName}</td>
                <td className="px-4 py-2">{req.missionStatement}</td>
                <td className="px-4 py-2">{req.transactionId}</td>
                <td className="px-4 py-2 font-medium text-indigo-600">{req.status}</td>
                <td className="px-4 py-2 space-x-2">
                  {req.status === 'Pending' ? (
                    <>
                      <button
                        onClick={() => handleAction(req, 'approve')}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleAction(req, 'reject')}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <span className="text-gray-500 italic">Action taken</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {requests.length === 0 && (
          <p className="text-center p-4 text-gray-500">No role requests found.</p>
        )}
      </div>
    </div>
  );
};

export default ManageRoleRequest;
