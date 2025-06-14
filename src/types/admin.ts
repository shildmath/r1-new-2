
// User types for Admin panel

// Core user for localStorage/auth
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'closer';
  createdAt: string;
}

// Profile pulled from Supabase user_roles/profiles join
export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: 'admin' | 'closer';
  created_at: string;
}

// Scheduling slots
export interface TimeSlot {
  id: string;
  closerId: string;
  date: string;
  time: string;
  isBooked: boolean;
  clientId?: string;
  createdAt: string;
  updatedAt?: string;
}

// Strategy call bookings
export interface Booking {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  timeSlotId: string;
  closerId: string;
  callStatus?: string;
  dealStatus?: string;
  closedDate?: string;
  followUpDate?: string;
  paymentLinkSent?: boolean;
  contractLinkSent?: boolean;
  offerMade?: boolean;
  adSpend?: string;
  country?: string;
  zipCode?: string;
  recordingLink?: string;
  note?: string;
  additionalInfo?: string;
  createdAt: string;
  updatedAt?: string;
}

// Contact form submissions
export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  source: 'home' | 'contact';
  status: 'new' | 'contacted' | 'closed';
  createdAt: string;
}

// Testimonials
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  image?: string;
}

// Service offerings
export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: string;
}

// Team member
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio?: string;
  image?: string;
}

// Business contact info
export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
  hours: string;
}

// Social links
export interface SocialLinks {
  [platform: string]: string;
}

// Home page editable content
export interface HomePageContent {
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  aboutTitle: string;
  aboutDescription: string;
  servicesTitle: string;
  servicesDescription: string;
  testimonialsTitle: string;
  testimonialsDescription: string;
}
