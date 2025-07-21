import { useState } from 'react';
import { Outlet, useNavigate, NavLink } from 'react-router';
import { FaUser , FaBars, FaTimes,  FaMoneyBill, } from 'react-icons/fa';
import { MdOutlineAttachMoney, MdOutlineRequestQuote } from 'react-icons/md';
import { BanknoteArrowDown, CircleDollarSign, GitPullRequest, Truck} from 'lucide-react';

const CharityDashboard = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const navigate = useNavigate();

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-white font-bold text-cyan-900 transition-all duration-300 ${isDrawerOpen ? 'w-64' : 'w-20'}`}>
        <div className="flex items-center justify-between p-4 border-b border-cyan-900">
          {isDrawerOpen ? <h1 className="text-xl font-bold">Charity Dashboard</h1> : <span className="font-bold">RP</span>}
          <button onClick={toggleDrawer} className="text-blue-500">
            {isDrawerOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
        
        <nav className="mt-6 space-y-1">
          <SidebarItem 
            icon={<FaUser size={18} />} 
            text="Charity Profile" 
            expanded={isDrawerOpen} 
            to="/charityDashboard/profile" 
          />
          <SidebarItem 
            icon={<GitPullRequest size={18} />} 
            text="My Requests" 
            expanded={isDrawerOpen} 
            to="/charityDashboard/requests" 
          />
          <SidebarItem 
            icon={<Truck size={18} />} 
            text="My Pickups" 
            expanded={isDrawerOpen} 
            to="/charityDashboard/pickups" 
          />
          <SidebarItem 
            icon={<CircleDollarSign size={18} />} 
            text="Received Donations" 
            expanded={isDrawerOpen} 
            to="/charityDashboard/receivedDonations" 
          />
          <SidebarItem 
            icon={<BanknoteArrowDown size={18} />} 
            text="Transaction History" 
            expanded={isDrawerOpen} 
            to="/charityDashboard/transaction" 
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

export default CharityDashboard;