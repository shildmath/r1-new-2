
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { storage } from '@/utils/localStorage';
import { 
  Users, 
  MessageSquare, 
  Calendar, 
  Star,
  TrendingUp,
  Clock
} from 'lucide-react';

const AdminDashboard = () => {
  const users = storage.getUsers();
  const contactSubmissions = storage.getContactSubmissions();
  const bookings = storage.getBookings();
  const testimonials = storage.getTestimonials();
  const timeSlots = storage.getTimeSlots();

  const stats = [
    {
      title: 'Total Users',
      value: users.length,
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Contact Submissions',
      value: contactSubmissions.length,
      icon: MessageSquare,
      color: 'bg-green-500'
    },
    {
      title: 'Bookings',
      value: bookings.length,
      icon: Calendar,
      color: 'bg-purple-500'
    },
    {
      title: 'Testimonials',
      value: testimonials.length,
      icon: Star,
      color: 'bg-yellow-500'
    },
    {
      title: 'Available Time Slots',
      value: timeSlots.filter(slot => !slot.isBooked).length,
      icon: Clock,
      color: 'bg-indigo-500'
    },
    {
      title: 'Booked Time Slots',
      value: timeSlots.filter(slot => slot.isBooked).length,
      icon: TrendingUp,
      color: 'bg-red-500'
    }
  ];

  const recentBookings = bookings.slice(-5).reverse();
  const recentSubmissions = contactSubmissions.slice(-5).reverse();

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-primary mb-6">Dashboard</h1>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}>
                      <stat.icon className="text-white" size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-primary">{stat.value}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Bookings */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              {recentBookings.length > 0 ? (
                <div className="space-y-4">
                  {recentBookings.map((booking) => (
                    <div key={booking.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <div>
                        <p className="font-medium">{booking.firstName} {booking.lastName}</p>
                        <p className="text-sm text-gray-600">{booking.email}</p>
                        <p className="text-xs text-gray-500">{booking.preferredDate} at {booking.preferredTime}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs ${
                        booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {booking.status}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No bookings yet</p>
              )}
            </CardContent>
          </Card>

          {/* Recent Contact Submissions */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Contact Submissions</CardTitle>
            </CardHeader>
            <CardContent>
              {recentSubmissions.length > 0 ? (
                <div className="space-y-4">
                  {recentSubmissions.map((submission) => (
                    <div key={submission.id} className="p-3 bg-gray-50 rounded">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{submission.name}</p>
                          <p className="text-sm text-gray-600">{submission.email}</p>
                          <p className="text-xs text-gray-500 mt-1">{submission.message.substring(0, 100)}...</p>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs ${
                          submission.source === 'home' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                        }`}>
                          {submission.source}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No submissions yet</p>
              )}
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
