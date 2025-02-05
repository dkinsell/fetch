import { Navigate } from "react-router-dom";
import { useUserContext } from "../context/User/useUserContext";

interface ProtectedRouteProps {
  children: JSX.Element;
}

// Component that restricts access to its child routes based on the user's authentication status.
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useUserContext();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
