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
            {/* Redirect unknown routes to home or show a minimal not-found experience if desired */}
            <Route path="*" element={<Index />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </SupabaseAuthProvider>
  );
};

export default App;
