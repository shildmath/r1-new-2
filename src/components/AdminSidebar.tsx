
import React from "react";
import { useLocation } from "react-router-dom";
import clsx from "clsx";

// List all admin pages to navigate to
const adminLinks = [
  { name: "Dashboard", path: "/admin-panel" },
  { name: "Add Users", path: "/add-users" },
  { name: "All Bookings", path: "/all-bookings" },
  { name: "Closed Clients", path: "/all-closed-clients" },
  { name: "Available Timeslots", path: "/all-available-timeslots" },
  { name: "Deals Status", path: "/all-deal-status" },
  { name: "Monthly Closers", path: "/all-monthly-closers-performance" },
  { name: "EOD Closers", path: "/all-eod-closers-performance" },
  { name: "Export Clients", path: "/all-export-clients" },
  { name: "All Call Status", path: "/all-call-status" },
  { name: "All Reschedule Calls", path: "/all-reschedule-calls" },
  // NEW EDIT LINKS
  { name: "Edit Home", path: "/edit-home" },
  { name: "Edit Services", path: "/edit-services" },
  { name: "Edit Testimonials", path: "/edit-testimonials" },
  { name: "Edit About", path: "/edit-about" },
  { name: "Add Team Member", path: "/add-team-member" },
  { name: "Edit Contact", path: "/edit-contact" },
  { name: "Edit Strategy Call", path: "/edit-strategy-call" },
  { name: "Edit Strategy Call Calendly", path: "/edit-strategy-call-calendly" },
  { name: "Edit Navbar", path: "/edit-navbar" },
  { name: "Edit Footer", path: "/edit-footer" },
  { name: "Contact Responses", path: "/contact-responses" },
];

const AdminSidebar = () => {
  const location = useLocation();

  return (
    <aside className="min-h-screen bg-gray-50 px-6 py-8 border-r w-64">
      <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
      <nav className="flex flex-col gap-2">
        {adminLinks.map((link) => {
          const active = location.pathname === link.path;
          return (
            <a
              key={link.path}
              href={link.path}
              className={clsx(
                "rounded-md px-3 py-2 font-medium transition shadow-none",
                active
                  ? "bg-violet-400/60 text-black"
                  : "hover:bg-gray-100 text-gray-900"
              )}
            >
              {link.name}
            </a>
          );
        })}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
