
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { storage } from '@/utils/localStorage';
import { TimeSlot, User } from '@/types/admin';
import { Calendar, Clock, Filter, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const TimeSlotsPage = () => {
  const [timeSlots] = useState<TimeSlot[]>(storage.getTimeSlots());
  const [users] = useState<User[]>(storage.getUsers());
  const [filters, setFilters] = useState({
    closerId: 'all',
    status: 'all',
    dateFrom: '',
    dateTo: '',
    timeFrom: '',
    timeTo: ''
  });
  const { toast } = useToast();

  const clearFilters = () => {
    setFilters({
      closerId: 'all',
      status: 'all',
      dateFrom: '',
      dateTo: '',
      timeFrom: '',
      timeTo: ''
    });
    toast({
      title: "Filters Cleared",
      description: "All filters have been reset.",
    });
  };

  const filteredTimeSlots = timeSlots.filter(slot => {
    if (filters.closerId !== 'all' && slot.closerId !== filters.closerId) return false;
    if (filters.status !== 'all') {
      if (filters.status === 'available' && slot.isBooked) return false;
      if (filters.status === 'booked' && !slot.isBooked) return false;
    }
    if (filters.dateFrom && slot.date < filters.dateFrom) return false;
    if (filters.dateTo && slot.date > filters.dateTo) return false;
    if (filters.timeFrom && slot.time < filters.timeFrom) return false;
    if (filters.timeTo && slot.time > filters.timeTo) return false;
    return true;
  });

  const getCloserName = (closerId: string) => {
    const closer = users.find(user => user.id === closerId);
    return closer ? closer.name : 'Unknown';
  };

  const availableSlots = filteredTimeSlots.filter(slot => !slot.isBooked);
  const bookedSlots = filteredTimeSlots.filter(slot => slot.isBooked);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <ChevronLeft size={16} />
              Previous
            </Button>
            <h1 className="text-3xl font-bold text-primary">Time Slots Management</h1>
            <Button variant="outline" size="sm">
              Next
              <ChevronRight size={16} />
            </Button>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Calendar size={20} className="text-primary" />
              <Badge variant="secondary">{filteredTimeSlots.length}</Badge>
            </div>
          </div>
        </div>

        <p className="text-gray-600 mb-6">Manage all available time slots across all closers</p>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-lg bg-green-500 flex items-center justify-center">
                  <Clock className="text-white" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Available Slots</p>
                  <p className="text-2xl font-bold text-primary">{availableSlots.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-lg bg-red-500 flex items-center justify-center">
                  <Calendar className="text-white" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Booked Slots</p>
                  <p className="text-2xl font-bold text-primary">{bookedSlots.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-lg bg-blue-500 flex items-center justify-center">
                  <Clock className="text-white" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Slots</p>
                  <p className="text-2xl font-bold text-primary">{filteredTimeSlots.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Filter size={20} className="text-primary" />
                <Select value={filters.closerId} onValueChange={(value) => setFilters({...filters, closerId: value})}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="All Closers" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Closers</SelectItem>
                    {users.filter(user => user.role === 'closer').map((closer) => (
                      <SelectItem key={closer.id} value={closer.id}>
                        {closer.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={filters.status} onValueChange={(value) => setFilters({...filters, status: value})}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="booked">Booked</SelectItem>
                  </SelectContent>
                </Select>
                
                <Input 
                  type="date" 
                  placeholder="From Date"
                  value={filters.dateFrom}
                  onChange={(e) => setFilters({...filters, dateFrom: e.target.value})}
                  className="w-32"
                />
                
                <Input 
                  type="date" 
                  placeholder="To Date"
                  value={filters.dateTo}
                  onChange={(e) => setFilters({...filters, dateTo: e.target.value})}
                  className="w-32"
                />
                
                <Input 
                  type="time" 
                  placeholder="From Time"
                  value={filters.timeFrom}
                  onChange={(e) => setFilters({...filters, timeFrom: e.target.value})}
                  className="w-32"
                />
                
                <Input 
                  type="time" 
                  placeholder="To Time"
                  value={filters.timeTo}
                  onChange={(e) => setFilters({...filters, timeTo: e.target.value})}
                  className="w-32"
                />
              </div>
              
              <Button variant="outline" onClick={clearFilters}>
                <X size={16} className="mr-2" />
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {filteredTimeSlots.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTimeSlots.map((slot) => (
              <Card key={slot.id} className={`${slot.isBooked ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">{getCloserName(slot.closerId)}</h3>
                        <p className="text-sm text-gray-600">Closer</p>
                      </div>
                      <Badge className={slot.isBooked ? 'bg-red-500' : 'bg-green-500'}>
                        {slot.isBooked ? 'Booked' : 'Available'}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Calendar size={16} className="text-gray-500" />
                        <span className="font-medium">{slot.date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock size={16} className="text-gray-500" />
                        <span className="font-medium">{slot.time}</span>
                      </div>
                    </div>
                    
                    {slot.clientId && (
                      <div className="pt-2 border-t">
                        <p className="text-xs text-gray-500">Client ID: {slot.clientId}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Time Slots Found</h3>
              <p className="text-gray-600">No time slots match the current filters. Try adjusting your filter criteria.</p>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </div>
  );
};

export default TimeSlotsPage;
