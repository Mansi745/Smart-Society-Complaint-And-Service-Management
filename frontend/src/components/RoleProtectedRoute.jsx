import { Navigate } from "react-router-dom";

function RoleProtectedRoute({ children, allowedRoles }) {
  const isLoggedIn =
    localStorage.getItem("isLoggedIn");

  const role =
    localStorage.getItem("userRole");

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" />;
  }

  return children;
}

export default RoleProtectedRoute;