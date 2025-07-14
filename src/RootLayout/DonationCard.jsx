import React from 'react';
import { useNavigate } from 'react-router';

const DonationCard = ({ donation }) => {
  const { 
    image, 
    title, 
    description,
    restaurant, 
    location, 
    charity, 
    status, 
    quantity_kg, 
    quantity_portions,
    pickup_time,
    
  } = donation;
  const navigate = useNavigate();


  // Status color mapping
  const statusColors = {
    'Available': 'from-lime-400 to-yellow-400',
    'Requested': 'from-amber-400 to-orange-400',
    'Picked Up': 'from-gray-400 to-gray-500'
  };

  return (
    <div className="relative rounded-xl shadow-xl border-2 border-cyan-300 shadow-cyan-200 w-full h-full min-w-[300px] max-w-[360px] mx-auto">
      {/* Animated border gradient */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-lime-400 via-amber-400 to-lime-400 bg-[length:200%_200%] animate-spin-slow opacity-0 group-hover:opacity-100 transition-opacity duration-500 group"></div>
      
      {/* Card container */}
      <div className="relative h-full flex flex-col rounded-xl bg-gradient-to-br from-lime-50 to-amber-50 overflow-hidden group">
        {/* Fixed aspect ratio image container */}
        <div className="relative w-full pt-[56.25%] overflow-hidden"> {/* 16:9 aspect ratio */}
          <img 
            className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            src={image}
            alt={title}
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'; // Fallback image
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-green-900/50 via-yellow-600/20 to-transparent"></div>
          
          {/* Status badge */}
          <div className={`absolute top-3 right-3 px-3 py-1 rounded-full bg-gradient-to-br ${statusColors[status]} text-green-900 text-sm font-bold shadow-sm border border-yellow-200/50`}>
            {status}
          </div>
        </div>

        {/* Card content - flex-grow for consistent height */}
        <div className="flex-grow p-4 flex flex-col">
          <h3 className="font-bold text-lg text-green-900 mb-1 line-clamp-1">{title}</h3>
          <p className="text-green-800/80 text-sm mb-3 line-clamp-2">{description}</p>
          
          {/* Restaurant info */}
          <div className="flex items-center mb-3">
            <div className="bg-gradient-to-br from-lime-200 to-yellow-200 p-2 rounded-lg mr-3 shadow-inner flex-shrink-0">
              <svg className="h-5 w-5 text-green-700" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="min-w-0">
              <p className="font-medium text-green-900 truncate">{restaurant}</p>
              <p className="text-sm text-green-700/80">{location}</p>
            </div>
          </div>

          {/* Charity info (conditional) */}
          {charity && (
            <div className="flex items-center mb-3">
              <div className="bg-gradient-to-br from-lime-300 to-yellow-300 p-2 rounded-lg mr-3 shadow-inner flex-shrink-0">
                <svg className="h-5 w-5 text-green-800" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-1a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v1h-3zM4.75 12.094A5.973 5.973 0 004 15v1H1v-1a3 3 0 013.75-2.906z" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-green-900">Assigned to:</p>
                <p className="text-sm text-green-700/80 truncate">{charity}</p>
              </div>
            </div>
          )}

          {/* Bottom section */}
          <div className="mt-auto">
            <div className="flex items-center text-xs text-green-700 mb-3">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <span>{pickup_time}</span>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <span className="text-xs px-3 py-1 bg-gradient-to-br from-lime-200 to-yellow-200 rounded-lg text-green-900 font-medium whitespace-nowrap">
                  {quantity_kg} kg
                </span>
                <span className="text-xs px-3 py-1 bg-gradient-to-br from-amber-200 to-yellow-200 rounded-lg text-green-900 font-medium whitespace-nowrap">
                  {quantity_portions} meals
                </span>
              </div>
             <button 
  onClick={() => navigate(`/donations/${donation._id}`)}
  className="text-xs btn px-3 py-1.5 bg-gradient-to-br from-lime-500 to-amber-500 text-white rounded-lg font-bold hover:shadow-[0_0_8px_rgba(163,230,53,0.6)] transition-all whitespace-nowrap"
>
  Details
</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationCard;