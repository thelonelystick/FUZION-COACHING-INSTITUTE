import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

type ProtectedRouteProps = {
  allowedRoles?: Array<"student" | "teacher" | "parent" | "admin">;
};

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[linear-gradient(135deg,_#f8fbff_0%,_#eef4ff_100%)] text-sm font-medium text-slate-600">
        Loading your secure portal...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (allowedRoles && (!user.role || !allowedRoles.includes(user.role))) {
    return <Navigate to={user.role ? `/${user.role}` : "/login"} replace />;
  }

  return <Outlet />;
}
