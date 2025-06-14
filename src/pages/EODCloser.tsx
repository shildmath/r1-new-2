
import React, { useMemo, useState } from "react";
import CloserSidebar from "@/components/CloserSidebar";
import { useCloserBookings } from "@/hooks/useCloserBookings";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import { PhoneCall, Handshake, CalendarClock, UserCheck2, Info, CircleX, Filter } from "lucide-react";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import OptimizedTable from "@/components/OptimizedTable";
import ExportButtons from "@/components/ExportButtons";
import { useIsMobile } from "@/hooks/use-mobile";

function todayISO() {
  return format(new Date(), "yyyy-MM-dd");
}

export default function EODCloser() {
  const { bookings, isLoading, filter, setFilter, clearFilter } = useCloserBookings();
  const [showFilter, setShowFilter] = useState(false);
  const isMobile = useIsMobile();
  const [dateInput, setDateInput] = useState(filter.date ?? todayISO());

  // Show bookings for selected/filtered date or all if no filter
  const filteredDate = filter.date ?? todayISO();
  const todayBookings = filter.date
    ? bookings.filter(b => b.slot_date === filteredDate)
    : bookings.filter(b => b.slot_date === todayISO());

  // Show stats for visible/filtered bookings
  const stats = useMemo(() => ({
    total: todayBookings.length,
    completed: todayBookings.filter(b => b.call_status === "Completed").length,
    closed: todayBookings.filter(b => (b.deal_status ?? "").toLowerCase() === "closed").length,
    rescheduled: todayBookings.filter(b => b.reschedule_date || b.follow_up_call_date).length,
    noShow: todayBookings.filter(b => b.call_status === "No Show Up").length,
  }), [todayBookings]);

  const statItems = [
    {
      label: "Total Bookings",
      value: stats.total,
      icon: PhoneCall,
      color: "text-primary",
      tooltip: "All bookings for selected date"
    },
    {
      label: "Completed Calls",
      value: stats.completed,
      icon: UserCheck2,
      color: "text-green-600",
      tooltip: "Successfully completed calls"
    },
    {
      label: "Closed Deals",
      value: stats.closed,
      icon: Handshake,
      color: "text-blue-700",
      tooltip: "Deals closed"
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
      tooltip: "No-show clients"
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
      <div className="flex min-h-screen flex-col md:flex-row bg-gradient-to-br from-accent-light to-secondary">
        <CloserSidebar />
        <main className="flex-1 p-4 md:p-8 bg-gradient-to-br from-white/90 to-blue-50">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-2">
            <h1 className="text-2xl md:text-3xl font-bold animate-fade-in leading-tight">
              <span className="font-extrabold text-primary drop-shadow">End Of The Day Report</span>
            </h1>
            <div className="flex gap-2 items-center">
              <button
                onClick={() => setShowFilter(f => !f)}
                className="flex items-center gap-1 text-accent underline underline-offset-2 hover:text-primary bg-none border-0 p-0"
              >
                <Filter size={18} />
                {isMobile ? "" : "Filter Date"}
              </button>
              <ExportButtons data={exportTableData} filename="eod-bookings" csvHeaders={csvHeaders} />
            </div>
          </div>
          {/* Date filter UI, mobile-first */}
          {showFilter && (
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center mb-4 animate-fade-in">
              <label className="text-sm font-medium mr-1">Select Date:</label>
              <input
                type="date"
                className="border rounded px-3 py-1"
                value={dateInput}
                max={todayISO()}
                onChange={e => setDateInput(e.target.value)}
                style={{width: isMobile ? "100%" : "auto"}}
              />
              <button
                className="bg-primary text-white px-3 py-1 rounded text-sm hover:bg-primary/90 transition"
                onClick={() => setFilter(f => ({ ...f, date: dateInput }))}
                type="button"
              >
                Apply
              </button>
              <button
                className="border border-gray-300 px-3 py-1 text-gray-700 rounded text-sm hover:bg-accent/10"
                onClick={() => { setFilter({}); setDateInput(todayISO()); }}
                type="button"
              >
                Reset
              </button>
            </div>
          )}
          <div className="max-w-7xl mx-auto flex flex-col gap-7 animate-fade-in animate-delay-200">
            {/* Stats summary */}
            <section className={`grid ${isMobile ? "grid-cols-1" : "md:grid-cols-3 lg:grid-cols-5"} gap-5 mb-5`}>
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
              <div className="flex flex-col md:flex-row items-center gap-3 mb-4">
                <h2 className="text-lg md:text-xl font-bold flex-1">Bookings Table</h2>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="text-gray-400 hover:text-primary transition-colors cursor-pointer" size={20} />
                  </TooltipTrigger>
                  <TooltipContent side="left">
                    Sort columns, search, and paginate to view all call records for the date.
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
                    <span>No bookings for this date.</span>
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
