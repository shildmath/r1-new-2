import React, { useMemo } from "react";
import CloserSidebar from "@/components/CloserSidebar";
import { useCloserBookings } from "@/hooks/useCloserBookings";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import { PhoneCall, Handshake, CalendarClock, UserCheck2, Info, CircleX } from "lucide-react";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import OptimizedTable from "@/components/OptimizedTable";
import ExportButtons from "@/components/ExportButtons";

function todayISO() {
  return format(new Date(), "yyyy-MM-dd");
}

export default function EODCloser() {
  const { bookings, isLoading } = useCloserBookings();

  const today = todayISO();
  const todayBookings = bookings.filter(
    b => b.slot_date === today
  );

  const stats = useMemo(() => ({
    total: todayBookings.length,
    completed: todayBookings.filter(b => b.call_status === "Completed").length,
    closed: todayBookings.filter(b => (b.deal_status ?? "").toLowerCase() === "closed").length,
    rescheduled: todayBookings.filter(b => b.reschedule_date || b.follow_up_call_date).length,
    noShow: todayBookings.filter(b => b.call_status === "No Show Up").length,
  }), [todayBookings]);

  const statItems = [
    {
      label: "Total Bookings Today",
      value: stats.total,
      icon: PhoneCall,
      color: "text-primary",
      tooltip: "All bookings for today"
    },
    {
      label: "Completed Calls",
      value: stats.completed,
      icon: UserCheck2,
      color: "text-green-600",
      tooltip: "Successfully completed calls today"
    },
    {
      label: "Closed Deals",
      value: stats.closed,
      icon: Handshake,
      color: "text-blue-700",
      tooltip: "Deals closed today"
    },
    {
      label: "Reschedules",
      value: stats.rescheduled,
      icon: CalendarClock,
      color: "text-orange-500",
      tooltip: "Calls marked for reschedule/follow-up"
    },
    {
      label: "No Shows",
      value: stats.noShow,
      icon: PhoneCall,
      color: "text-destructive",
      tooltip: "No-show clients today"
    }
  ];

  // Table columns config for OptimizedTable
  const columns = [
    { 
      key: "slot_time", header: "Time", sortable: true 
    },
    {
      key: "first_name", header: "Client", sortable: true,
      render: (v, row) => `${row.first_name} ${row.last_name}`
    },
    {
      key: "email", header: "Email", sortable: true
    },
    {
      key: "phone", header: "Phone", sortable: false
    },
    {
      key: "deal_status", header: "Deal Status", sortable: true,
      render: (v) => v || "-"
    },
    {
      key: "call_status", header: "Call Status", sortable: true,
      render: (v) => v || "-"
    }
  ];

  // Add export for visible table
  const csvHeaders = columns.map(col => col.header ?? col.key);
  const exportTableData = todayBookings.map(row => ({
    Time: row.slot_time,
    Client: `${row.first_name} ${row.last_name}`,
    Email: row.email,
    Phone: row.phone,
    "Deal Status": row.deal_status ?? "-",
    "Call Status": row.call_status ?? "-"
  }));

  return (
    <TooltipProvider>
      <div className="flex min-h-screen bg-gradient-to-br from-accent-light to-secondary">
        <CloserSidebar />
        <main className="flex-1 p-4 md:p-8 bg-gradient-to-br from-white/90 to-blue-50">
          <h1 className="text-2xl md:text-3xl font-bold mb-3 animate-fade-in leading-tight">
            <span className="font-extrabold text-primary drop-shadow">End Of The Day Report</span>
          </h1>
          {/* Add Export Buttons for page */}
          <div className="flex justify-end">
            <ExportButtons data={exportTableData} filename="eod-bookings" csvHeaders={csvHeaders} />
          </div>
          <div className="max-w-7xl mx-auto flex flex-col gap-7 animate-fade-in animate-delay-200">
            {/* Stats summary */}
            <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 mb-5">
              {statItems.map(stat => (
                <Card
                  key={stat.label}
                  className="flex flex-col items-center p-5 gap-2 border-primary/10 hover:scale-105 transition-transform animate-scale-in group"
                >
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span>
                        <stat.icon className={`mb-1 ${stat.color}`} size={28} />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      {stat.tooltip}
                    </TooltipContent>
                  </Tooltip>
                  <span className="font-extrabold text-3xl md:text-4xl text-primary group-hover:text-blue-700 transition-colors">
                    {isLoading ? "…" : stat.value}
                  </span>
                  <span className="text-center text-sm font-medium text-gray-700">{stat.label}</span>
                </Card>
              ))}
            </section>
            
            <Card className="shadow-lg border-accent/20 bg-white/95 p-3 md:p-6 animate-fade-in">
              <div className="flex flex-row items-center gap-3 mb-4">
                <h2 className="text-lg md:text-xl font-bold flex-1">Today's Bookings Table</h2>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="text-gray-400 hover:text-primary transition-colors cursor-pointer" size={20} />
                  </TooltipTrigger>
                  <TooltipContent side="left">
                    Sort columns, search, and paginate to view all call records for today.
                  </TooltipContent>
                </Tooltip>
              </div>
              <div>
                {isLoading ? (
                  <div className="p-8 text-center text-accent text-lg animate-pulse">
                    Loading…
                  </div>
                ) : todayBookings.length === 0 ? (
                  <div className="text-red-500 p-6 text-center flex flex-col gap-2 items-center">
                    <CircleX className="inline-block text-red-400 mb-2" size={32} />
                    <span>No bookings for today.</span>
                    <span className="text-xs text-gray-400">
                      All your finished and upcoming daily reports will appear here.
                    </span>
                  </div>
                ) : (
                  <OptimizedTable
                    data={todayBookings}
                    columns={columns}
                    className="animate-fade-in"
                  />
                )}
              </div>
            </Card>
          </div>
        </main>
      </div>
    </TooltipProvider>
  );
}
