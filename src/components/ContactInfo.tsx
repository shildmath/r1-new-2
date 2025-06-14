
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

// Add WhatsApp detail for extra contact option
const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    details: (
      <a href="mailto:info@aiadmaxify.com" className="text-blue-600 underline hover:text-blue-800 transition">
        info@aiadmaxify.com
      </a>
    ),
    description: "Send us an email anytime.",
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  },
  {
    icon: Phone,
    title: "Call Us",
    details: (
      <a href="tel:+15551234567" className="text-green-700 underline hover:text-green-900 transition">
        +1 (555) 123-4567
      </a>
    ),
    description: "Mon–Fri, 8am–6pm EST",
    color: "text-green-600",
    bgColor: "bg-green-50"
  },
  {
    icon: MapPin,
    title: "Visit Office",
    details: (
      <span className="text-purple-700 font-medium">
        123 Innovation Dr, Tech City
      </span>
    ),
    description: "Headquarters location.",
    color: "text-purple-600",
    bgColor: "bg-purple-50"
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: (
      <span>
        <span className="text-orange-600 font-semibold">Mon–Fri: 8am–6pm EST</span>
        <br className="hidden sm:block" />
        <span className="text-orange-600 font-medium">Sat: 9am–2pm EST</span>
      </span>
    ),
    description: "Feel free to reach out during these hours.",
    color: "text-orange-600",
    bgColor: "bg-orange-50"
  },
  {
    icon: () => <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-7 h-7" />,
    title: "WhatsApp Message",
    details: (
      <a
        href="https://wa.me/15551234567"
        target="_blank"
        rel="noopener noreferrer"
        className="text-green-500 underline hover:text-green-700 transition"
      >
        +1 (555) 123-4567
      </a>
    ),
    description: "Chat with us instantly on WhatsApp.",
    color: "text-green-500",
    bgColor: "bg-green-100"
  }
];

// Responsive grid for cards
const gridVariant = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.11,
    },
  },
};
const cardVariant = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
  hover: { y: -8, scale: 1.042, boxShadow: "0 8px 24px rgba(170,170,255,0.12)" }
};

const ContactInfo = () => (
  <motion.div
    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 sm:gap-6 mb-8 w-full [&>div]:h-full"
    variants={gridVariant}
    initial="hidden"
    animate="visible"
  >
    {contactInfo.map((info, idx) => (
      <motion.div
        key={info.title}
        variants={cardVariant}
        whileHover="hover"
        className="will-change-transform"
      >
        <Card className="h-full text-center shadow-xl border-0 hover-lift transition-all duration-300">
          <CardHeader>
            <div className={`w-14 h-14 ${info.bgColor} rounded-full flex items-center justify-center mx-auto mb-2 shadow-sm`}>
              {/* @ts-ignore */}
              <info.icon size={32} className={info.color} />
            </div>
            <CardTitle className="text-base font-bold text-primary mb-1">
              {info.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm font-bold text-accent mb-1 leading-snug">{info.details}</div>
            <CardDescription className="text-muted-foreground">{info.description}</CardDescription>
          </CardContent>
        </Card>
      </motion.div>
    ))}
  </motion.div>
);

export default ContactInfo;

