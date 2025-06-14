
import React from "react";
import CloserSidebar from "@/components/CloserSidebar";
import CloserBookingsTable from "@/components/CloserBookingsTable";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { LayoutList } from "lucide-react";

export default function CloserBookings() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-accent-light to-secondary">
      <CloserSidebar />
      <div className="flex-1 flex flex-col items-center p-6 gap-3 animate-fade-in">
        <Card className="w-full max-w-5xl mb-8 shadow-xl border-2 border-accent/10 bg-white/95">
          <CardHeader className="flex flex-row items-center gap-3 pb-1">
            <LayoutList size={32} className="text-accent" />
            <div>
              <CardTitle className="text-2xl font-extrabold text-primary">Your Bookings</CardTitle>
              <CardDescription className="text-muted-foreground text-base">
                Review and manage your client call bookings.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <CloserBookingsTable />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
