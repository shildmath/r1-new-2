
export interface Testimonial {
  id: string;
  client_name: string;
  company_name: string;
  description: string;
  rating: number;
  industry: string;
  profile_photo?: string;
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

export interface TestimonialIndustry {
  id: string;
  name: string;
  sequence_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateTestimonialRequest {
  client_name: string;
  company_name: string;
  description: string;
  rating: number;
  industry: string;
  profile_photo?: string;
  results?: string;
  sequence_order: number;
  is_active?: boolean;
}

export interface UpdateTestimonialRequest extends CreateTestimonialRequest {
  id: string;
}

export interface CreateIndustryRequest {
  name: string;
  sequence_order: number;
  is_active?: boolean;
}

export interface UpdateIndustryRequest extends CreateIndustryRequest {
  id: string;
}
