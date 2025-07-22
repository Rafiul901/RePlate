import { useState } from 'react';
import { Outlet, useNavigate, NavLink } from 'react-router';
import { FaUser , FaBars, FaTimes,  FaMoneyBill, FaCircle, FaHouseUser, FaUserCheck, FaLocationArrow, } from 'react-icons/fa';

import { BanknoteArrowDown, CircleDollarSign, GitPullRequest, Truck} from 'lucide-react';

const AdminDashboard = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const navigate = useNavigate();

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-white font-bold text-cyan-900 transition-all duration-300 ${isDrawerOpen ? 'w-64' : 'w-20'}`}>
        <div className="flex items-center justify-between p-4 border-b border-cyan-900">
          {isDrawerOpen ? <h1 className="text-xl font-bold">Admin Dashboard</h1> : <span className="font-bold">RP</span>}
          <button onClick={toggleDrawer} className="text-blue-500">
            {isDrawerOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
        
        <nav className="mt-6 space-y-1">
          <SidebarItem 
            icon={<FaUser size={18} />} 
            text="Admin Profile" 
            expanded={isDrawerOpen} 
            to="/adminDashboard/profile" 
          />
          <SidebarItem 
            icon={<FaCircle size={18} />} 
            text="Manage Donations" 
            expanded={isDrawerOpen} 
            to="/adminDashboard/manageDonation" 
          />
          <SidebarItem 
            icon={<FaHouseUser size={18} />} 
            text="Manage Users" 
            expanded={isDrawerOpen} 
            to="/adminDashboard/manageUsers" 
          />
          <SidebarItem 
            icon={<FaUserCheck size={18} />} 
            text="Manage Role Requests" 
            expanded={isDrawerOpen} 
            to="/adminDashboard/manageRole" 
          />
          <SidebarItem 
            icon={<FaLocationArrow size={18} />} 
            text="Manage Requests" 
            expanded={isDrawerOpen} 
            to="/adminDashboard/manageRequests" 
          />
          <SidebarItem 
            icon={<BanknoteArrowDown size={18} />} 
            text="Feature Donations" 
            expanded={isDrawerOpen} 
            to="/adminDashboard/feature" 
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

export default AdminDashboard;