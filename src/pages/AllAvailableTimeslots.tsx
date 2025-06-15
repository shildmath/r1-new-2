
import React from "react";
import AdminSidebar from "@/components/AdminSidebar";
import { useAdminSlots } from "@/hooks/useAdminSlots";

const TIME_ZONE_LABELS: Record<string, string> = {
  "Etc/GMT": "Greenwich Mean Time (GMT)",
  "Europe/London": "British Summer Time (BST)",
  "America/New_York": "Eastern Time (ET)",
  "America/Chicago": "Central Time (CT)",
  "America/Denver": "Mountain Time (MT)",
  "America/Los_Angeles": "Pacific Time (PT)",
  "UTC": "UTC",
};

const AllAvailableTimeslots = () => {
  const { slots, isLoading } = useAdminSlots();

  return (
    <div className="min-h-screen flex">
      <AdminSidebar />
      <main className="flex-1 p-8 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-6">All Available Time Slots</h1>
        {isLoading ? (
          <div>Loading slots…</div>
        ) : (
          <div className="w-full max-w-5xl overflow-x-auto rounded shadow">
            <table className="table-auto w-full bg-white">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-3 py-2">Date</th>
                  <th className="px-3 py-2">Time</th>
                  <th className="px-3 py-2">Time Zone</th>
                  <th className="px-3 py-2">Available?</th>
                  <th className="px-3 py-2">Closer Name</th>
                  <th className="px-3 py-2">Closer Email</th>
                </tr>
              </thead>
              <tbody>
                {slots.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-gray-500">
                      No time slots found.
                    </td>
                  </tr>
                ) : (
                  slots.map((slot) => (
                    <tr key={slot.id} className="border-t">
                      <td className="px-3 py-2">{slot.date}</td>
                      <td className="px-3 py-2">{slot.time}</td>
                      <td className="px-3 py-2">{TIME_ZONE_LABELS[slot.time_zone] ?? slot.time_zone}</td>
                      <td className="px-3 py-2">
                        {slot.is_available ? (
                          <span className="text-green-600 font-semibold">Yes</span>
                        ) : (
                          <span className="text-red-500">No</span>
                        )}
                      </td>
                      <td className="px-3 py-2 font-medium">{slot.closer_name}</td>
                      <td className="px-3 py-2">{slot.closer_email}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default AllAvailableTimeslots;
