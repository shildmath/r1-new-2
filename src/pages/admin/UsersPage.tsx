
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';
import { supabase } from '@/integrations/supabase/client';
import { Plus, Edit, Trash2, UserPlus, Users, Shield, Eye } from 'lucide-react';

interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: 'admin' | 'closer';
  created_at: string;
}

const UsersPage = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingUser, setEditingUser] = useState<UserProfile | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const { toast } = useToast();
  const { signup } = useSupabaseAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    role: 'closer' as 'admin' | 'closer'
  });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setIsLoading(true);
      
      // Get users with their roles from user_roles and profiles
      const { data, error } = await supabase
        .from('user_roles')
        .select(`
          user_id,
          role,
          profiles!user_roles_user_id_fkey (
            id,
            email,
            full_name,
            created_at
          )
        `);

      if (error) throw error;

      const formattedUsers = data?.map(item => ({
        id: item.user_id,
        email: (item.profiles as any)?.email || '',
        full_name: (item.profiles as any)?.full_name || 'Unknown',
        role: item.role as 'admin' | 'closer',
        created_at: (item.profiles as any)?.created_at || ''
      })) || [];

      setUsers(formattedUsers);
      console.log('Loaded users:', formattedUsers);
    } catch (error) {
      console.error('Error loading users:', error);
      toast({
        title: "Error",
        description: "Failed to load users. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (editingUser) {
        // Update existing user role
        const { error: roleError } = await supabase
          .from('user_roles')
          .update({ role: formData.role })
          .eq('user_id', editingUser.id);

        if (roleError) throw roleError;

        // Update profile
        const { error: profileError } = await supabase
          .from('profiles')
          .update({ 
            full_name: formData.fullName,
            email: formData.email 
          })
          .eq('id', editingUser.id);

        if (profileError) throw profileError;

        toast({
          title: "User Updated",
          description: "User has been updated successfully.",
        });
      } else {
        // Create new user
        const { error } = await signup(
          formData.email,
          formData.password,
          formData.fullName,
          formData.role
        );

        if (error) throw error;

        toast({
          title: "User Added",
          description: "New user has been created successfully.",
        });
      }

      await loadUsers();
      resetForm();
    } catch (error: any) {
      console.error('Error saving user:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to save user. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (user: UserProfile) => {
    setFormData({
      email: user.email,
      password: '',
      fullName: user.full_name,
      role: user.role
    });
    setEditingUser(user);
    setShowAddForm(true);
  };

  const handleDelete = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return;

    try {
      // Delete user role first
      const { error: roleError } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', userId);

      if (roleError) throw roleError;

      // Note: We can't delete from auth.users via the client
      // The user will still exist in auth but won't have access to the app
      
      await loadUsers();
      toast({
        title: "User Deleted",
        description: "User has been removed from the system.",
      });
    } catch (error: any) {
      console.error('Error deleting user:', error);
      toast({
        title: "Error",
        description: "Failed to delete user. Please try again.",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({ email: '', password: '', fullName: '', role: 'closer' });
    setEditingUser(null);
    setShowAddForm(false);
  };

  const totalUsers = users.length;
  const adminUsers = users.filter(u => u.role === 'admin').length;
  const closerUsers = users.filter(u => u.role === 'closer').length;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Users Management
            </h1>
            <p className="text-gray-600 mt-2">Manage system users and their roles</p>
          </div>
          
          <Button 
            onClick={() => setShowAddForm(true)}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg"
          >
            <Plus size={16} className="mr-2" />
            Add User
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Total Users</p>
                  <p className="text-3xl font-bold">{totalUsers}</p>
                  <p className="text-blue-200 text-xs mt-1">All system users</p>
                </div>
                <div className="w-12 h-12 bg-blue-400 rounded-xl flex items-center justify-center">
                  <Users className="text-white" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">Administrators</p>
                  <p className="text-3xl font-bold">{adminUsers}</p>
                  <p className="text-purple-200 text-xs mt-1">Full access</p>
                </div>
                <div className="w-12 h-12 bg-purple-400 rounded-xl flex items-center justify-center">
                  <Shield className="text-white" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Closers</p>
                  <p className="text-3xl font-bold">{closerUsers}</p>
                  <p className="text-green-200 text-xs mt-1">Sales team</p>
                </div>
                <div className="w-12 h-12 bg-green-400 rounded-xl flex items-center justify-center">
                  <UserPlus className="text-white" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add/Edit Form */}
        {showAddForm && (
          <Card className="mb-6 shadow-lg border border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <UserPlus size={20} className="text-blue-600" />
                <span>{editingUser ? 'Edit User' : 'Add New User'}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Full Name *
                    </label>
                    <Input
                      placeholder="Enter full name"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      required
                      className="border-gray-300 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      placeholder="user@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      disabled={!!editingUser}
                      className="border-gray-300 focus:border-blue-500"
                    />
                  </div>
                </div>

                {!editingUser && (
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Password *
                    </label>
                    <Input
                      type="password"
                      placeholder="Enter password (min 6 characters)"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                      minLength={6}
                      className="border-gray-300 focus:border-blue-500"
                    />
                  </div>
                )}

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Role *
                  </label>
                  <Select value={formData.role} onValueChange={(value: 'admin' | 'closer') => setFormData({ ...formData, role: value })}>
                    <SelectTrigger className="border-gray-300 focus:border-blue-500">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Administrator</SelectItem>
                      <SelectItem value="closer">Closer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex space-x-4">
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
                  >
                    {isSubmitting ? 'Saving...' : editingUser ? 'Update User' : 'Create User'}
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Users Table */}
        <Card className="shadow-xl border border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users size={20} className="text-blue-600" />
              <span>All Users</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {users.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gradient-to-r from-gray-50 to-gray-100">
                      <TableHead className="font-semibold text-gray-700">User</TableHead>
                      <TableHead className="font-semibold text-gray-700">Email</TableHead>
                      <TableHead className="font-semibold text-gray-700">Role</TableHead>
                      <TableHead className="font-semibold text-gray-700">Created</TableHead>
                      <TableHead className="font-semibold text-gray-700">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id} className="hover:bg-blue-50/50 transition-colors">
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              user.role === 'admin' ? 'bg-purple-100' : 'bg-green-100'
                            }`}>
                              {user.role === 'admin' ? (
                                <Shield className={`${user.role === 'admin' ? 'text-purple-600' : 'text-green-600'}`} size={20} />
                              ) : (
                                <UserPlus className="text-green-600" size={20} />
                              )}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-800">{user.full_name}</p>
                              <p className="text-sm text-gray-500">ID: {user.id.slice(0, 8)}...</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <p className="text-sm font-medium">{user.email}</p>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={user.role === 'admin' ? 'default' : 'secondary'}
                            className={user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'}
                          >
                            {user.role === 'admin' ? 'Administrator' : 'Closer'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <p className="text-sm font-medium">{new Date(user.created_at).toLocaleDateString()}</p>
                          <p className="text-xs text-gray-500">{new Date(user.created_at).toLocaleTimeString()}</p>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Dialog open={showDetails && selectedUser?.id === user.id} onOpenChange={setShowDetails}>
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setSelectedUser(user)}
                                  className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
                                >
                                  <Eye size={14} className="mr-1" />
                                  View
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle className="text-xl text-blue-800">
                                    User Details
                                  </DialogTitle>
                                </DialogHeader>
                                {selectedUser && (
                                  <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      <div className="p-4 bg-gray-50 rounded-lg">
                                        <label className="text-sm font-medium text-gray-600">Full Name</label>
                                        <p className="font-medium text-lg">{selectedUser.full_name}</p>
                                      </div>
                                      <div className="p-4 bg-gray-50 rounded-lg">
                                        <label className="text-sm font-medium text-gray-600">Email</label>
                                        <p className="font-medium">{selectedUser.email}</p>
                                      </div>
                                      <div className="p-4 bg-gray-50 rounded-lg">
                                        <label className="text-sm font-medium text-gray-600">Role</label>
                                        <Badge 
                                          className={`mt-1 ${selectedUser.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'}`}
                                        >
                                          {selectedUser.role === 'admin' ? 'Administrator' : 'Closer'}
                                        </Badge>
                                      </div>
                                      <div className="p-4 bg-gray-50 rounded-lg">
                                        <label className="text-sm font-medium text-gray-600">User ID</label>
                                        <p className="font-mono text-sm">{selectedUser.id}</p>
                                      </div>
                                      <div className="p-4 bg-gray-50 rounded-lg">
                                        <label className="text-sm font-medium text-gray-600">Created</label>
                                        <p className="font-medium">{new Date(selectedUser.created_at).toLocaleString()}</p>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </DialogContent>
                            </Dialog>
                            
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(user)}
                              className="bg-yellow-50 border-yellow-200 text-yellow-700 hover:bg-yellow-100"
                            >
                              <Edit size={14} className="mr-1" />
                              Edit
                            </Button>
                            
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDelete(user.id)}
                              className="bg-red-50 border-red-200 text-red-700 hover:bg-red-100"
                            >
                              <Trash2 size={14} className="mr-1" />
                              Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-12">
                <Users size={64} className="mx-auto text-gray-400 mb-6" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">No Users Found</h3>
                <p className="text-gray-600 mb-6">No users have been created yet. Add your first user to get started.</p>
                <Button onClick={() => setShowAddForm(true)} className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white">
                  <Plus size={16} className="mr-2" />
                  Add First User
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default UsersPage;
