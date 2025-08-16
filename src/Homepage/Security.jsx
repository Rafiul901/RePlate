import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShieldAlt, FaHandsWash, FaTemperatureHigh, FaClock, FaBoxOpen, FaUserShield } from 'react-icons/fa';

const Security = () => {
  const [activeTab, setActiveTab] = useState('food');

  const guidelines = {
    food: {
      title: "Food Safety Standards",
      icon: <FaTemperatureHigh className="text-cyan-600" />,
      items: [
        {
          title: "Temperature Control",
          description: "All perishable food must be maintained below 5°C (41°F) or above 60°C (140°F) during transport and storage."
        },
        {
          title: "Time Limits",
          description: "Food must be distributed within 4 hours of preparation or immediately refrigerated at safe temperatures."
        },
        {
          title: "Packaging Requirements",
          description: "All food must be securely packaged in food-grade containers with proper labeling of contents and preparation time."
        }
      ]
    },
    handling: {
      title: "Safe Handling Procedures",
      icon: <FaHandsWash className="text-green-600" />,
      items: [
        {
          title: "Personal Hygiene",
          description: "All handlers must wash hands thoroughly before food preparation and wear clean gloves when handling ready-to-eat foods."
        },
        {
          title: "Cross-Contamination",
          description: "Separate cutting boards and utensils must be used for raw meats and ready-to-eat foods."
        },
        {
          title: "Illness Policy",
          description: "Any staff with symptoms of illness must not handle food until symptom-free for 48 hours."
        }
      ]
    },
    platform: {
      title: "Platform Security",
      icon: <FaShieldAlt className="text-blue-600" />,
      items: [
        {
          title: "Data Protection",
          description: "All user data is encrypted and stored securely in compliance with GDPR and local privacy regulations."
        },
        {
          title: "Account Security",
          description: "Two-factor authentication is required for all partner accounts handling sensitive information."
        },
        {
          title: "Fraud Prevention",
          description: "All donation requests are verified through our validation system before being matched with donors."
        }
      ]
    }
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-green-50 to-cyan-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-700 to-cyan-700">
            Security & Safety Guidelines
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Ensuring safe food handling and secure operations for all RePlate partners
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div className="flex justify-center mb-8">
          <div className="inline-flex bg-white rounded-lg shadow-md p-1">
            {Object.keys(guidelines).map((key) => (
              <motion.button
                key={key}
                className={`px-6 py-3 text-sm font-medium rounded-md transition-all ${activeTab === key ? 'bg-gradient-to-r from-green-500 to-cyan-500 text-white' : 'text-gray-600 hover:text-gray-800'}`}
                onClick={() => setActiveTab(key)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <div className="flex items-center gap-2">
                  {guidelines[key].icon}
                  {guidelines[key].title}
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Guidelines Content */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid gap-6"
            >
              {guidelines[activeTab].items.map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500"
                  whileHover={{ y: -3 }}
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-3">
                    <span className="p-2 bg-green-100 rounded-full text-green-600">
                      {index + 1}
                    </span>
                    {item.title}
                  </h3>
                  <p className="text-gray-600 pl-11">{item.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Additional Resources */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 bg-white rounded-xl shadow-lg overflow-hidden max-w-4xl mx-auto"
        >

        </motion.div>
      </div>
    </section>
  );
};

export default Security;