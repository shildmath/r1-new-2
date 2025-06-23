
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { TeamMember, AboutStats, Award, JourneyMilestone, CreateTeamMemberRequest, CreateAwardRequest, CreateJourneyMilestoneRequest } from '@/types/about';

// Team Members
export const useTeamMembers = () => {
  return useQuery({
    queryKey: ['team-members'],
    queryFn: async (): Promise<TeamMember[]> => {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .eq('is_active', true)
        .order('sequence_order', { ascending: true });
      
      if (error) throw error;
      return data || [];
    },
  });
};

export const useCreateTeamMember = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (teamMember: CreateTeamMemberRequest): Promise<TeamMember> => {
      const { data, error } = await supabase
        .from('team_members')
        .insert(teamMember)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team-members'] });
    },
  });
};

export const useUpdateTeamMember = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<TeamMember> & { id: string }): Promise<TeamMember> => {
      const { data, error } = await supabase
        .from('team_members')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team-members'] });
    },
  });
};

export const useDeleteTeamMember = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      const { error } = await supabase
        .from('team_members')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team-members'] });
    },
  });
};

// About Stats
export const useAboutStats = () => {
  return useQuery({
    queryKey: ['about-stats'],
    queryFn: async (): Promise<AboutStats> => {
      const { data, error } = await supabase
        .from('about_stats')
        .select('*')
        .single();
      
      if (error) throw error;
      return data;
    },
  });
};

export const useUpdateAboutStats = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (stats: Partial<AboutStats>): Promise<AboutStats> => {
      const { data, error } = await supabase
        .from('about_stats')
        .update(stats)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['about-stats'] });
    },
  });
};

// Awards
export const useAwards = () => {
  return useQuery({
    queryKey: ['awards'],
    queryFn: async (): Promise<Award[]> => {
      const { data, error } = await supabase
        .from('awards')
        .select('*')
        .eq('is_active', true)
        .order('sequence_order', { ascending: true });
      
      if (error) throw error;
      return data || [];
    },
  });
};

export const useCreateAward = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (award: CreateAwardRequest): Promise<Award> => {
      const { data, error } = await supabase
        .from('awards')
        .insert(award)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['awards'] });
    },
  });
};

export const useUpdateAward = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Award> & { id: string }): Promise<Award> => {
      const { data, error } = await supabase
        .from('awards')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['awards'] });
    },
  });
};

export const useDeleteAward = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      const { error } = await supabase
        .from('awards')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['awards'] });
    },
  });
};

// Journey Milestones
export const useJourneyMilestones = () => {
  return useQuery({
    queryKey: ['journey-milestones'],
    queryFn: async (): Promise<JourneyMilestone[]> => {
      const { data, error } = await supabase
        .from('journey_milestones')
        .select('*')
        .eq('is_active', true)
        .order('sequence_order', { ascending: true });
      
      if (error) throw error;
      return data || [];
    },
  });
};

export const useCreateJourneyMilestone = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (milestone: CreateJourneyMilestoneRequest): Promise<JourneyMilestone> => {
      const { data, error } = await supabase
        .from('journey_milestones')
        .insert(milestone)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['journey-milestones'] });
    },
  });
};

export const useUpdateJourneyMilestone = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<JourneyMilestone> & { id: string }): Promise<JourneyMilestone> => {
      const { data, error } = await supabase
        .from('journey_milestones')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['journey-milestones'] });
    },
  });
};

export const useDeleteJourneyMilestone = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      const { error } = await supabase
        .from('journey_milestones')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['journey-milestones'] });
    },
  });
};
