
import AdminAuthGuard from '@/components/admin/AdminAuthGuard';

const AdminLogin = () => {
  return (
    <AdminAuthGuard>
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">You are already logged in!</h1>
          <p className="text-gray-600">Redirecting to dashboard...</p>
        </div>
      </div>
    </AdminAuthGuard>
  );
};

export default AdminLogin;
