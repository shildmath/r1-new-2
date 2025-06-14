
import React from "react";
import CloserSidebar from "@/components/CloserSidebar";

export default function CloserPanel() {
  return (
    <div className="flex min-h-screen">
      <CloserSidebar />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-4">Closer Dashboard</h1>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="bg-card rounded-lg shadow p-6 flex flex-col justify-between">
            <h2 className="font-semibold text-lg mb-2">Manage Your Time Slots</h2>
            <p className="text-gray-500 mb-4">Keep your availability up to date so clients can book you!</p>
            <a
              href="/closer-timeslot"
              className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/80 text-center"
            >Go to Time Slots</a>
          </div>
          <div className="bg-card rounded-lg shadow p-6 flex flex-col">
            <h2 className="font-semibold text-lg mb-2">View Bookings</h2>
            <p className="text-gray-500 mb-4">See who has booked a call with you and plan follow-ups.</p>
            <a
              href="/closer-bookings"
              className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/80 text-center"
            >Go to Bookings</a>
          </div>
        </div>
      </div>
    </div>
  );
}
