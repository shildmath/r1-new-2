
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SupabaseAuthProvider } from "@/hooks/useSupabaseAuth";
import Index from "./pages/Index";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Testimonials from "./pages/Testimonials";
import StrategyCall from "./pages/StrategyCall";
import StrategyCallCalendly from "./pages/StrategyCallCalendly";
import ThankYou from "./pages/ThankYou";
import AuthPageSupabase from "./pages/AuthPageSupabase";
import AdminPanel from "./pages/AdminPanel";
import AddUsers from "./pages/AddUsers";
import AllBookings from "./pages/AllBookings";
import AllClosedClients from "./pages/AllClosedClients";
import AllAvailableTimeslots from "./pages/AllAvailableTimeslots";
import AllDealStatus from "./pages/AllDealStatus";
import AllMonthlyClosersPerformance from "./pages/AllMonthlyClosersPerformance";
import AllEODClosersPerformance from "./pages/AllEODClosersPerformance";
import AllExportClients from "./pages/AllExportClients";
import AllCallStatus from "./pages/AllCallStatus";
import AllRescheduleCalls from "./pages/AllRescheduleCalls";
import AuthPage from "./pages/AuthPage";
import CloserPanel from "./pages/CloserPanel";
import CloserBookings from "./pages/CloserBookings";
import CloserTimeSlot from "./pages/CloserTimeSlot";
import AdminLogin from "./pages/AdminLogin";
import CallStatus from "./pages/CallStatus";
import DealStatus from "./pages/DealStatus";
import ClosedClients from "./pages/ClosedClients";
import RescheduleCall from "./pages/RescheduleCall";
import MonthlyPerformance from "./pages/MonthlyPerformance";
import EODCloser from "./pages/EODCloser";
import ExportAll from "./pages/ExportAll";
import EditHomePage from "./pages/EditHomePage";
import EditServicesPage from "./pages/EditServicesPage";
import EditTestimonialsPage from "./pages/EditTestimonialsPage";
import EditAboutPage from "./pages/EditAboutPage";
import AddTeamMemberPage from "./pages/AddTeamMemberPage";
import EditContactPage from "./pages/EditContactPage";
import EditStrategyCallPage from "./pages/EditStrategyCallPage";
import EditStrategyCallCalendlyPage from "./pages/EditStrategyCallCalendlyPage";
import EditNavbarPage from "./pages/EditNavbarPage";
import EditFooterPage from "./pages/EditFooterPage";
import ContactResponsePage from "./pages/ContactResponsePage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SupabaseAuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/strategy-call" element={<StrategyCall />} />
          <Route path="/strategy-call-calendly" element={<StrategyCallCalendly />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/auth" element={<AuthPageSupabase />} />
          <Route path="/admin-panel" element={<AdminPanel />} />
          <Route path="/add-users" element={<AddUsers />} />
          <Route path="/all-bookings" element={<AllBookings />} />
          <Route path="/all-closed-clients" element={<AllClosedClients />} />
          <Route path="/all-available-timeslots" element={<AllAvailableTimeslots />} />
          <Route path="/all-deal-status" element={<AllDealStatus />} />
          <Route path="/all-monthly-closers-performance" element={<AllMonthlyClosersPerformance />} />
          <Route path="/all-eod-closers-performance" element={<AllEODClosersPerformance />} />
          <Route path="/all-export-clients" element={<AllExportClients />} />
          <Route path="/all-call-status" element={<AllCallStatus />} />
          <Route path="/all-reschedule-calls" element={<AllRescheduleCalls />} />
          <Route path="/auth-page" element={<AuthPage />} />
          <Route path="/closer-panel" element={<CloserPanel />} />
          <Route path="/closer-bookings" element={<CloserBookings />} />
          <Route path="/closer-timeslot" element={<CloserTimeSlot />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/call-status" element={<CallStatus />} />
          <Route path="/deal-status" element={<DealStatus />} />
          <Route path="/closed-clients" element={<ClosedClients />} />
          <Route path="/reschedule-call" element={<RescheduleCall />} />
          <Route path="/monthly-performance" element={<MonthlyPerformance />} />
          <Route path="/eod-closer" element={<EODCloser />} />
          <Route path="/export-all" element={<ExportAll />} />
          <Route path="/edit-home" element={<EditHomePage />} />
          <Route path="/edit-services" element={<EditServicesPage />} />
          <Route path="/edit-testimonials" element={<EditTestimonialsPage />} />
          <Route path="/edit-about" element={<EditAboutPage />} />
          <Route path="/add-team-member" element={<AddTeamMemberPage />} />
          <Route path="/edit-contact" element={<EditContactPage />} />
          <Route path="/edit-strategy-call" element={<EditStrategyCallPage />} />
          <Route path="/edit-strategy-call-calendly" element={<EditStrategyCallCalendlyPage />} />
          <Route path="/edit-navbar" element={<EditNavbarPage />} />
          <Route path="/edit-footer" element={<EditFooterPage />} />
          <Route path="/contact-responses" element={<ContactResponsePage />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    </SupabaseAuthProvider>
  </QueryClientProvider>
);

export default App;
