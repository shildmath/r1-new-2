
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface ContactPageConfig {
  id: string;
  email_us_title: string;
  email_us_value: string;
  email_us_description: string;
  call_us_title: string;
  call_us_value: string;
  call_us_description: string;
  visit_office_title: string;
  visit_office_value: string;
  visit_office_description: string;
  business_hours_title: string;
  business_hours_value: string;
  business_hours_description: string;
  whatsapp_title: string;
  whatsapp_value: string;
  whatsapp_description: string;
  contact_directly_title: string;
  contact_directly_description: string;
  
  // Form settings
  form_title?: string;
  form_subtitle?: string;
  form_button_text?: string;
  form_success_message?: string;
  
  // Page settings
  page_title?: string;
  page_subtitle?: string;
  hero_background_color?: string;
  
  // CTA Section
  cta_title?: string;
  cta_subtitle?: string;
  cta_primary_button?: string;
  cta_secondary_button?: string;
  
  // Contact method colors
  email_color?: string;
  phone_color?: string;
  office_color?: string;
  hours_color?: string;
  whatsapp_color?: string;
  
  updated_at: string;
}

export const useContactPageConfig = () => {
  return useQuery({
    queryKey: ['contact-page-config'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('contact_page_config')
        .select('*')
        .single();
      
      if (error) throw error;
      return data as ContactPageConfig;
    },
  });
};

export const useUpdateContactPageConfig = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (config: Partial<ContactPageConfig>) => {
      const { data, error } = await supabase
        .from('contact_page_config')
        .update(config)
        .eq('id', config.id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact-page-config'] });
      toast({
        title: "Success",
        description: "Contact page configuration updated successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update contact page configuration",
        variant: "destructive",
      });
    },
  });
};
