import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiresSubscription = false }) => {
  const isAuthenticated = localStorage.getItem('user');
  const hasSubscription = localStorage.getItem('subscription');

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requiresSubscription && !hasSubscription) {
    return <Navigate to="/payment" state={{ from: window.location.pathname }} />;
  }

  return children;
};

export default ProtectedRoute; 