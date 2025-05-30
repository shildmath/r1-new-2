
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'closer';
  createdAt: string;
}

export interface TimeSlot {
  id: string;
  closerId: string;
  date: string;
  time: string;
  isBooked: boolean;
  clientId?: string;
}

export interface Booking {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  additionalInfo: string;
  closerId: string;
  timeSlotId: string;
  callStatus: 'confirmed' | 'completed' | 'no-show' | 'reschedule' | 'not-attended';
  dealStatus: 'closed' | 'follow-up' | 'client-loss' | 'unqualified' | 'not-started';
  closedDate?: string;
  paymentLinkSent: boolean;
  contractLinkSent: boolean;
  offerMade: boolean;
  adSpend?: string;
  country?: string;
  zipCode?: string;
  note?: string;
  recordingLink?: string;
  followUpDate?: string;
  createdAt: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  source: 'home' | 'contact';
  status: 'new' | 'handled';
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  image?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  price?: string;
  icon: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image?: string;
  email?: string;
  linkedin?: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
  hours: string;
}

export interface SocialLinks {
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  instagram?: string;
  youtube?: string;
}

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
