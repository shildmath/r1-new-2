
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { storage } from '@/utils/localStorage';
import { User, Booking, ContactSubmission, TimeSlot } from '@/types/admin';
import { Users, Calendar, MessageSquare, Clock } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalClosers: 0,
    totalBookings: 0,
    totalContactSubmissions: 0,
    availableTimeSlots: 0,
    bookedTimeSlots: 0
  });

  useEffect(() => {
    const users: User[] = storage.getUsers();
    const bookings: Booking[] = storage.getBookings();
    const contactSubmissions: ContactSubmission[] = storage.getContactSubmissions();
    const timeSlots: TimeSlot[] = storage.getTimeSlots();

    setStats({
      totalUsers: users.length,
      totalClosers: users.filter(user => user.role === 'closer').length,
      totalBookings: bookings.length,
      totalContactSubmissions: contactSubmissions.length,
      availableTimeSlots: timeSlots.filter(slot => !slot.isBooked).length,
      bookedTimeSlots: timeSlots.filter(slot => slot.isBooked).length
    });
  }, []);

  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      color: "bg-blue-500"
    },
    {
      title: "Active Closers",
      value: stats.totalClosers,
      icon: Users,
      color: "bg-green-500"
    },
    {
      title: "Strategy Call Bookings",
      value: stats.totalBookings,
      icon: Calendar,
      color: "bg-purple-500"
    },
    {
      title: "Contact Submissions",
      value: stats.totalContactSubmissions,
      icon: MessageSquare,
      color: "bg-orange-500"
    },
    {
      title: "Available Time Slots",
      value: stats.availableTimeSlots,
      icon: Clock,
      color: "bg-green-600"
    },
    {
      title: "Booked Time Slots",
      value: stats.bookedTimeSlots,
      icon: Clock,
      color: "bg-red-500"
    }
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-primary mb-6">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="agency-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <div className={`w-8 h-8 ${stat.color} rounded-full flex items-center justify-center`}>
                    <stat.icon className="text-white" size={16} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <Card className="agency-card">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <p className="text-sm text-gray-600">System initialized with default data</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <p className="text-sm text-gray-600">Admin panel ready for use</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <p className="text-sm text-gray-600">Booking system active</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="agency-card">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-sm">Manage Users</h4>
                  <p className="text-xs text-gray-600">Add, edit, or remove admin and closer accounts</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-sm">View Bookings</h4>
                  <p className="text-xs text-gray-600">Monitor and manage strategy call appointments</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-sm">Website Content</h4>
                  <p className="text-xs text-gray-600">Update testimonials, services, and page content</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
