import React from 'react';

const DonationCard = () => {
    return (
            <div className="relative shadow-green-200 shadow-xl w-96 h-88 rounded-xl overflow-hidden p-[3px] group">
      {/* Animated border gradient */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-lime-400 via-amber-400 to-lime-400 bg-[length:200%_200%] animate-spin-slow opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Card content container */}
      <div className="relative w-full h-full rounded-xl bg-gradient-to-br from-lime-50 to-amber-50 overflow-hidden flex flex-col">
        {/* Image */}
        <div className="relative h-36 w-full overflow-hidden">
          <img 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            src="https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
            alt="Food donation"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-green-900/50 via-yellow-600/20 to-transparent"></div>
          
          {/* Status badge */}
          <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-gradient-to-br from-lime-400 to-yellow-400 text-green-900 text-sm font-bold shadow-sm border border-yellow-200/50">
            Available
          </div>
        </div>

        {/* Card body */}
        <div className="p-4 flex-grow flex flex-col">
          <h3 className="font-bold text-lg text-green-900 mb-1">Fresh Bread Donation</h3>
          <p className="text-green-800/80 text-sm mb-3">Artisan sourdough and baguettes</p>
          
          <div className="flex items-center mb-3">
            <div className="bg-gradient-to-br from-lime-200 to-yellow-200 p-2 rounded-lg mr-3 shadow-inner">
              <svg className="h-5 w-5 text-green-700" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-green-900">Boulangerie Central</p>
              <p className="text-sm text-green-700/80">1.2 miles away</p>
            </div>
          </div>

          <div className="mt-auto flex justify-between items-center">
            <div className="flex gap-2">
              <span className="text-sm px-3 py-1.5 bg-gradient-to-br from-lime-200 to-yellow-200 rounded-lg text-green-900 font-medium">
                15 kg
              </span>
              <span className="text-sm px-3 py-1.5 bg-gradient-to-br from-amber-200 to-yellow-200 rounded-lg text-green-900 font-medium">
                25 meals
              </span>
            </div>
            <button className="text-sm px-4 py-2 bg-gradient-to-br from-lime-500 to-amber-500 text-white rounded-lg font-bold hover:shadow-[0_0_12px_rgba(163,230,53,0.6)] transition-all">
              Details
            </button>
          </div>
        </div>
      </div>
    </div>
    );
};

export default DonationCard;