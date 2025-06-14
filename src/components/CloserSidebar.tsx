
import React from "react";

export default function CloserSidebar() {
  return (
    <aside className="w-64 bg-secondary px-4 py-6 flex flex-col min-h-screen">
      <h2 className="text-2xl font-bold mb-8 text-primary">Closer Panel</h2>
      <nav className="flex flex-col gap-4">
        <a className="hover:bg-accent px-3 py-2 rounded transition" href="/closer-panel">
          Dashboard
        </a>
        <a className="hover:bg-accent px-3 py-2 rounded transition" href="/closer-timeslot">
          Manage Time Slots
        </a>
        <a className="hover:bg-accent px-3 py-2 rounded transition" href="/closer-bookings">
          Bookings
        </a>
        <a className="hover:bg-accent px-3 py-2 rounded transition" href="/call-status">
          Call Status
        </a>
        <a className="hover:bg-accent px-3 py-2 rounded transition" href="/deal-status">
          Deal Status
        </a>
        <a className="hover:bg-accent px-3 py-2 rounded transition" href="/closed-clients">
          Closed Clients
        </a>
        <a className="hover:bg-accent px-3 py-2 rounded transition" href="/reschedule-call">
          Reschedule Calls
        </a>
      </nav>
    </aside>
  );
}
