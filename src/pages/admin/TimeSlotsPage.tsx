
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { storage } from '@/utils/localStorage';
import { TimeSlot, User } from '@/types/admin';
import { Calendar, Clock, Filter, X, Plus, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const TimeSlotsPage = () => {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [filters, setFilters] = useState({
    closerId: 'all',
    status: 'all',
    dateFrom: '',
    dateTo: '',
    month: ''
  });
  const [newSlot, setNewSlot] = useState({
    closerId: '',
    date: '',
    time: ''
  });
  const [editingSlot, setEditingSlot] = useState<TimeSlot | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const slotsData = storage.getTimeSlots();
    const usersData = storage.getUsers();
    setTimeSlots(slotsData);
    setUsers(usersData);
    console.log('Loaded time slots:', slotsData);
    console.log('Loaded users:', usersData);
  };

  const clearFilters = () => {
    setFilters({
      closerId: 'all',
      status: 'all',
      dateFrom: '',
      dateTo: '',
      month: ''
    });
    toast({
      title: "Filters Cleared",
      description: "All filters have been reset.",
    });
  };

  const addTimeSlot = () => {
    if (!newSlot.closerId || !newSlot.date || !newSlot.time) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to add a time slot.",
        variant: "destructive",
      });
      return;
    }

    const slot: TimeSlot = {
      id: Date.now().toString(),
      closerId: newSlot.closerId,
      date: newSlot.date,
      time: newSlot.time,
      isBooked: false,
      clientId: undefined
    };

    const updatedSlots = [...timeSlots, slot];
    storage.saveTimeSlots(updatedSlots);
    setTimeSlots(updatedSlots);
    setNewSlot({ closerId: '', date: '', time: '' });

    toast({
      title: "Time Slot Added",
      description: "New time slot has been successfully added.",
    });
  };

  const updateTimeSlot = (updatedSlot: TimeSlot) => {
    const updatedSlots = timeSlots.map(slot => 
      slot.id === updatedSlot.id ? updatedSlot : slot
    );
    storage.saveTimeSlots(updatedSlots);
    setTimeSlots(updatedSlots);
    setEditingSlot(null);

    toast({
      title: "Time Slot Updated",
      description: "Time slot has been successfully updated.",
    });
  };

  const deleteTimeSlot = (slotId: string) => {
    const updatedSlots = timeSlots.filter(slot => slot.id !== slotId);
    storage.saveTimeSlots(updatedSlots);
    setTimeSlots(updatedSlots);

    toast({
      title: "Time Slot Deleted",
      description: "Time slot has been successfully deleted.",
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
    if (filters.month) {
      const slotMonth = slot.date.substring(0, 7); // YYYY-MM format
      if (slotMonth !== filters.month) return false;
    }
    return true;
  });

  const getCloserName = (closerId: string) => {
    const closer = users.find(user => user.id === closerId && user.role === 'closer');
    return closer ? closer.name : 'Unknown';
  };

  const availableSlots = filteredTimeSlots.filter(slot => !slot.isBooked);
  const bookedSlots = filteredTimeSlots.filter(slot => slot.isBooked);
  const closers = users.filter(user => user.role === 'closer');

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Time Slots Management
          </h1>
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
          <Card className="border-l-4 border-l-green-500">
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

          <Card className="border-l-4 border-l-red-500">
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

          <Card className="border-l-4 border-l-blue-500">
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

        {/* Add New Time Slot */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Plus size={20} />
              <span>Add New Time Slot</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Select value={newSlot.closerId} onValueChange={(value) => setNewSlot({...newSlot, closerId: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Closer" />
                </SelectTrigger>
                <SelectContent>
                  {closers.map((closer) => (
                    <SelectItem key={closer.id} value={closer.id}>
                      {closer.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Input 
                type="date" 
                placeholder="Date"
                value={newSlot.date}
                onChange={(e) => setNewSlot({...newSlot, date: e.target.value})}
              />
              
              <Input 
                type="time" 
                placeholder="Time"
                value={newSlot.time}
                onChange={(e) => setNewSlot({...newSlot, time: e.target.value})}
              />
              
              <Button onClick={addTimeSlot} className="bg-green-600 hover:bg-green-700">
                <Plus size={16} className="mr-2" />
                Add Slot
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center space-x-2">
                <Filter size={20} className="text-primary" />
                <span className="font-medium">Filters:</span>
              </div>
              
              <Select value={filters.closerId} onValueChange={(value) => setFilters({...filters, closerId: value})}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Closers" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Closers</SelectItem>
                  {closers.map((closer) => (
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
                type="month" 
                placeholder="Month"
                value={filters.month}
                onChange={(e) => setFilters({...filters, month: e.target.value})}
                className="w-40"
              />
              
              <Input 
                type="date" 
                placeholder="From Date"
                value={filters.dateFrom}
                onChange={(e) => setFilters({...filters, dateFrom: e.target.value})}
                className="w-40"
              />
              
              <Input 
                type="date" 
                placeholder="To Date"
                value={filters.dateTo}
                onChange={(e) => setFilters({...filters, dateTo: e.target.value})}
                className="w-40"
              />
              
              <Button variant="outline" onClick={clearFilters}>
                <X size={16} className="mr-2" />
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Time Slots Grid */}
        {filteredTimeSlots.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTimeSlots.map((slot) => (
              <Card key={slot.id} className={`${slot.isBooked ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'} hover:shadow-lg transition-shadow duration-300`}>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">{getCloserName(slot.closerId)}</h3>
                        <p className="text-sm text-gray-600">Closer</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={slot.isBooked ? 'bg-red-500' : 'bg-green-500'}>
                          {slot.isBooked ? 'Booked' : 'Available'}
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingSlot(slot)}
                        >
                          <Edit size={14} />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteTimeSlot(slot.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
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
              <p className="text-gray-600">No time slots match the current filters. Try adjusting your filter criteria or add new time slots.</p>
            </CardContent>
          </Card>
        )}

        {/* Edit Modal */}
        {editingSlot && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>Edit Time Slot</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select value={editingSlot.closerId} onValueChange={(value) => setEditingSlot({...editingSlot, closerId: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Closer" />
                  </SelectTrigger>
                  <SelectContent>
                    {closers.map((closer) => (
                      <SelectItem key={closer.id} value={closer.id}>
                        {closer.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Input 
                  type="date" 
                  value={editingSlot.date}
                  onChange={(e) => setEditingSlot({...editingSlot, date: e.target.value})}
                />
                
                <Input 
                  type="time" 
                  value={editingSlot.time}
                  onChange={(e) => setEditingSlot({...editingSlot, time: e.target.value})}
                />
                
                <div className="flex space-x-2">
                  <Button onClick={() => updateTimeSlot(editingSlot)} className="flex-1">
                    Update
                  </Button>
                  <Button variant="outline" onClick={() => setEditingSlot(null)} className="flex-1">
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default TimeSlotsPage;
