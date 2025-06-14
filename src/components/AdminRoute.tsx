
import React from "react";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import { Navigate } from "react-router-dom";

type AdminRouteProps = {
  children: React.ReactNode;
};

const AdminRoute = ({ children }: AdminRouteProps) => {
  const { user, isLoading } = useSupabaseAuth();
  const [loadingRole, setLoadingRole] = React.useState(true);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [debugMsg, setDebugMsg] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchRole = async () => {
      if (!user) {
        setLoadingRole(false);
        setIsAdmin(false);
        setDebugMsg("No user logged in.");
        return;
      }
      try {
        const resp = await fetch(`/api/user-role?id=${user.id}`);
        if (!resp.ok) {
          const errText = await resp.text();
          setDebugMsg(`API error: HTTP ${resp.status} - ${errText}`);
          setLoadingRole(false);
          setIsAdmin(false);
          return;
        }
        const data = await resp.json();
        // It's possible the "role" key is missing if user isn't in user_roles
        if (data.role === "admin") {
          setIsAdmin(true);
          setDebugMsg("Admin role confirmed.");
        } else if (data.role) {
          setDebugMsg(`User role is "${data.role}" - not admin`);
        } else if (data.error) {
          setDebugMsg(`Error from API: ${data.error}`);
        } else {
          setDebugMsg("No role found for user.");
        }
        setLoadingRole(false);
      } catch (err: any) {
        setDebugMsg("Failed to fetch role: " + err.message);
        setLoadingRole(false);
        setIsAdmin(false);
      }
    };
    fetchRole();
  }, [user]);

  if (isLoading || loadingRole) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-lg">Loading... {debugMsg && <span className="ml-4 text-red-500">{debugMsg}</span>}</div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <div className="text-xl mb-3 text-red-600">You do not have admin access.</div>
        {debugMsg && <code className="bg-gray-100 text-sm rounded px-2 py-1 border">{debugMsg}</code>}
        <Navigate to="/" replace />
      </div>
    );
  }

  return <>{children}</>;
};

export default AdminRoute;
