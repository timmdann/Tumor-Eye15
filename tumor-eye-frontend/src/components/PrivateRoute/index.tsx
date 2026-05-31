import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "@/lib/hooks";
import type { UserRole } from "@/types/api";

interface PrivateRouteProps {
  role?: UserRole;
}

export default function PrivateRoute({ role }: PrivateRouteProps) {
  const { isAuthenticated, role: userRole } = useAppSelector((s) => s.auth);

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (role && userRole !== role) {
    return <Navigate to={userRole === "doctor" ? "/doctor/upload" : "/student/upload"} replace />;
  }

  return <Outlet />;
}
