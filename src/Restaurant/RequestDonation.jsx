import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Authentication/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";
import { FaCheck, FaTimes } from "react-icons/fa";

const RequestDonation = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:3000/restaurant-requests`, {
          params: { restaurantEmail: user?.email },
        });
        setRequests(res.data);
      } catch (err) {
        setError("Failed to load requests");
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) fetchRequests();
  }, [user?.email]);

  const handleAccept = async (id, donationId) => {
    const confirm = await Swal.fire({
      title: "Accept this request?",
      text: "This will accept the donation.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, accept",
    });

    if (!confirm.isConfirmed) return;

    setActionLoading(id);
    try {
      await axios.patch(`http://localhost:3000/requests/${id}/accept`, {
        donationId,
      });
      setRequests((prev) =>
        prev.map((req) =>
          req._id === id
            ? { ...req, status: "Accepted" }
            : req.donationId === donationId
            ? { ...req, status: "Rejected" }
            : req
        )
      );
    } catch (err) {
      Swal.fire("Error", "Failed to accept request", "error");
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (id) => {
    const { value: reason } = await Swal.fire({
      title: "Reject this request?",
      input: "text",
      inputLabel: "Reason (optional)",
      showCancelButton: true,
      confirmButtonText: "Reject",
    });

    if (reason === undefined) return;

    setActionLoading(id);
    try {
      await axios.patch(`http://localhost:3000/requests/${id}/reject`, {
        rejectionReason: reason,
      });
      setRequests((prev) =>
        prev.map((req) => (req._id === id ? { ...req, status: "Rejected" } : req))
      );
    } catch (err) {
      Swal.fire("Error", "Failed to reject request", "error");
    } finally {
      setActionLoading(null);
    }
  };

  const getStatusBadge = (status) => {
    const base = "px-2 py-1 rounded-full text-xs font-semibold";
    if (status === "Pending") return <span className={`${base} bg-yellow-100 text-yellow-800`}>Pending</span>;
    if (status === "Accepted") return <span className={`${base} bg-green-100 text-green-800`}>Accepted</span>;
    if (status === "Rejected") return <span className={`${base} bg-red-100 text-red-800`}>Rejected</span>;
    return null;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-green-900 mb-6 text-center sm:text-left">Requested Donations</h1>

      {loading ? (
        <p>Loading requests...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : requests.length === 0 ? (
        <p className="text-gray-600">No requests found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg text-sm sm:text-base">
            <thead className="bg-green-100 text-green-900">
              <tr>
                <th className="py-3 px-4 text-left">Donation Title</th>
                <th className="py-3 px-4 text-left">Food Type</th>
                <th className="py-3 px-4 text-left">Charity</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Description</th>
                <th className="py-3 px-4 text-left">Pickup Time</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr key={request._id} className="border-t">
                  <td className="py-2 px-4">{request.donationTitle || "Unknown Donation"}</td>
                  <td className="py-2 px-4">{request.foodType || "N/A"}</td>
                  <td className="py-2 px-4">{request.charityName || "N/A"}</td>
                  <td className="py-2 px-4">{request.charityEmail}</td>
                  <td className="py-2 px-4">{request.requestDescription || "N/A"}</td>
                  <td className="py-2 px-4">{request.pickupTime || "N/A"}</td>
                  <td className="py-2 px-4">{getStatusBadge(request.status)}</td>
                  <td className="py-2 px-4">
                    {request.status === "Pending" && (
                      <div className="flex flex-col sm:flex-row gap-2">
                        <button
                          onClick={() => handleAccept(request._id, request.donationId)}
                          disabled={actionLoading === request._id}
                          className="flex items-center justify-center gap-2 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 disabled:opacity-50"
                        >
                          <FaCheck />
                          {actionLoading === request._id ? "Accepting..." : "Accept"}
                        </button>
                        <button
                          onClick={() => handleReject(request._id)}
                          disabled={actionLoading === request._id}
                          className="flex items-center justify-center gap-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 disabled:opacity-50"
                        >
                          <FaTimes />
                          {actionLoading === request._id ? "Rejecting..." : "Reject"}
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RequestDonation;
