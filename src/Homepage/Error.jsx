import React from 'react';
import error from '../assets/error.jpg';
import { motion } from 'framer-motion';

const Error = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex justify-center items-center"
      >
        <img
          src={error}
          alt="Error 404"
          className="w-full max-w-2xl md:max-w-3xl lg:max-w-4xl rounded-lg shadow-xl"
        />
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-col items-center justify-center text-center mt-8 max-w-2xl"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Oops! Page Not Found
        </h1>
        
        <p className="text-gray-600 text-lg mb-8">
          The page you're looking for doesn't exist or may have been moved.
          <br />
          Let's get you back on track.
        </p>
        
        <motion.a
          href="/"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
        >
          Return to Homepage
        </motion.a>
        
      
      </motion.div>
    </div>
  );
};

export default Error;