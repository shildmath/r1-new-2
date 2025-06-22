
export interface Testimonial {
  id: string;
  client_name: string;
  profile_photo?: string;
  company_name: string;
  rating: number;
  description: string;
  industry: string;
  results?: string;
  sequence_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface TestimonialStats {
  id: string;
  happy_clients: string;
  average_roi: string;
  success_rate: string;
  client_rating: string;
  updated_at: string;
}

export interface CreateTestimonialRequest {
  client_name: string;
  profile_photo?: string;
  company_name: string;
  rating: number;
  description: string;
  industry: string;
  results?: string;
  sequence_order: number;
  is_active?: boolean;
}

export interface UpdateTestimonialRequest extends Partial<CreateTestimonialRequest> {
  id: string;
}
