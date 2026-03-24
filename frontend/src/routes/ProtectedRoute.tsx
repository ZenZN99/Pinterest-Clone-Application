import { useAuthStore } from "../stores/useAuthStore";
import { useEffect, type JSX } from "react";
import { UserRoles } from "../types/user";
import Unauthorized from "./Unauthorized";
import AdminOnly from "./AdminOnly";

interface ProtectedRouteProps {
  children: JSX.Element;
  adminOnly?: boolean;
}

const ProtectedRoute = ({
  children,
  adminOnly = false,
}: ProtectedRouteProps) => {
  const { user, isLoading, loadUser } = useAuthStore();

  useEffect(() => {
    loadUser();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-[#ddd] border-t-[red] rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Unauthorized />;
  }

  if (adminOnly && user.role !== UserRoles.ADMIN) {
    return <AdminOnly />;
  }

  return children;
};

export default ProtectedRoute;