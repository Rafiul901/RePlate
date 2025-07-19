// src/Authentication/AdminRoute.jsx
import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../Authentication/AuthContext';
import Loader from '../Homepage/Loader';



const AdminRoute = ({ children }) => {
  const { user, role, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) return <Loader />;
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  if (role !== 'admin') return <Navigate to="/" replace />;

  return children;
};

export default AdminRoute;
