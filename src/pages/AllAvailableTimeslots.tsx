
import React from "react";
import AdminSidebar from "@/components/AdminSidebar";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { LayoutPanelLeft } from "lucide-react";
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
    <div className="flex min-h-screen bg-gradient-to-br from-accent-light to-secondary">
      <AdminSidebar />
      {/* Make content area scrollable */}
      <div className="flex-1 flex flex-col items-center p-6 gap-3 animate-fade-in overflow-y-auto max-h-screen">
        <Card className="w-full max-w-5xl mb-8 shadow-xl border-2 border-accent/10 bg-white/95">
          <CardHeader className="flex flex-row items-center gap-3 pb-1">
            <LayoutPanelLeft size={32} className="text-accent" />
            <div>
              <CardTitle className="text-2xl font-extrabold text-primary">All Available Time Slots</CardTitle>
              <CardDescription className="text-muted-foreground text-base">
                View all time slots assigned to closers, including their availability.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto rounded-xl shadow border border-accent/10 bg-white">
              <table className="table-auto w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-accent-light to-accent font-semibold text-accent-foreground">
                    <th className="p-3 text-left">Date</th>
                    <th className="p-3 text-left">Time</th>
                    <th className="p-3 text-left">Time Zone</th>
                    <th className="p-3 text-left">Available?</th>
                    <th className="p-3 text-left">Closer Name</th>
                    <th className="p-3 text-left">Closer Email</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-accent animate-pulse">Loading slots…</td>
                    </tr>
                  ) : slots.length === 0 ? (
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default AllAvailableTimeslots;
