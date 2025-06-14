
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'closer' | Array<'admin' | 'closer'>;
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { user, userRole, isLoading } = useSupabaseAuth();

  console.log('ProtectedRoute check:', { user: user?.id, userRole, requiredRole, isLoading });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (!user) {
    console.log('No user found, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  let accessDenied = false;
  let allowedRoles: Array<'admin' | 'closer'> = [];
  if (requiredRole) {
    if (Array.isArray(requiredRole)) {
      allowedRoles = requiredRole;
    } else {
      allowedRoles = [requiredRole];
    }
    if (!allowedRoles.includes(userRole as 'admin' | 'closer')) {
      accessDenied = true;
    }
  }

  if (accessDenied) {
    console.log('User role mismatch:', { userRole, requiredRole });
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="text-gray-600">You don't have permission to access this page.</p>
          <p className="text-sm text-gray-500 mt-2">Required role: {Array.isArray(requiredRole) ? requiredRole.join(', ') : requiredRole}</p>
          <p className="text-sm text-gray-500">Your role: {userRole || 'Unknown'}</p>
        </div>
      </div>
    );
  }

  console.log('Access granted to protected route');
  return <>{children}</>;
};

export default ProtectedRoute;
