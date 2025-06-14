
import React from "react";
import CloserSidebar from "@/components/CloserSidebar";
import CloserBookingsTable from "@/components/CloserBookingsTable";

export default function CloserBookings() {
  return (
    <div className="flex min-h-screen">
      <CloserSidebar />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-4">Your Bookings</h1>
        <CloserBookingsTable />
      </div>
    </div>
  );
}
