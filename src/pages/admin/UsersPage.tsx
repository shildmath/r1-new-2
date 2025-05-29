
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { storage } from '@/utils/localStorage';
import { User } from '@/types/admin';
import { Plus, Edit, Trash2, UserPlus } from 'lucide-react';

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>(storage.getUsers());
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'closer' as 'admin' | 'closer'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing) {
      // Update existing user
      const updatedUsers = users.map(user => 
        user.id === isEditing 
          ? { ...user, ...formData }
          : user
      );
      setUsers(updatedUsers);
      storage.setUsers(updatedUsers);
      setIsEditing(null);
      toast({
        title: "User Updated",
        description: "User has been updated successfully.",
      });
    } else {
      // Add new user
      const newUser: User = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString()
      };
      const updatedUsers = [...users, newUser];
      setUsers(updatedUsers);
      storage.setUsers(updatedUsers);
      setShowAddForm(false);
      toast({
        title: "User Added",
        description: "New user has been added successfully.",
      });
    }

    setFormData({ name: '', email: '', role: 'closer' });
  };

  const handleEdit = (user: User) => {
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role
    });
    setIsEditing(user.id);
    setShowAddForm(true);
  };

  const handleDelete = (userId: string) => {
    const updatedUsers = users.filter(user => user.id !== userId);
    setUsers(updatedUsers);
    storage.setUsers(updatedUsers);
    toast({
      title: "User Deleted",
      description: "User has been deleted successfully.",
    });
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', role: 'closer' });
    setIsEditing(null);
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-primary">Users Management</h1>
          <Button 
            onClick={() => setShowAddForm(true)}
            className="agency-btn"
          >
            <Plus size={16} />
            Add User
          </Button>
        </div>

        {/* Add/Edit Form */}
        {showAddForm && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>
                {isEditing ? 'Edit User' : 'Add New User'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-primary mb-2 block">
                      Name
                    </label>
                    <Input
                      placeholder="User name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-primary mb-2 block">
                      Email
                    </label>
                    <Input
                      type="email"
                      placeholder="user@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-primary mb-2 block">
                    Role
                  </label>
                  <Select value={formData.role} onValueChange={(value: 'admin' | 'closer') => setFormData({ ...formData, role: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="closer">Closer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex space-x-4">
                  <Button type="submit" className="agency-btn">
                    {isEditing ? 'Update User' : 'Add User'}
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Users List */}
        <Card>
          <CardHeader>
            <CardTitle>All Users</CardTitle>
          </CardHeader>
          <CardContent>
            {users.length > 0 ? (
              <div className="space-y-4">
                {users.map((user) => (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center">
                        <UserPlus className="text-white" size={20} />
                      </div>
                      <div>
                        <h3 className="font-medium text-primary">{user.name}</h3>
                        <p className="text-sm text-gray-600">{user.email}</p>
                        <p className="text-xs text-gray-500">
                          Created: {new Date(user.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                        {user.role}
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(user)}
                      >
                        <Edit size={14} />
                      </Button>
                      {user.id !== '1' && ( // Don't allow deleting the main admin
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(user.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 size={14} />
                        </Button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No users found</p>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default UsersPage;
