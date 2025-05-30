
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
import { Calendar, Clock, User as UserIcon, Trash2, Filter, Eye, X, Download, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const BookingsPage = () => {
  const [bookings, setBookings] = useState<Booking[]>(storage.getBookings());
  const [users] = useState<User[]>(storage.getUsers());
  const [closerFilter, setCloserFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dealFilter, setDealFilter] = useState<string>('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [timeFrom, setTimeFrom] = useState('');
  const [timeTo, setTimeTo] = useState('');
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
    setTimeFrom('');
    setTimeTo('');
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
    if (timeFrom && booking.preferredTime < timeFrom) return false;
    if (timeTo && booking.preferredTime > timeTo) return false;
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
      case 'not-started': return 'bg-purple-600';
      default: return 'bg-purple-600';
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
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Strategy Call Bookings
            </h1>
            <p className="text-gray-600 mt-2">Manage all strategy call bookings and track their progress</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button onClick={handleExportCSV} className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg">
              <Download size={16} className="mr-2" />
              Export CSV
            </Button>
            <div className="flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-xl border border-blue-200">
              <Calendar size={20} className="text-blue-600" />
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">{totalBookings}</Badge>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Total Bookings</p>
                  <p className="text-3xl font-bold">{totalBookings}</p>
                  <p className="text-blue-200 text-xs mt-1">All time</p>
                </div>
                <div className="w-12 h-12 bg-blue-400 rounded-xl flex items-center justify-center">
                  <Calendar className="text-white" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-100 text-sm font-medium">Confirmed</p>
                  <p className="text-3xl font-bold">{confirmedBookings}</p>
                  <p className="text-yellow-200 text-xs mt-1">Pending calls</p>
                </div>
                <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center">
                  <Clock className="text-white" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Completed</p>
                  <p className="text-3xl font-bold">{completedBookings}</p>
                  <p className="text-green-200 text-xs mt-1">Successfully held</p>
                </div>
                <div className="w-12 h-12 bg-green-400 rounded-xl flex items-center justify-center">
                  <UserIcon className="text-white" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">Closed Deals</p>
                  <p className="text-3xl font-bold">{closedDeals}</p>
                  <p className="text-purple-200 text-xs mt-1">Conversion rate: {totalBookings ? Math.round((closedDeals / totalBookings) * 100) : 0}%</p>
                </div>
                <div className="w-12 h-12 bg-purple-400 rounded-xl flex items-center justify-center">
                  <TrendingUp className="text-white" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Filters */}
        <Card className="mb-6 shadow-lg border border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 flex-wrap gap-4">
                <div className="flex items-center space-x-2">
                  <Filter size={20} className="text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">Filters:</span>
                </div>
                
                <Select value={closerFilter} onValueChange={setCloserFilter}>
                  <SelectTrigger className="w-40 border-blue-200 focus:border-blue-500">
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
                  <SelectTrigger className="w-32 border-green-200 focus:border-green-500">
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
                  <SelectTrigger className="w-32 border-purple-200 focus:border-purple-500">
                    <SelectValue placeholder="Deal Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="not-started">Not Started</SelectItem>
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
                  className="w-36 border-gray-200 focus:border-blue-500"
                />
                
                <Input 
                  type="date" 
                  placeholder="To Date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="w-36 border-gray-200 focus:border-blue-500"
                />
                
                <Input 
                  type="time" 
                  placeholder="From Time"
                  value={timeFrom}
                  onChange={(e) => setTimeFrom(e.target.value)}
                  className="w-32 border-gray-200 focus:border-blue-500"
                />
                
                <Input 
                  type="time" 
                  placeholder="To Time"
                  value={timeTo}
                  onChange={(e) => setTimeTo(e.target.value)}
                  className="w-32 border-gray-200 focus:border-blue-500"
                />
              </div>
              
              <Button variant="outline" onClick={clearFilters} className="border-red-200 text-red-600 hover:bg-red-50">
                <X size={16} className="mr-2" />
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {filteredBookings.length > 0 ? (
          <Card className="shadow-xl border border-gray-200">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gradient-to-r from-gray-50 to-gray-100">
                      <TableHead className="font-semibold text-gray-700">Client</TableHead>
                      <TableHead className="font-semibold text-gray-700">Contact</TableHead>
                      <TableHead className="font-semibold text-gray-700">Date & Time</TableHead>
                      <TableHead className="font-semibold text-gray-700">Closer</TableHead>
                      <TableHead className="font-semibold text-gray-700">Call Status</TableHead>
                      <TableHead className="font-semibold text-gray-700">Deal Status</TableHead>
                      <TableHead className="font-semibold text-gray-700">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBookings.map((booking) => (
                      <TableRow key={booking.id} className="hover:bg-blue-50/50 transition-colors">
                        <TableCell>
                          <div>
                            <p className="font-semibold text-gray-800">{booking.firstName} {booking.lastName}</p>
                            <p className="text-sm text-gray-500">ID: {booking.id}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <p className="text-sm">{booking.email}</p>
                            <p className="text-sm text-gray-600">{booking.phone}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <p className="font-medium text-blue-700">{booking.preferredDate}</p>
                            <p className="text-sm text-gray-600">{booking.preferredTime}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <UserIcon size={14} className="text-blue-600" />
                            </div>
                            <span className="font-medium">{getCloserName(booking.closerId)}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={`${getCallStatusColor(booking.callStatus || 'confirmed')} text-white`}>
                            {(booking.callStatus || 'confirmed').replace('-', ' ').toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={`${getDealStatusColor(booking.dealStatus || 'not-started')} text-white`}>
                            {(booking.dealStatus || 'not-started').replace('-', ' ').toUpperCase()}
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
                                  className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
                                >
                                  <Eye size={14} />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                                <DialogHeader>
                                  <DialogTitle className="text-xl text-blue-800">
                                    Booking Details - {booking.firstName} {booking.lastName}
                                  </DialogTitle>
                                </DialogHeader>
                                {selectedBooking && (
                                  <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      <div className="p-4 bg-gray-50 rounded-lg">
                                        <label className="text-sm font-medium text-gray-600">Full Name</label>
                                        <p className="font-medium text-lg">{selectedBooking.firstName} {selectedBooking.lastName}</p>
                                      </div>
                                      <div className="p-4 bg-gray-50 rounded-lg">
                                        <label className="text-sm font-medium text-gray-600">Email</label>
                                        <p className="font-medium">{selectedBooking.email}</p>
                                      </div>
                                      <div className="p-4 bg-gray-50 rounded-lg">
                                        <label className="text-sm font-medium text-gray-600">Phone</label>
                                        <p className="font-medium">{selectedBooking.phone}</p>
                                      </div>
                                      <div className="p-4 bg-gray-50 rounded-lg">
                                        <label className="text-sm font-medium text-gray-600">Closer</label>
                                        <p className="font-medium">{getCloserName(selectedBooking.closerId)}</p>
                                      </div>
                                      <div className="p-4 bg-gray-50 rounded-lg">
                                        <label className="text-sm font-medium text-gray-600">Date & Time</label>
                                        <p className="font-medium">{selectedBooking.preferredDate} at {selectedBooking.preferredTime}</p>
                                      </div>
                                      <div className="p-4 bg-gray-50 rounded-lg">
                                        <label className="text-sm font-medium text-gray-600">Created</label>
                                        <p className="font-medium">{new Date(selectedBooking.createdAt).toLocaleString()}</p>
                                      </div>
                                    </div>
                                    
                                    {selectedBooking.additionalInfo && (
                                      <div>
                                        <label className="text-sm font-medium text-gray-600">Additional Information</label>
                                        <div className="mt-2 p-4 bg-blue-50 rounded-lg border border-blue-200">
                                          <p className="whitespace-pre-wrap">{selectedBooking.additionalInfo}</p>
                                        </div>
                                      </div>
                                    )}

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                                        <label className="text-sm font-medium text-green-700">Call Status</label>
                                        <Badge className={`mt-2 ${getCallStatusColor(selectedBooking.callStatus || 'confirmed')} text-white`}>
                                          {(selectedBooking.callStatus || 'confirmed').replace('-', ' ').toUpperCase()}
                                        </Badge>
                                      </div>
                                      <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                                        <label className="text-sm font-medium text-purple-700">Deal Status</label>
                                        <Badge className={`mt-2 ${getDealStatusColor(selectedBooking.dealStatus || 'not-started')} text-white`}>
                                          {(selectedBooking.dealStatus || 'not-started').replace('-', ' ').toUpperCase()}
                                        </Badge>
                                      </div>
                                    </div>

                                    {(selectedBooking.country || selectedBooking.adSpend || selectedBooking.note) && (
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {selectedBooking.country && (
                                          <div className="p-4 bg-gray-50 rounded-lg">
                                            <label className="text-sm font-medium text-gray-600">Country/Area</label>
                                            <p className="font-medium">{selectedBooking.country}</p>
                                          </div>
                                        )}
                                        {selectedBooking.adSpend && (
                                          <div className="p-4 bg-gray-50 rounded-lg">
                                            <label className="text-sm font-medium text-gray-600">Ad Spend</label>
                                            <p className="font-medium">{selectedBooking.adSpend}</p>
                                          </div>
                                        )}
                                        {selectedBooking.note && (
                                          <div className="md:col-span-2">
                                            <label className="text-sm font-medium text-gray-600">Notes</label>
                                            <div className="mt-2 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
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
                              className="border-red-200 text-red-600 hover:bg-red-50"
                            >
                              <Trash2 size={14} />
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
        ) : (
          <Card className="shadow-xl">
            <CardContent className="p-12 text-center">
              <Calendar size={64} className="mx-auto text-gray-400 mb-6" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">No Bookings Found</h3>
              <p className="text-gray-600 mb-6">No bookings match the current filters. Try adjusting your filter criteria.</p>
              <Button variant="outline" onClick={clearFilters} className="border-blue-200 text-blue-600 hover:bg-blue-50">
                Clear All Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </div>
  );
};

export default BookingsPage;
