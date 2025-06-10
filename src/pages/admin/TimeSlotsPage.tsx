
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { timeSlotService, userService } from '@/services/supabase';
import { ModernCard } from '@/components/admin/ModernCard';
import EnhancedTable from '@/components/admin/EnhancedTable';
import type { TimeSlot } from '@/services/supabase';
import { Calendar, Clock, Filter, X, Plus, Edit, Trash2, Users, TrendingUp, CalendarDays, UserCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const TimeSlotsPage = () => {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [filters, setFilters] = useState({
    closerId: 'all',
    status: 'all',
    dateFrom: '',
    dateTo: '',
    month: ''
  });
  const [newSlot, setNewSlot] = useState({
    closer_id: '',
    date: '',
    time: ''
  });
  const [editingSlot, setEditingSlot] = useState<TimeSlot | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [slotsData, usersData] = await Promise.all([
        timeSlotService.getAll(),
        userService.getClosers()
      ]);
      setTimeSlots(slotsData);
      setUsers(usersData);
      console.log('Loaded time slots:', slotsData.length);
    } catch (error) {
      console.error('Error loading data:', error);
      toast({
        title: "Error",
        description: "Failed to load data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const clearFilters = () => {
    setFilters({
      closerId: 'all',
      status: 'all',
      dateFrom: '',
      dateTo: '',
      month: ''
    });
  };

  const addTimeSlot = async () => {
    if (!newSlot.closer_id || !newSlot.date || !newSlot.time) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to add a time slot.",
        variant: "destructive",
      });
      return;
    }

    try {
      const slot = await timeSlotService.create({
        closer_id: newSlot.closer_id,
        date: newSlot.date,
        time: newSlot.time,
        is_booked: false
      });

      setTimeSlots(prev => [...prev, slot]);
      setNewSlot({ closer_id: '', date: '', time: '' });
      setShowCreateDialog(false);

      toast({
        title: "Time Slot Added",
        description: "New time slot has been successfully added.",
      });
    } catch (error) {
      console.error('Error adding time slot:', error);
      toast({
        title: "Error",
        description: "Failed to add time slot. Please try again.",
        variant: "destructive",
      });
    }
  };

  const updateTimeSlot = async (updatedSlot: TimeSlot) => {
    try {
      const updated = await timeSlotService.update(updatedSlot.id, {
        closer_id: updatedSlot.closer_id,
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

  const filteredTimeSlots = timeSlots.filter(slot => {
    if (filters.closerId !== 'all' && slot.closer_id !== filters.closerId) return false;
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

  const getCloserName = (closerId: string) => {
    const closer = users.find(user => user.id === closerId);
    return closer ? closer.name : 'Unknown';
  };

  const availableSlots = filteredTimeSlots.filter(slot => !slot.is_booked);
  const bookedSlots = filteredTimeSlots.filter(slot => slot.is_booked);
  const totalClosers = users.length;
  const utilizationRate = filteredTimeSlots.length > 0 ? (bookedSlots.length / filteredTimeSlots.length * 100).toFixed(1) : '0';

  const timeSlotColumns = [
    {
      key: 'closer_id' as keyof TimeSlot,
      header: 'Closer',
      sortable: true,
      render: (value: string) => (
        <div className="flex items-center space-x-2">
          <UserCheck size={16} className="text-gray-500" />
          <span className="font-medium">{getCloserName(value)}</span>
        </div>
      )
    },
    {
      key: 'date' as keyof TimeSlot,
      header: 'Date',
      sortable: true,
      render: (value: string) => (
        <div className="flex items-center space-x-2">
          <Calendar size={16} className="text-gray-500" />
          <span className="font-medium">{new Date(value).toLocaleDateString()}</span>
        </div>
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
        <Badge className={value ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}>
          {value ? 'Booked' : 'Available'}
        </Badge>
      )
    },
    {
      key: 'created_at' as keyof TimeSlot,
      header: 'Created',
      sortable: true,
      render: (value: string) => (
        <span className="text-sm text-gray-500">
          {new Date(value).toLocaleDateString()}
        </span>
      )
    },
    {
      key: 'id' as keyof TimeSlot,
      header: 'Actions',
      render: (value: string, row: TimeSlot) => (
        <div className="flex items-center space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditingSlot(row)}
              >
                <Edit size={14} />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Time Slot</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Closer</label>
                  <Select 
                    value={editingSlot?.closer_id} 
                    onValueChange={(value) => editingSlot && setEditingSlot({...editingSlot, closer_id: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Closer" />
                    </SelectTrigger>
                    <SelectContent>
                      {users.map((closer) => (
                        <SelectItem key={closer.id} value={closer.id}>
                          {closer.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Date</label>
                  <Input 
                    type="date" 
                    value={editingSlot?.date}
                    onChange={(e) => editingSlot && setEditingSlot({...editingSlot, date: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Time</label>
                  <Input 
                    type="time" 
                    value={editingSlot?.time}
                    onChange={(e) => editingSlot && setEditingSlot({...editingSlot, time: e.target.value})}
                  />
                </div>
                <div className="flex space-x-2">
                  <Button onClick={() => editingSlot && updateTimeSlot(editingSlot)} className="flex-1">
                    Update
                  </Button>
                  <Button variant="outline" onClick={() => setEditingSlot(null)} className="flex-1">
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Button
            variant="outline"
            size="sm"
            onClick={() => deleteTimeSlot(row.id)}
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
      <div className="space-y-6">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading time slots...</p>
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
              Time Slots Management
            </h1>
            <p className="text-gray-600 mt-2">Sophisticated scheduling system with calendar view and analytics</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <CalendarDays size={20} className="text-primary" />
              <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                {filteredTimeSlots.length} slots
              </Badge>
            </div>
            <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white">
                  <Plus size={16} className="mr-2" />
                  Add Time Slot
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Time Slot</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Closer</label>
                    <Select value={newSlot.closer_id} onValueChange={(value) => setNewSlot({...newSlot, closer_id: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Closer" />
                      </SelectTrigger>
                      <SelectContent>
                        {users.map((closer) => (
                          <SelectItem key={closer.id} value={closer.id}>
                            {closer.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Date</label>
                    <Input 
                      type="date" 
                      value={newSlot.date}
                      onChange={(e) => setNewSlot({...newSlot, date: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Time</label>
                    <Input 
                      type="time" 
                      value={newSlot.time}
                      onChange={(e) => setNewSlot({...newSlot, time: e.target.value})}
                    />
                  </div>
                  <Button onClick={addTimeSlot} className="w-full">
                    Add Time Slot
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <ModernCard
            title="Available Slots"
            value={availableSlots.length}
            icon={Clock}
            gradient="bg-gradient-to-br from-green-500 to-emerald-600"
            delay={0}
          />
          <ModernCard
            title="Booked Slots"
            value={bookedSlots.length}
            icon={Calendar}
            gradient="bg-gradient-to-br from-red-500 to-pink-600"
            delay={0.1}
          />
          <ModernCard
            title="Active Closers"
            value={totalClosers}
            icon={Users}
            gradient="bg-gradient-to-br from-blue-500 to-cyan-600"
            delay={0.2}
          />
          <ModernCard
            title="Utilization Rate"
            value={`${utilizationRate}%`}
            icon={TrendingUp}
            gradient="bg-gradient-to-br from-purple-500 to-violet-600"
            delay={0.3}
          />
        </div>

        {/* Advanced Filters */}
        <Card className="border-0 shadow-xl">
          <CardContent className="p-6">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center space-x-2">
                <Filter size={20} className="text-primary" />
                <span className="font-medium">Advanced Filters:</span>
              </div>
              
              <Select value={filters.closerId} onValueChange={(value) => setFilters({...filters, closerId: value})}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Closers" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Closers</SelectItem>
                  {users.map((closer) => (
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
                Clear All Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Time Slots Table */}
        <EnhancedTable
          data={filteredTimeSlots}
          columns={timeSlotColumns}
          searchable={false}
          exportable={true}
          onExport={() => console.log('Export time slots')}
        />
      </motion.div>
    </div>
  );
};

export default TimeSlotsPage;
