
import React from "react";
import CloserSidebar from "@/components/CloserSidebar";
import CloserSlotManager from "@/components/CloserSlotManager";

export default function CloserTimeSlot() {
  return (
    <div className="flex min-h-screen">
      <CloserSidebar />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-4">Manage Time Slots</h1>
        <CloserSlotManager />
      </div>
    </div>
  );
}
