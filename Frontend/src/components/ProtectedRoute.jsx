import { Navigate } from "react-router-dom";
import {toast} from 'react-toastify'
const ProtectedRoute = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) {
    // toast.error("Please Login before listing a property")
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;