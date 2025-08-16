import React from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaUtensils, FaRecycle } from 'react-icons/fa';
import { useNavigate } from 'react-router';

const CommunityEvents = () => {
  const navigate = useNavigate();

  const events = [
    {
      id: 1,
      title: "Food Recovery Workshop",
      date: "June 15, 2023",
      time: "10:00 AM - 12:00 PM",
      location: "Community Center, Downtown",
      description: "Learn best practices for food recovery and safe handling from our experts. Perfect for new restaurant partners and charities.",
      attendees: 24,
      icon: <FaUtensils className="text-green-600" />,
      registrationLink: "/events/food-recovery-workshop"
    },
    {
      id: 2,
      title: "Monthly Donor Appreciation",
      date: "June 22, 2023",
      time: "6:00 PM - 8:00 PM",
      location: "Green Valley Park",
      description: "Celebrating our top donating restaurants this month with live music and networking. Open to all partners.",
      attendees: 56,
      icon: <FaUsers className="text-cyan-600" />,
      registrationLink: "/events/donor-appreciation"
    },
    {
      id: 3,
      title: "Zero Waste Cooking Class",
      date: "July 5, 2023",
      time: "4:00 PM - 6:00 PM",
      location: "Culinary Arts Institute",
      description: "Chef Maria Gonzalez teaches creative ways to use surplus ingredients. Limited spots available!",
      attendees: 18,
      icon: <FaRecycle className="text-emerald-600" />,
      registrationLink: "/events/cooking-class"
    }
  ];

  const handleEventRegister = (eventId, registrationLink) => {
    console.log(`Registering for event ${eventId}`);
    // In a real app, you might:
    // 1. Track the registration click
    // 2. Navigate to registration page
    // 3. Open a modal, etc.
    navigate(registrationLink);
  };

  const handleViewAllEvents = () => {
    console.log("View all events clicked");
    navigate('/events');
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-cyan-50 to-green-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-700 to-cyan-700">
            Upcoming Community Events
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Join us for workshops, celebrations, and networking opportunities
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden border-t-4 border-green-500 hover:shadow-xl transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-full bg-green-100 mr-4">
                    {event.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{event.title}</h3>
                    <div className="flex items-center text-sm text-cyan-600 mt-1">
                      <FaCalendarAlt className="mr-2" />
                      {event.date} • {event.time}
                    </div>
                  </div>
                </div>

                <div className="flex items-center text-gray-600 mb-4">
                  <FaMapMarkerAlt className="mr-2 text-green-500" />
                  <span>{event.location}</span>
                </div>

                <p className="text-gray-600 mb-6">{event.description}</p>

                <div className="flex justify-between items-center">
                  <div className="flex items-center text-sm text-gray-500">
                    <FaUsers className="mr-2" />
                    {event.attendees} attending
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-gradient-to-r from-green-500 to-cyan-500 text-white rounded-lg text-sm font-medium"
                    onClick={() => handleEventRegister(event.id, event.registrationLink)}
                  >
                    Register Now
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 border-2 border-green-600 text-green-600 font-medium rounded-lg hover:bg-green-600 hover:text-white transition-all duration-300"
            onClick={handleViewAllEvents}
          >
            View All Events
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default CommunityEvents;