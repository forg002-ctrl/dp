import { Navigate } from "react-router-dom";

import { AuthService } from "services/AuthService";

interface ProtectedRouteProps {
  children: JSX.Element;
}

export const ProtectedRoute = (props: ProtectedRouteProps) => {
  if (!AuthService.isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  
  return props.children;
};
