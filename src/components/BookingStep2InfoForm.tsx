import { motion } from "framer-motion";
import { User } from "lucide-react";
import { format } from "date-fns";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type BookingStep2InfoFormProps = {
  selectedDate: Date | undefined;
  selectedTime: string;
  formData: { firstName: string, lastName: string, email: string, phone: string, additionalInfo: string };
  setFormData: (data: BookingStep2InfoFormProps["formData"]) => void;
  onBack: () => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
  closerName: string;
  timeZone?: string;
};

export default function BookingStep2InfoForm({
  selectedDate,
  selectedTime,
  formData,
  setFormData,
  onBack,
  onSubmit,
  isSubmitting,
  closerName,
  timeZone,
}: BookingStep2InfoFormProps) {
  function handleFieldChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  return (
    <motion.div initial={{opacity: 0, y: 40}} animate={{opacity: 1, y: 0}} className="max-w-xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>
            <span className="flex items-center gap-2">
              <User size={20} /> Your Information
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-blue-50 p-4 rounded-lg mb-5">
            <h4 className="font-bold mb-2 text-blue-900">Selected:</h4>
            <div className="flex flex-wrap gap-6 text-blue-800 text-sm">
              <div><b>Date:</b> {selectedDate ? format(selectedDate, "PPP") : ""}</div>
              <div><b>Time:</b> {selectedTime}</div>
              <div><b>TimeZone:</b> <span className="font-mono">{timeZone ?? "UTC"}</span></div>
              <div><b>With:</b> {closerName}</div>
            </div>
          </div>
          <form onSubmit={onSubmit} className="space-y-5">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="space-y-2 w-full">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleFieldChange}
                />
              </div>
              <div className="space-y-2 w-full">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleFieldChange}
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="space-y-2 w-full">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleFieldChange}
                />
              </div>
              <div className="space-y-2 w-full">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleFieldChange}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="additionalInfo">Additional Information (Optional)</Label>
              <Textarea
                id="additionalInfo"
                name="additionalInfo"
                rows={3}
                value={formData.additionalInfo}
                onChange={handleFieldChange}
                placeholder="Tell us about your business goals, current challenges, or any specific topics you'd like to discuss during the strategy call..."
              />
            </div>
            <div className="flex flex-col md:flex-row gap-4 mt-4">
              <Button
                type="button"
                variant="outline"
                className="w-full md:w-auto"
                onClick={onBack}
              >
                Back
              </Button>
              <Button
                type="submit"
                className="w-full md:w-auto bg-gradient-to-r from-primary to-accent"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Booking..." : "Confirm and Book"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
