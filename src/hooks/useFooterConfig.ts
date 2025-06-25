
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface FooterConfig {
  id: string;
  company_name: string;
  company_description: string;
  contact_email: string;
  contact_phone: string;
  contact_address: string;
  copyright_text: string;
  newsletter_title: string;
  newsletter_placeholder: string;
  privacy_policy_link: string;
  terms_of_service_link: string;
  facebook_url: string;
  instagram_url: string;
  linkedin_url: string;
  twitter_url: string;
  youtube_url: string;
  quick_links: Array<{name: string; href: string}>;
  services_list: string[];
  updated_at: string;
}

export const useFooterConfig = () => {
  return useQuery({
    queryKey: ['footer-config'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('footer_config')
        .select('*')
        .single();
      
      if (error) throw error;
      return data as FooterConfig;
    },
  });
};

export const useUpdateFooterConfig = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (config: Partial<FooterConfig>) => {
      const { data, error } = await supabase
        .from('footer_config')
        .update(config)
        .eq('id', config.id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['footer-config'] });
      toast({
        title: "Success",
        description: "Footer configuration updated successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update footer configuration",
        variant: "destructive",
      });
    },
  });
};
