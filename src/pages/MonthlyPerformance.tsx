import React, { useMemo } from "react";
import CloserSidebar from "@/components/CloserSidebar";
import { useCloserBookings } from "@/hooks/useCloserBookings";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Graph } from "@/components/ui/graph";
import { Info, TrendingUp, CircleX, CalendarDays, Users } from "lucide-react";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import ExportButtons from "@/components/ExportButtons";

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
    Total: m.value,
    Closed: m.closed,
    Rescheduled: m.rescheduled,
    Completed: m.completed,
  }));

  // For table export: show same columns as displayed
  const csvHeaders = ["Month", "Total", "Closed", "Rescheduled", "Completed"];
  const exportTableData = months.map(m => ({
    Month: m.name,
    Total: m.value,
    Closed: m.closed,
    Rescheduled: m.rescheduled,
    Completed: m.completed
  }));

  const statBlocks = [
    {
      label: "Most Bookings",
      icon: TrendingUp,
      color: "text-primary",
      value: months.length
        ? months.reduce((a, b) => (a.value > b.value ? a : b)).value
        : "—",
      tooltip: "The highest total bookings in a single month."
    },
    {
      label: "Closed Deals (All Time)",
      icon: Users,
      color: "text-blue-700",
      value: months.reduce((n, m) => n + m.closed, 0),
      tooltip: "Sum of all closed deals across all months."
    },
    {
      label: "Reschedules (All Time)",
      icon: CalendarDays,
      color: "text-orange-500",
      value: months.reduce((n, m) => n + m.rescheduled, 0),
      tooltip: "Total bookings rescheduled or followed up."
    },
    {
      label: "Completed Calls (All Time)",
      icon: Users,
      color: "text-green-600",
      value: months.reduce((n, m) => n + m.completed, 0),
      tooltip: "Total calls marked as completed."
    },
    {
      label: "Months Recorded",
      icon: Info,
      color: "text-gray-500",
      value: months.length || "—",
      tooltip: "Number of unique months with data."
    }
  ];

  return (
    <TooltipProvider>
      <div className="flex min-h-screen bg-gradient-to-br from-accent-light to-secondary">
        <CloserSidebar />
        <main className="flex-1 p-4 md:p-8 bg-gradient-to-br from-white/90 to-blue-50">
          <h1 className="text-2xl md:text-3xl font-bold mb-3 animate-fade-in leading-tight">
            <span className="font-extrabold text-primary drop-shadow">Monthly Performance</span>
          </h1>
          
          {/* Add Export Buttons at the top */}
          <div className="flex justify-end"><ExportButtons data={exportTableData} filename="monthly-performance" csvHeaders={csvHeaders} /></div>

          <div className="max-w-7xl mx-auto gap-10 flex flex-col animate-fade-in animate-delay-200">
            {/* Dashboard stats blocks */}
            <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 mb-7">
              {statBlocks.map((stat, idx) => (
                <Card key={stat.label} className="flex flex-col items-center p-5 gap-2 border-primary/10 hover:scale-105 transition-transform group animate-scale-in">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span>
                        <stat.icon className={"mb-2 " + stat.color} size={30} />
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
            {/* Performance Graph */}
            <section className="flex flex-col lg:flex-row gap-6 items-start">
              <Card className="flex-1 shadow-xl border-accent/20 bg-white/95 p-4 animate-fade-in">
                <Graph
                  title="Monthly Bookings"
                  data={performanceData.map(({ name, Total }) => ({ name, value: Total }))}
                  type="bar"
                  color="#653ad4"
                  startFromZero
                />
              </Card>
              <Card className="flex-1 shadow-xl border-accent/20 bg-white/95 p-4 animate-fade-in">
                <Graph
                  title="Closed Deals (Monthly)"
                  data={performanceData.map(({ name, Closed }) => ({ name, value: Closed }))}
                  type="line"
                  color="#096ad9"
                  startFromZero
                />
              </Card>
            </section>
            {/* Table View */}
            <section className="mt-8">
              <Card className="bg-white/90 border-accent/15 shadow-lg animate-fade-in">
                <CardTitle className="p-3 pb-0 text-xl font-bold animate-fade-in">All Months Summary</CardTitle>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gradient-to-r from-accent-light to-accent font-semibold text-accent-foreground">
                        <TableHead>Month</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Closed</TableHead>
                        <TableHead>Resched.</TableHead>
                        <TableHead>Completed</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {months.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="text-red-500 p-7 text-center animate-fade-in">
                            <CircleX className="inline-block mr-2 text-red-400" size={18} />
                            No data found for your history.
                          </TableCell>
                        </TableRow>
                      ) : (
                        months.map((m, idx) => (
                          <TableRow key={idx} className="border-t border-none even:bg-gray-50 hover:bg-accent/40">
                            <TableCell>{m.name}</TableCell>
                            <TableCell>{m.value}</TableCell>
                            <TableCell>{m.closed}</TableCell>
                            <TableCell>{m.rescheduled}</TableCell>
                            <TableCell>{m.completed}</TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </Card>
            </section>
          </div>
        </main>
      </div>
    </TooltipProvider>
  );
}
