
import React from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { LayoutList } from "lucide-react";
import AllBookingsTable from "@/components/AllBookingsTable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminShadcnSidebar } from "@/components/AdminShadcnSidebar";

// Enhanced responsive and scrollable admin bookings page
const AllBookings = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gradient-to-br from-accent-light to-secondary">
        <AdminShadcnSidebar />
        <main className="flex-1 flex flex-col items-center px-1 pt-3 pb-8 md:py-8 animate-fade-in">
          <SidebarTrigger />
          <Card className="w-full max-w-6xl shadow-xl border-2 border-accent/10 bg-white/95 rounded-2xl">
            <CardHeader className="flex flex-col items-center gap-2 pb-2">
              <LayoutList size={36} className="text-accent mb-1" />
              <CardTitle className="text-3xl font-extrabold text-primary text-center">All Bookings</CardTitle>
              <CardDescription className="text-muted-foreground text-base text-center">
                View and manage all client call bookings (real time). Table below is scrollable and looks great on all devices.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <ScrollArea className="max-h-[60vh] min-w-full md:min-w-[900px] px-1">
                <div className="overflow-x-auto min-w-full">
                  <AllBookingsTable />
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AllBookings;
