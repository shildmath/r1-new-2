
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Testimonial, TestimonialStats, CreateTestimonialRequest, UpdateTestimonialRequest } from '@/types/testimonial';

export const useTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [stats, setStats] = useState<TestimonialStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTestimonials = async (industry?: string) => {
    try {
      setLoading(true);
      let query = supabase
        .from('testimonials')
        .select('*')
        .eq('is_active', true)
        .order('sequence_order', { ascending: true });

      if (industry && industry !== 'All Industries') {
        query = query.eq('industry', industry);
      }

      const { data, error } = await query;
      if (error) throw error;
      setTestimonials(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('sequence_order', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (err: any) {
      setError(err.message);
      return [];
    }
  };

  const fetchStats = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonial_stats')
        .select('*')
        .single();

      if (error) throw error;
      setStats(data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const createTestimonial = async (testimonial: CreateTestimonialRequest) => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .insert(testimonial)
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  const updateTestimonial = async (testimonial: UpdateTestimonialRequest) => {
    try {
      const { id, ...updates } = testimonial;
      const { data, error } = await supabase
        .from('testimonials')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  const deleteTestimonial = async (id: string) => {
    try {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  const updateStats = async (newStats: Partial<TestimonialStats>) => {
    try {
      const { data, error } = await supabase
        .from('testimonial_stats')
        .update(newStats)
        .eq('id', stats?.id)
        .select()
        .single();

      if (error) throw error;
      setStats(data);
      return { success: true, data };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  const updateSequence = async (testimonialId: string, newSequence: number) => {
    try {
      const { error } = await supabase
        .from('testimonials')
        .update({ sequence_order: newSequence })
        .eq('id', testimonialId);

      if (error) throw error;
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  useEffect(() => {
    fetchTestimonials();
    fetchStats();
  }, []);

  return {
    testimonials,
    stats,
    loading,
    error,
    fetchTestimonials,
    fetchAllTestimonials,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial,
    updateStats,
    updateSequence,
    refetch: () => {
      fetchTestimonials();
      fetchStats();
    }
  };
};
