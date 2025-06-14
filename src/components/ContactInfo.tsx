
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    details: "info@aiadmaxify.com",
    description: "Send us an email anytime.",
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  },
  {
    icon: Phone,
    title: "Call Us",
    details: "+1 (555) 123-4567",
    description: "Mon–Fri, 8am–6pm EST",
    color: "text-green-600",
    bgColor: "bg-green-50"
  },
  {
    icon: MapPin,
    title: "Visit Office",
    details: "123 Innovation Dr, Tech City",
    description: "Headquarters location.",
    color: "text-purple-600",
    bgColor: "bg-purple-50"
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: "Mon–Fri: 8am–6pm EST",
    description: "Sat: 9am–2pm EST",
    color: "text-orange-600",
    bgColor: "bg-orange-50"
  }
];

const ContactInfo = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 w-full animate-fade-in">
    {contactInfo.map((info, idx) => (
      <motion.div
        key={info.title}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: idx * 0.07 }}
        whileHover={{ y: -5, scale: 1.05 }}
      >
        <Card className="h-full text-center group shadow-lg border-0">
          <CardHeader>
            <div className={`w-14 h-14 ${info.bgColor} rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition duration-200`}>
              <info.icon size={28} className={info.color} />
            </div>
            <CardTitle className="text-base font-semibold text-primary">
              {info.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm font-bold text-accent mb-1">{info.details}</div>
            <CardDescription className="text-muted-foreground">{info.description}</CardDescription>
          </CardContent>
        </Card>
      </motion.div>
    ))}
  </div>
);

export default ContactInfo;

