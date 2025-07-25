import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaHandHoldingHeart, FaRegClock, FaArrowRight } from "react-icons/fa";
import { GiPresent } from "react-icons/gi";

const LatestCharityRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("https://replate-backend.vercel.app/latest-charity-requests")
      .then(res => {
        setRequests(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load latest charity requests", err);
        setLoading(false);
      });
  }, []);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        <p className="mt-2 text-gray-600">Loading charity requests...</p>
      </div>
    );
  }

  if (!loading && requests.length === 0) {
    return (
      <div className="p-8 text-center">
        <FaHandHoldingHeart className="mx-auto text-4xl text-gray-400 mb-3" />
        <p className="text-gray-600">No charity requests available at the moment.</p>
      </div>
    );
  }

  return (
    <section className="py-12 px-4 bg-cyan-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            Recent Charity Requests
          </h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Discover the latest requests from charities in need of support
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {requests.map((req) => (
            <motion.div
              key={req._id}
              variants={item}
              whileHover={{ y: -5 }}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl blur opacity-0 group-hover:opacity-75 transition duration-200"></div>
              <div className="relative border-2 bg-white rounded-xl p-6 h-full  border-cyan-200 hover:border-transparent transition-all">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative">
                    <img
                      src={req.image || "/default-avatar.png"}
                      alt={req.charityName}
                      className="w-14 h-14 rounded-full object-cover border-2 border-white shadow"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white p-1 rounded-full">
                      <FaHandHoldingHeart className="text-xs" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{req.charityName}</h3>
                    <div className="flex items-center text-sm text-gray-500">
                      <FaRegClock className="mr-1" />
                      <span>Recent request</span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 mb-5 italic relative pl-4 before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-blue-400 before:rounded-full">
                  "{req.requestDescription}"
                </p>

                <div className="mt-auto">
                  <div className="flex items-center justify-between bg-blue-50 rounded-lg px-4 py-3">
                    <div className="flex items-center">
                      <GiPresent className="text-blue-500 mr-2" />
                      <span className="text-sm font-medium text-gray-700">
                        {req.donationTitle}
                      </span>
                    </div>
                    <button className="text-blue-500 hover:text-blue-700 transition">
                      <FaArrowRight />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-12">
        
        </div>
      </div>
    </section>
  );
};

export default LatestCharityRequests;