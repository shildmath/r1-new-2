
import React from "react";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import { Navigate } from "react-router-dom";

type AdminRouteProps = {
  children: React.ReactNode;
};

const AdminRoute = ({ children }: AdminRouteProps) => {
  const { user, isLoading, session } = useSupabaseAuth();
  const [loadingRole, setLoadingRole] = React.useState(true);
  const [isAdmin, setIsAdmin] = React.useState(false);

  React.useEffect(() => {
    const fetchRole = async () => {
      if (!user) {
        setLoadingRole(false);
        setIsAdmin(false);
        return;
      }
      // Query user_roles for current user
      const resp = await fetch(`/api/user-role?id=${user.id}`);
      const data = await resp.json();
      if (data.role === "admin") setIsAdmin(true);
      setLoadingRole(false);
    };
    fetchRole();
  }, [user]);

  if (isLoading || loadingRole) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default AdminRoute;
