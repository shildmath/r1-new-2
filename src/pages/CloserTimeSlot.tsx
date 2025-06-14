
import React from "react";
import CloserSidebar from "@/components/CloserSidebar";
import CloserSlotManager from "@/components/CloserSlotManager";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { LayoutPanelLeft } from "lucide-react";

export default function CloserTimeSlot() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-accent-light to-secondary">
      <CloserSidebar />
      <div className="flex-1 flex flex-col items-center p-6 gap-3 animate-fade-in">
        <Card className="w-full max-w-3xl mb-8 shadow-xl border-2 border-accent/10 bg-white/95">
          <CardHeader className="flex flex-row items-center gap-3 pb-1">
            <LayoutPanelLeft size={32} className="text-accent" />
            <div>
              <CardTitle className="text-2xl font-extrabold text-primary">Manage Time Slots</CardTitle>
              <CardDescription className="text-muted-foreground text-base">
                Adjust your available slots and keep your calendar up to date.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <CloserSlotManager />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
