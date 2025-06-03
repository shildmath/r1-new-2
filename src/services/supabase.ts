
import { supabase } from '@/integrations/supabase/client';

export interface TimeSlot {
  id: string;
  closer_id: string;
  date: string;
  time: string;
  is_booked: boolean;
  client_id?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Booking {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  preferred_date: string;
  preferred_time: string;
  additional_info?: string;
  closer_id: string;
  time_slot_id: string;
  call_status: 'confirmed' | 'completed' | 'no-show' | 'reschedule' | 'not-attended';
  deal_status: 'closed' | 'follow-up' | 'client-loss' | 'unqualified' | 'not-started';
  closed_date?: string;
  payment_link_sent: boolean;
  contract_link_sent: boolean;
  offer_made: boolean;
  ad_spend?: string;
  country?: string;
  zip_code?: string;
  note?: string;
  recording_link?: string;
  follow_up_date?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  source: 'home' | 'contact';
  status: 'new' | 'contacted' | 'closed';
  created_at?: string;
  updated_at?: string;
}

// Time Slots Service
export const timeSlotService = {
  async getAll(): Promise<TimeSlot[]> {
    const { data, error } = await supabase
      .from('time_slots')
      .select('*')
      .order('date', { ascending: true })
      .order('time', { ascending: true });
    
    if (error) throw error;
    return data || [];
  },

  async getAvailable(): Promise<TimeSlot[]> {
    const { data, error } = await supabase
      .from('time_slots')
      .select('*')
      .eq('is_booked', false)
      .order('date', { ascending: true })
      .order('time', { ascending: true });
    
    if (error) throw error;
    return data || [];
  },

  async create(timeSlot: Omit<TimeSlot, 'id' | 'created_at' | 'updated_at'>): Promise<TimeSlot> {
    const { data, error } = await supabase
      .from('time_slots')
      .insert(timeSlot)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async update(id: string, updates: Partial<TimeSlot>): Promise<TimeSlot> {
    const { data, error } = await supabase
      .from('time_slots')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('time_slots')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};

// Bookings Service
export const bookingService = {
  async getAll(): Promise<Booking[]> {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async getByCloser(closerId: string): Promise<Booking[]> {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('closer_id', closerId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async create(booking: Omit<Booking, 'id' | 'created_at' | 'updated_at'>): Promise<Booking> {
    const { data, error } = await supabase
      .from('bookings')
      .insert(booking)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async update(id: string, updates: Partial<Booking>): Promise<Booking> {
    const { data, error } = await supabase
      .from('bookings')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('bookings')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};

// Contact Submissions Service
export const contactService = {
  async getAll(): Promise<ContactSubmission[]> {
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async getBySource(source: 'home' | 'contact'): Promise<ContactSubmission[]> {
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .eq('source', source)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async create(submission: Omit<ContactSubmission, 'id' | 'created_at' | 'updated_at'>): Promise<ContactSubmission> {
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert(submission)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async update(id: string, updates: Partial<ContactSubmission>): Promise<ContactSubmission> {
    const { data, error } = await supabase
      .from('contact_submissions')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('contact_submissions')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};

// User Service
export const userService = {
  async getClosers() {
    const { data, error } = await supabase
      .from('user_roles')
      .select(`
        user_id,
        role,
        profiles!inner(
          id,
          full_name,
          email
        )
      `)
      .eq('role', 'closer');
    
    if (error) throw error;
    return data?.map(item => ({
      id: item.user_id,
      name: item.profiles.full_name || item.profiles.email,
      email: item.profiles.email,
      role: item.role
    })) || [];
  }
};
