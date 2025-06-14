
import { Card, CardContent } from "@/components/ui/card";
import { Users, Shield, UserPlus } from "lucide-react";
import { UserProfile } from "@/types/admin";

export default function UserStats({ users }: { users: UserProfile[] }) {
  const totalUsers = users.length;
  const adminUsers = users.filter(u => u.role === "admin").length;
  const closerUsers = users.filter(u => u.role === "closer").length;

  return (
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
  );
}
