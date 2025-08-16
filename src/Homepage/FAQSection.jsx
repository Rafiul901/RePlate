import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLeaf, FaRecycle, FaStore, FaHandsHelping, FaQuestionCircle } from 'react-icons/fa';

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "How does RePlate help reduce food waste?",
      answer: "RePlate connects restaurants with surplus food to local charities and organizations that can distribute it to those in need. Our platform makes it easy to schedule pickups and track donations, ensuring good food doesn't go to waste.",
      icon: <FaLeaf className="text-green-600 text-xl" />
    },
    {
      question: "Who can request food donations?",
      answer: "Registered charities, food banks, shelters, and other non-profit organizations with proper documentation can request donations through our platform. Individuals can browse listings but need organizational credentials to schedule pickups.",
      icon: <FaHandsHelping className="text-cyan-600 text-xl" />
    },
    {
      question: "What types of food can be donated?",
      answer: "We accept all non-perishable foods and prepared foods that meet safety standards. Perishable items must be properly stored and within their safe consumption window. Our platform provides guidelines for safe food handling.",
      icon: <FaStore className="text-blue-600 text-xl" />
    },
    {
      question: "How do restaurants benefit from using RePlate?",
      answer: "Restaurants reduce waste disposal costs, receive tax deductions for donations, enhance their sustainability profile, and build stronger community ties. Many partners report improved staff morale and customer loyalty.",
      icon: <FaRecycle className="text-emerald-600 text-xl" />
    },
    {
      question: "Is there a cost to use RePlate?",
      answer: "Basic platform access is free for all users. We offer premium features for larger organizations needing advanced analytics and scheduling tools. No one is ever charged for receiving donated food.",
      icon: <FaQuestionCircle className="text-teal-600 text-xl" />
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
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
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Get answers to common questions about how RePlate works
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="overflow-hidden"
            >
              <motion.div
                className={`p-6 rounded-xl cursor-pointer flex items-start ${activeIndex === index ? 'bg-white shadow-lg border-l-4 border-green-500' : 'bg-white/80 hover:bg-white shadow-md'}`}
                onClick={() => toggleFAQ(index)}
                whileHover={{ scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <div className="mr-4 mt-1">
                  {faq.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 flex justify-between items-center">
                    {faq.question}
                    <motion.span
                      animate={{ rotate: activeIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-gray-500"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </motion.span>
                  </h3>
                  <AnimatePresence>
                    {activeIndex === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-3"
                      >
                        <p className="text-gray-600">{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FAQSection;