import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import Navbar from '@/components/Navbar';
import EnhancedFooter from '@/components/EnhancedFooter';
import { Star, ArrowRight, TrendingUp, Target, Users, ChevronDown } from 'lucide-react';

const Testimonials = () => {
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [visibleCount, setVisibleCount] = useState(12);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      company: "TechStartup Inc.",
      position: "CEO",
      industry: "Technology",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      testimonial: "AIAdMaxify completely transformed our digital presence. Within 3 months, we saw a 300% increase in qualified leads and our revenue grew by 180%. Their AI-powered approach to social media marketing is absolutely game-changing.",
      results: {
        before: "50 leads/month, $50K revenue",
        after: "200 leads/month, $140K revenue",
        timeframe: "3 months"
      },
      metrics: [
        { label: "Lead Increase", value: "+300%", icon: TrendingUp },
        { label: "Revenue Growth", value: "+180%", icon: Target },
        { label: "Conversion Rate", value: "+45%", icon: Users }
      ]
    },
    {
      id: 2,
      name: "Mike Chen",
      company: "E-commerce Pro",
      position: "Marketing Director",
      industry: "E-commerce",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      testimonial: "The ROI we've achieved with AIAdMaxify is unprecedented. Their data-driven PPC campaigns generated a 450% ROI while reducing our cost per acquisition by 60%. The team's expertise in AI marketing is unmatched.",
      results: {
        before: "2.1% conversion rate, $85 CPA",
        after: "5.8% conversion rate, $34 CPA",
        timeframe: "4 months"
      },
      metrics: [
        { label: "ROI Improvement", value: "+450%", icon: TrendingUp },
        { label: "CPA Reduction", value: "-60%", icon: Target },
        { label: "Conversion Rate", value: "+176%", icon: Users }
      ]
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      company: "Local Business Co.",
      position: "Owner",
      industry: "Local Services",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      testimonial: "As a local business, I was skeptical about digital marketing. AIAdMaxify proved me wrong. Their local SEO strategies helped us dominate our market, increasing our revenue by 280% and establishing us as the go-to provider in our area.",
      results: {
        before: "15 local customers/month",
        after: "57 local customers/month",
        timeframe: "6 months"
      },
      metrics: [
        { label: "Revenue Growth", value: "+280%", icon: TrendingUp },
        { label: "Local Visibility", value: "+320%", icon: Target },
        { label: "Customer Base", value: "+380%", icon: Users }
      ]
    },
    {
      id: 4,
      name: "David Park",
      company: "HealthTech Solutions",
      position: "VP Marketing",
      industry: "Healthcare",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      testimonial: "AIAdMaxify's content marketing strategy elevated our brand authority in the healthcare space. Our organic traffic increased by 400% and we're now recognized as thought leaders. The quality of their AI-generated content with human oversight is exceptional.",
      results: {
        before: "5K monthly organic visitors",
        after: "25K monthly organic visitors",
        timeframe: "8 months"
      },
      metrics: [
        { label: "Organic Traffic", value: "+400%", icon: TrendingUp },
        { label: "Brand Authority", value: "+250%", icon: Target },
        { label: "Lead Quality", value: "+85%", icon: Users }
      ]
    },
    {
      id: 5,
      name: "Lisa Thompson",
      company: "Fashion Forward",
      position: "CMO",
      industry: "Fashion",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      testimonial: "The influencer marketing campaigns AIAdMaxify created for us were phenomenal. We reached 2M+ potential customers and saw a 190% increase in brand awareness. Their strategic approach to influencer partnerships is brilliant.",
      results: {
        before: "50K social media reach",
        after: "2.1M social media reach",
        timeframe: "5 months"
      },
      metrics: [
        { label: "Reach Increase", value: "+4100%", icon: TrendingUp },
        { label: "Brand Awareness", value: "+190%", icon: Target },
        { label: "Engagement Rate", value: "+230%", icon: Users }
      ]
    },
    {
      id: 6,
      name: "Robert Martinez",
      company: "Financial Advisors Plus",
      position: "Partner",
      industry: "Finance",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      testimonial: "Trust is everything in our industry. AIAdMaxify helped us build that trust through strategic content marketing and thought leadership positioning. Our client acquisition increased by 220% and our average client value grew by 65%.",
      results: {
        before: "8 new clients/month, $5K avg value",
        after: "26 new clients/month, $8.2K avg value",
        timeframe: "7 months"
      },
      metrics: [
        { label: "Client Acquisition", value: "+220%", icon: TrendingUp },
        { label: "Client Value", value: "+65%", icon: Target },
        { label: "Trust Score", value: "+180%", icon: Users }
      ]
    },
    {
      id: 7,
      name: "Jennifer Wu",
      company: "Real Estate Empire",
      position: "CEO",
      industry: "Real Estate",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      testimonial: "Our property sales increased by 340% after implementing AIAdMaxify's digital marketing strategy. Their virtual tour campaigns and targeted advertising brought us high-quality leads that converted at an amazing rate.",
      results: {
        before: "12 properties sold/month",
        after: "53 properties sold/month",
        timeframe: "6 months"
      },
      metrics: [
        { label: "Sales Increase", value: "+340%", icon: TrendingUp },
        { label: "Lead Quality", value: "+280%", icon: Target },
        { label: "Commission", value: "+420%", icon: Users }
      ]
    },
    {
      id: 8,
      name: "Marcus Thompson",
      company: "Fitness Revolution",
      position: "Owner",
      industry: "Fitness",
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      testimonial: "AIAdMaxify helped us build a fitness community of over 50K members. Their social media strategy and influencer partnerships drove massive engagement and helped us launch our online training programs successfully.",
      results: {
        before: "500 gym members",
        after: "50K online community",
        timeframe: "12 months"
      },
      metrics: [
        { label: "Community Growth", value: "+9900%", icon: TrendingUp },
        { label: "Online Revenue", value: "+1200%", icon: Target },
        { label: "Retention Rate", value: "+85%", icon: Users }
      ]
    },
    {
      id: 9,
      name: "Amanda Foster",
      company: "Legal Solutions",
      position: "Managing Partner",
      industry: "Legal",
      image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      testimonial: "As a law firm, we needed to establish credibility online. AIAdMaxify's content marketing and SEO strategies positioned us as industry experts. Our case inquiries increased by 380% and our average case value grew significantly.",
      results: {
        before: "15 inquiries/month, $8K avg case",
        after: "72 inquiries/month, $15K avg case",
        timeframe: "9 months"
      },
      metrics: [
        { label: "Inquiries", value: "+380%", icon: TrendingUp },
        { label: "Case Value", value: "+87%", icon: Target },
        { label: "Authority Score", value: "+290%", icon: Users }
      ]
    },
    {
      id: 10,
      name: "Carlos Rodriguez",
      company: "Restaurant Chain Plus",
      position: "Marketing Manager",
      industry: "Food & Beverage",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      testimonial: "Our restaurant chain saw incredible results with AIAdMaxify's local marketing campaigns. Food delivery orders increased by 450% and our social media following grew from 2K to 85K. Their visual content strategy is outstanding.",
      results: {
        before: "200 daily orders, 2K followers",
        after: "1100 daily orders, 85K followers",
        timeframe: "8 months"
      },
      metrics: [
        { label: "Daily Orders", value: "+450%", icon: TrendingUp },
        { label: "Social Following", value: "+4150%", icon: Target },
        { label: "Revenue", value: "+380%", icon: Users }
      ]
    },
    {
      id: 11,
      name: "Rachel Green",
      company: "Beauty Boutique",
      position: "Founder",
      industry: "Beauty",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      testimonial: "AIAdMaxify transformed our beauty brand from a local store to a nationwide presence. Their influencer partnerships and social media campaigns generated over $2M in online sales within 10 months.",
      results: {
        before: "$50K monthly revenue",
        after: "$400K monthly revenue",
        timeframe: "10 months"
      },
      metrics: [
        { label: "Revenue Growth", value: "+700%", icon: TrendingUp },
        { label: "Online Sales", value: "+2000%", icon: Target },
        { label: "Brand Recognition", value: "+850%", icon: Users }
      ]
    },
    {
      id: 12,
      name: "Tom Anderson",
      company: "Auto Dealership Pro",
      position: "Sales Director",
      industry: "Automotive",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      testimonial: "Our car sales skyrocketed after partnering with AIAdMaxify. Their targeted advertising and lead generation system helped us sell 380% more vehicles. The quality of leads improved dramatically too.",
      results: {
        before: "25 cars sold/month",
        after: "120 cars sold/month",
        timeframe: "7 months"
      },
      metrics: [
        { label: "Vehicle Sales", value: "+380%", icon: TrendingUp },
        { label: "Lead Quality", value: "+290%", icon: Target },
        { label: "Profit Margin", value: "+145%", icon: Users }
      ]
    },
    {
      id: 13,
      name: "Dr. Patricia Kim",
      company: "Medical Practice",
      position: "Practice Owner",
      industry: "Healthcare",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      testimonial: "Patient appointments increased by 290% thanks to AIAdMaxify's healthcare marketing expertise. Their reputation management and local SEO strategies helped us become the top-rated practice in our area.",
      results: {
        before: "120 patients/month",
        after: "468 patients/month",
        timeframe: "11 months"
      },
      metrics: [
        { label: "Patient Growth", value: "+290%", icon: TrendingUp },
        { label: "Online Reviews", value: "+450%", icon: Target },
        { label: "Revenue", value: "+340%", icon: Users }
      ]
    },
    {
      id: 14,
      name: "Kevin O'Brien",
      company: "Construction Corp",
      position: "CEO",
      industry: "Construction",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      testimonial: "AIAdMaxify helped us modernize our construction business marketing. Project inquiries increased by 420% and our average project value grew by 180%. Their content strategy showcases our work beautifully.",
      results: {
        before: "8 projects/month, $45K avg",
        after: "42 projects/month, $126K avg",
        timeframe: "9 months"
      },
      metrics: [
        { label: "Project Inquiries", value: "+420%", icon: TrendingUp },
        { label: "Project Value", value: "+180%", icon: Target },
        { label: "Revenue", value: "+680%", icon: Users }
      ]
    },
    {
      id: 15,
      name: "Sophia Martinez",
      company: "Travel Adventures",
      position: "Owner",
      industry: "Travel",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      testimonial: "Our travel booking increased by 520% with AIAdMaxify's digital marketing campaigns. Their visual storytelling and social media strategy made our destinations irresistible to travelers worldwide.",
      results: {
        before: "50 bookings/month",
        after: "310 bookings/month",
        timeframe: "8 months"
      },
      metrics: [
        { label: "Bookings", value: "+520%", icon: TrendingUp },
        { label: "Revenue", value: "+480%", icon: Target },
        { label: "International Reach", value: "+890%", icon: Users }
      ]
    },
    {
      id: 16,
      name: "James Wilson",
      company: "Consulting Experts",
      position: "Principal",
      industry: "Consulting",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      testimonial: "AIAdMaxify positioned our consulting firm as industry thought leaders. Our client base grew by 350% and our average contract value increased by 240%. Their LinkedIn strategy was particularly effective.",
      results: {
        before: "12 clients, $25K avg contract",
        after: "54 clients, $85K avg contract",
        timeframe: "10 months"
      },
      metrics: [
        { label: "Client Growth", value: "+350%", icon: TrendingUp },
        { label: "Contract Value", value: "+240%", icon: Target },
        { label: "Authority", value: "+420%", icon: Users }
      ]
    },
    {
      id: 17,
      name: "Maya Patel",
      company: "Software Solutions",
      position: "CTO",
      industry: "Technology",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      testimonial: "Our SaaS product gained 15K new users within 6 months thanks to AIAdMaxify's growth hacking strategies. Their product marketing approach and conversion optimization increased our MRR by 580%.",
      results: {
        before: "500 users, $15K MRR",
        after: "15,500 users, $102K MRR",
        timeframe: "6 months"
      },
      metrics: [
        { label: "User Growth", value: "+3000%", icon: TrendingUp },
        { label: "MRR Growth", value: "+580%", icon: Target },
        { label: "Churn Reduction", value: "-65%", icon: Users }
      ]
    },
    {
      id: 18,
      name: "Andrew Clark",
      company: "Insurance Plus",
      position: "Agency Owner",
      industry: "Insurance",
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      testimonial: "AIAdMaxify's trust-building marketing strategies helped our insurance agency grow by 290%. Their educational content approach and local advertising brought us high-quality leads that converted excellently.",
      results: {
        before: "45 policies/month",
        after: "175 policies/month",
        timeframe: "8 months"
      },
      metrics: [
        { label: "Policy Sales", value: "+290%", icon: TrendingUp },
        { label: "Lead Quality", value: "+220%", icon: Target },
        { label: "Revenue", value: "+340%", icon: Users }
      ]
    },
    {
      id: 19,
      name: "Isabella Garcia",
      company: "Online Education Hub",
      position: "Founder",
      industry: "Education",
      image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      testimonial: "Our online course enrollment increased by 680% with AIAdMaxify's educational marketing strategies. Their webinar funnels and content marketing helped us reach learners globally.",
      results: {
        before: "200 students enrolled",
        after: "1,560 students enrolled",
        timeframe: "7 months"
      },
      metrics: [
        { label: "Enrollment", value: "+680%", icon: TrendingUp },
        { label: "Course Revenue", value: "+720%", icon: Target },
        { label: "Global Reach", value: "+950%", icon: Users }
      ]
    },
    {
      id: 20,
      name: "Daniel Lee",
      company: "Home Services Pro",
      position: "Operations Manager",
      industry: "Home Services",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      testimonial: "Service calls increased by 410% after implementing AIAdMaxify's local marketing strategy. Their Google Ads campaigns and reputation management made us the top choice for homeowners in our area.",
      results: {
        before: "80 service calls/month",
        after: "408 service calls/month",
        timeframe: "6 months"
      },
      metrics: [
        { label: "Service Calls", value: "+410%", icon: TrendingUp },
        { label: "Revenue", value: "+380%", icon: Target },
        { label: "Customer Rating", value: "+45%", icon: Users }
      ]
    },
    {
      id: 21,
      name: "Grace Chen",
      company: "Event Planning Elite",
      position: "Creative Director",
      industry: "Events",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      testimonial: "Our event bookings doubled within 4 months thanks to AIAdMaxify's visual marketing strategy. Their Instagram campaigns and influencer partnerships made our events the talk of the town.",
      results: {
        before: "15 events/month",
        after: "45 events/month",
        timeframe: "4 months"
      },
      metrics: [
        { label: "Event Bookings", value: "+200%", icon: TrendingUp },
        { label: "Average Value", value: "+180%", icon: Target },
        { label: "Social Reach", value: "+650%", icon: Users }
      ]
    },
    {
      id: 22,
      name: "Nathan Brown",
      company: "Pet Care Central",
      position: "Owner",
      industry: "Pet Services",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      testimonial: "Our pet grooming and boarding business grew by 320% with AIAdMaxify's local marketing expertise. Their heartwarming content strategy and community engagement brought us loyal pet parents.",
      results: {
        before: "25 pets/day",
        after: "105 pets/day",
        timeframe: "8 months"
      },
      metrics: [
        { label: "Daily Clients", value: "+320%", icon: TrendingUp },
        { label: "Revenue", value: "+290%", icon: Target },
        { label: "Customer Loyalty", value: "+240%", icon: Users }
      ]
    },
    {
      id: 23,
      name: "Victoria White",
      company: "Luxury Jewelry",
      position: "CEO",
      industry: "Luxury Goods",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      testimonial: "AIAdMaxify elevated our jewelry brand to luxury status. Their high-end marketing approach and influencer collaborations increased our sales by 450% and attracted celebrity clients.",
      results: {
        before: "$80K monthly sales",
        after: "$440K monthly sales",
        timeframe: "9 months"
      },
      metrics: [
        { label: "Sales Growth", value: "+450%", icon: TrendingUp },
        { label: "Brand Value", value: "+380%", icon: Target },
        { label: "Celebrity Clients", value: "+12", icon: Users }
      ]
    },
    {
      id: 24,
      name: "Ryan Davis",
      company: "Sports Academy",
      position: "Director",
      industry: "Sports",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      testimonial: "Our sports academy enrollment increased by 380% with AIAdMaxify's athletic marketing campaigns. Their video content and parent testimonials created tremendous trust in our programs.",
      results: {
        before: "85 students enrolled",
        after: "408 students enrolled",
        timeframe: "10 months"
      },
      metrics: [
        { label: "Enrollment", value: "+380%", icon: TrendingUp },
        { label: "Revenue", value: "+420%", icon: Target },
        { label: "Parent Satisfaction", value: "+95%", icon: Users }
      ]
    },
    {
      id: 25,
      name: "Olivia Johnson",
      company: "Wellness Center",
      position: "Founder",
      industry: "Wellness",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      testimonial: "Our wellness center became the premier destination in our city thanks to AIAdMaxify's holistic marketing approach. Client bookings increased by 290% and our community grew to 25K followers.",
      results: {
        before: "60 clients/month",
        after: "234 clients/month",
        timeframe: "7 months"
      },
      metrics: [
        { label: "Client Growth", value: "+290%", icon: TrendingUp },
        { label: "Revenue", value: "+320%", icon: Target },
        { label: "Community", value: "+2400%", icon: Users }
      ]
    },
    {
      id: 26,
      name: "Sophia Lee",
      company: "Tech Innovations",
      position: "CTO",
      industry: "Technology",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      testimonial: "AIAdMaxify's innovative strategies helped us launch our new tech product successfully. We achieved 500% more sign-ups than projected in the first month.",
      results: {
        before: "100 sign-ups/month",
        after: "600 sign-ups/month",
        timeframe: "1 month"
      },
      metrics: [
        { label: "Sign-ups", value: "+500%", icon: TrendingUp },
        { label: "Revenue", value: "+300%", icon: Target },
        { label: "Market Share", value: "+50%", icon: Users }
      ]
    },
    {
      id: 27,
      name: "Liam Smith",
      company: "Home Decor Co.",
      position: "Owner",
      industry: "Retail",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      testimonial: "Our online sales skyrocketed by 400% after implementing AIAdMaxify's marketing strategies. Their targeted ads and social media campaigns were game-changers.",
      results: {
        before: "$20K monthly sales",
        after: "$100K monthly sales",
        timeframe: "6 months"
      },
      metrics: [
        { label: "Sales Growth", value: "+400%", icon: TrendingUp },
        { label: "Customer Base", value: "+300%", icon: Target },
        { label: "Brand Awareness", value: "+500%", icon: Users }
      ]
    },
    {
      id: 28,
      name: "Emma Johnson",
      company: "Digital Marketing Agency",
      position: "Founder",
      industry: "Marketing",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      testimonial: "AIAdMaxify's insights and strategies helped us double our client base in just 3 months. Their expertise in digital marketing is unparalleled.",
      results: {
        before: "20 clients",
        after: "40 clients",
        timeframe: "3 months"
      },
      metrics: [
        { label: "Client Growth", value: "+100%", icon: TrendingUp },
        { label: "Revenue", value: "+150%", icon: Target },
        { label: "Market Position", value: "+200%", icon: Users }
      ]
    },
    {
      id: 29,
      name: "Noah Brown",
      company: "Fitness Studio",
      position: "Owner",
      industry: "Fitness",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      testimonial: "Our fitness studio's membership increased by 300% after partnering with AIAdMaxify. Their marketing strategies were exactly what we needed.",
      results: {
        before: "100 members",
        after: "400 members",
        timeframe: "4 months"
      },
      metrics: [
        { label: "Membership Growth", value: "+300%", icon: TrendingUp },
        { label: "Revenue", value: "+250%", icon: Target },
        { label: "Client Retention", value: "+80%", icon: Users }
      ]
    },
    {
      id: 30,
      name: "Ava Martinez",
      company: "Travel Agency",
      position: "Owner",
      industry: "Travel",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      testimonial: "AIAdMaxify's marketing strategies helped us increase our travel bookings by 500%. Their expertise in the travel industry is unmatched.",
      results: {
        before: "50 bookings/month",
        after: "300 bookings/month",
        timeframe: "5 months"
      },
      metrics: [
        { label: "Booking Growth", value: "+500%", icon: TrendingUp },
        { label: "Revenue", value: "+400%", icon: Target },
        { label: "Customer Satisfaction", value: "+90%", icon: Users }
      ]
    },
    {
      id: 31,
      name: "Lucas White",
      company: "Tech Solutions",
      position: "CTO",
      industry: "Technology",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      testimonial: "Our software sales increased by 400% after implementing AIAdMaxify's marketing strategies. Their insights were invaluable.",
      results: {
        before: "$30K monthly sales",
        after: "$150K monthly sales",
        timeframe: "6 months"
      },
      metrics: [
        { label: "Sales Growth", value: "+400%", icon: TrendingUp },
        { label: "Market Share", value: "+300%", icon: Target },
        { label: "Customer Base", value: "+200%", icon: Users }
      ]
    },
    {
      id: 32,
      name: "Mia Johnson",
      company: "E-commerce Store",
      position: "Owner",
      industry: "E-commerce",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      testimonial: "AIAdMaxify's marketing strategies helped us increase our online sales by 600%. Their expertise in e-commerce is top-notch.",
      results: {
        before: "$20K monthly sales",
        after: "$140K monthly sales",
        timeframe: "5 months"
      },
      metrics: [
        { label: "Sales Growth", value: "+600%", icon: TrendingUp },
        { label: "Customer Base", value: "+500%", icon: Target },
        { label: "Brand Recognition", value: "+400%", icon: Users }
      ]
    },
    {
      id: 33,
      name: "Ethan Brown",
      company: "Home Services",
      position: "Owner",
      industry: "Home Services",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      testimonial: "AIAdMaxify's marketing strategies helped us increase our service calls by 300%. Their expertise in local marketing is unmatched.",
      results: {
        before: "100 service calls/month",
        after: "400 service calls/month",
        timeframe: "4 months"
      },
      metrics: [
        { label: "Service Calls", value: "+300%", icon: TrendingUp },
        { label: "Revenue", value: "+250%", icon: Target },
        { label: "Customer Satisfaction", value: "+90%", icon: Users }
      ]
    },
    {
      id: 34,
      name: "Sophia Lee",
      company: "Digital Marketing Agency",
      position: "Founder",
      industry: "Marketing",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      testimonial: "AIAdMaxify's insights and strategies helped us double our client base in just 3 months. Their expertise in digital marketing is unparalleled.",
      results: {
        before: "20 clients",
        after: "40 clients",
        timeframe: "3 months"
      },
      metrics: [
        { label: "Client Growth", value: "+100%", icon: TrendingUp },
        { label: "Revenue", value: "+150%", icon: Target },
        { label: "Market Position", value: "+200%", icon: Users }
      ]
    },
    {
      id: 35,
      name: "Liam Smith",
      company: "Fitness Studio",
      position: "Owner",
      industry: "Fitness",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      testimonial: "Our fitness studio's membership increased by 300% after partnering with AIAdMaxify. Their marketing strategies were exactly what we needed.",
      results: {
        before: "100 members",
        after: "400 members",
        timeframe: "4 months"
      },
      metrics: [
        { label: "Membership Growth", value: "+300%", icon: TrendingUp },
        { label: "Revenue", value: "+250%", icon: Target },
        { label: "Client Retention", value: "+80%", icon: Users }
      ]
    },
    {
      id: 36,
      name: "Ava Martinez",
      company: "Travel Agency",
      position: "Owner",
      industry: "Travel",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      testimonial: "AIAdMaxify's marketing strategies helped us increase our travel bookings by 500%. Their expertise in the travel industry is unmatched.",
      results: {
        before: "50 bookings/month",
        after: "300 bookings/month",
        timeframe: "5 months"
      },
      metrics: [
        { label: "Booking Growth", value: "+500%", icon: TrendingUp },
        { label: "Revenue", value: "+400%", icon: Target },
        { label: "Customer Satisfaction", value: "+90%", icon: Users }
      ]
    },
    {
      id: 37,
      name: "Lucas White",
      company: "Tech Solutions",
      position: "CTO",
      industry: "Technology",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      testimonial: "Our software sales increased by 400% after implementing AIAdMaxify's marketing strategies. Their insights were invaluable.",
      results: {
        before: "$30K monthly sales",
        after: "$150K monthly sales",
        timeframe: "6 months"
      },
      metrics: [
        { label: "Sales Growth", value: "+400%", icon: TrendingUp },
        { label: "Market Share", value: "+300%", icon: Target },
        { label: "Customer Base", value: "+200%", icon: Users }
      ]
    },
    {
      id: 38,
      name: "Mia Johnson",
      company: "E-commerce Store",
      position: "Owner",
      industry: "E-commerce",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      testimonial: "AIAdMaxify's marketing strategies helped us increase our online sales by 600%. Their expertise in e-commerce is top-notch.",
      results: {
        before: "$20K monthly sales",
        after: "$140K monthly sales",
        timeframe: "5 months"
      },
      metrics: [
        { label: "Sales Growth", value: "+600%", icon: TrendingUp },
        { label: "Customer Base", value: "+500%", icon: Target },
        { label: "Brand Recognition", value: "+400%", icon: Users }
      ]
    },
    {
      id: 39,
      name: "Ethan Brown",
      company: "Home Services",
      position: "Owner",
      industry: "Home Services",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      testimonial: "AIAdMaxify's marketing strategies helped us increase our service calls by 300%. Their expertise in local marketing is unmatched.",
      results: {
        before: "100 service calls/month",
        after: "400 service calls/month",
        timeframe: "4 months"
      },
      metrics: [
        { label: "Service Calls", value: "+300%", icon: TrendingUp },
        { label: "Revenue", value: "+250%", icon: Target },
        { label: "Customer Satisfaction", value: "+90%", icon: Users }
      ]
    },
    {
      id: 40,
      name: "Sophia Lee",
      company: "Digital Marketing Agency",
      position: "Founder",
      industry: "Marketing",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      testimonial: "AIAdMaxify's insights and strategies helped us double our client base in just 3 months. Their expertise in digital marketing is unparalleled.",
      results: {
        before: "20 clients",
        after: "40 clients",
        timeframe: "3 months"
      },
      metrics: [
        { label: "Client Growth", value: "+100%", icon: TrendingUp },
        { label: "Revenue", value: "+150%", icon: Target },
        { label: "Market Position", value: "+200%", icon: Users }
      ]
    },
    {
      id: 41,
      name: "Liam Smith",
      company: "Fitness Studio",
      position: "Owner",
      industry: "Fitness",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      testimonial: "Our fitness studio's membership increased by 300% after partnering with AIAdMaxify. Their marketing strategies were exactly what we needed.",
      results: {
        before: "100 members",
        after: "400 members",
        timeframe: "4 months"
      },
      metrics: [
        { label: "Membership Growth", value: "+300%", icon: TrendingUp },
        { label: "Revenue", value: "+250%", icon: Target },
        { label: "Client Retention", value: "+80%", icon: Users }
      ]
    },
    {
      id: 42,
      name: "Ava Martinez",
      company: "Travel Agency",
      position: "Owner",
      industry: "Travel",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      testimonial: "AIAdMaxify's marketing strategies helped us increase our travel bookings by 500%. Their expertise in the travel industry is unmatched.",
      results: {
        before: "50 bookings/month",
        after: "300 bookings/month",
        timeframe: "5 months"
      },
      metrics: [
        { label: "Booking Growth", value: "+500%", icon: TrendingUp },
        { label: "Revenue", value: "+400%", icon: Target },
        { label: "Customer Satisfaction", value: "+90%", icon: Users }
      ]
    },
    {
      id: 43,
      name: "Lucas White",
      company: "Tech Solutions",
      position: "CTO",
      industry: "Technology",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      testimonial: "Our software sales increased by 400% after implementing AIAdMaxify's marketing strategies. Their insights were invaluable.",
      results: {
        before: "$30K monthly sales",
        after: "$150K monthly sales",
        timeframe: "6 months"
      },
      metrics: [
        { label: "Sales Growth", value: "+400%", icon: TrendingUp },
        { label: "Market Share", value: "+300%", icon: Target },
        { label: "Customer Base", value: "+200%", icon: Users }
      ]
    },
    {
      id: 44,
      name: "Mia Johnson",
      company: "E-commerce Store",
      position: "Owner",
      industry: "E-commerce",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      testimonial: "AIAdMaxify's marketing strategies helped us increase our online sales by 600%. Their expertise in e-commerce is top-notch.",
      results: {
        before: "$20K monthly sales",
        after: "$140K monthly sales",
        timeframe: "5 months"
      },
      metrics: [
        { label: "Sales Growth", value: "+600%", icon: TrendingUp },
        { label: "Customer Base", value: "+500%", icon: Target },
        { label: "Brand Recognition", value: "+400%", icon: Users }
      ]
    },
    {
      id: 45,
      name: "Ethan Brown",
      company: "Home Services",
      position: "Owner",
      industry: "Home Services",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      testimonial: "AIAdMaxify's marketing strategies helped us increase our service calls by 300%. Their expertise in local marketing is unmatched.",
      results: {
        before: "100 service calls/month",
        after: "400 service calls/month",
        timeframe: "4 months"
      },
      metrics: [
        { label: "Service Calls", value: "+300%", icon: TrendingUp },
        { label: "Revenue", value: "+250%", icon: Target },
        { label: "Customer Satisfaction", value: "+90%", icon: Users }
      ]
    },
    {
      id: 46,
      name: "Sophia Lee",
      company: "Digital Marketing Agency",
      position: "Founder",
      industry: "Marketing",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      testimonial: "AIAdMaxify's insights and strategies helped us double our client base in just 3 months. Their expertise in digital marketing is unparalleled.",
      results: {
        before: "20 clients",
        after: "40 clients",
        timeframe: "3 months"
      },
      metrics: [
        { label: "Client Growth", value: "+100%", icon: TrendingUp },
        { label: "Revenue", value: "+150%", icon: Target },
        { label: "Market Position", value: "+200%", icon: Users }
      ]
    },
    {
      id: 47,
      name: "Liam Smith",
      company: "Fitness Studio",
      position: "Owner",
      industry: "Fitness",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      testimonial: "Our fitness studio's membership increased by 300% after partnering with AIAdMaxify. Their marketing strategies were exactly what we needed.",
      results: {
        before: "100 members",
        after: "400 members",
        timeframe: "4 months"
      },
      metrics: [
        { label: "Membership Growth", value: "+300%", icon: TrendingUp },
        { label: "Revenue", value: "+250%", icon: Target },
        { label: "Client Retention", value: "+80%", icon: Users }
      ]
    },
    {
      id: 48,
      name: "Ava Martinez",
      company: "Travel Agency",
      position: "Owner",
      industry: "Travel",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      testimonial: "AIAdMaxify's marketing strategies helped us increase our travel bookings by 500%. Their expertise in the travel industry is unmatched.",
      results: {
        before: "50 bookings/month",
        after: "300 bookings/month",
        timeframe: "5 months"
      },
      metrics: [
        { label: "Booking Growth", value: "+500%", icon: TrendingUp },
        { label: "Revenue", value: "+400%", icon: Target },
        { label: "Customer Satisfaction", value: "+90%", icon: Users }
      ]
    },
    {
      id: 49,
      name: "Lucas White",
      company: "Tech Solutions",
      position: "CTO",
      industry: "Technology",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      testimonial: "Our software sales increased by 400% after implementing AIAdMaxify's marketing strategies. Their insights were invaluable.",
      results: {
        before: "$30K monthly sales",
        after: "$150K monthly sales",
        timeframe: "6 months"
      },
      metrics: [
        { label: "Sales Growth", value: "+400%", icon: TrendingUp },
        { label: "Market Share", value: "+300%", icon: Target },
        { label: "Customer Base", value: "+200%", icon: Users }
      ]
    },
    {
      id: 50,
      name: "Mia Johnson",
      company: "E-commerce Store",
      position: "Owner",
      industry: "E-commerce",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      testimonial: "AIAdMaxify's marketing strategies helped us increase our online sales by 600%. Their expertise in e-commerce is top-notch.",
      results: {
        before: "$20K monthly sales",
        after: "$140K monthly sales",
        timeframe: "5 months"
      },
      metrics: [
        { label: "Sales Growth", value: "+600%", icon: TrendingUp },
        { label: "Customer Base", value: "+500%", icon: Target },
        { label: "Brand Recognition", value: "+400%", icon: Users }
      ]
    },
    {
      id: 51,
      name: "Alexandra Thompson",
      company: "Premium Properties",
      position: "Real Estate Agent",
      industry: "Real Estate",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      testimonial: "AIAdMaxify revolutionized my real estate business. Their targeted marketing campaigns helped me close 12 luxury home sales in just 3 months, totaling over $8 million in revenue.",
      results: {
        before: "2 sales/month, $450K average",
        after: "12 sales/quarter, $670K average",
        timeframe: "3 months"
      },
      metrics: [
        { label: "Sales Volume", value: "+500%", icon: TrendingUp },
        { label: "Average Price", value: "+49%", icon: Target },
        { label: "Lead Quality", value: "+320%", icon: Users }
      ]
    },
    {
      id: 52,
      name: "Marcus Rodriguez",
      company: "Urban Realty Group",
      position: "Broker",
      industry: "Real Estate",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      testimonial: "The virtual tour campaigns and social media strategy from AIAdMaxify brought us 180 new listing inquiries in 2 months. Our market share grew dramatically.",
      results: {
        before: "25 inquiries/month",
        after: "180 inquiries/month",
        timeframe: "2 months"
      },
      metrics: [
        { label: "Inquiries", value: "+620%", icon: TrendingUp },
        { label: "Market Share", value: "+85%", icon: Target },
        { label: "Conversion Rate", value: "+78%", icon: Users }
      ]
    },
    {
      id: 53,
      name: "Samantha Chen",
      company: "Luxury Estates Co",
      position: "Senior Agent",
      industry: "Real Estate",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      testimonial: "Their drone photography campaigns and luxury marketing approach helped me establish myself as the go-to agent for high-end properties. Sales increased 340%.",
      results: {
        before: "$2.5M annual sales",
        after: "$11M annual sales",
        timeframe: "8 months"
      },
      metrics: [
        { label: "Annual Sales", value: "+340%", icon: TrendingUp },
        { label: "Luxury Listings", value: "+280%", icon: Target },
        { label: "Commission", value: "+340%", icon: Users }
      ]
    },
    {
      id: 54,
      name: "David Park",
      company: "Metropolitan Homes",
      position: "Team Lead",
      industry: "Real Estate",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      testimonial: "AIAdMaxify's local SEO and Google Ads campaigns made us the #1 real estate team in our city. We now handle 40% of all home sales in our area.",
      results: {
        before: "8% market share",
        after: "40% market share",
        timeframe: "12 months"
      },
      metrics: [
        { label: "Market Share", value: "+400%", icon: TrendingUp },
        { label: "Team Sales", value: "+650%", icon: Target },
        { label: "Brand Recognition", value: "+890%", icon: Users }
      ]
    },
    {
      id: 55,
      name: "Jennifer Walsh",
      company: "Coastal Properties",
      position: "Owner",
      industry: "Real Estate",
      image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      testimonial: "Their waterfront property marketing campaigns and influencer partnerships brought us international buyers. We sold 25 luxury oceanfront homes this year.",
      results: {
        before: "3 luxury sales/year",
        after: "25 luxury sales/year",
        timeframe: "10 months"
      },
      metrics: [
        { label: "Luxury Sales", value: "+733%", icon: TrendingUp },
        { label: "International Buyers", value: "+1200%", icon: Target },
        { label: "Revenue", value: "+890%", icon: Users }
      ]
    },
    {
      id: 101,
      name: "Isabella Martinez",
      company: "Glamour Studio",
      position: "Beauty Entrepreneur",
      industry: "Beauty",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      testimonial: "AIAdMaxify's influencer campaigns and social media strategy transformed my beauty brand from local to international. We now ship to 45 countries worldwide.",
      results: {
        before: "Local salon only",
        after: "45 countries, $2M revenue",
        timeframe: "8 months"
      },
      metrics: [
        { label: "Global Reach", value: "+4400%", icon: TrendingUp },
        { label: "Revenue", value: "+2000%", icon: Target },
        { label: "Brand Value", value: "+1500%", icon: Users }
      ]
    },
    {
      id: 102,
      name: "Sophia Williams",
      company: "Chic Fashion House",
      position: "Designer",
      industry: "Fashion",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      testimonial: "Their fashion week campaigns and celebrity styling partnerships got my designs featured in Vogue and worn by A-list celebrities. Sales exploded 580%.",
      results: {
        before: "$50K quarterly sales",
        after: "$340K quarterly sales",
        timeframe: "6 months"
      },
      metrics: [
        { label: "Sales Growth", value: "+580%", icon: TrendingUp },
        { label: "Celebrity Clients", value: "+15", icon: Target },
        { label: "Media Features", value: "+2200%", icon: Users }
      ]
    },
    {
      id: 103,
      name: "Emma Thompson",
      company: "Luxury Cosmetics",
      position: "Brand Manager",
      industry: "Beauty",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      testimonial: "AIAdMaxify's beauty influencer network and YouTube campaigns helped us launch our new skincare line to 2.5 million potential customers in the first month.",
      results: {
        before: "New brand launch",
        after: "2.5M reach, $890K sales",
        timeframe: "1 month"
      },
      metrics: [
        { label: "Launch Reach", value: "2.5M", icon: TrendingUp },
        { label: "First Month Sales", value: "$890K", icon: Target },
        { label: "Conversion Rate", value: "8.5%", icon: Users }
      ]
    },
    {
      id: 151,
      name: "Dr. Michelle Roberts",
      company: "Success Coaching Institute",
      position: "Life Coach",
      industry: "Coaching",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      testimonial: "AIAdMaxify's webinar funnels and content marketing helped me build a coaching empire. I went from 1-on-1 sessions to running a $3M coaching business.",
      results: {
        before: "Solo practice, $80K/year",
        after: "Coaching empire, $3M/year",
        timeframe: "18 months"
      },
      metrics: [
        { label: "Revenue Growth", value: "+3650%", icon: TrendingUp },
        { label: "Client Base", value: "+2800%", icon: Target },
        { label: "Course Sales", value: "+5000%", icon: Users }
      ]
    },
    {
      id: 152,
      name: "Robert Johnson",
      company: "Executive Leadership Co",
      position: "Business Coach",
      industry: "Coaching",
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      testimonial: "Their LinkedIn strategy and thought leadership campaigns made me the go-to executive coach for Fortune 500 companies. My coaching fees increased 450%.",
      results: {
        before: "$200/hour sessions",
        after: "$1200/hour + retainers",
        timeframe: "12 months"
      },
      metrics: [
        { label: "Hourly Rate", value: "+500%", icon: TrendingUp },
        { label: "Corporate Clients", value: "+890%", icon: Target },
        { label: "Speaking Fees", value: "+680%", icon: Users }
      ]
    },
    {
      id: 201,
      name: "Carlos Mendez",
      company: "SolarMax Solutions",
      position: "Sales Director",
      industry: "Solar",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      testimonial: "AIAdMaxify's green energy campaigns and government incentive marketing helped us become the #1 solar installer in our state. Installations increased 780%.",
      results: {
        before: "25 installations/month",
        after: "220 installations/month",
        timeframe: "10 months"
      },
      metrics: [
        { label: "Installations", value: "+780%", icon: TrendingUp },
        { label: "Market Share", value: "+450%", icon: Target },
        { label: "Revenue", value: "+890%", icon: Users }
      ]
    },
    {
      id: 202,
      name: "Angela Foster",
      company: "Green Power Systems",
      position: "CEO",
      industry: "Solar",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      testimonial: "Their educational content campaigns and environmental messaging helped us sign 1,200 new solar customers. We're now the fastest-growing solar company in the region.",
      results: {
        before: "50 customers/month",
        after: "1,200 customers/month",
        timeframe: "8 months"
      },
      metrics: [
        { label: "Customer Growth", value: "+2300%", icon: TrendingUp },
        { label: "Regional Rank", value: "#1", icon: Target },
        { label: "Revenue", value: "+1800%", icon: Users }
      ]
    },
    {
      id: 251,
      name: "Ashley Wilson",
      company: "FitLife Studios",
      position: "Fitness Entrepreneur",
      industry: "Fitness",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      testimonial: "AIAdMaxify's transformation story campaigns and before/after showcases helped me build a fitness empire. My online training programs now serve 15,000 clients globally.",
      results: {
        before: "Local gym, 200 members",
        after: "Global brand, 15K clients",
        timeframe: "14 months"
      },
      metrics: [
        { label: "Client Base", value: "+7400%", icon: TrendingUp },
        { label: "Global Reach", value: "+∞", icon: Target },
        { label: "Revenue", value: "+2200%", icon: Users }
      ]
    },
    {
      id: 301,
      name: "Jessica Chang",
      company: "TechGadgets Pro",
      position: "E-commerce Manager",
      industry: "E-commerce",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      testimonial: "AIAdMaxify's product launch campaigns and Amazon optimization strategies helped us become a top 3 seller in our category. Monthly revenue hit $2.5M.",
      results: {
        before: "$150K monthly revenue",
        after: "$2.5M monthly revenue",
        timeframe: "9 months"
      },
      metrics: [
        { label: "Revenue Growth", value: "+1567%", icon: TrendingUp },
        { label: "Amazon Rank", value: "Top 3", icon: Target },
        { label: "Conversion Rate", value: "+340%", icon: Users }
      ]
    },
    {
      id: 351,
      name: "Dr. Michael Foster",
      company: "Advanced Medical Center",
      position: "Medical Director",
      industry: "Healthcare",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      testimonial: "AIAdMaxify's medical marketing campaigns and patient education content helped us expand from 1 clinic to 8 locations across the state. Patient volume increased 450%.",
      results: {
        before: "1 clinic, 500 patients/month",
        after: "8 clinics, 2,750 patients/month",
        timeframe: "20 months"
      },
      metrics: [
        { label: "Locations", value: "+700%", icon: TrendingUp },
        { label: "Patient Volume", value: "+450%", icon: Target },
        { label: "Revenue", value: "+680%", icon: Users }
      ]
    }
  ];

  const industries = ['all', 'Technology', 'E-commerce', 'Local Services', 'Healthcare', 'Fashion', 'Finance', 'Real Estate', 'Fitness', 'Legal', 'Food & Beverage', 'Beauty', 'Automotive', 'Construction', 'Travel', 'Consulting', 'Insurance', 'Education', 'Home Services', 'Events', 'Pet Services', 'Luxury Goods', 'Sports', 'Wellness', 'Coaching', 'Solar', 'Marketing'];

  const filteredTestimonials = selectedIndustry === 'all' 
    ? testimonials 
    : testimonials.filter(t => t.industry === selectedIndustry);

  const visibleTestimonials = filteredTestimonials.slice(0, visibleCount);
  const hasMore = visibleCount < filteredTestimonials.length;

  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + 12, filteredTestimonials.length));
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      
      {/* Enhanced Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white pt-24 section-padding relative overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          />
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="bg-green-600 text-white mb-6 text-lg px-4 py-2">
              97% Client Satisfaction Rate
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Client <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Success Stories</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              See how we've helped businesses across industries achieve extraordinary growth 
              with our AI-powered marketing strategies. Real clients, real results.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="bg-white py-8 sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
              <SelectTrigger className="w-full sm:w-64 border-2 border-purple-200 focus:border-purple-500">
                <SelectValue placeholder="Filter by industry" />
              </SelectTrigger>
              <SelectContent className="max-h-60">
                <ScrollArea className="h-full">
                  {industries.map(industry => (
                    <SelectItem key={industry} value={industry}>
                      {industry === 'all' ? 'All Industries' : industry}
                    </SelectItem>
                  ))}
                </ScrollArea>
              </SelectContent>
            </Select>
            <div className="text-sm text-gray-600">
              Showing {visibleTestimonials.length} of {filteredTestimonials.length} testimonials
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Grid */}
      <section className="bg-gradient-to-br from-purple-50 to-blue-50 section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
            {visibleTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: (index % 12) * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <Card className="h-full shadow-xl border-0 bg-white overflow-hidden hover:shadow-2xl transition-all duration-300">
                  <CardHeader className="pb-4">
                    {/* Client Image and Rating */}
                    <div className="flex items-center space-x-4 mb-4">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-3 border-purple-200"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-1 mb-2">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} size={14} className="text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <Badge variant="outline" className="text-purple-600 border-purple-600 text-xs">
                          {testimonial.industry}
                        </Badge>
                      </div>
                    </div>
                    
                    <CardDescription className="text-gray-700 italic text-sm sm:text-base leading-relaxed line-clamp-4">
                      "{testimonial.testimonial}"
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    {/* Results Before/After */}
                    <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3 text-sm">Results Achieved</h4>
                      <div className="grid grid-cols-1 gap-2 text-xs sm:text-sm">
                        <div>
                          <span className="text-gray-600">Before: </span>
                          <span className="text-gray-800 break-words">{testimonial.results.before}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">After: </span>
                          <span className="text-purple-600 font-semibold break-words">{testimonial.results.after}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Timeframe: </span>
                          <span className="text-gray-800">{testimonial.results.timeframe}</span>
                        </div>
                      </div>
                    </div>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-3 gap-1 sm:gap-2 mb-4 sm:mb-6">
                      {testimonial.metrics.map((metric, metricIndex) => (
                        <div key={metricIndex} className="text-center p-2 sm:p-3 bg-white rounded-lg shadow-sm">
                          <metric.icon size={16} className="text-purple-600 mx-auto mb-1" />
                          <div className="text-sm sm:text-lg font-bold text-purple-600 break-words">{metric.value}</div>
                          <div className="text-xs text-gray-600 leading-tight">{metric.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Client Info */}
                    <div className="border-t pt-4">
                      <div className="font-bold text-gray-900 text-sm sm:text-base truncate">{testimonial.name}</div>
                      <div className="text-xs sm:text-sm text-gray-600 truncate">{testimonial.position}</div>
                      <div className="text-xs sm:text-sm text-purple-600 font-medium truncate">{testimonial.company}</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Load More Button */}
          {hasMore && (
            <motion.div 
              className="text-center mt-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Button 
                onClick={loadMore}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Load More Stories <ChevronDown className="ml-2" size={20} />
              </Button>
              <p className="text-gray-600 mt-4">
                {filteredTestimonials.length - visibleCount} more success stories available
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="bg-white section-padding">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Our <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Track Record</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Numbers don't lie. Here's what we've achieved for our clients across all industries.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {[
              { value: "97%", label: "Client Satisfaction", color: "text-green-600" },
              { value: "17X", label: "Average ROI", color: "text-purple-600" },
              { value: "2.8M+", label: "Leads Generated", color: "text-blue-600" },
              { value: "$50M+", label: "Revenue Generated", color: "text-orange-600" }
            ].map((stat, index) => (
              <motion.div 
                key={index} 
                className="text-center p-4 sm:p-6 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                whileHover={{ scale: 1.05 }}
              >
                <div className={`text-3xl sm:text-4xl lg:text-6xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
                <div className="text-gray-600 font-medium text-sm sm:text-base">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Ready to Be Our <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Next Success Story</span>?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join hundreds of successful businesses that have transformed their growth 
              with our AI-powered marketing strategies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/strategy-call">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8 py-4 w-full sm:w-auto">
                    Book Free Strategy Call <ArrowRight className="ml-2" size={20} />
                  </Button>
                </motion.div>
              </Link>
              <Link to="/services">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white text-lg px-8 py-4 w-full sm:w-auto">
                    View Our Services
                  </Button>
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <EnhancedFooter />
    </div>
  );
};

export default Testimonials;
