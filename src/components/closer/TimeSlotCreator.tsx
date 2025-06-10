
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { timeSlotService } from '@/services/supabase';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';
import { useToast } from '@/hooks/use-toast';
import { Calendar as CalendarIcon, Clock, Plus, Copy } from 'lucide-react';
import { format } from 'date-fns';

interface TimeSlotCreatorProps {
  onSlotCreated: () => void;
}

export const TimeSlotCreator = ({ onSlotCreated }: TimeSlotCreatorProps) => {
  const { user } = useSupabaseAuth();
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState('');
  const [bulkDates, setBulkDates] = useState<Date[]>([]);
  const [timeSlots] = useState([
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
  ]);
  const [isCreating, setIsCreating] = useState(false);
  const [mode, setMode] = useState<'single' | 'bulk'>('single');

  const createSingleSlot = async () => {
    if (!selectedDate || !selectedTime || !user) {
      toast({
        title: "Missing Information",
        description: "Please select both date and time.",
        variant: "destructive",
      });
      return;
    }

    setIsCreating(true);
    try {
      await timeSlotService.create({
        closer_id: user.id,
        date: format(selectedDate, 'yyyy-MM-dd'),
        time: selectedTime,
        is_booked: false
      });

      toast({
        title: "Time Slot Created",
        description: "Your time slot has been successfully created.",
      });

      setSelectedDate(undefined);
      setSelectedTime('');
      onSlotCreated();
    } catch (error) {
      console.error('Error creating time slot:', error);
      toast({
        title: "Error",
        description: "Failed to create time slot. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  const createBulkSlots = async () => {
    if (bulkDates.length === 0 || !selectedTime || !user) {
      toast({
        title: "Missing Information",
        description: "Please select dates and time for bulk creation.",
        variant: "destructive",
      });
      return;
    }

    setIsCreating(true);
    try {
      const promises = bulkDates.map(date =>
        timeSlotService.create({
          closer_id: user.id,
          date: format(date, 'yyyy-MM-dd'),
          time: selectedTime,
          is_booked: false
        })
      );

      await Promise.all(promises);

      toast({
        title: "Bulk Time Slots Created",
        description: `${bulkDates.length} time slots have been successfully created.`,
      });

      setBulkDates([]);
      setSelectedTime('');
      onSlotCreated();
    } catch (error) {
      console.error('Error creating bulk time slots:', error);
      toast({
        title: "Error",
        description: "Failed to create bulk time slots. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50 to-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Plus className="text-blue-600" size={24} />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Create Time Slots
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Mode Selection */}
          <div className="flex space-x-2">
            <Button
              variant={mode === 'single' ? 'default' : 'outline'}
              onClick={() => setMode('single')}
              className="flex-1"
            >
              Single Slot
            </Button>
            <Button
              variant={mode === 'bulk' ? 'default' : 'outline'}
              onClick={() => setMode('bulk')}
              className="flex-1"
            >
              <Copy size={16} className="mr-2" />
              Bulk Create
            </Button>
          </div>

          {mode === 'single' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Select Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, 'PPP') : 'Pick a date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Select Time</Label>
                <Select value={selectedTime} onValueChange={setSelectedTime}>
                  <SelectTrigger>
                    <Clock className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Select Multiple Dates</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {bulkDates.length > 0 ? `${bulkDates.length} dates selected` : 'Pick dates'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="multiple"
                      selected={bulkDates}
                      onSelect={(dates) => setBulkDates(dates || [])}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Select Time</Label>
                <Select value={selectedTime} onValueChange={setSelectedTime}>
                  <SelectTrigger>
                    <Clock className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Select time for all dates" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <Button
            onClick={mode === 'single' ? createSingleSlot : createBulkSlots}
            disabled={isCreating}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            {isCreating ? 'Creating...' : mode === 'single' ? 'Create Time Slot' : 'Create Bulk Slots'}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};
