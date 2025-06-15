
import React from "react";
import AdminSidebar from "@/components/AdminSidebar";
import { useAdminBookings } from "@/hooks/useAdminBookings";

const AllBookings = () => {
  const { bookings, isLoading } = useAdminBookings();

  return (
    <div className="min-h-screen flex">
      <AdminSidebar />
      <main className="flex-1 p-8 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-6">All Bookings</h1>
        {isLoading ? (
          <div>Loading bookings…</div>
        ) : (
          <div className="w-full max-w-6xl overflow-x-auto rounded shadow">
            <table className="table-auto w-full bg-white">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-3 py-2">Slot Date</th>
                  <th className="px-3 py-2">Slot Time</th>
                  <th className="px-3 py-2">Time Zone</th>
                  <th className="px-3 py-2">Client Name</th>
                  <th className="px-3 py-2">Email</th>
                  <th className="px-3 py-2">Phone</th>
                  <th className="px-3 py-2">Closer Name</th>
                  <th className="px-3 py-2">Closer Email</th>
                  <th className="px-3 py-2">Call Status</th>
                  <th className="px-3 py-2">Deal Status</th>
                  <th className="px-3 py-2">Created At</th>
                </tr>
              </thead>
              <tbody>
                {bookings.length === 0 ? (
                  <tr>
                    <td colSpan={11} className="p-8 text-center text-gray-500">
                      No bookings found.
                    </td>
                  </tr>
                ) : (
                  bookings.map((b) => (
                    <tr key={b.id} className="border-t">
                      <td className="px-3 py-2">{b.slot_date}</td>
                      <td className="px-3 py-2">{b.slot_time}</td>
                      <td className="px-3 py-2">{b.slot_time_zone}</td>
                      <td className="px-3 py-2">{b.first_name} {b.last_name}</td>
                      <td className="px-3 py-2">{b.email}</td>
                      <td className="px-3 py-2">{b.phone}</td>
                      <td className="px-3 py-2 font-medium">{b.closer_name}</td>
                      <td className="px-3 py-2">{b.closer_email}</td>
                      <td className="px-3 py-2">{b.call_status}</td>
                      <td className="px-3 py-2">{b.deal_status}</td>
                      <td className="px-3 py-2">{b.created_at}</td>
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

export default AllBookings;
