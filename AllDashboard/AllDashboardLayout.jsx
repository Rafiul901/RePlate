import { useState, useEffect } from 'react';
import { Outlet, useNavigate, NavLink, useLocation } from 'react-router';
import { 
  FaUser, FaSignOutAlt, FaBars, FaTimes, 
  FaHeart, FaStar, FaHistory, FaUtensils, 
  FaListAlt, FaChartLine, FaHandHoldingHeart, 
  FaUsers, FaBoxOpen, FaShieldAlt, FaCog, 
  FaUserCog, FaHome, FaBell, FaCaretDown
} from 'react-icons/fa';

const AllDashboardLayout = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Determine current role based on path
  const currentRole = location.pathname.split('/')[1]; // 'user', 'restaurant', etc.

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  useEffect(() => {
    // Handle mobile responsiveness
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) {
        setIsDrawerOpen(false);
      } else {
        setIsDrawerOpen(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Role-specific configurations
  const roleConfig = {
    user: {
      title: 'RePlate User',
      shortTitle: 'RPU',
      color: 'cyan',
      icon: <FaUser className="text-cyan-500" />,
      items: [
        { icon: <FaUser size={18} />, text: 'My Profile', to: '/user/profile' },
        { icon: <FaHeart size={18} />, text: 'Favorites', to: '/user/favorites' },
        { icon: <FaStar size={18} />, text: 'My Reviews', to: '/user/reviews' },
        { icon: <FaHistory size={18} />, text: 'Orders', to: '/user/orders' },
      ]
    },
    restaurant: {
      title: 'RePlate Restaurant',
      shortTitle: 'RPR',
      color: 'cyan',
      icon: <FaUtensils className="text-cyan-500" />,
      items: [
        { icon: <FaHome size={18} />, text: 'Dashboard', to: '/restaurant/dashboard' },
        { icon: <FaUtensils size={18} />, text: 'Menu Items', to: '/restaurant/menu' },
        { icon: <FaListAlt size={18} />, text: 'Orders', to: '/restaurant/orders' },
        { icon: <FaChartLine size={18} />, text: 'Analytics', to: '/restaurant/analytics' },
      ]
    },
    charity: {
      title: 'RePlate Charity',
      shortTitle: 'RPC',
      color: 'cyan',
      icon: <FaHandHoldingHeart className="text-cyan-500" />,
      items: [
        { icon: <FaHome size={18} />, text: 'Dashboard', to: '/charity/dashboard' },
        { icon: <FaHandHoldingHeart size={18} />, text: 'Donations', to: '/charity/donations' },
        { icon: <FaUsers size={18} />, text: 'Beneficiaries', to: '/charity/beneficiaries' },
        { icon: <FaBoxOpen size={18} />, text: 'Inventory', to: '/charity/inventory' },
      ]
    },
    admin: {
      title: 'RePlate Admin',
      shortTitle: 'RPA',
      color: 'cyan',
      icon: <FaShieldAlt className="text-cyan-500" />,
      items: [
        { icon: <FaHome size={18} />, text: 'Dashboard', to: '/admin/dashboard' },
        { icon: <FaUserCog size={18} />, text: 'User Management', to: '/admin/users' },
        { icon: <FaUserCog size={18} />, text: 'Restaurants', to: '/admin/restaurants' },
        { icon: <FaUserCog size={18} />, text: 'Charities', to: '/admin/charities' },
        { icon: <FaCog size={18} />, text: 'System Settings', to: '/admin/settings' },
      ]
    }
  };

  const config = roleConfig[currentRole] || roleConfig.user;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div 
        className={`bg-cyan-800 text-white transition-all duration-300 fixed lg:relative z-20 h-full ${isDrawerOpen ? 'w-64' : 'w-20'}`}
      >
        <div className="flex items-center justify-between p-4 border-b border-cyan-700">
          <div className="flex items-center">
            <div className="bg-white rounded-lg p-2 mr-3">
              {config.icon}
            </div>
            {isDrawerOpen && <h1 className="text-xl font-bold">{config.title}</h1>}
          </div>
          <button onClick={toggleDrawer} className="text-white">
            {isDrawerOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
        
        <nav className="mt-6 space-y-1">
          {config.items.map((item, index) => (
            <SidebarItem 
              key={index}
              icon={item.icon}
              text={item.text}
              expanded={isDrawerOpen}
              to={item.to}
              color={config.color}
            />
          ))}
        </nav>
        
        <div className="absolute bottom-0 w-full p-4 border-t border-cyan-700">
          <SidebarItem 
            icon={<FaSignOutAlt size={18} />} 
            text="Logout" 
            expanded={isDrawerOpen}
            color={config.color}
            onClick={() => navigate('/logout')} 
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden transition-all duration-300">
        {/* Top Navigation Bar */}
        <header className="bg-white shadow-sm p-4 flex items-center justify-between">
          <div className="flex items-center">
            {isMobile && (
              <button 
                onClick={toggleDrawer}
                className="text-cyan-700 mr-4 p-2 rounded-lg hover:bg-cyan-50"
              >
                <FaBars size={20} />
              </button>
            )}
            <div className="flex items-center bg-cyan-100 text-cyan-800 px-4 py-2 rounded-lg">
              <div className="bg-white rounded-lg p-1 mr-2">
                {config.icon}
              </div>
              <span className="font-medium">{config.title}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-500 hover:text-cyan-700 rounded-full hover:bg-cyan-50">
              <FaBell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            <div className="relative">
              <button 
                className="flex items-center space-x-2 group"
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              >
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
                <div className="text-left hidden md:block">
                  <p className="font-medium text-sm">John Doe</p>
                  <p className="text-xs text-gray-500">Admin</p>
                </div>
                <FaCaretDown className="text-gray-500 group-hover:text-cyan-700" />
              </button>
              
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10">
                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-cyan-50 hover:text-cyan-700">
                    My Profile
                  </button>
                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-cyan-50 hover:text-cyan-700">
                    Settings
                  </button>
                  <button 
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-cyan-50 hover:text-cyan-700"
                    onClick={() => navigate('/logout')}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-4 md:p-6 overflow-auto bg-cyan-50">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white py-4 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} RePlate. All rights reserved.
          </div>
        </footer>
      </div>
      
      {/* Mobile overlay */}
      {isMobile && isDrawerOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={toggleDrawer}
        ></div>
      )}
    </div>
  );
};

const SidebarItem = ({ icon, text, expanded, to, color, onClick }) => {
  const baseClasses = `flex items-center px-4 py-3 hover:bg-cyan-700 cursor-pointer transition-colors rounded`;
  
  if (to) {
    return (
      <NavLink 
        to={to}
        className={({ isActive }) => 
          `${baseClasses} ${isActive ? `bg-cyan-700 font-medium` : ''}`
        }
      >
        <div className="flex items-center">
          <span className="text-cyan-200">{icon}</span>
          {expanded && <span className="ml-3 text-sm">{text}</span>}
        </div>
      </NavLink>
    );
  }

  return (
    <div className={baseClasses} onClick={onClick}>
      <span className="text-cyan-200">{icon}</span>
      {expanded && <span className="ml-3 text-sm">{text}</span>}
    </div>
  );
};

export default AllDashboardLayout;