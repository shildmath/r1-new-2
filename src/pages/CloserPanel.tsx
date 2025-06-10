
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { timeSlotService, bookingService } from '@/services/supabase';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';
import { useToast } from '@/hooks/use-toast';
import { TimeSlotCreator } from '@/components/closer/TimeSlotCreator';
import { ModernCard } from '@/components/admin/ModernCard';
import EnhancedTable from '@/components/admin/EnhancedTable';
import type { TimeSlot, Booking } from '@/services/supabase';
import { Calendar, Clock, Users, TrendingUp, Plus, Edit, Trash2, Filter, X } from 'lucide-react';

const CloserPanel = () => {
  const { user } = useSupabaseAuth();
  const { toast } = useToast();
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    status: 'all',
    month: ''
  });
  const [editingSlot, setEditingSlot] = useState<TimeSlot | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  const loadData = async () => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      const [slotsData, bookingsData] = await Promise.all([
        timeSlotService.getAll(),
        bookingService.getByCloser(user.id)
      ]);
      
      // Filter slots for current user
      const userSlots = slotsData.filter(slot => slot.closer_id === user.id);
      setTimeSlots(userSlots);
      setBookings(bookingsData);
      console.log('Loaded data for closer:', { slots: userSlots.length, bookings: bookingsData.length });
    } catch (error) {
      console.error('Error loading data:', error);
      toast({
        title: "Error",
        description: "Failed to load your data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTimeSlot = async (slotId: string) => {
    if (!confirm('Are you sure you want to delete this time slot?')) return;
    
    try {
      await timeSlotService.delete(slotId);
      setTimeSlots(prev => prev.filter(slot => slot.id !== slotId));
      toast({
        title: "Time Slot Deleted",
        description: "Time slot has been successfully deleted.",
      });
    } catch (error) {
      console.error('Error deleting time slot:', error);
      toast({
        title: "Error",
        description: "Failed to delete time slot. Please try again.",
        variant: "destructive",
      });
    }
  };

  const updateTimeSlot = async (updatedSlot: TimeSlot) => {
    try {
      const updated = await timeSlotService.update(updatedSlot.id, {
        date: updatedSlot.date,
        time: updatedSlot.time
      });
      setTimeSlots(prev => prev.map(slot => 
        slot.id === updated.id ? updated : slot
      ));
      setEditingSlot(null);
      toast({
        title: "Time Slot Updated",
        description: "Time slot has been successfully updated.",
      });
    } catch (error) {
      console.error('Error updating time slot:', error);
      toast({
        title: "Error",
        description: "Failed to update time slot. Please try again.",
        variant: "destructive",
      });
    }
  };

  const clearFilters = () => {
    setFilters({
      dateFrom: '',
      dateTo: '',
      status: 'all',
      month: ''
    });
  };

  const filteredTimeSlots = timeSlots.filter(slot => {
    if (filters.status !== 'all') {
      if (filters.status === 'available' && slot.is_booked) return false;
      if (filters.status === 'booked' && !slot.is_booked) return false;
    }
    if (filters.dateFrom && slot.date < filters.dateFrom) return false;
    if (filters.dateTo && slot.date > filters.dateTo) return false;
    if (filters.month) {
      const slotMonth = slot.date.substring(0, 7);
      if (slotMonth !== filters.month) return false;
    }
    return true;
  });

  const availableSlots = timeSlots.filter(slot => !slot.is_booked).length;
  const bookedSlots = timeSlots.filter(slot => slot.is_booked).length;
  const completedBookings = bookings.filter(b => b.call_status === 'completed').length;
  const conversionRate = bookings.length > 0 ? (completedBookings / bookings.length * 100).toFixed(1) : '0';

  const timeSlotColumns = [
    {
      key: 'date' as keyof TimeSlot,
      header: 'Date',
      sortable: true,
      render: (value: string) => (
        <div className="font-medium">{new Date(value).toLocaleDateString()}</div>
      )
    },
    {
      key: 'time' as keyof TimeSlot,
      header: 'Time',
      sortable: true,
      render: (value: string) => (
        <div className="flex items-center space-x-2">
          <Clock size={16} className="text-gray-500" />
          <span className="font-medium">{value}</span>
        </div>
      )
    },
    {
      key: 'is_booked' as keyof TimeSlot,
      header: 'Status',
      render: (value: boolean) => (
        <Badge className={value ? 'bg-red-500' : 'bg-green-500'}>
          {value ? 'Booked' : 'Available'}
        </Badge>
      )
    },
    {
      key: 'id' as keyof TimeSlot,
      header: 'Actions',
      render: (value: string, row: TimeSlot) => (
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setEditingSlot(row)}
            disabled={row.is_booked}
          >
            <Edit size={14} />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => deleteTimeSlot(row.id)}
            disabled={row.is_booked}
            className="text-red-600 hover:text-red-800"
          >
            <Trash2 size={14} />
          </Button>
        </div>
      )
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto space-y-8"
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Closer Dashboard
            </h1>
            <p className="text-gray-600 mt-2">Manage your availability and track your performance</p>
          </div>
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg">
                <Plus size={20} className="mr-2" />
                Create Time Slots
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Time Slots</DialogTitle>
              </DialogHeader>
              <TimeSlotCreator 
                onSlotCreated={() => {
                  loadData();
                  setShowCreateDialog(false);
                }} 
              />
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ModernCard
            title="Available Slots"
            value={availableSlots}
            icon={Calendar}
            gradient="bg-gradient-to-br from-green-500 to-emerald-600"
            delay={0}
          />
          <ModernCard
            title="Booked Slots"
            value={bookedSlots}
            icon={Clock}
            gradient="bg-gradient-to-br from-blue-500 to-cyan-600"
            delay={0.1}
          />
          <ModernCard
            title="Total Bookings"
            value={bookings.length}
            icon={Users}
            gradient="bg-gradient-to-br from-purple-500 to-violet-600"
            delay={0.2}
          />
          <ModernCard
            title="Conversion Rate"
            value={`${conversionRate}%`}
            icon={TrendingUp}
            gradient="bg-gradient-to-br from-orange-500 to-red-600"
            delay={0.3}
          />
        </div>

        {/* Filters */}
        <Card className="border-0 shadow-xl">
          <CardContent className="p-6">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center space-x-2">
                <Filter size={20} className="text-primary" />
                <span className="font-medium">Filters:</span>
              </div>
              
              <Select value={filters.status} onValueChange={(value) => setFilters({...filters, status: value})}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
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

        {/* Time Slots Table */}
        <EnhancedTable
          data={filteredTimeSlots}
          columns={timeSlotColumns}
          searchable={false}
          exportable={true}
          onExport={() => console.log('Export time slots')}
        />

        {/* Edit Modal */}
        {editingSlot && (
          <Dialog open={!!editingSlot} onOpenChange={() => setEditingSlot(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Time Slot</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Date</label>
                  <Input 
                    type="date" 
                    value={editingSlot.date}
                    onChange={(e) => setEditingSlot({...editingSlot, date: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Time</label>
                  <Input 
                    type="time" 
                    value={editingSlot.time}
                    onChange={(e) => setEditingSlot({...editingSlot, time: e.target.value})}
                  />
                </div>
                <div className="flex space-x-2">
                  <Button onClick={() => updateTimeSlot(editingSlot)} className="flex-1">
                    Update
                  </Button>
                  <Button variant="outline" onClick={() => setEditingSlot(null)} className="flex-1">
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </motion.div>
    </div>
  );
};

export default CloserPanel;
