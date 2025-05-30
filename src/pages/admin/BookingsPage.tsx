
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { storage } from '@/utils/localStorage';
import { Booking, User } from '@/types/admin';
import { exportBookingsToCSV } from '@/utils/csvExport';
import { Calendar, Clock, User as UserIcon, Trash2, Filter, Eye, X, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const BookingsPage = () => {
  const [bookings, setBookings] = useState<Booking[]>(storage.getBookings());
  const [users] = useState<User[]>(storage.getUsers());
  const [closerFilter, setCloserFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dealFilter, setDealFilter] = useState<string>('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const { toast } = useToast();

  const handleStatusChange = (bookingId: string, field: string, value: string) => {
    const updatedBookings = bookings.map(booking => 
      booking.id === bookingId ? { ...booking, [field]: value } : booking
    );
    setBookings(updatedBookings);
    storage.setBookings(updatedBookings);
    toast({
      title: "Status Updated",
      description: "Booking status has been updated successfully.",
    });
  };

  const handleDelete = (bookingId: string) => {
    const updatedBookings = bookings.filter(booking => booking.id !== bookingId);
    setBookings(updatedBookings);
    storage.setBookings(updatedBookings);
    toast({
      title: "Booking Deleted",
      description: "Booking has been deleted successfully.",
    });
  };

  const clearFilters = () => {
    setCloserFilter('all');
    setStatusFilter('all');
    setDealFilter('all');
    setDateFrom('');
    setDateTo('');
    toast({
      title: "Filters Cleared",
      description: "All filters have been reset.",
    });
  };

  const handleExportCSV = () => {
    exportBookingsToCSV(filteredBookings);
    toast({
      title: "CSV Exported",
      description: "Bookings have been exported to CSV file.",
    });
  };

  const filteredBookings = bookings.filter(booking => {
    if (closerFilter !== 'all' && booking.closerId !== closerFilter) return false;
    if (statusFilter !== 'all' && booking.callStatus !== statusFilter) return false;
    if (dealFilter !== 'all' && booking.dealStatus !== dealFilter) return false;
    if (dateFrom && booking.preferredDate < dateFrom) return false;
    if (dateTo && booking.preferredDate > dateTo) return false;
    return true;
  });

  const getCloserName = (closerId: string) => {
    const closer = users.find(user => user.id === closerId);
    return closer ? closer.name : 'Unknown';
  };

  const getCallStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-blue-500';
      case 'completed': return 'bg-green-500';
      case 'no-show': return 'bg-red-500';
      case 'reschedule': return 'bg-yellow-500';
      case 'not-attended': return 'bg-gray-500';
      default: return 'bg-blue-500';
    }
  };

  const getDealStatusColor = (status: string) => {
    switch (status) {
      case 'closed': return 'bg-green-600';
      case 'follow-up': return 'bg-blue-600';
      case 'client-loss': return 'bg-red-600';
      case 'unqualified': return 'bg-gray-600';
      default: return 'bg-blue-600';
    }
  };

  const totalBookings = bookings.length;
  const confirmedBookings = bookings.filter(b => b.callStatus === 'confirmed').length;
  const completedBookings = bookings.filter(b => b.callStatus === 'completed').length;
  const closedDeals = bookings.filter(b => b.dealStatus === 'closed').length;

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header with Navigation */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <ChevronLeft size={16} />
              Previous
            </Button>
            <h1 className="text-3xl font-bold text-primary">Strategy Call Bookings</h1>
            <Button variant="outline" size="sm">
              Next
              <ChevronRight size={16} />
            </Button>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button onClick={handleExportCSV} className="agency-btn flex items-center space-x-2">
              <Download size={16} />
              <span>Export CSV</span>
            </Button>
            <div className="flex items-center space-x-2">
              <Calendar size={20} className="text-primary" />
              <Badge variant="secondary">{totalBookings}</Badge>
            </div>
          </div>
        </div>

        <p className="text-gray-600 mb-6">Manage all strategy call bookings and track their progress</p>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-lg bg-blue-500 flex items-center justify-center">
                  <Calendar className="text-white" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Bookings</p>
                  <p className="text-2xl font-bold text-primary">{totalBookings}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-lg bg-yellow-500 flex items-center justify-center">
                  <Clock className="text-white" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Confirmed</p>
                  <p className="text-2xl font-bold text-primary">{confirmedBookings}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-lg bg-green-500 flex items-center justify-center">
                  <UserIcon className="text-white" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-primary">{completedBookings}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-lg bg-purple-500 flex items-center justify-center">
                  <Calendar className="text-white" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Closed Deals</p>
                  <p className="text-2xl font-bold text-primary">{closedDeals}</p>
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
                <Select value={closerFilter} onValueChange={setCloserFilter}>
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
                
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Call Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="no-show">No Show</SelectItem>
                    <SelectItem value="reschedule">Reschedule</SelectItem>
                    <SelectItem value="not-attended">Not Attended</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={dealFilter} onValueChange={setDealFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Deal Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                    <SelectItem value="follow-up">Follow Up</SelectItem>
                    <SelectItem value="client-loss">Client Loss</SelectItem>
                    <SelectItem value="unqualified">Unqualified</SelectItem>
                  </SelectContent>
                </Select>
                
                <Input 
                  type="date" 
                  placeholder="From Date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="w-32"
                />
                
                <Input 
                  type="date" 
                  placeholder="To Date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
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

        {filteredBookings.length > 0 ? (
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Closer</TableHead>
                    <TableHead>Call Status</TableHead>
                    <TableHead>Deal Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell className="font-medium">
                        {booking.firstName} {booking.lastName}
                      </TableCell>
                      <TableCell>{booking.email}</TableCell>
                      <TableCell>{booking.phone}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="font-medium">{booking.preferredDate}</p>
                          <p className="text-sm text-gray-600">{booking.preferredTime}</p>
                        </div>
                      </TableCell>
                      <TableCell>{getCloserName(booking.closerId)}</TableCell>
                      <TableCell>
                        <Badge className={getCallStatusColor(booking.callStatus || 'confirmed')}>
                          {(booking.callStatus || 'confirmed').replace('-', ' ').toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getDealStatusColor(booking.dealStatus || 'follow-up')}>
                          {(booking.dealStatus || 'follow-up').replace('-', ' ').toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Dialog open={showDetails && selectedBooking?.id === booking.id} onOpenChange={setShowDetails}>
                            <DialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => setSelectedBooking(booking)}
                              >
                                <Eye size={14} />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>Booking Details - {booking.firstName} {booking.lastName}</DialogTitle>
                              </DialogHeader>
                              {selectedBooking && (
                                <div className="space-y-6">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                      <label className="text-sm font-medium text-gray-600">Full Name</label>
                                      <p className="font-medium">{selectedBooking.firstName} {selectedBooking.lastName}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-gray-600">Email</label>
                                      <p className="font-medium">{selectedBooking.email}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-gray-600">Phone</label>
                                      <p className="font-medium">{selectedBooking.phone}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-gray-600">Closer</label>
                                      <p className="font-medium">{getCloserName(selectedBooking.closerId)}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-gray-600">Date & Time</label>
                                      <p className="font-medium">{selectedBooking.preferredDate} at {selectedBooking.preferredTime}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-gray-600">Created</label>
                                      <p className="font-medium">{new Date(selectedBooking.createdAt).toLocaleString()}</p>
                                    </div>
                                  </div>
                                  
                                  {selectedBooking.additionalInfo && (
                                    <div>
                                      <label className="text-sm font-medium text-gray-600">Additional Information</label>
                                      <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                                        <p className="whitespace-pre-wrap">{selectedBooking.additionalInfo}</p>
                                      </div>
                                    </div>
                                  )}

                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                      <label className="text-sm font-medium text-gray-600">Call Status</label>
                                      <Badge className={`mt-2 ${getCallStatusColor(selectedBooking.callStatus || 'confirmed')}`}>
                                        {(selectedBooking.callStatus || 'confirmed').replace('-', ' ').toUpperCase()}
                                      </Badge>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-gray-600">Deal Status</label>
                                      <Badge className={`mt-2 ${getDealStatusColor(selectedBooking.dealStatus || 'follow-up')}`}>
                                        {(selectedBooking.dealStatus || 'follow-up').replace('-', ' ').toUpperCase()}
                                      </Badge>
                                    </div>
                                  </div>

                                  {/* Additional fields if available */}
                                  {(selectedBooking.country || selectedBooking.adSpend || selectedBooking.note) && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      {selectedBooking.country && (
                                        <div>
                                          <label className="text-sm font-medium text-gray-600">Country/Area</label>
                                          <p className="font-medium">{selectedBooking.country}</p>
                                        </div>
                                      )}
                                      {selectedBooking.adSpend && (
                                        <div>
                                          <label className="text-sm font-medium text-gray-600">Ad Spend</label>
                                          <p className="font-medium">{selectedBooking.adSpend}</p>
                                        </div>
                                      )}
                                      {selectedBooking.note && (
                                        <div className="md:col-span-2">
                                          <label className="text-sm font-medium text-gray-600">Notes</label>
                                          <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                                            <p className="whitespace-pre-wrap">{selectedBooking.note}</p>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(booking.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Bookings Found</h3>
              <p className="text-gray-600">No bookings match the current filters. Try adjusting your filter criteria.</p>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </div>
  );
};

export default BookingsPage;
