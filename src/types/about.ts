
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio?: string;
  profile_photo?: string;
  sequence_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface AboutStats {
  id: string;
  happy_clients: string;
  success_rate: string;
  awards_won: string;
  growth_rate: string;
  updated_at: string;
}

export interface Award {
  id: string;
  year: string;
  title: string;
  organization: string;
  icon: string;
  color: string;
  sequence_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface JourneyMilestone {
  id: string;
  year: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  metrics: string;
  highlight: string;
  sequence_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateTeamMemberRequest {
  name: string;
  role: string;
  bio?: string;
  profile_photo?: string;
  sequence_order: number;
  is_active?: boolean;
}

export interface CreateAwardRequest {
  year: string;
  title: string;
  organization: string;
  icon: string;
  color: string;
  sequence_order: number;
  is_active?: boolean;
}

export interface CreateJourneyMilestoneRequest {
  year: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  metrics: string;
  highlight: string;
  sequence_order: number;
  is_active?: boolean;
}
