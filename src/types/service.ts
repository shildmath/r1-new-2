
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  key_features: string[];
  expected_benefits: string[];
  sequence_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateServiceRequest {
  title: string;
  description: string;
  icon: string;
  key_features: string[];
  expected_benefits: string[];
  sequence_order: number;
  is_active?: boolean;
}

export interface UpdateServiceRequest extends Partial<CreateServiceRequest> {
  id: string;
}
