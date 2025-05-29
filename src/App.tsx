
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Services from "./pages/Services";
import Testimonials from "./pages/Testimonials";
import About from "./pages/About";
import Contact from "./pages/Contact";
import StrategyCall from "./pages/StrategyCall";
import NotFound from "./pages/NotFound";

// Auth imports
import AuthPage from "./pages/AuthPage";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UsersPage from "./pages/admin/UsersPage";
import ContactSubmissionsPage from "./pages/admin/ContactSubmissionsPage";
import BookingsPage from "./pages/admin/BookingsPage";
import CloserPanel from "./pages/CloserPanel";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Protected Route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  return <>{children}</>;
};

// Admin Route component
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  if (user.role === 'closer') {
    return <Navigate to="/closer-panel" replace />;
  }
  
  return <>{children}</>;
};

const App = () => {
  console.log('App component rendering');
  
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider delayDuration={300}>
          <Toaster />
          <Sonner />
          <AuthProvider>
            <BrowserRouter>
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Index />} />
                <Route path="/services" element={<Services />} />
                <Route path="/testimonials" element={<Testimonials />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/strategy-call" element={<StrategyCall />} />
                
                {/* Auth route */}
                <Route path="/auth" element={<AuthPage />} />
                
                {/* Closer panel */}
                <Route path="/closer-panel" element={
                  <ProtectedRoute>
                    <CloserPanel />
                  </ProtectedRoute>
                } />
                
                {/* Admin routes */}
                <Route path="/admin" element={
                  <ProtectedRoute>
                    <AdminRoute>
                      <AdminLayout />
                    </AdminRoute>
                  </ProtectedRoute>
                }>
                  <Route index element={<AdminDashboard />} />
                  <Route path="users" element={<UsersPage />} />
                  <Route path="contact-submissions" element={<ContactSubmissionsPage />} />
                  <Route path="bookings" element={<BookingsPage />} />
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
          </AuthProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
