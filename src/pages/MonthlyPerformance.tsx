
import React, { useMemo, useState } from "react";
import CloserSidebar from "@/components/CloserSidebar";
import { useCloserBookings } from "@/hooks/useCloserBookings";
import { Card } from "@/components/ui/card";
import { Graph } from "@/components/ui/graph";
import { format, isSameMonth, parseISO } from "date-fns";

function getMonthName(d: Date) {
  return d.toLocaleString('default', { month: 'long', year: "numeric" });
}

export default function MonthlyPerformance() {
  const { bookings, isLoading } = useCloserBookings();

  // Compute months buckets and stats
  const months = useMemo(() => {
    let map = new Map<string, any>();
    bookings.forEach(b => {
      const d = b.slot_date ? new Date(b.slot_date) : null;
      if (!d) return;
      const mkey = `${d.getFullYear()}-${d.getMonth() + 1}`;
      if (!map.has(mkey)) {
        map.set(mkey, {
          name: getMonthName(d),
          value: 0,
          closed: 0,
          rescheduled: 0,
          completed: 0,
        });
      }
      const bucket = map.get(mkey);
      bucket.value += 1;
      if (b.reschedule_date || b.follow_up_call_date) bucket.rescheduled += 1;
      if ((b.deal_status ?? "").toLowerCase() === "closed") bucket.closed += 1;
      if (b.call_status === "Completed") bucket.completed += 1;
    });
    return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name));
  }, [bookings]);

  // For graph: Show months as x, total bookings/count/closed/completed/rescheduled as line/bar
  const performanceData = months.map(m => ({
    name: m.name,
    "Total": m.value,
    "Closed": m.closed,
    "Rescheduled": m.rescheduled,
    "Completed": m.completed,
  }));

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-accent-light to-secondary">
      <CloserSidebar />
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-4">Monthly Performance</h1>
        <Card className="w-full mb-10 shadow-xl border-2 border-accent/10 bg-white/95">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="mb-10 animate-fade-in">
                <Graph
                  title="Monthly Bookings"
                  data={performanceData.map(({ name, Total }) => ({ name, value: Total }))}
                  type="bar"
                  color="#653ad4"
                  startFromZero
                />
              </div>
              <div className="flex flex-wrap gap-8 mt-6">
                <div className="flex flex-col items-center">
                  <span className="text-sm font-medium text-gray-500">Most Bookings</span>
                  <span className="text-2xl font-bold text-primary">
                    {months.length
                      ? months.reduce((a, b) => (a.value > b.value ? a : b)).value
                      : "—"}
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-sm font-medium text-gray-500">Closed Deals (All Time)</span>
                  <span className="text-2xl font-bold text-blue-700">
                    {months.reduce((n, m) => n + m.closed, 0)}
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-sm font-medium text-gray-500">Reschedules (All Time)</span>
                  <span className="text-2xl font-bold text-orange-500">
                    {months.reduce((n, m) => n + m.rescheduled, 0)}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-3">All Months Summary</h2>
              <table className="table-auto w-full border">
                <thead className="bg-accent">
                  <tr>
                    <th className="p-2 text-left">Month</th>
                    <th className="p-2 text-left">Total</th>
                    <th className="p-2 text-left">Closed</th>
                    <th className="p-2 text-left">Resched.</th>
                    <th className="p-2 text-left">Completed</th>
                  </tr>
                </thead>
                <tbody>
                  {months.map((m, idx) => (
                    <tr key={idx} className="border-t">
                      <td className="p-2">{m.name}</td>
                      <td className="p-2">{m.value}</td>
                      <td className="p-2">{m.closed}</td>
                      <td className="p-2">{m.rescheduled}</td>
                      <td className="p-2">{m.completed}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
