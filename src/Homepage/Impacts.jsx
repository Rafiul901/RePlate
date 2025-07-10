import React, { useState, useEffect } from 'react';
import { FaLeaf, FaUtensils, FaUsers, FaChartLine } from 'react-icons/fa';

const Impacts = () => {
  const [counters, setCounters] = useState({
    kilos: 0,
    meals: 0,
    co2: 0,
    partners: 0
  });

  const stats = [
    { 
      id: 'kilos',
      target: 12540, 
      label: 'Kilos Saved', 
      icon: <FaLeaf className="text-white text-3xl" />,
      gradient: 'from-emerald-500 to-teal-600'
    },
    { 
      id: 'meals',
      target: 62700, 
      label: 'Meals Provided', 
      icon: <FaUtensils className="text-white text-3xl" />,
      gradient: 'from-green-500 to-emerald-600'
    },
    { 
      id: 'co2',
      target: 31.5, 
      label: 'Tons CO₂ Reduced', 
      icon: <FaChartLine className="text-white text-3xl" />,
      gradient: 'from-lime-500 to-green-600'
    },
    { 
      id: 'partners',
      target: 240, 
      label: 'Community Partners', 
      icon: <FaUsers className="text-white text-3xl" />,
      gradient: 'from-teal-500 to-cyan-600'
    }
  ];

  useEffect(() => {
    const duration = 5000; // Animation duration in ms
    const increment = 50; // How often to update in ms
    
    stats.forEach(stat => {
      const step = (stat.target / (duration / increment));
      let current = 0;
      
      const timer = setInterval(() => {
        current += step;
        if (current >= stat.target) {
          current = stat.target;
          clearInterval(timer);
        }
        
        setCounters(prev => ({
          ...prev,
          [stat.id]: Math.floor(current)
        }));
      }, increment);
      
      return () => clearInterval(timer);
    });
  }, []);

  const formatNumber = (num, isDecimal = false) => {
    if (isDecimal) {
      return num.toFixed(1);
    }
    return num.toLocaleString();
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-800">
          Our Impact in Numbers
        </h2>
        <p className="text-lg text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          Every donation creates ripples of change. Here's what we've achieved together.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className={`bg-gradient-to-br ${stat.gradient} rounded-2xl p-6 shadow-xl transform hover:scale-105 transition-all duration-300 h-full`}
            >
              <div className="flex flex-col items-center text-center h-full">
                <div className="mb-4 p-4 bg-white/20 rounded-full">
                  {stat.icon}
                </div>
                <h3 className="text-5xl font-bold text-white mb-2">
                  {stat.id === 'co2' ? 
                    formatNumber(counters[stat.id], true) : 
                    formatNumber(counters[stat.id])}
                  {stat.id === 'partners' && '+'}
                </h3>
                <p className="text-xl text-white/90">{stat.label}</p>
                <div className="mt-auto pt-4 w-full">
                  <div className="h-1 bg-white/30 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-white rounded-full`}
                      style={{ width: `${Math.min(100, 20 + index * 25)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          
        </div>
      </div>
    </section>
  );
};

export default Impacts;