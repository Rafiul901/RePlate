// src/Charity/CharityRequest.jsx
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../Authentication/AuthContext";

const CharityRequest = () => {
  const { user, loading } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    axios
      .get(`http://localhost:3000/my-requests/${user.email}`)
      .then((res) => setRequests(res.data))
      .catch((err) => {
        console.error("Failed to load requests:", err);
        Swal.fire("Error", "Failed to fetch requests", "error");
      })
      .finally(() => setIsLoading(false));
  }, [user?.email]);

  const handleCancel = (id) => {
    Swal.fire({
      title: "Cancel Request?",
      text: "Are you sure you want to cancel this request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3000/requests/${id}`)
          .then(() => {
            setRequests(requests.filter((r) => r._id !== id));
            Swal.fire("Cancelled", "Your request has been cancelled.", "success");
          })
          .catch((err) => {
            Swal.fire("Error", "Failed to cancel request", "error");
          });
      }
    });
  };

  if (loading || isLoading) {
    return <div className="text-center py-10 text-lg">Loading requests...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-6">My Requests</h2>

      {requests.length === 0 ? (
        <p className="text-gray-600">No requests found.</p>
      ) : (
        <div className="grid gap-6">
          {requests.map((req) => (
            <div
              key={req._id}
              className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-xl font-semibold text-blue-700 mb-1">
                {req.donationDetails?.title || "Untitled"}
              </h3>
              <p>
                <strong>Restaurant:</strong>{" "}
                {req.donationDetails?.restaurantName || "N/A"}
              </p>
              <p>
                <strong>Food Type:</strong> {req.donationDetails?.foodType}
              </p>
              <p>
                <strong>Quantity:</strong> {req.donationDetails?.quantity} kg
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`font-semibold ${
                    req.status === "Accepted"
                      ? "text-green-600"
                      : req.status === "Rejected"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {req.status}
                </span>
              </p>

              {req.status === "Pending" && (
                <button
                  onClick={() => handleCancel(req._id)}
                  className="mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
                >
                  Cancel Request
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CharityRequest;
