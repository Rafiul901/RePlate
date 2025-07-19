import { useState } from 'react';
import { Outlet, useNavigate, NavLink } from 'react-router';
import { FaUser, FaHeart, FaStar, FaHistory, FaSignOutAlt, FaBars, FaTimes, FaHandsHelping } from 'react-icons/fa';

const UserDashboard = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const navigate = useNavigate();

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-white font-bold text-cyan-900 transition-all duration-300 ${isDrawerOpen ? 'w-64' : 'w-20'}`}>
        <div className="flex items-center justify-between p-4 border-b border-cyan-900">
          {isDrawerOpen ? <h1 className="text-xl font-bold">RePlate</h1> : <span className="font-bold">RP</span>}
          <button onClick={toggleDrawer} className="text-blue-500">
            {isDrawerOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
        
        <nav className="mt-6 space-y-1">
          <SidebarItem 
            icon={<FaUser size={18} />} 
            text="My Profile" 
            expanded={isDrawerOpen} 
            to="/userDashboard/profile" 
          />
          <SidebarItem 
            icon={<FaHandsHelping size={18} />} 
            text="Request Charity Role" 
            expanded={isDrawerOpen} 
            to="/userDashboard/request" 
          />
          <SidebarItem 
            icon={<FaHeart size={18} />} 
            text="Favorites" 
            expanded={isDrawerOpen} 
            to="/userDashboard/favorites" 
          />
          <SidebarItem 
            icon={<FaStar size={18} />} 
            text="My Reviews" 
            expanded={isDrawerOpen} 
            to="/userDashboard/reviews" 
          />
          <SidebarItem 
            icon={<FaHistory size={18} />} 
            text="Transactions" 
            expanded={isDrawerOpen} 
            to="/userDashboard/transactions" 
          />
        </nav>
        
        
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, text, expanded, to, onClick }) => {
  const baseClasses = "flex items-center px-4 py-3 hover:bg-cyan-300 cursor-pointer transition-colors rounded";
  
  if (to) {
    return (
      <NavLink 
        to={to}
        className={({ isActive }) => 
          `${baseClasses} ${isActive ? 'bg-cyan-400 font-medium' : ''}`
        }
      >
        <div className="flex items-center">
          {icon}
          {expanded && <span className="ml-3 text-sm">{text}</span>}
        </div>
      </NavLink>
    );
  }

  return (
    <div className={baseClasses} onClick={onClick}>
      {icon}
      {expanded && <span className="ml-3 text-sm">{text}</span>}
    </div>
  );
};

export default UserDashboard;