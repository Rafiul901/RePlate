// src/Authentication/DashboardRouter.jsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router';
import { AuthContext } from '../Authentication/AuthContext';
import Loader from '../Homepage/Loader';

const DashboardRouter = () => {
  const { user, userRole, loading } = useContext(AuthContext);

  if (loading) return <Loader />;
  if (!user) return <Navigate to="/login" replace />;

  // Redirect based on role
  if (userRole === 'admin') return <Navigate to="/adminDashboard" replace />;
  if (userRole === 'restaurant') return <Navigate to="/restaurantDashboard" replace />;
  if (userRole === 'charity') return <Navigate to="/charityDashboard" replace />;
  
  // Default fallback
  return <Navigate to="/userDashboard" replace />;
};

export default DashboardRouter;
