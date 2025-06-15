
import React from "react";
import AdminSidebar from "@/components/AdminSidebar";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { LayoutList } from "lucide-react";
import AllBookingsTable from "@/components/AllBookingsTable";

const AllBookings = () => {
  return (
    <div className="flex min-h-screen flex-col md:flex-row bg-gradient-to-br from-accent-light to-secondary">
      <AdminSidebar />
      <div
        className="flex-1 flex flex-col items-center p-3 md:p-6 gap-3 animate-fade-in overflow-y-auto max-h-screen"
        style={{ minHeight: 0 }}
      >
        <Card className="w-full max-w-6xl mb-8 shadow-xl border-2 border-accent/10 bg-white/95">
          <CardHeader className="flex flex-col sm:flex-row items-center gap-3 pb-1">
            <LayoutList size={32} className="text-accent" />
            <div>
              <CardTitle className="text-3xl font-extrabold text-primary">All Bookings</CardTitle>
              <CardDescription className="text-muted-foreground text-base">
                View and manage all client call bookings (real time).
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="overflow-x-auto">
              <AllBookingsTable />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AllBookings;
