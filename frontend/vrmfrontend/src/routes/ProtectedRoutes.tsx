import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface RoleGuardProps {
  roles?: ("student" | "researcher")[];
}

export function ProtectedRoute({ roles }: RoleGuardProps) {
  const { isLoggedIn, role } = useAuth();

  // Not logged in
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // Role restriction
  if (roles && (!role || !roles.includes(role))) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}