
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Users, Shield, UserPlus, Edit, Eye, Trash2 } from "lucide-react";
import { useState } from "react";
import { UserProfile } from "@/types/admin";

interface UsersTableProps {
  users: UserProfile[];
  onEdit: (user: UserProfile) => void;
  onDelete: (userId: string) => void;
}

export default function UsersTable({ users, onEdit, onDelete }: UsersTableProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);

  if (!users || users.length === 0) {
    return (
      <div className="text-center py-12">
        <Users size={64} className="mx-auto text-gray-400 mb-6" />
        <h3 className="text-xl font-semibold text-gray-900 mb-3">No Users Found</h3>
        <p className="text-gray-600 mb-6">No users have been created yet. Add your first user to get started.</p>
      </div>
    );
  }

  return (
    <Card className="shadow-xl border border-gray-200">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Users size={20} className="text-blue-600" />
          <span>All Users</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
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
              {users.map(user => (
                <TableRow key={user.id} className="hover:bg-blue-50/50 transition-colors">
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        user.role === 'admin' ? 'bg-purple-100' : 'bg-green-100'
                      }`}>
                        {user.role === 'admin' ? (
                          <Shield className="text-purple-600" size={20} />
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
                      variant={user.role === "admin" ? "default" : "secondary"}
                      className={user.role === "admin"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-green-100 text-green-800"
                      }
                    >
                      {user.role === "admin" ? "Administrator" : "Closer"}
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
                        onClick={() => onEdit(user)}
                        className="bg-yellow-50 border-yellow-200 text-yellow-700 hover:bg-yellow-100"
                      >
                        <Edit size={14} className="mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onDelete(user.id)}
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
      </CardContent>
    </Card>
  );
}
