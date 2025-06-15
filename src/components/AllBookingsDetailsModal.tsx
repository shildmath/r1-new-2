
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { User, Info, Mail, BadgeCheck, Phone, Calendar, FileText, Trash2 } from "lucide-react";
import { toast } from "sonner";

type Props = {
  booking: any;
  open: boolean;
  onClose: () => void;
};

export default function AllBookingsDetailsModal({ booking, open, onClose }: Props) {
  if (!booking) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-xl w-full rounded-xl shadow-2xl p-0 animate-scale-in bg-gradient-to-br from-white to-accent-light">
        <DialogHeader className="px-7 pt-7 pb-1 border-b bg-gradient-to-r from-accent-light to-accent/10">
          <DialogTitle className="flex items-center gap-2 text-primary text-2xl font-bold">
            <Info size={22} className="text-accent" />
            Extra Details — {booking.first_name} {booking.last_name}
          </DialogTitle>
          <DialogDescription>
            View all captured information and closer assignment.
          </DialogDescription>
        </DialogHeader>
        <div className="px-7 py-6 flex flex-col gap-4 max-h-[65vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <User size={17} className="text-primary" />
                <span className="font-semibold text-primary">Client Name:</span>
                <span className="text-muted-foreground">{booking.first_name} {booking.last_name}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={17} className="text-primary" />
                <span className="font-semibold text-primary">Email:</span>
                <span className="text-muted-foreground">{booking.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={17} className="text-primary" />
                <span className="font-semibold text-primary">Phone:</span>
                <span className="text-muted-foreground">{booking.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <BadgeCheck size={17} className="text-primary" />
                <span className="font-semibold text-primary">Call Status:</span>
                <span className="text-muted-foreground">{booking.call_status}</span>
              </div>
              <div className="flex items-center gap-3">
                <BadgeCheck size={17} className="text-primary" />
                <span className="font-semibold text-primary">Deal Status:</span>
                <span className="text-muted-foreground">{booking.deal_status}</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar size={17} className="text-primary" />
                <span className="font-semibold text-primary">Date & Time:</span>
                <span className="text-muted-foreground">{booking.slot_date} {booking.slot_time ? `| ${booking.slot_time}` : ""}</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <User size={17} className="text-accent" />
                <span className="font-semibold text-accent">Closer Name:</span>
                <span className="text-muted-foreground">{booking.closer_name}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={17} className="text-accent" />
                <span className="font-semibold text-accent">Closer Email:</span>
                <span className="text-muted-foreground">{booking.closer_email}</span>
              </div>
              <div className="flex items-center gap-3">
                <FileText size={17} className="text-accent" />
                <span className="font-semibold text-accent">Booking Created:</span>
                <span className="text-muted-foreground">{booking.created_at}</span>
              </div>
              <div className="flex items-center gap-3">
                <FileText size={17} className="text-accent" />
                <span className="font-semibold text-accent">Additional Info:</span>
                <span className="text-muted-foreground">{booking.additional_info || <span className="italic text-gray-400">None</span>}</span>
              </div>
            </div>
          </div>
          <div className="border-t mt-2 pt-3 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="font-semibold text-accent mb-1 flex items-center gap-2"><FileText size={15}/> Notes</div>
              <div className="text-muted-foreground text-sm min-h-[32px]">{booking.note || <span className="italic text-gray-400">No notes added</span>}</div>
            </div>
            <div>
              <div className="font-semibold text-accent mb-1 flex items-center gap-2"><FileText size={15}/> Recording Link</div>
              <div>
                {booking.recording_link ? (
                  <a
                    href={booking.recording_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline hover:opacity-80"
                  >
                    View Recording
                  </a>
                ) : (
                  <span className="italic text-gray-400">Not available</span>
                )}
              </div>
            </div>
          </div>
        </div>
        <DialogFooter className="flex justify-end px-7 py-4 border-t gap-3">
          <Button variant="secondary" onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
