import React, { useState, useEffect } from 'react';
import { Clock, User, Mail, Package, MapPin, CheckCircle, XCircle, AlertCircle, Calendar } from 'lucide-react';

const RequestDonation = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [processingRequest, setProcessingRequest] = useState(null);
  
  // Mock restaurant email - replace with actual user context
  const restaurantEmail = 'restaurant@example.com';

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3000/restaurant/requests/${restaurantEmail}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch requests');
      }
      
      const data = await response.json();
      setRequests(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching requests:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptRequest = async (requestId, donationTitle) => {
    if (!window.confirm(`Are you sure you want to accept this request for "${donationTitle}"? This will automatically reject all other requests for this donation.`)) {
      return;
    }

    try {
      setProcessingRequest(requestId);
      const response = await fetch(`http://localhost:3000/requests/${requestId}/accept`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to accept request');
      }

      // Refresh the requests list
      await fetchRequests();
      
      // Show success message
      alert('Request accepted successfully! Other requests for this donation have been automatically rejected.');
    } catch (err) {
      console.error('Error accepting request:', err);
      alert('Failed to accept request. Please try again.');
    } finally {
      setProcessingRequest(null);
    }
  };

  const handleRejectRequest = async (requestId, donationTitle) => {
    const reason = window.prompt(`Why are you rejecting the request for "${donationTitle}"? (Optional)`);
    
    // If user clicks cancel, don't proceed
    if (reason === null) return;

    try {
      setProcessingRequest(requestId);
      const response = await fetch(`http://localhost:3000/requests/${requestId}/reject`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rejectionReason: reason || 'Request declined by restaurant'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to reject request');
      }

      // Refresh the requests list
      await fetchRequests();
      
      alert('Request rejected successfully.');
    } catch (err) {
      console.error('Error rejecting request:', err);
      alert('Failed to reject request. Please try again.');
    } finally {
      setProcessingRequest(null);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'Pending': {
        color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        icon: <AlertCircle className="w-4 h-4" />
      },
      'Accepted': {
        color: 'bg-green-100 text-green-800 border-green-200',
        icon: <CheckCircle className="w-4 h-4" />
      },
      'Rejected': {
        color: 'bg-red-100 text-red-800 border-red-200',
        icon: <XCircle className="w-4 h-4" />
      }
    };

    const config = statusConfig[status] || statusConfig['Pending'];

    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border ${config.color}`}>
        {config.icon}
        {status}
      </span>
    );
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-red-800">
            <XCircle className="w-5 h-5" />
            <span className="font-medium">Error loading requests</span>
          </div>
          <p className="text-red-600 mt-1">{error}</p>
          <button 
            onClick={fetchRequests}
            className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Requested Donations</h1>
        <p className="text-gray-600">
          Manage charity requests for your food donations. Accept requests to reserve donations for specific charities.
        </p>
      </div>

      {requests.length === 0 ? (
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No requests yet</h3>
          <p className="text-gray-500">
            When charities request your donations, they'll appear here for your review.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Donation Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Charity Information
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Request Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {requests.map((request) => (
                  <tr key={request._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="font-medium text-gray-900">
                          {request.donationDetails?.title || 'Unknown Donation'}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Package className="w-4 h-4 mr-1" />
                          {request.donationDetails?.foodType || request.donationDetails?.category}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="w-4 h-4 mr-1" />
                          {request.donationDetails?.location}
                        </div>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <User className="w-4 h-4 mr-1 text-gray-400" />
                          <span className="font-medium text-gray-900">
                            {request.requesterName || 'Unknown Charity'}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Mail className="w-4 h-4 mr-1" />
                          {request.charityDetails?.[0]?.email || request.requesterId}
                        </div>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span className="font-medium">Pickup:</span>
                        </div>
                        <div className="text-sm text-gray-900">
                          {formatDateTime(request.pickupTime)}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="w-4 h-4 mr-1" />
                          Requested {formatDateTime(request.createdAt)}
                        </div>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      {getStatusBadge(request.status)}
                    </td>
                    
                    <td className="px-6 py-4">
                      {request.status === 'Pending' ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleAcceptRequest(request._id, request.donationDetails?.title)}
                            disabled={processingRequest === request._id}
                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            {processingRequest === request._id ? (
                              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-1"></div>
                            ) : (
                              <CheckCircle className="w-4 h-4 mr-1" />
                            )}
                            Accept
                          </button>
                          <button
                            onClick={() => handleRejectRequest(request._id, request.donationDetails?.title)}
                            disabled={processingRequest === request._id}
                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            {processingRequest === request._id ? (
                              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-1"></div>
                            ) : (
                              <XCircle className="w-4 h-4 mr-1" />
                            )}
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">
                          {request.status === 'Accepted' ? 'Request accepted' : 'Request rejected'}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {requests.length > 0 && (
        <div className="mt-4 text-sm text-gray-500 text-center">
          Showing {requests.length} request{requests.length !== 1 ? 's' : ''}
        </div>
      )}
    </div>
  );
};

export default RequestDonation;