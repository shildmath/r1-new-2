
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const AdminLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthAndRedirect = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        // User is already logged in, check if they're admin
        try {
          const { data, error } = await supabase
            .from('admin_users')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (data && !error) {
            // User is admin, redirect to dashboard
            navigate('/admin/dashboard', { replace: true });
          }
        } catch (error) {
          console.error('Admin check failed:', error);
        }
      }
    };

    checkAuthAndRedirect();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Redirecting...</h1>
        <p className="text-gray-600">Please wait while we redirect you to the login page.</p>
      </div>
    </div>
  );
};

export default AdminLogin;
