import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from './AuthContext';
import Loader from '../Homepage/Loader';


const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader></Loader>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
