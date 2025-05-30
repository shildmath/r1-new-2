
import { Booking, ContactSubmission } from '@/types/admin';

export const exportBookingsToCSV = (bookings: Booking[]) => {
  const headers = [
    'ID',
    'First Name',
    'Last Name',
    'Email',
    'Phone',
    'Preferred Date',
    'Preferred Time',
    'Call Status',
    'Deal Status',
    'Closed Date',
    'Follow Up Date',
    'Payment Link Sent',
    'Contract Link Sent',
    'Offer Made',
    'Ad Spend',
    'Country',
    'Zip Code',
    'Recording Link',
    'Note',
    'Additional Info',
    'Created At'
  ];

  const csvContent = [
    headers.join(','),
    ...bookings.map(booking => [
      booking.id,
      `"${booking.firstName}"`,
      `"${booking.lastName}"`,
      `"${booking.email}"`,
      `"${booking.phone}"`,
      booking.preferredDate,
      booking.preferredTime,
      booking.callStatus || 'confirmed',
      booking.dealStatus || 'follow-up',
      booking.closedDate || '',
      booking.followUpDate || '',
      booking.paymentLinkSent ? 'Yes' : 'No',
      booking.contractLinkSent ? 'Yes' : 'No',
      booking.offerMade ? 'Yes' : 'No',
      `"${booking.adSpend || ''}"`,
      `"${booking.country || ''}"`,
      `"${booking.zipCode || ''}"`,
      `"${booking.recordingLink || ''}"`,
      `"${booking.note || ''}"`,
      `"${booking.additionalInfo || ''}"`,
      new Date(booking.createdAt).toLocaleString()
    ].join(','))
  ].join('\n');

  downloadCSV(csvContent, 'bookings.csv');
};

export const exportContactSubmissionsToCSV = (submissions: ContactSubmission[]) => {
  const headers = [
    'ID',
    'Name',
    'Email',
    'Phone',
    'Message',
    'Source',
    'Status',
    'Created At'
  ];

  const csvContent = [
    headers.join(','),
    ...submissions.map(submission => [
      submission.id,
      `"${submission.name}"`,
      `"${submission.email}"`,
      `"${submission.phone || ''}"`,
      `"${submission.message.replace(/"/g, '""')}"`,
      submission.source,
      submission.status,
      new Date(submission.createdAt).toLocaleString()
    ].join(','))
  ].join('\n');

  downloadCSV(csvContent, 'contact-submissions.csv');
};

export const exportToCSV = (data: any[], filename: string) => {
  if (data.length === 0) return;
  
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const value = row[header];
        if (typeof value === 'string' && value.includes(',')) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(',')
    )
  ].join('\n');

  downloadCSV(csvContent, filename);
};

const downloadCSV = (content: string, filename: string) => {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
