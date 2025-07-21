import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router'; // ✅ FIXED
import Loader from '../Homepage/Loader';
import { AuthContext } from '../Authentication/AuthContext';

const DashboardRouter = () => {
  const { user, role, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate('/login');
      } else if (role === 'admin') {
        navigate('/adminDashboard');
      } else if (role === 'charity') {
        navigate('/charityDashboard');
      } else if (role === 'restaurant') {
        navigate('/restaurantDashboard');
      } else {
        navigate('/userDashboard');
      }
    }
  }, [user, role, loading, navigate]);

  return <Loader />;
};

export default DashboardRouter;
