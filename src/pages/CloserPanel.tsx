
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
  const statCards = [
    {
      label: "Total Slots",
      icon: <PhoneCall className="text-primary" size={28} />,
      value: slotsLoading ? "…" : slotStats.total,
      color: "bg-primary/10"
    },
    {
      label: "Available Slots",
      icon: <UserCheck2 className="text-green-600" size={28} />,
      value: slotsLoading ? "…" : slotStats.available,
      color: "bg-green-100"
    },
    {
      label: "Booked Calls",
      icon: <Handshake className="text-blue-700" size={28} />,
      value: slotsLoading ? "…" : slotStats.booked,
      color: "bg-blue-100"
    },
    {
      label: "Total Bookings",
      icon: <PhoneCall className="text-primary" size={28} />,
      value: isLoading ? "…" : stats.total,
      color: "bg-accent/10"
    },
    {
      label: "Completed Calls",
      icon: <UserCheck2 className="text-green-600" size={28} />,
      value: isLoading ? "…" : stats.completed,
      color: "bg-green-50"
    },
    {
      label: "Closed Deals",
      icon: <Handshake className="text-blue-700" size={28} />,
      value: isLoading ? "…" : stats.closed,
      color: "bg-blue-50"
    },
    {
      label: "Reschedules",
      icon: <CalendarClock className="text-orange-500" size={28} />,
      value: isLoading ? "…" : stats.rescheduled,
      color: "bg-orange-50"
    },
    {
      label: "No Shows",
      icon: <PhoneCall className="text-destructive" size={28} />,
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
      <CloserSidebar />
      <div
        className="flex-1 p-3 md:p-8 overflow-y-auto max-h-screen"
        style={{ minHeight: 0 }}
      >
        {/* Header: Welcome & Logout */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <User className="text-primary" />
            <h2 className="text-xl font-bold leading-tight sm:text-2xl">
              Welcome, <span className="text-accent">{displayName}</span>
              <span className="ml-2 text-base font-normal text-muted-foreground">
                (Role: {displayRole})
              </span>
            </h2>
          </div>
          <Button
            variant="outline"
            className="flex items-center gap-2 border-destructive text-destructive hover:bg-destructive hover:text-white transition"
            onClick={handleLogout}
          >
            <LogOut size={18} />
            Logout
          </Button>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 animate-fade-in">
          Closer Dashboard
        </h1>

        {/* DASHBOARD STAT CARDS */}
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 mb-8 animate-fade-in">
          {statCards.map((s, i) => (
            <Card
              key={i}
              className={`flex flex-col gap-1 items-center py-5 px-2 md:py-6 md:px-3 shadow-lg border border-accent/20 ${s.color}
                hover:scale-105 transition-transform duration-150`}
            >
              <span>{s.icon}</span>
              <span className="text-2xl md:text-4xl font-extrabold">{s.value}</span>
              <span className="text-xs md:text-base font-semibold text-center">{s.label}</span>
            </Card>
          ))}
        </div>

        {/* Responsive dashboard links/cards */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 mb-10 animate-fade-in">
          <div className="bg-card rounded-lg shadow p-4 md:p-6 flex flex-col justify-between hover-scale min-h-[140px]">
            <h2 className="font-semibold text-base md:text-lg mb-1 md:mb-2">Manage Your Time Slots</h2>
            <p className="text-gray-500 mb-2 md:mb-4 text-sm md:text-base">Keep your availability up to date so clients can book you!</p>
            <a
              href="/closer-timeslot"
              className="bg-primary text-white px-3 py-2 rounded hover:bg-primary/80 text-center story-link text-sm md:text-base"
            >Go to Time Slots</a>
          </div>
          <div className="bg-card rounded-lg shadow p-4 md:p-6 flex flex-col hover-scale min-h-[140px]">
            <h2 className="font-semibold text-base md:text-lg mb-1 md:mb-2">View Bookings</h2>
            <p className="text-gray-500 mb-2 md:mb-4 text-sm md:text-base">See who has booked a call with you and plan follow-ups.</p>
            <a
              href="/closer-bookings"
              className="bg-primary text-white px-3 py-2 rounded hover:bg-primary/80 text-center story-link text-sm md:text-base"
            >Go to Bookings</a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ... end of file
