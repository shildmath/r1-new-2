
import React from "react";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import { useUserProfileWithRole } from "@/hooks/useUserProfileWithRole";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

const AdminPanel = () => {
  const { logout } = useSupabaseAuth();
  const { profile, loading } = useUserProfileWithRole();

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-8 bg-gray-50">
      <div className="flex w-full max-w-3xl justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          {loading ? (
            <div className="text-gray-500 mt-2">Loading...</div>
          ) : (
            profile && (
              <div className="mt-2 text-lg">
                Welcome <span className="font-semibold">{profile.full_name}</span>!
                <span className="ml-3 rounded px-2 py-1 bg-primary/10 text-primary text-sm font-medium capitalize">Role: {profile.role}</span>
              </div>
            )
          )}
        </div>
        <Button variant="outline" onClick={logout} className="ml-4 flex gap-2 items-center">
          <LogOut size={18} className="mr-1" />
          Logout
        </Button>
      </div>

      {/* Simple dashboard sections */}
      <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-lg bg-white shadow border">
          <h2 className="text-xl font-semibold mb-2">Add Users</h2>
          <p className="text-gray-600 mb-3">Create new admin or closer users.</p>
          <a href="/add-users" className="text-blue-600 hover:underline">Go to Add Users</a>
        </div>
        <div className="p-6 rounded-lg bg-white shadow border">
          <h2 className="text-xl font-semibold mb-2">Manage Data</h2>
          <p className="text-gray-600 mb-3">View and manage bookings, clients, and performance.</p>
          <ul className="list-disc ml-5 space-y-1">
            <li><a href="/all-bookings" className="text-blue-600 hover:underline">All Bookings</a></li>
            <li><a href="/all-closed-clients" className="text-blue-600 hover:underline">Closed Clients</a></li>
            <li><a href="/all-available-timeslots" className="text-blue-600 hover:underline">Available Timeslots</a></li>
            <li><a href="/all-deal-status" className="text-blue-600 hover:underline">Deals Status</a></li>
          </ul>
        </div>
        <div className="p-6 rounded-lg bg-white shadow border">
          <h2 className="text-xl font-semibold mb-2">Reports</h2>
          <p className="text-gray-600 mb-3">Performance and export data.</p>
          <ul className="list-disc ml-5 space-y-1">
            <li><a href="/all-monthly-closers-performance" className="text-blue-600 hover:underline">Monthly Closers</a></li>
            <li><a href="/all-eod-closers-performance" className="text-blue-600 hover:underline">EOD Closers</a></li>
            <li><a href="/all-export-clients" className="text-blue-600 hover:underline">Export Clients</a></li>
          </ul>
        </div>
        <div className="p-6 rounded-lg bg-white shadow border">
          <h2 className="text-xl font-semibold mb-2">Call Status</h2>
          <ul className="list-disc ml-5 space-y-1">
            <li><a href="/all-call-status" className="text-blue-600 hover:underline">All Call Status</a></li>
            <li><a href="/all-reschedule-calls" className="text-blue-600 hover:underline">All Reschedule Calls</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
