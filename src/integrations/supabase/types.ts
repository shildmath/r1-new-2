export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      about_stats: {
        Row: {
          awards_won: string
          growth_rate: string
          happy_clients: string
          id: string
          success_rate: string
          updated_at: string
        }
        Insert: {
          awards_won?: string
          growth_rate?: string
          happy_clients?: string
          id?: string
          success_rate?: string
          updated_at?: string
        }
        Update: {
          awards_won?: string
          growth_rate?: string
          happy_clients?: string
          id?: string
          success_rate?: string
          updated_at?: string
        }
        Relationships: []
      }
      awards: {
        Row: {
          color: string
          created_at: string
          icon: string
          id: string
          is_active: boolean
          organization: string
          sequence_order: number
          title: string
          updated_at: string
          year: string
        }
        Insert: {
          color?: string
          created_at?: string
          icon?: string
          id?: string
          is_active?: boolean
          organization: string
          sequence_order?: number
          title: string
          updated_at?: string
          year: string
        }
        Update: {
          color?: string
          created_at?: string
          icon?: string
          id?: string
          is_active?: boolean
          organization?: string
          sequence_order?: number
          title?: string
          updated_at?: string
          year?: string
        }
        Relationships: []
      }
      bookings: {
        Row: {
          ad_spend: string | null
          additional_info: string | null
          call_status: string | null
          client_id: string | null
          closed_date: string | null
          contract_link: string | null
          contract_sent: boolean | null
          contract_sent_date: string | null
          country_area: string | null
          created_at: string
          deal_status: string | null
          email: string
          first_name: string
          follow_up_call_date: string | null
          id: string
          invoice_link: string | null
          invoice_sent: boolean | null
          invoice_sent_date: string | null
          last_name: string
          offer_made: string | null
          phone: string
          recording_link: string | null
          reschedule_date: string | null
          slot_id: string
          zip_code: string | null
        }
        Insert: {
          ad_spend?: string | null
          additional_info?: string | null
          call_status?: string | null
          client_id?: string | null
          closed_date?: string | null
          contract_link?: string | null
          contract_sent?: boolean | null
          contract_sent_date?: string | null
          country_area?: string | null
          created_at?: string
          deal_status?: string | null
          email: string
          first_name: string
          follow_up_call_date?: string | null
          id?: string
          invoice_link?: string | null
          invoice_sent?: boolean | null
          invoice_sent_date?: string | null
          last_name: string
          offer_made?: string | null
          phone: string
          recording_link?: string | null
          reschedule_date?: string | null
          slot_id: string
          zip_code?: string | null
        }
        Update: {
          ad_spend?: string | null
          additional_info?: string | null
          call_status?: string | null
          client_id?: string | null
          closed_date?: string | null
          contract_link?: string | null
          contract_sent?: boolean | null
          contract_sent_date?: string | null
          country_area?: string | null
          created_at?: string
          deal_status?: string | null
          email?: string
          first_name?: string
          follow_up_call_date?: string | null
          id?: string
          invoice_link?: string | null
          invoice_sent?: boolean | null
          invoice_sent_date?: string | null
          last_name?: string
          offer_made?: string | null
          phone?: string
          recording_link?: string | null
          reschedule_date?: string | null
          slot_id?: string
          zip_code?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_slot_id_fkey"
            columns: ["slot_id"]
            isOneToOne: false
            referencedRelation: "time_slots"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_page_config: {
        Row: {
          business_hours_description: string
          business_hours_title: string
          business_hours_value: string
          call_us_description: string
          call_us_title: string
          call_us_value: string
          contact_directly_description: string
          contact_directly_title: string
          created_at: string | null
          email_us_description: string
          email_us_title: string
          email_us_value: string
          id: string
          updated_at: string
          visit_office_description: string
          visit_office_title: string
          visit_office_value: string
          whatsapp_description: string
          whatsapp_title: string
          whatsapp_value: string
        }
        Insert: {
          business_hours_description?: string
          business_hours_title?: string
          business_hours_value?: string
          call_us_description?: string
          call_us_title?: string
          call_us_value?: string
          contact_directly_description?: string
          contact_directly_title?: string
          created_at?: string | null
          email_us_description?: string
          email_us_title?: string
          email_us_value?: string
          id?: string
          updated_at?: string
          visit_office_description?: string
          visit_office_title?: string
          visit_office_value?: string
          whatsapp_description?: string
          whatsapp_title?: string
          whatsapp_value?: string
        }
        Update: {
          business_hours_description?: string
          business_hours_title?: string
          business_hours_value?: string
          call_us_description?: string
          call_us_title?: string
          call_us_value?: string
          contact_directly_description?: string
          contact_directly_title?: string
          created_at?: string | null
          email_us_description?: string
          email_us_title?: string
          email_us_value?: string
          id?: string
          updated_at?: string
          visit_office_description?: string
          visit_office_title?: string
          visit_office_value?: string
          whatsapp_description?: string
          whatsapp_title?: string
          whatsapp_value?: string
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          phone: string | null
          source: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          phone?: string | null
          source: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string | null
          source?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      footer_config: {
        Row: {
          company_description: string
          company_name: string
          contact_address: string
          contact_email: string
          contact_phone: string
          copyright_text: string
          created_at: string | null
          facebook_url: string
          id: string
          instagram_url: string
          linkedin_url: string
          newsletter_placeholder: string
          newsletter_title: string
          privacy_policy_link: string
          quick_links: Json
          services_list: Json
          terms_of_service_link: string
          twitter_url: string
          updated_at: string
          youtube_url: string
        }
        Insert: {
          company_description?: string
          company_name?: string
          contact_address?: string
          contact_email?: string
          contact_phone?: string
          copyright_text?: string
          created_at?: string | null
          facebook_url?: string
          id?: string
          instagram_url?: string
          linkedin_url?: string
          newsletter_placeholder?: string
          newsletter_title?: string
          privacy_policy_link?: string
          quick_links?: Json
          services_list?: Json
          terms_of_service_link?: string
          twitter_url?: string
          updated_at?: string
          youtube_url?: string
        }
        Update: {
          company_description?: string
          company_name?: string
          contact_address?: string
          contact_email?: string
          contact_phone?: string
          copyright_text?: string
          created_at?: string | null
          facebook_url?: string
          id?: string
          instagram_url?: string
          linkedin_url?: string
          newsletter_placeholder?: string
          newsletter_title?: string
          privacy_policy_link?: string
          quick_links?: Json
          services_list?: Json
          terms_of_service_link?: string
          twitter_url?: string
          updated_at?: string
          youtube_url?: string
        }
        Relationships: []
      }
      home_page_config: {
        Row: {
          created_at: string
          cta_background_image: string | null
          cta_is_visible: boolean
          cta_primary_text: string
          cta_secondary_text: string
          cta_subtitle: string
          cta_title: string
          features_data: Json
          features_is_visible: boolean
          features_title: string
          hero_background_image: string | null
          hero_cta_secondary_text: string
          hero_cta_text: string
          hero_description: string
          hero_rotating_images: Json | null
          hero_subtitle: string
          hero_title: string
          hero_video_url: string | null
          id: string
          services_display_limit: number
          services_is_visible: boolean
          services_selected_ids: Json | null
          services_subtitle: string
          services_title: string
          stats_data: Json
          stats_is_visible: boolean
          stats_subtitle: string
          stats_title: string
          testimonials_display_limit: number
          testimonials_is_visible: boolean
          testimonials_selected_ids: Json | null
          testimonials_selected_industry: string | null
          testimonials_subtitle: string
          testimonials_title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          cta_background_image?: string | null
          cta_is_visible?: boolean
          cta_primary_text?: string
          cta_secondary_text?: string
          cta_subtitle?: string
          cta_title?: string
          features_data?: Json
          features_is_visible?: boolean
          features_title?: string
          hero_background_image?: string | null
          hero_cta_secondary_text?: string
          hero_cta_text?: string
          hero_description?: string
          hero_rotating_images?: Json | null
          hero_subtitle?: string
          hero_title?: string
          hero_video_url?: string | null
          id?: string
          services_display_limit?: number
          services_is_visible?: boolean
          services_selected_ids?: Json | null
          services_subtitle?: string
          services_title?: string
          stats_data?: Json
          stats_is_visible?: boolean
          stats_subtitle?: string
          stats_title?: string
          testimonials_display_limit?: number
          testimonials_is_visible?: boolean
          testimonials_selected_ids?: Json | null
          testimonials_selected_industry?: string | null
          testimonials_subtitle?: string
          testimonials_title?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          cta_background_image?: string | null
          cta_is_visible?: boolean
          cta_primary_text?: string
          cta_secondary_text?: string
          cta_subtitle?: string
          cta_title?: string
          features_data?: Json
          features_is_visible?: boolean
          features_title?: string
          hero_background_image?: string | null
          hero_cta_secondary_text?: string
          hero_cta_text?: string
          hero_description?: string
          hero_rotating_images?: Json | null
          hero_subtitle?: string
          hero_title?: string
          hero_video_url?: string | null
          id?: string
          services_display_limit?: number
          services_is_visible?: boolean
          services_selected_ids?: Json | null
          services_subtitle?: string
          services_title?: string
          stats_data?: Json
          stats_is_visible?: boolean
          stats_subtitle?: string
          stats_title?: string
          testimonials_display_limit?: number
          testimonials_is_visible?: boolean
          testimonials_selected_ids?: Json | null
          testimonials_selected_industry?: string | null
          testimonials_subtitle?: string
          testimonials_title?: string
          updated_at?: string
        }
        Relationships: []
      }
      journey_milestones: {
        Row: {
          color: string
          created_at: string
          description: string
          highlight: string
          icon: string
          id: string
          is_active: boolean
          metrics: string
          sequence_order: number
          title: string
          updated_at: string
          year: string
        }
        Insert: {
          color?: string
          created_at?: string
          description: string
          highlight: string
          icon?: string
          id?: string
          is_active?: boolean
          metrics: string
          sequence_order?: number
          title: string
          updated_at?: string
          year: string
        }
        Update: {
          color?: string
          created_at?: string
          description?: string
          highlight?: string
          icon?: string
          id?: string
          is_active?: boolean
          metrics?: string
          sequence_order?: number
          title?: string
          updated_at?: string
          year?: string
        }
        Relationships: []
      }
      navbar_config: {
        Row: {
          brand: string
          created_at: string
          id: string
          nav_items: Json
          updated_at: string
        }
        Insert: {
          brand?: string
          created_at?: string
          id?: string
          nav_items?: Json
          updated_at?: string
        }
        Update: {
          brand?: string
          created_at?: string
          id?: string
          nav_items?: Json
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string
          full_name: string | null
          id: string
        }
        Insert: {
          created_at?: string | null
          email: string
          full_name?: string | null
          id: string
        }
        Update: {
          created_at?: string | null
          email?: string
          full_name?: string | null
          id?: string
        }
        Relationships: []
      }
      sales_representatives: {
        Row: {
          bio: string | null
          calendly_link: string
          created_at: string
          id: string
          is_active: boolean
          name: string
          profile_photo: string | null
          sequence_order: number
          title: string
          updated_at: string
        }
        Insert: {
          bio?: string | null
          calendly_link: string
          created_at?: string
          id?: string
          is_active?: boolean
          name: string
          profile_photo?: string | null
          sequence_order?: number
          title?: string
          updated_at?: string
        }
        Update: {
          bio?: string | null
          calendly_link?: string
          created_at?: string
          id?: string
          is_active?: boolean
          name?: string
          profile_photo?: string | null
          sequence_order?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      services: {
        Row: {
          created_at: string
          description: string
          expected_benefits: string[]
          icon: string
          id: string
          is_active: boolean
          key_features: string[]
          sequence_order: number
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          expected_benefits?: string[]
          icon: string
          id?: string
          is_active?: boolean
          key_features?: string[]
          sequence_order?: number
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          expected_benefits?: string[]
          icon?: string
          id?: string
          is_active?: boolean
          key_features?: string[]
          sequence_order?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      team_members: {
        Row: {
          bio: string | null
          created_at: string
          id: string
          is_active: boolean
          name: string
          profile_photo: string | null
          role: string
          sequence_order: number
          updated_at: string
        }
        Insert: {
          bio?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          name: string
          profile_photo?: string | null
          role: string
          sequence_order?: number
          updated_at?: string
        }
        Update: {
          bio?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          name?: string
          profile_photo?: string | null
          role?: string
          sequence_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      testimonial_industries: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          name: string
          sequence_order: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          name: string
          sequence_order?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          name?: string
          sequence_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      testimonial_stats: {
        Row: {
          average_roi: string
          client_rating: string
          happy_clients: string
          id: string
          success_rate: string
          updated_at: string
        }
        Insert: {
          average_roi?: string
          client_rating?: string
          happy_clients?: string
          id?: string
          success_rate?: string
          updated_at?: string
        }
        Update: {
          average_roi?: string
          client_rating?: string
          happy_clients?: string
          id?: string
          success_rate?: string
          updated_at?: string
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          client_name: string
          company_name: string
          created_at: string
          description: string
          id: string
          industry: string
          is_active: boolean
          profile_photo: string | null
          rating: number
          results: string | null
          sequence_order: number
          updated_at: string
        }
        Insert: {
          client_name: string
          company_name: string
          created_at?: string
          description: string
          id?: string
          industry: string
          is_active?: boolean
          profile_photo?: string | null
          rating?: number
          results?: string | null
          sequence_order?: number
          updated_at?: string
        }
        Update: {
          client_name?: string
          company_name?: string
          created_at?: string
          description?: string
          id?: string
          industry?: string
          is_active?: boolean
          profile_photo?: string | null
          rating?: number
          results?: string | null
          sequence_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      time_slots: {
        Row: {
          closer_id: string
          created_at: string
          date: string
          id: string
          is_available: boolean
          time: string
          time_zone: string
        }
        Insert: {
          closer_id: string
          created_at?: string
          date: string
          id?: string
          is_available?: boolean
          time: string
          time_zone?: string
        }
        Update: {
          closer_id?: string
          created_at?: string
          date?: string
          id?: string
          is_available?: boolean
          time?: string
          time_zone?: string
        }
        Relationships: [
          {
            foreignKeyName: "time_slots_closer_id_fkey"
            columns: ["closer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_user_id_fkey_profiles"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "closer"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "closer"],
    },
  },
} as const
