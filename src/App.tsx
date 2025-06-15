import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Services from "./pages/Services";
import Testimonials from "./pages/Testimonials";
import About from "./pages/About";
import Contact from "./pages/Contact";
import StrategyCall from "./pages/StrategyCall";
import ThankYou from "./pages/ThankYou";
import AuthPageSupabase from "./pages/AuthPageSupabase";
import CloserPanel from "./pages/CloserPanel";
import CloserTimeSlot from "./pages/CloserTimeSlot";
import CloserBookings from "./pages/CloserBookings";
import CallStatus from "./pages/CallStatus";
import DealStatus from "./pages/DealStatus";
import RescheduleCall from "./pages/RescheduleCall";
import ClosedClients from "./pages/ClosedClients";
import MonthlyPerformance from "./pages/MonthlyPerformance";
import EODCloser from "./pages/EODCloser";
import ExportAll from "./pages/ExportAll";
import AdminPanel from "./pages/AdminPanel";
import AddUsers from "./pages/AddUsers";
import AllAvailableTimeslots from "./pages/AllAvailableTimeslots";
import AllBookings from "./pages/AllBookings";
import AllCallStatus from "./pages/AllCallStatus";
import AllDealStatus from "./pages/AllDealStatus";
import AllClosedClients from "./pages/AllClosedClients";
import AllRescheduleCalls from "./pages/AllRescheduleCalls";
import AllMonthlyClosersPerformance from "./pages/AllMonthlyClosersPerformance";
import AllEODClosersPerformance from "./pages/AllEODClosersPerformance";
import AllExportClients from "./pages/AllExportClients";
import EditHomePage from "./pages/EditHomePage";
import EditServicesPage from "./pages/EditServicesPage";
import EditTestimonialsPage from "./pages/EditTestimonialsPage";
import EditAboutPage from "./pages/EditAboutPage";
import AddTeamMemberPage from "./pages/AddTeamMemberPage";
import EditContactPage from "./pages/EditContactPage";
import EditStrategyCallPage from "./pages/EditStrategyCallPage";
import EditNavbarPage from "./pages/EditNavbarPage";
import EditFooterPage from "./pages/EditFooterPage";
import { SupabaseAuthProvider } from "@/hooks/useSupabaseAuth";

const App = () => {
  return (
    <SupabaseAuthProvider>
      <TooltipProvider delayDuration={300}>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<Services />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/strategy-call" element={<StrategyCall />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/auth" element={<AuthPageSupabase />} />
            <Route path="/closer-panel" element={<CloserPanel />} />
            <Route path="/closer-timeslot" element={<CloserTimeSlot />} />
            <Route path="/closer-bookings" element={<CloserBookings />} />
            <Route path="/call-status" element={<CallStatus />} />
            <Route path="/deal-status" element={<DealStatus />} />
            <Route path="/reschedule-call" element={<RescheduleCall />} />
            <Route path="/closed-clients" element={<ClosedClients />} />
            <Route path="/monthly-performance" element={<MonthlyPerformance />} />
            <Route path="/eod-closer" element={<EODCloser />} />
            <Route path="/export-all" element={<ExportAll />} />
            <Route path="/admin-panel" element={<AdminPanel />} />
            <Route path="/add-users" element={<AddUsers />} />
            <Route path="/all-available-timeslots" element={<AllAvailableTimeslots />} />
            <Route path="/all-bookings" element={<AllBookings />} />
            <Route path="/all-call-status" element={<AllCallStatus />} />
            <Route path="/all-deal-status" element={<AllDealStatus />} />
            <Route path="/all-closed-clients" element={<AllClosedClients />} />
            <Route path="/all-reschedule-calls" element={<AllRescheduleCalls />} />
            <Route path="/all-monthly-closers-performance" element={<AllMonthlyClosersPerformance />} />
            <Route path="/all-eod-closers-performance" element={<AllEODClosersPerformance />} />
            <Route path="/all-export-clients" element={<AllExportClients />} />
            <Route path="/edit-home" element={<EditHomePage />} />
            <Route path="/edit-services" element={<EditServicesPage />} />
            <Route path="/edit-testimonials" element={<EditTestimonialsPage />} />
            <Route path="/edit-about" element={<EditAboutPage />} />
            <Route path="/add-team-member" element={<AddTeamMemberPage />} />
            <Route path="/edit-contact" element={<EditContactPage />} />
            <Route path="/edit-strategy-call" element={<EditStrategyCallPage />} />
            <Route path="/edit-navbar" element={<EditNavbarPage />} />
            <Route path="/edit-footer" element={<EditFooterPage />} />
            <Route path="*" element={<Index />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </SupabaseAuthProvider>
  );
};

export default App;
