
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface AboutStats {
  id: string;
  success_rate: string;
  happy_clients: string;
  awards_won: string;
  growth_rate: string;
  updated_at: string;
}

export interface JourneyMilestone {
  id: string;
  year: string;
  title: string;
  description: string;
  metrics: string;
  highlight: string;
  icon: string;
  color: string;
  sequence_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Award {
  id: string;
  title: string;
  organization: string;
  year: string;
  icon: string;
  color: string;
  sequence_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

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

export const useAboutStats = () => {
  return useQuery({
    queryKey: ['about-stats'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('about_stats')
        .select('*')
        .single();
      
      if (error) throw error;
      return data as AboutStats;
    },
  });
};

export const useUpdateAboutStats = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (stats: Partial<AboutStats>) => {
      const { data, error } = await supabase
        .from('about_stats')
        .update(stats)
        .eq('id', stats.id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['about-stats'] });
      toast({
        title: "Success",
        description: "About stats updated successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update about stats",
        variant: "destructive",
      });
    },
  });
};

export const useJourneyMilestones = () => {
  return useQuery({
    queryKey: ['journey-milestones'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('journey_milestones')
        .select('*')
        .order('sequence_order');
      
      if (error) throw error;
      return data as JourneyMilestone[];
    },
  });
};

export const useCreateJourneyMilestone = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (milestone: Omit<JourneyMilestone, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('journey_milestones')
        .insert([milestone])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['journey-milestones'] });
      toast({
        title: "Success",
        description: "Journey milestone created successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create journey milestone",
        variant: "destructive",
      });
    },
  });
};

export const useUpdateJourneyMilestone = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (milestone: Partial<JourneyMilestone>) => {
      const { data, error } = await supabase
        .from('journey_milestones')
        .update(milestone)
        .eq('id', milestone.id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['journey-milestones'] });
      toast({
        title: "Success",
        description: "Journey milestone updated successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update journey milestone",
        variant: "destructive",
      });
    },
  });
};

export const useDeleteJourneyMilestone = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('journey_milestones')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['journey-milestones'] });
      toast({
        title: "Success",
        description: "Journey milestone deleted successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete journey milestone",
        variant: "destructive",
      });
    },
  });
};

export const useAwards = () => {
  return useQuery({
    queryKey: ['awards'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('awards')
        .select('*')
        .order('sequence_order');
      
      if (error) throw error;
      return data as Award[];
    },
  });
};

export const useCreateAward = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (award: Omit<Award, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('awards')
        .insert([award])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['awards'] });
      toast({
        title: "Success",
        description: "Award created successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create award",
        variant: "destructive",
      });
    },
  });
};

export const useUpdateAward = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (award: Partial<Award>) => {
      const { data, error } = await supabase
        .from('awards')
        .update(award)
        .eq('id', award.id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['awards'] });
      toast({
        title: "Success",
        description: "Award updated successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update award",
        variant: "destructive",
      });
    },
  });
};

export const useDeleteAward = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('awards')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['awards'] });
      toast({
        title: "Success",
        description: "Award deleted successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete award",
        variant: "destructive",
      });
    },
  });
};

export const useTeamMembers = () => {
  return useQuery({
    queryKey: ['team-members'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .order('sequence_order');
      
      if (error) throw error;
      return data as TeamMember[];
    },
  });
};

export const useCreateTeamMember = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (member: Omit<TeamMember, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('team_members')
        .insert([member])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team-members'] });
      toast({
        title: "Success",
        description: "Team member created successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create team member",
        variant: "destructive",
      });
    },
  });
};

export const useUpdateTeamMember = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (member: Partial<TeamMember>) => {
      const { data, error } = await supabase
        .from('team_members')
        .update(member)
        .eq('id', member.id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team-members'] });
      toast({
        title: "Success",
        description: "Team member updated successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update team member",
        variant: "destructive",
      });
    },
  });
};

export const useDeleteTeamMember = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('team_members')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team-members'] });
      toast({
        title: "Success",
        description: "Team member deleted successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete team member",
        variant: "destructive",
      });
    },
  });
};
