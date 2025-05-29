
import { 
  User, 
  TimeSlot, 
  Booking, 
  ContactSubmission, 
  Testimonial, 
  Service, 
  TeamMember, 
  ContactInfo, 
  SocialLinks, 
  HomePageContent 
} from '@/types/admin';

const STORAGE_KEYS = {
  USERS: 'admin_users',
  TIME_SLOTS: 'admin_time_slots',
  BOOKINGS: 'admin_bookings',
  CONTACT_SUBMISSIONS: 'admin_contact_submissions',
  TESTIMONIALS: 'admin_testimonials',
  SERVICES: 'admin_services',
  TEAM_MEMBERS: 'admin_team_members',
  CONTACT_INFO: 'admin_contact_info',
  SOCIAL_LINKS: 'admin_social_links',
  HOME_PAGE_CONTENT: 'admin_home_page_content',
  CURRENT_USER: 'admin_current_user'
};

export const storage = {
  // Generic storage functions
  get: <T>(key: string): T[] => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  },

  set: <T>(key: string, data: T[]): void => {
    localStorage.setItem(key, JSON.stringify(data));
  },

  getSingle: <T>(key: string): T | null => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  },

  setSingle: <T>(key: string, data: T): void => {
    localStorage.setItem(key, JSON.stringify(data));
  },

  // Users
  getUsers: (): User[] => storage.get<User>(STORAGE_KEYS.USERS),
  setUsers: (users: User[]): void => storage.set(STORAGE_KEYS.USERS, users),
  
  getCurrentUser: (): User | null => storage.getSingle<User>(STORAGE_KEYS.CURRENT_USER),
  setCurrentUser: (user: User | null): void => {
    if (user) {
      storage.setSingle(STORAGE_KEYS.CURRENT_USER, user);
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    }
  },

  // Time Slots
  getTimeSlots: (): TimeSlot[] => storage.get<TimeSlot>(STORAGE_KEYS.TIME_SLOTS),
  setTimeSlots: (timeSlots: TimeSlot[]): void => storage.set(STORAGE_KEYS.TIME_SLOTS, timeSlots),

  // Bookings
  getBookings: (): Booking[] => storage.get<Booking>(STORAGE_KEYS.BOOKINGS),
  setBookings: (bookings: Booking[]): void => storage.set(STORAGE_KEYS.BOOKINGS, bookings),

  // Contact Submissions
  getContactSubmissions: (): ContactSubmission[] => storage.get<ContactSubmission>(STORAGE_KEYS.CONTACT_SUBMISSIONS),
  setContactSubmissions: (submissions: ContactSubmission[]): void => storage.set(STORAGE_KEYS.CONTACT_SUBMISSIONS, submissions),

  // Testimonials
  getTestimonials: (): Testimonial[] => storage.get<Testimonial>(STORAGE_KEYS.TESTIMONIALS),
  setTestimonials: (testimonials: Testimonial[]): void => storage.set(STORAGE_KEYS.TESTIMONIALS, testimonials),

  // Services
  getServices: (): Service[] => storage.get<Service>(STORAGE_KEYS.SERVICES),
  setServices: (services: Service[]): void => storage.set(STORAGE_KEYS.SERVICES, services),

  // Team Members
  getTeamMembers: (): TeamMember[] => storage.get<TeamMember>(STORAGE_KEYS.TEAM_MEMBERS),
  setTeamMembers: (teamMembers: TeamMember[]): void => storage.set(STORAGE_KEYS.TEAM_MEMBERS, teamMembers),

  // Contact Info
  getContactInfo: (): ContactInfo => {
    const data = storage.getSingle<ContactInfo>(STORAGE_KEYS.CONTACT_INFO);
    return data || {
      email: 'info@aiadmaxify.com',
      phone: '+1 (555) 123-4567',
      address: '123 Business St, City, State 12345',
      hours: 'Mon-Fri 9AM-6PM EST'
    };
  },
  setContactInfo: (contactInfo: ContactInfo): void => storage.setSingle(STORAGE_KEYS.CONTACT_INFO, contactInfo),

  // Social Links
  getSocialLinks: (): SocialLinks => {
    const data = storage.getSingle<SocialLinks>(STORAGE_KEYS.SOCIAL_LINKS);
    return data || {};
  },
  setSocialLinks: (socialLinks: SocialLinks): void => storage.setSingle(STORAGE_KEYS.SOCIAL_LINKS, socialLinks),

  // Home Page Content
  getHomePageContent: (): HomePageContent => {
    const data = storage.getSingle<HomePageContent>(STORAGE_KEYS.HOME_PAGE_CONTENT);
    return data || {
      heroTitle: 'Transform Your Business with AI-Powered Marketing',
      heroSubtitle: 'Ready to Transform Your Business?',
      heroDescription: 'Let\'s discuss how our AI-powered marketing solutions can help you achieve extraordinary growth.',
      aboutTitle: 'About AIAdMaxify',
      aboutDescription: 'We are a leading AI-powered marketing agency.',
      servicesTitle: 'Our Services',
      servicesDescription: 'Comprehensive marketing solutions for your business.',
      testimonialsTitle: 'What Our Clients Say',
      testimonialsDescription: 'Success stories from satisfied clients.'
    };
  },
  setHomePageContent: (content: HomePageContent): void => storage.setSingle(STORAGE_KEYS.HOME_PAGE_CONTENT, content),

  // Initialize default data
  initializeDefaults: (): void => {
    const users = storage.getUsers();
    if (users.length === 0) {
      const defaultAdmin: User = {
        id: '1',
        name: 'Admin User',
        email: 'admin@aiadmaxify.com',
        password: 'admin123',
        role: 'admin',
        createdAt: new Date().toISOString()
      };
      
      const defaultCloser: User = {
        id: '2',
        name: 'John Closer',
        email: 'closer@aiadmaxify.com',
        password: 'closer123',
        role: 'closer',
        createdAt: new Date().toISOString()
      };
      
      storage.setUsers([defaultAdmin, defaultCloser]);
    }

    // Initialize default testimonials if none exist
    const testimonials = storage.getTestimonials();
    if (testimonials.length === 0) {
      const defaultTestimonials: Testimonial[] = [
        {
          id: '1',
          name: 'John Smith',
          role: 'CEO',
          company: 'TechCorp',
          content: 'AIAdMaxify transformed our marketing strategy completely.',
          rating: 5
        }
      ];
      storage.setTestimonials(defaultTestimonials);
    }

    // Initialize default services if none exist
    const services = storage.getServices();
    if (services.length === 0) {
      const defaultServices: Service[] = [
        {
          id: '1',
          title: 'AI-Powered PPC',
          description: 'Automated pay-per-click campaigns optimized by AI.',
          features: ['Automated bidding', 'Smart targeting', 'Real-time optimization'],
          icon: 'target'
        }
      ];
      storage.setServices(defaultServices);
    }
  }
};
