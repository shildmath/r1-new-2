
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SupabaseAuthProvider, useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import Index from "./pages/Index";
import Services from "./pages/Services";
import Testimonials from "./pages/Testimonials";
import About from "./pages/About";
import Contact from "./pages/Contact";
import StrategyCall from "./pages/StrategyCall";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

// Admin imports
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UsersPage from "./pages/admin/UsersPage";
import ContactSubmissionsPage from "./pages/admin/ContactSubmissionsPage";
import BookingsPage from "./pages/admin/BookingsPage";
import TimeSlotsPage from "./pages/admin/TimeSlotsPage";
import HomePageContactPage from "./pages/admin/HomePageContactPage";
import CloserPanel from "./pages/CloserPanel";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  console.log('App component rendering');
  
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider delayDuration={300}>
          <Toaster />
          <Sonner />
          <SupabaseAuthProvider>
            <BrowserRouter>
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Index />} />
                <Route path="/services" element={<Services />} />
                <Route path="/testimonials" element={<Testimonials />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/strategy-call" element={<StrategyCall />} />
                
                {/* Auth routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                
                {/* Closer panel - requires closer role */}
                <Route path="/closer-panel" element={
                  <ProtectedRoute requiredRole="closer">
                    <CloserPanel />
                  </ProtectedRoute>
                } />
                
                {/* Admin routes - requires admin role */}
                <Route path="/admin" element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminLayout />
                  </ProtectedRoute>
                }>
                  <Route index element={<AdminDashboard />} />
                  <Route path="users" element={<UsersPage />} />
                  <Route path="contact-submissions" element={<ContactSubmissionsPage />} />
                  <Route path="home-page-contacts" element={<HomePageContactPage />} />
                  <Route path="bookings" element={<BookingsPage />} />
                  <Route path="time-slots" element={<TimeSlotsPage />} />
                  <Route path="testimonials" element={<div>Testimonials Management Page</div>} />
                  <Route path="services" element={<div>Services Management Page</div>} />
                  <Route path="team" element={<div>Team Management Page</div>} />
                  <Route path="contact-info" element={<div>Contact Info Management Page</div>} />
                  <Route path="social-links" element={<div>Social Links Management Page</div>} />
                  <Route path="home-content" element={<div>Home Page Content Management Page</div>} />
                </Route>
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </SupabaseAuthProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
