import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function ProtectedRoute({ children }) {
  const { tokenState } = useAuth();

  if (!tokenState) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;
