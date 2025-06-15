import React from "react";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import { useUserProfileWithRole } from "@/hooks/useUserProfileWithRole";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import AdminSidebar from "@/components/AdminSidebar";
import { useNavigate } from "react-router-dom"; // Added for navigation
import CloserListTable from "@/components/CloserListTable";

const AdminPanel = () => {
  const { logout } = useSupabaseAuth();
  const { profile, loading } = useUserProfileWithRole();
  const navigate = useNavigate(); // Initialize navigation

  // Updated logout to redirect on completion
  const handleLogout = async () => {
    await logout();
    navigate("/auth");
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-8 bg-gray-50">
        <div className="flex w-full max-w-3xl justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            {loading ? (
              <div className="text-gray-500 mt-2">Loading...</div>
            ) : (
              profile && (
                <div className="mt-2 text-lg">
                  Welcome <span className="font-semibold">{profile.full_name}</span>!
                  <span className="ml-3 rounded px-2 py-1 bg-primary/10 text-primary text-sm font-medium capitalize">
                    Role: {profile.role}
                  </span>
                </div>
              )
            )}
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="ml-4 flex gap-2 items-center"
          >
            <LogOut size={18} className="mr-1" />
            Logout
          </Button>
        </div>
        {/* Dashboard blocks or summary can be added here */}
        <div className="flex flex-col items-center justify-center text-gray-400">
          <p>Select an option from the sidebar to get started.</p>
        </div>
        {/* --- NEW: Closer List Table --- */}
        <CloserListTable />
      </div>
    </div>
  );
};

export default AdminPanel;
