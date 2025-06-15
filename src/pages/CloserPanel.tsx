
import React, { useMemo, useState } from "react";
import CloserSidebar from "@/components/CloserSidebar";
import { useCloserBookings } from "@/hooks/useCloserBookings";
import { Card } from "@/components/ui/card";
import { PhoneCall, Handshake, CalendarClock, UserCheck2, LogOut, User } from "lucide-react";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useUserProfileWithRole } from "@/hooks/useUserProfileWithRole";
import { useCloserSlots } from "@/hooks/useCloserSlots";

export default function CloserPanel() {
  const { bookings, isLoading } = useCloserBookings();
  const { user, logout } = useSupabaseAuth();
  const navigate = useNavigate();
  const { profile, loading: profileLoading } = useUserProfileWithRole();

  // SLOTS DATA FOR SLOT STATS
  const { slots, isLoading: slotsLoading } = useCloserSlots();
  const slotStats = useMemo(() => {
    if (!slots) return { total: 0, available: 0, booked: 0 };
    const total = slots.length;
    const available = slots.filter(s => s.is_available).length;
    const booked = total - available;
    return { total, available, booked };
  }, [slots]);

  // BOOKING STATS
  const stats = useMemo(() => {
    if (!bookings) return {
      total: 0,
      completed: 0,
      closed: 0,
      rescheduled: 0,
      noShow: 0,
    };
    return {
      total: bookings.length,
      completed: bookings.filter(b => b.call_status === "Completed").length,
      closed: bookings.filter(b => (b.deal_status ?? "").toLowerCase() === "closed").length,
      rescheduled: bookings.filter(b => b.reschedule_date || b.follow_up_call_date).length,
      noShow: bookings.filter(b => b.call_status === "No Show Up").length,
    };
  }, [bookings]);

  // BUILD CARDS
  // Reorder to prioritize slots and main booking stats
  const statCards = [
    {
      label: "Total Slots",
      icon: <PhoneCall className="text-primary" size={24} />,
      value: slotsLoading ? "…" : slotStats.total,
      color: "bg-primary/10"
    },
    {
      label: "Available Slots",
      icon: <UserCheck2 className="text-green-600" size={24} />,
      value: slotsLoading ? "…" : slotStats.available,
      color: "bg-green-100"
    },
    {
      label: "Booked Calls",
      icon: <Handshake className="text-blue-700" size={24} />,
      value: slotsLoading ? "…" : slotStats.booked,
      color: "bg-blue-100"
    },
    {
      label: "Total Bookings",
      icon: <PhoneCall className="text-primary" size={24} />,
      value: isLoading ? "…" : stats.total,
      color: "bg-accent/10"
    },
    {
      label: "Completed Calls",
      icon: <UserCheck2 className="text-green-600" size={24} />,
      value: isLoading ? "…" : stats.completed,
      color: "bg-green-50"
    },
    {
      label: "Closed Deals",
      icon: <Handshake className="text-blue-700" size={24} />,
      value: isLoading ? "…" : stats.closed,
      color: "bg-blue-50"
    },
    {
      label: "Reschedules",
      icon: <CalendarClock className="text-orange-500" size={24} />,
      value: isLoading ? "…" : stats.rescheduled,
      color: "bg-orange-50"
    },
    {
      label: "No Shows",
      icon: <PhoneCall className="text-destructive" size={24} />,
      value: isLoading ? "…" : stats.noShow,
      color: "bg-red-50"
    },
  ];

  const displayName =
    profile?.full_name ||
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email ||
    user?.id?.slice(0, 8) ||
    "User";

  const displayRole =
    profileLoading
      ? "Loading role..."
      : (profile?.role
        ? profile.role.charAt(0).toUpperCase() + profile.role.slice(1)
        : "Unknown Role");

  const handleLogout = async () => {
    await logout();
    navigate("/auth");
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-accent-light to-secondary">
      {/* Sidebar on the left, collapses below md */}
      <CloserSidebar />
      <div
        className="flex-1 p-2 sm:p-3 md:p-6 overflow-y-auto max-h-screen flex flex-col"
        style={{ minHeight: 0 }}
      >
        {/* Header: Welcome & Logout */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 mb-4 sm:mb-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <User className="text-primary" size={28} />
            <h2 className="text-lg sm:text-xl font-bold leading-tight">
              Welcome, <span className="text-accent">{displayName}</span>
              <span className="ml-2 text-sm sm:text-base font-normal text-muted-foreground">
                (Role: {displayRole})
              </span>
            </h2>
          </div>
          <Button
            variant="outline"
            className="flex items-center gap-1 border-destructive text-destructive hover:bg-destructive hover:text-white transition py-1 px-3 text-xs sm:text-sm"
            onClick={handleLogout}
          >
            <LogOut size={16} />
            Logout
          </Button>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 animate-fade-in">
          Closer Dashboard
        </h1>

        {/* STAT CARDS */}
        <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-4 mb-5 animate-fade-in">
          {statCards.map((s, i) => (
            <Card
              key={i}
              className={`flex flex-col gap-0.5 sm:gap-1 items-center py-3 px-1 sm:py-5 sm:px-2 shadow border border-accent/20 ${s.color}
                hover:scale-105 transition-transform duration-150 min-h-[65px]`}
            >
              <span className="mb-1">{s.icon}</span>
              <span className="text-lg sm:text-2xl font-extrabold">{s.value}</span>
              <span className="text-[11px] sm:text-xs md:text-sm font-semibold text-center">{s.label}</span>
            </Card>
          ))}
        </div>

        {/* Responsive dashboard links/cards */}
        <div className="grid gap-3 sm:gap-6 grid-cols-1 md:grid-cols-2 mb-7 animate-fade-in">
          <div className="bg-card rounded-lg shadow p-3 sm:p-4 flex flex-col justify-between hover-scale min-h-[110px]">
            <h2 className="font-semibold text-[15px] sm:text-base mb-1">Manage Your Time Slots</h2>
            <p className="text-gray-500 mb-2 text-xs sm:text-sm">Keep your availability up to date so clients can book you!</p>
            <a
              href="/closer-timeslot"
              className="bg-primary text-white px-2 py-1 sm:px-3 sm:py-2 rounded hover:bg-primary/80 text-center story-link text-xs sm:text-sm"
            >Go to Time Slots</a>
          </div>
          <div className="bg-card rounded-lg shadow p-3 sm:p-4 flex flex-col hover-scale min-h-[110px]">
            <h2 className="font-semibold text-[15px] sm:text-base mb-1">View Bookings</h2>
            <p className="text-gray-500 mb-2 text-xs sm:text-sm">See who has booked a call with you and plan follow-ups.</p>
            <a
              href="/closer-bookings"
              className="bg-primary text-white px-2 py-1 sm:px-3 sm:py-2 rounded hover:bg-primary/80 text-center story-link text-xs sm:text-sm"
            >Go to Bookings</a>
          </div>
        </div>
      </div>
    </div>
  );
}
