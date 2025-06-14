
// User types for Admin panel

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: 'admin' | 'closer';
  created_at: string;
}
