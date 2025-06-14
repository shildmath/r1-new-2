
import React, { useMemo } from "react";
import CloserSidebar from "@/components/CloserSidebar";
import { useCloserBookings } from "@/hooks/useCloserBookings";
import { Card } from "@/components/ui/card";
import { PhoneCall, Handshake, CalendarClock, UserCheck2, LogOut, User } from "lucide-react";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useUserProfileWithRole } from "@/hooks/useUserProfileWithRole";

export default function CloserPanel() {
  const { bookings, isLoading } = useCloserBookings();
  const { user, logout } = useSupabaseAuth();
  const navigate = useNavigate();
  const { profile, loading: profileLoading } = useUserProfileWithRole();

  // Memoize stats for speed
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

  const statCards = [
    {
      label: "Total Bookings",
      icon: <PhoneCall className="text-primary" size={30} />,
      value: stats.total,
      color: "bg-primary/10"
    },
    {
      label: "Completed Calls",
      icon: <UserCheck2 className="text-green-600" size={30} />,
      value: stats.completed,
      color: "bg-green-100"
    },
    {
      label: "Closed Deals",
      icon: <Handshake className="text-blue-700" size={30} />,
      value: stats.closed,
      color: "bg-blue-100"
    },
    {
      label: "Reschedules",
      icon: <CalendarClock className="text-orange-500" size={30} />,
      value: stats.rescheduled,
      color: "bg-orange-100"
    },
    {
      label: "No Shows",
      icon: <PhoneCall className="text-destructive" size={30} />,
      value: stats.noShow,
      color: "bg-red-100"
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
    <div className="flex min-h-screen flex-col md:flex-row bg-gradient-to-br from-accent-light to-secondary">
      <CloserSidebar />
      <div className="flex-1 p-3 md:p-8">
        {/* Header: Welcome & Logout */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <User className="text-primary" />
            <h2 className="text-xl font-bold">
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
        <h1 className="text-3xl font-bold mb-6 animate-fade-in">Closer Dashboard</h1>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 mb-10 animate-fade-in">
          {statCards.map((s, i) => (
            <Card
              key={i}
              className={`flex flex-col gap-2 items-center py-6 px-3 shadow-xl border-2 border-accent/20 ${s.color} hover:scale-105 transition-transform duration-200`}
            >
              <span>{s.icon}</span>
              <span className="text-5xl font-extrabold">{isLoading ? "…" : s.value}</span>
              <span className="text-lg font-semibold">{s.label}</span>
            </Card>
          ))}
        </div>
        {/* Responsive cards */}
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2">
          <div className="bg-card rounded-lg shadow p-6 flex flex-col justify-between hover-scale">
            <h2 className="font-semibold text-lg mb-2">Manage Your Time Slots</h2>
            <p className="text-gray-500 mb-4">Keep your availability up to date so clients can book you!</p>
            <a
              href="/closer-timeslot"
              className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/80 text-center story-link"
            >Go to Time Slots</a>
          </div>
          <div className="bg-card rounded-lg shadow p-6 flex flex-col hover-scale">
            <h2 className="font-semibold text-lg mb-2">View Bookings</h2>
            <p className="text-gray-500 mb-4">See who has booked a call with you and plan follow-ups.</p>
            <a
              href="/closer-bookings"
              className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/80 text-center story-link"
            >Go to Bookings</a>
          </div>
        </div>
      </div>
    </div>
  );
}
