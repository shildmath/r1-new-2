
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { ContactSubmission } from '@/services/supabase';
import { Calendar, Mail, MessageSquare, Phone, User, MapPin, Globe } from 'lucide-react';

interface ContactSubmissionModalProps {
  submission: ContactSubmission | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: (submissionId: string, status: 'new' | 'contacted' | 'closed') => void;
}

const ContactSubmissionModal = ({ submission, isOpen, onClose, onStatusChange }: ContactSubmissionModalProps) => {
  if (!submission) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-orange-500 text-white';
      case 'contacted': return 'bg-blue-500 text-white';
      case 'closed': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getSourceColor = (source: string) => {
    return source === 'home' ? 'bg-blue-500 text-white' : 'bg-purple-500 text-white';
  };

  const getNextStatusAction = (currentStatus: string) => {
    switch (currentStatus) {
      case 'new': return { status: 'contacted', label: 'Mark as Contacted', color: 'bg-blue-500 hover:bg-blue-600' };
      case 'contacted': return { status: 'closed', label: 'Mark as Closed', color: 'bg-green-500 hover:bg-green-600' };
      case 'closed': return { status: 'new', label: 'Reopen', color: 'bg-orange-500 hover:bg-orange-600' };
      default: return { status: 'contacted', label: 'Mark as Contacted', color: 'bg-blue-500 hover:bg-blue-600' };
    }
  };

  const nextAction = getNextStatusAction(submission.status);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3 text-2xl">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <MessageSquare className="text-white" size={24} />
            </div>
            <div>
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Contact Submission Details
              </span>
              <div className="flex items-center space-x-2 mt-1">
                <Badge className={getStatusColor(submission.status)} variant="secondary">
                  {submission.status.toUpperCase()}
                </Badge>
                <Badge className={getSourceColor(submission.source)} variant="secondary">
                  {submission.source === 'home' ? 'Home Page' : 'Contact Page'}
                </Badge>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-8">
          {/* Contact Information Section */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center space-x-2">
              <User className="text-blue-600" size={20} />
              <span>Contact Information</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <User className="text-blue-600" size={16} />
                  </div>
                  <label className="text-sm font-medium text-gray-600">Full Name</label>
                </div>
                <p className="text-xl font-semibold text-gray-800">{submission.name}</p>
              </div>

              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <Mail className="text-green-600" size={16} />
                  </div>
                  <label className="text-sm font-medium text-gray-600">Email Address</label>
                </div>
                <p className="text-lg font-semibold text-gray-800 break-all">{submission.email}</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-3 text-xs"
                  onClick={() => window.open(`mailto:${submission.email}`, '_blank')}
                >
                  Send Email
                </Button>
              </div>

              {submission.phone && (
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Phone className="text-purple-600" size={16} />
                    </div>
                    <label className="text-sm font-medium text-gray-600">Phone Number</label>
                  </div>
                  <p className="text-lg font-semibold text-gray-800">{submission.phone}</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-3 text-xs"
                    onClick={() => window.open(`tel:${submission.phone}`, '_blank')}
                  >
                    Call Now
                  </Button>
                </div>
              )}

              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Calendar className="text-orange-600" size={16} />
                  </div>
                  <label className="text-sm font-medium text-gray-600">Submission Date</label>
                </div>
                <p className="text-lg font-semibold text-gray-800">
                  {new Date(submission.created_at || '').toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {new Date(submission.created_at || '').toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>

          {/* Message Section */}
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
              <MessageSquare className="text-blue-600" size={20} />
              <span>Message Content</span>
            </h3>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-base">
                  {submission.message}
                </p>
              </div>
              
              {submission.message.length > 200 && (
                <div className="mt-4 text-sm text-gray-500">
                  Character count: {submission.message.length}
                </div>
              )}
            </div>
          </div>

          {/* Metadata Section */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center space-x-2">
              <Globe className="text-purple-600" size={20} />
              <span>Submission Details</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Globe className="text-purple-600" size={16} />
                  </div>
                  <label className="text-sm font-medium text-gray-600">Source Page</label>
                </div>
                <Badge className={`${getSourceColor(submission.source)} px-3 py-1`}>
                  {submission.source === 'home' ? 'Home Page Form' : 'Contact Page Form'}
                </Badge>
              </div>

              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <Calendar className="text-green-600" size={16} />
                  </div>
                  <label className="text-sm font-medium text-gray-600">Submission ID</label>
                </div>
                <p className="font-mono text-sm text-gray-700 break-all">{submission.id}</p>
              </div>

              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <MessageSquare className="text-blue-600" size={16} />
                  </div>
                  <label className="text-sm font-medium text-gray-600">Current Status</label>
                </div>
                <Select 
                  value={submission.status} 
                  onValueChange={(value: 'new' | 'contacted' | 'closed') => onStatusChange(submission.id, value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="contacted">Contacted</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center pt-6 border-t border-gray-200">
            <div className="flex space-x-3">
              <Button
                onClick={() => onStatusChange(submission.id, nextAction.status as 'new' | 'contacted' | 'closed')}
                className={`${nextAction.color} text-white shadow-lg`}
              >
                {nextAction.label}
              </Button>
              
              <Button
                variant="outline"
                onClick={() => window.open(`mailto:${submission.email}?subject=Re: Your inquiry&body=Hi ${submission.name},%0D%0A%0D%0AThank you for reaching out to us.`, '_blank')}
                className="border-blue-200 text-blue-600 hover:bg-blue-50"
              >
                <Mail size={16} className="mr-2" />
                Reply via Email
              </Button>
            </div>
            
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactSubmissionModal;
