
import AdminAuthGuard from './AdminAuthGuard';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  return <AdminAuthGuard>{children}</AdminAuthGuard>;
};

export default ProtectedRoute;
