import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../Authentication/AuthContext";
import { 
  FaSpinner, 
  FaTrashAlt, 
  FaUtensils, 
  FaStoreAlt, 
  FaWeightHanging, 
  FaInfoCircle,
  FaRegClock,
  FaCheckCircle,
  FaTimesCircle
} from "react-icons/fa";
import { GiFoodTruck } from "react-icons/gi";

const CharityRequest = () => {
  const { user, loading } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    axios
      .get(`https://replate-backend.vercel.app/my-requests/${user.email}`)
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
          .delete(`https://replate-backend.vercel.app/requests/${id}`)
          .then(() => {
            setRequests(requests.filter((r) => r._id !== id));
            Swal.fire("Cancelled", "Your request has been cancelled.", "success");
          })
          .catch(() => {
            Swal.fire("Error", "Failed to cancel request", "error");
          });
      }
    });
  };

  if (loading || isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px]">
        <FaSpinner className="animate-spin text-4xl text-blue-500 mb-4" />
        <p className="text-lg font-medium text-gray-600">Loading your requests...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <GiFoodTruck className="text-3xl text-blue-600" />
        <h2 className="text-3xl font-bold text-gray-800">My Food Requests</h2>
      </div>

      {requests.length === 0 ? (
        <div className="card bg-white border border-blue-100 shadow-sm rounded-xl">
          <div className="card-body text-center py-12">
            <FaInfoCircle className="mx-auto text-5xl text-blue-200 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700">No requests found</h3>
            <p className="text-gray-500">You haven't made any food requests yet.</p>
          </div>
        </div>
      ) : (
        <div className="grid gap-4">
          {requests.map((req) => (
            <div
              key={req._id}
              className="card bg-white border-2 border-blue-500 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:border-blue-500"
            >
              <div className="card-body p-5">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {req.donationTitle || "Untitled Request"}
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    req.status === "Accepted" ? "bg-green-100 text-green-800" :
                    req.status === "Rejected" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {req.status === "Pending" ? <FaRegClock className="inline mr-1" /> : 
                     req.status === "Accepted" ? <FaCheckCircle className="inline mr-1" /> : 
                     <FaTimesCircle className="inline mr-1" />}
                    {req.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <FaStoreAlt className="text-blue-600 text-lg" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Restaurant</p>
                      <p className="font-medium text-gray-800">{req.restaurant || "N/A"}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <div className="bg-green-100 p-2 rounded-full">
                      <FaUtensils className="text-green-600 text-lg" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Food Type</p>
                      <p className="font-medium text-gray-800">{req.foodType || "Unknown"}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg">
                    <div className="bg-amber-100 p-2 rounded-full">
                      <FaWeightHanging className="text-amber-600 text-lg" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Quantity</p>
                      <p className="font-medium text-gray-800">{req.donationQuantity || "N/A"} kg</p>
                    </div>
                  </div>
                </div>

                {req.status === "Pending" && (
                  <div className="flex justify-end mt-4">
                    <button
                      onClick={() => handleCancel(req._id)}
                      className="btn btn-sm btn-error text-white hover:bg-red-600 transition-colors"
                    >
                      <FaTrashAlt className="mr-2" />
                      Cancel Request
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CharityRequest;