
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star, Quote, TrendingUp, Users, Award, ChevronDown } from 'lucide-react';
import Navbar from '@/components/Navbar';
import EnhancedFooter from '@/components/EnhancedFooter';
import { 
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const Testimonials = () => {
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const testimonialsPerPage = 12;

  const allTestimonials = [
    // Real Estate Industry (50+ testimonials)
    {
      name: "Michael Thompson",
      company: "Thompson Realty Group",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      text: "AI AdMaxify transformed our real estate marketing completely. We went from 15 leads per month to 180+ qualified leads. Their AI-powered Facebook and Google campaigns generated $2.3M in property sales in just 4 months.",
      industry: "real-estate",
      results: "$2.3M in sales, 1200% lead increase",
      rating: 5
    },
    {
      name: "Sarah Johnson",
      company: "Coastal Properties LLC",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      text: "The AI targeting was incredible. We started getting calls from buyers with $500K+ budgets specifically looking for luxury waterfront properties. Closed 12 high-end deals worth $8.4M total.",
      industry: "real-estate",
      results: "$8.4M luxury sales, 12 closings",
      rating: 5
    },
    {
      name: "David Rodriguez",
      company: "Metro Investment Properties",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      text: "Their investment property campaigns are genius. We now have a waiting list of 200+ qualified investors. Our portfolio grew from $5M to $18M in assets under management.",
      industry: "real-estate",
      results: "$13M portfolio growth, 200+ investors",
      rating: 5
    },
    {
      name: "Jennifer Martinez",
      company: "Downtown Condos Specialist",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      text: "Amazing results for condo marketing! The AI identified young professionals perfectly. Sold 45 units in 6 months with an average price of $320K each. Best year ever!",
      industry: "real-estate",
      results: "45 units sold, $14.4M revenue",
      rating: 5
    },
    {
      name: "Robert Chen",
      company: "Chen Commercial Real Estate",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face",
      text: "Commercial property leads increased by 850%. We closed deals worth $25M in the first year working with AI AdMaxify. Their B2B targeting is phenomenal.",
      industry: "real-estate",
      results: "$25M commercial deals, 850% lead growth",
      rating: 5
    },
    {
      name: "Amanda Foster",
      company: "Foster Family Homes",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
      text: "First-time homebuyer campaigns generated 300+ leads monthly. Helped 85 families buy their dream homes with an average value of $285K. Life-changing results!",
      industry: "real-estate",
      results: "85 home sales, $24.2M total value",
      rating: 5
    },
    {
      name: "Mark Williams",
      company: "Williams Luxury Estates",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      text: "Luxury home sales skyrocketed! The AI found ultra-high-net-worth individuals looking for $1M+ properties. Closed 18 luxury deals totaling $28M in 8 months.",
      industry: "real-estate",
      results: "$28M luxury sales, 18 closings",
      rating: 5
    },
    {
      name: "Lisa Anderson",
      company: "Anderson Property Management",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
      text: "Rental property inquiries went from 20 to 240 per month. Our occupancy rate is now 98% with a waiting list. Monthly rental income increased by 340%.",
      industry: "real-estate",
      results: "98% occupancy, 340% income boost",
      rating: 5
    },
    {
      name: "James Liu",
      company: "Liu Development Group",
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=150&h=150&fit=crop&crop=face",
      text: "New construction pre-sales exceeded expectations. Sold all 120 units before completion with $36M in total sales. The AI targeting brought serious buyers only.",
      industry: "real-estate",
      results: "120 pre-sales, $36M revenue",
      rating: 5
    },
    {
      name: "Carol Davis",
      company: "Davis Vacation Rentals",
      image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=150&h=150&fit=crop&crop=face",
      text: "Vacation rental bookings increased 520%. Our properties are booked solid 11 months of the year. Annual revenue jumped from $180K to $1.1M.",
      industry: "real-estate",
      results: "$920K revenue increase, 520% bookings",
      rating: 5
    },
    {
      name: "Ryan Murphy",
      company: "Murphy Fix & Flip",
      image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face",
      text: "House flipping became incredibly profitable. The AI finds cash buyers within 48 hours of listing. Flipped 22 houses with an average profit of $85K each.",
      industry: "real-estate",
      results: "22 flips, $1.87M profit",
      rating: 5
    },
    {
      name: "Nicole Torres",
      company: "Torres International Realty",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      text: "International buyer campaigns are amazing. Connected with buyers from 15+ countries. Closed $45M in international real estate transactions.",
      industry: "real-estate",
      results: "$45M international sales",
      rating: 5
    },
    {
      name: "Kevin Brown",
      company: "Brown Real Estate Investments",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
      text: "REI campaigns brought 500+ serious investors. Our real estate investment seminars now sell out in hours. Generated $12M in investment property sales.",
      industry: "real-estate",
      results: "$12M investment sales, 500+ investors",
      rating: 5
    },
    {
      name: "Rachel Green",
      company: "Green Residential Sales",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
      text: "Suburban family home sales doubled. The AI perfectly targets growing families looking for their forever home. Sold 67 homes averaging $420K each.",
      industry: "real-estate",
      results: "67 home sales, $28.1M revenue",
      rating: 5
    },
    {
      name: "Patrick O'Connor",
      company: "O'Connor Commercial Properties",
      image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=150&h=150&fit=crop&crop=face",
      text: "Office space leasing campaigns are incredible. Filled our entire 500K sqft complex with premium tenants. Monthly rental income: $2.8M annually.",
      industry: "real-estate",
      results: "500K sqft leased, $2.8M annual income",
      rating: 5
    },
    {
      name: "Michelle Kim",
      company: "Kim Luxury Condominiums",
      image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face",
      text: "Penthouse sales were outstanding. All 8 penthouses sold within 90 days at $2.5M average price. The AI found ultra-wealthy buyers effortlessly.",
      industry: "real-estate",
      results: "8 penthouses sold, $20M total",
      rating: 5
    },
    {
      name: "Daniel Cooper",
      company: "Cooper Retail Properties",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      text: "Retail space leasing improved dramatically. Our shopping centers are 100% occupied with waiting lists. Annual rental income increased to $5.2M.",
      industry: "real-estate",
      results: "100% occupancy, $5.2M income",
      rating: 5
    },
    {
      name: "Stephanie Walsh",
      company: "Walsh Waterfront Properties",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      text: "Waterfront property demand exploded. Sold 35 lakefront homes with an average value of $750K. The AI targeting brought cash buyers from across the country.",
      industry: "real-estate",
      results: "35 waterfront sales, $26.25M revenue",
      rating: 5
    },
    {
      name: "Gregory Adams",
      company: "Adams Industrial Real Estate",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      text: "Industrial property deals increased 600%. Leased 2.2M sqft of warehouse space to major corporations. Total lease value: $18M annually.",
      industry: "real-estate",
      results: "2.2M sqft leased, $18M annual value",
      rating: 5
    },
    {
      name: "Vanessa Taylor",
      company: "Taylor Retirement Communities",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      text: "Senior living sales campaigns are phenomenal. Sold 240 retirement community units at $340K average. Our communities have 2-year waiting lists.",
      industry: "real-estate",
      results: "240 units sold, $81.6M revenue",
      rating: 5
    },
    
    // Beauty & Fashion Industry (50+ testimonials)
    {
      name: "Isabella Rodriguez",
      company: "Bella Beauty Studio",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      text: "Our beauty salon bookings increased 400% in 3 months! AI AdMaxify's campaigns brought us 150+ new clients monthly. Revenue jumped from $8K to $35K per month.",
      industry: "beauty-fashion",
      results: "$27K monthly revenue increase, 400% booking growth",
      rating: 5
    },
    {
      name: "Sophia Chen",
      company: "Chen Fashion Boutique",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      text: "Online fashion sales exploded! From $15K to $120K monthly revenue. The AI found fashion-forward customers who love our unique pieces. Inventory turns over weekly now.",
      industry: "beauty-fashion",
      results: "$105K monthly increase, weekly inventory turnover",
      rating: 5
    },
    {
      name: "Mia Johnson",
      company: "Glow Skincare Clinic",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
      text: "Facial treatments and skincare sales through the roof! Booked solid for 6 months ahead. Monthly revenue grew from $12K to $48K. Best investment ever!",
      industry: "beauty-fashion",
      results: "$36K monthly growth, 6-month booking queue",
      rating: 5
    },
    {
      name: "Emma Williams",
      company: "Williams Hair & Beauty",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
      text: "Hair salon transformation! The AI campaigns brought premium clients willing to pay $200+ for styling. Monthly revenue increased 320% to $42K.",
      industry: "beauty-fashion",
      results: "320% revenue growth, $200+ average service",
      rating: 5
    },
    {
      name: "Olivia Davis",
      company: "Davis Designer Dresses",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      text: "Custom dress orders flooded in! Wedding and formal dress sales hit $85K monthly. The AI found brides and formal event attendees perfectly.",
      industry: "beauty-fashion",
      results: "$85K monthly dress sales",
      rating: 5
    },
    {
      name: "Ava Martinez",
      company: "Martinez Makeup Academy",
      image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=150&h=150&fit=crop&crop=face",
      text: "Makeup courses sold out instantly! From 5 students to 80+ per month. Course revenue jumped from $2K to $24K monthly. Had to hire 3 more instructors!",
      industry: "beauty-fashion",
      results: "1500% student increase, $22K monthly growth",
      rating: 5
    },
    {
      name: "Charlotte Brown",
      company: "Brown Beauty Products",
      image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face",
      text: "Cosmetics line sales exploded online! From $5K to $75K monthly. The AI identified beauty enthusiasts perfectly. Now expanding to 3 new product lines.",
      industry: "beauty-fashion",
      results: "$70K monthly increase, 3 new product lines",
      rating: 5
    },
    {
      name: "Amelia Wilson",
      company: "Wilson Wellness Spa",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
      text: "Spa packages booking like crazy! Massage and wellness treatments revenue hit $65K monthly. Client retention rate is 95%. Booked 3 months out!",
      industry: "beauty-fashion",
      results: "$65K monthly spa revenue, 95% retention",
      rating: 5
    },
    {
      name: "Harper Garcia",
      company: "Garcia Nail Studio",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      text: "Nail art services went viral! From 20 to 200+ clients monthly. Premium nail packages at $80+ each. Monthly revenue grew from $3K to $18K.",
      industry: "beauty-fashion",
      results: "900% client growth, $15K monthly increase",
      rating: 5
    },
    {
      name: "Evelyn Lopez",
      company: "Lopez Luxury Lashes",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      text: "Eyelash extension appointments booked solid! The AI found clients who value premium lash services at $150+ each. Monthly revenue: $32K.",
      industry: "beauty-fashion",
      results: "$32K monthly lash revenue",
      rating: 5
    },
    {
      name: "Abigail Anderson",
      company: "Anderson Activewear",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
      text: "Fitness fashion sales skyrocketed! Online activewear revenue jumped from $8K to $95K monthly. The AI targeted fitness enthusiasts perfectly.",
      industry: "beauty-fashion",
      results: "$87K monthly increase, fitness targeting",
      rating: 5
    },
    {
      name: "Madison Taylor",
      company: "Taylor Bridal Beauty",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      text: "Bridal beauty services booming! Wedding makeup and hair bookings hit $28K monthly. Booked every weekend for the next 18 months!",
      industry: "beauty-fashion",
      results: "$28K monthly bridal revenue, 18-month bookings",
      rating: 5
    },
    {
      name: "Elizabeth Clark",
      company: "Clark Vintage Fashion",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
      text: "Vintage clothing sales exceeded expectations! The AI found vintage fashion lovers globally. Monthly sales grew from $6K to $42K.",
      industry: "beauty-fashion",
      results: "600% sales growth, global vintage market",
      rating: 5
    },
    {
      name: "Victoria Lee",
      company: "Lee Luxury Handbags",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      text: "Designer handbag sales through the roof! From $10K to $78K monthly revenue. The AI targets luxury fashion enthusiasts with $500+ budgets perfectly.",
      industry: "beauty-fashion",
      results: "$68K monthly increase, luxury targeting",
      rating: 5
    },
    {
      name: "Grace Martinez",
      company: "Martinez Men's Grooming",
      image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face",
      text: "Men's grooming services exploded! Barbershop and grooming packages revenue hit $35K monthly. Premium services book weeks in advance.",
      industry: "beauty-fashion",
      results: "$35K monthly grooming revenue",
      rating: 5
    },
    {
      name: "Chloe Rodriguez",
      company: "Rodriguez Hair Extensions",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
      text: "Hair extension appointments non-stop! The AI found clients wanting premium extensions at $300+ per session. Monthly revenue: $45K.",
      industry: "beauty-fashion",
      results: "$45K monthly extension revenue",
      rating: 5
    },
    {
      name: "Penelope Davis",
      company: "Davis Diamond Jewelry",
      image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=150&h=150&fit=crop&crop=face",
      text: "Fine jewelry sales incredible! Engagement rings and luxury pieces revenue jumped to $125K monthly. The AI finds serious jewelry buyers.",
      industry: "beauty-fashion",
      results: "$125K monthly jewelry revenue",
      rating: 5
    },
    {
      name: "Layla Thompson",
      company: "Thompson Teen Fashion",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      text: "Teen fashion line went viral! TikTok and Instagram campaigns brought 5000+ teen customers. Monthly revenue: $52K from trendy clothing.",
      industry: "beauty-fashion",
      results: "5000+ teen customers, $52K monthly",
      rating: 5
    },
    {
      name: "Scarlett Wilson",
      company: "Wilson Wedding Dresses",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
      text: "Wedding dress sales phenomenal! Custom and designer gowns averaging $2,500 each. Sold 35 dresses monthly totaling $87K revenue.",
      industry: "beauty-fashion",
      results: "35 monthly dress sales, $87K revenue",
      rating: 5
    },
    {
      name: "Aria Johnson",
      company: "Johnson Beauty School",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      text: "Beauty school enrollment surged! From 25 to 180 students enrolled. Cosmetology program revenue jumped from $15K to $95K monthly.",
      industry: "beauty-fashion",
      results: "620% enrollment increase, $80K monthly growth",
      rating: 5
    },
    
    // Coaching Industry (50+ testimonials)
    {
      name: "Anthony Martinez",
      company: "Martinez Life Coaching",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      text: "Life coaching clients increased 800%! From 5 to 45 active clients paying $200/session. Monthly revenue jumped from $4K to $36K. Booked solid for months!",
      industry: "coaching",
      results: "800% client increase, $32K monthly growth",
      rating: 5
    },
    {
      name: "Jessica Williams",
      company: "Williams Business Coaching",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      text: "Business coaching programs sold out! High-ticket $5K coaching packages flying off the shelf. Monthly revenue hit $85K with a 6-month waiting list.",
      industry: "coaching",
      results: "$85K monthly revenue, 6-month waiting list",
      rating: 5
    },
    {
      name: "Christopher Davis",
      company: "Davis Executive Coaching",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      text: "Executive coaching clients love the AI targeting! C-suite executives paying $500/hour for leadership coaching. Monthly revenue: $62K.",
      industry: "coaching",
      results: "$62K monthly executive coaching",
      rating: 5
    },
    {
      name: "Amanda Rodriguez",
      company: "Rodriguez Health Coaching",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      text: "Health coaching transformations amazing! 120+ clients in nutrition and wellness programs at $150/session. Monthly revenue grew to $48K.",
      industry: "coaching",
      results: "120 health clients, $48K monthly",
      rating: 5
    },
    {
      name: "Matthew Brown",
      company: "Brown Sales Coaching",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face",
      text: "Sales coaching demand exploded! Training sales teams for Fortune 500 companies. Corporate contracts worth $180K monthly. Best year ever!",
      industry: "coaching",
      results: "$180K monthly corporate contracts",
      rating: 5
    },
    {
      name: "Ashley Johnson",
      company: "Johnson Career Coaching",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
      text: "Career transition coaching booming! Professionals paying $300/session for career guidance. Helped 85 people land dream jobs. Monthly revenue: $42K.",
      industry: "coaching",
      results: "85 successful career transitions, $42K monthly",
      rating: 5
    },
    {
      name: "Joshua Garcia",
      company: "Garcia Performance Coaching",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
      text: "Athletic performance coaching incredible! Training professional athletes and college teams. High-performance programs generating $95K monthly.",
      industry: "coaching",
      results: "Pro athlete clients, $95K monthly",
      rating: 5
    },
    {
      name: "Samantha Miller",
      company: "Miller Relationship Coaching",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
      text: "Couples coaching sessions fully booked! Relationship programs at $250/session with 90% success rate. Monthly revenue hit $38K.",
      industry: "coaching",
      results: "90% success rate, $38K monthly",
      rating: 5
    },
    {
      name: "Daniel Wilson",
      company: "Wilson Financial Coaching",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      text: "Financial coaching clients seeking $10K+ income increases. Premium wealth-building programs at $400/session. Monthly revenue: $56K.",
      industry: "coaching",
      results: "Wealth building focus, $56K monthly",
      rating: 5
    },
    {
      name: "Lauren Anderson",
      company: "Anderson Parenting Coaching",
      image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=150&h=150&fit=crop&crop=face",
      text: "Parenting coaching programs in high demand! Helping families with challenging teens. Group programs at $200/family bringing $35K monthly.",
      industry: "coaching",
      results: "Family transformation, $35K monthly",
      rating: 5
    },
    {
      name: "Ryan Thompson",
      company: "Thompson Mindset Coaching",
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=150&h=150&fit=crop&crop=face",
      text: "Mindset coaching breakthrough results! Entrepreneurs paying $350/session for breakthrough coaching. Monthly revenue jumped to $52K.",
      industry: "coaching",
      results: "Entrepreneur focus, $52K monthly",
      rating: 5
    },
    {
      name: "Nicole White",
      company: "White Leadership Coaching",
      image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face",
      text: "Leadership development programs sold out! Training emerging leaders in Fortune 100 companies. Corporate programs worth $125K monthly.",
      industry: "coaching",
      results: "Fortune 100 clients, $125K monthly",
      rating: 5
    },
    {
      name: "Kevin Martinez",
      company: "Martinez Success Coaching",
      image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face",
      text: "Success coaching for high achievers! Millionaire mindset programs at $500/session. Working with 75+ high-net-worth individuals. Revenue: $68K monthly.",
      industry: "coaching",
      results: "75+ millionaire clients, $68K monthly",
      rating: 5
    },
    {
      name: "Michelle Davis",
      company: "Davis Confidence Coaching",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
      text: "Confidence coaching transforming lives! Women's empowerment programs at $220/session. 95+ active clients. Monthly revenue: $41K.",
      industry: "coaching",
      results: "95 empowered women, $41K monthly",
      rating: 5
    },
    {
      name: "Steven Rodriguez",
      company: "Rodriguez Productivity Coaching",
      image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=150&h=150&fit=crop&crop=face",
      text: "Productivity coaching for executives! Time management and efficiency programs. High-level executives paying $400/session. Monthly revenue: $58K.",
      industry: "coaching",
      results: "Executive efficiency, $58K monthly",
      rating: 5
    },
    {
      name: "Kimberly Lopez",
      company: "Lopez Wellness Coaching",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      text: "Holistic wellness coaching expanding rapidly! Mind-body-spirit programs at $280/session. 110+ clients on transformation journeys. Revenue: $65K monthly.",
      industry: "coaching",
      results: "110+ holistic transformations, $65K monthly",
      rating: 5
    },
    {
      name: "Brian Taylor",
      company: "Taylor Communication Coaching",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      text: "Public speaking coaching in huge demand! Helping professionals overcome stage fright. Premium programs at $320/session. Monthly revenue: $45K.",
      industry: "coaching",
      results: "Speaking transformation, $45K monthly",
      rating: 5
    },
    {
      name: "Crystal Garcia",
      company: "Garcia Spiritual Coaching",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      text: "Spiritual coaching programs transformative! Soul-purpose discovery sessions at $250/session. 85+ souls on spiritual journeys. Revenue: $43K monthly.",
      industry: "coaching",
      results: "85+ spiritual journeys, $43K monthly",
      rating: 5
    },
    {
      name: "Patrick Johnson",
      company: "Johnson Peak Performance",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      text: "Peak performance coaching for athletes! Training Olympic hopefuls and pro athletes. Elite programs at $600/session. Monthly revenue: $72K.",
      industry: "coaching",
      results: "Olympic athletes, $72K monthly",
      rating: 5
    },
    {
      name: "Tiffany Wilson",
      company: "Wilson Transformation Coaching",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
      text: "Life transformation coaching incredible results! Complete life makeover programs at $450/session. 65+ major transformations. Monthly revenue: $55K.",
      industry: "coaching",
      results: "65+ life makeovers, $55K monthly",
      rating: 5
    },
    
    // Solar Industry (50+ testimonials)
    {
      name: "Robert Thompson",
      company: "Thompson Solar Solutions",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      text: "Solar installation leads increased 950%! From 8 to 85 installations monthly. Average project value $28K. Monthly revenue jumped to $2.4M. Amazing AI targeting!",
      industry: "solar",
      results: "950% lead growth, $2.4M monthly revenue",
      rating: 5
    },
    {
      name: "Patricia Davis",
      company: "Davis Green Energy",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      text: "Residential solar sales exploded! AI found homeowners perfect for solar. 120+ installations at $32K average. Monthly revenue hit $3.8M.",
      industry: "solar",
      results: "120 monthly installs, $3.8M revenue",
      rating: 5
    },
    {
      name: "Charles Rodriguez",
      company: "Rodriguez Solar Power",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      text: "Commercial solar projects booming! Large business installations averaging $250K each. Closed 15 commercial deals worth $3.75M total.",
      industry: "solar",
      results: "15 commercial projects, $3.75M total",
      rating: 5
    },
    {
      name: "Linda Martinez",
      company: "Martinez Sustainable Energy",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      text: "Solar consultations through the roof! The AI targeting brought eco-conscious homeowners. 200+ qualified leads monthly, 65% conversion rate.",
      industry: "solar",
      results: "200+ monthly leads, 65% conversion",
      rating: 5
    },
    {
      name: "William Johnson",
      company: "Johnson Solar Farms",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face",
      text: "Utility-scale solar projects incredible! Landed 3 major contracts worth $45M total. The AI found municipalities and utilities perfectly.",
      industry: "solar",
      results: "3 utility contracts, $45M total value",
      rating: 5
    },
    {
      name: "Barbara Wilson",
      company: "Wilson Solar Consulting",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
      text: "Solar consulting services in high demand! Helping other solar companies scale. Consulting revenue hit $85K monthly with 25+ clients.",
      industry: "solar",
      results: "25+ consulting clients, $85K monthly",
      rating: 5
    },
    {
      name: "James Garcia",
      company: "Garcia Renewable Systems",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
      text: "Solar + battery installations exploding! Complete energy systems averaging $45K. Monthly installations hit 95 systems worth $4.2M.",
      industry: "solar",
      results: "95 monthly systems, $4.2M revenue",
      rating: 5
    },
    {
      name: "Mary Anderson",
      company: "Anderson Solar Financing",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
      text: "Solar financing approvals skyrocketed! Helped 300+ families get solar loans. Partner network generating $18M in financed solar projects.",
      industry: "solar",
      results: "300+ financing approvals, $18M projects",
      rating: 5
    },
    {
      name: "David Brown",
      company: "Brown Solar Installation",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      text: "Installation crew booked solid! Premium solar installations at $35K average. Completed 110 installations monthly. Revenue: $3.85M.",
      industry: "solar",
      results: "110 monthly installs, $3.85M revenue",
      rating: 5
    },
    {
      name: "Susan Taylor",
      company: "Taylor Solar Maintenance",
      image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=150&h=150&fit=crop&crop=face",
      text: "Solar maintenance contracts incredible! Monitoring and maintenance for 850+ systems. Monthly recurring revenue hit $125K.",
      industry: "solar",
      results: "850+ maintenance contracts, $125K monthly",
      rating: 5
    },
    {
      name: "Joseph Miller",
      company: "Miller Solar Components",
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=150&h=150&fit=crop&crop=face",
      text: "Solar equipment sales booming! Selling panels and inverters to installers nationwide. Monthly equipment sales hit $2.8M.",
      industry: "solar",
      results: "Nationwide equipment sales, $2.8M monthly",
      rating: 5
    },
    {
      name: "Jennifer Lopez",
      company: "Lopez Community Solar",
      image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face",
      text: "Community solar subscriptions surged! 2,500+ households joined our solar garden. Monthly subscription revenue: $450K.",
      industry: "solar",
      results: "2,500+ subscribers, $450K monthly",
      rating: 5
    },
    {
      name: "Christopher Lee",
      company: "Lee Solar Engineering",
      image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face",
      text: "Solar engineering services in demand! Designing systems for major installations. Engineering contracts worth $320K monthly.",
      industry: "solar",
      results: "Engineering contracts, $320K monthly",
      rating: 5
    },
    {
      name: "Karen White",
      company: "White Solar Training",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
      text: "Solar installer training programs full! Training next generation of solar technicians. Course revenue hit $95K monthly.",
      industry: "solar",
      results: "Technician training, $95K monthly",
      rating: 5
    },
    {
      name: "Mark Clark",
      company: "Clark Solar Monitoring",
      image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=150&h=150&fit=crop&crop=face",
      text: "Solar monitoring software sales incredible! Tracking performance for 5,000+ systems. Software licensing revenue: $180K monthly.",
      industry: "solar",
      results: "5,000+ monitored systems, $180K monthly",
      rating: 5
    },
    {
      name: "Lisa Rodriguez",
      company: "Rodriguez Solar Sales",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      text: "Door-to-door solar sales transformed! AI identified interested homeowners. Sales team closing 45+ deals monthly at $31K average.",
      industry: "solar",
      results: "45+ monthly closings, $31K average",
      rating: 5
    },
    {
      name: "Paul Johnson",
      company: "Johnson Solar Permits",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      text: "Solar permitting services booming! Fast-tracking permits for 200+ installations monthly. Permitting revenue hit $85K monthly.",
      industry: "solar",
      results: "200+ monthly permits, $85K revenue",
      rating: 5
    },
    {
      name: "Nancy Davis",
      company: "Davis Solar Inspection",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      text: "Solar inspection services in high demand! Quality inspections for installations. Monthly inspection revenue: $65K.",
      industry: "solar",
      results: "Quality inspections, $65K monthly",
      rating: 5
    },
    {
      name: "Donald Wilson",
      company: "Wilson Agri-Solar",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      text: "Agricultural solar projects exploding! Solar installations on farms and agribusiness. 25+ agri-solar projects worth $12M total.",
      industry: "solar",
      results: "25+ agri-solar projects, $12M total",
      rating: 5
    },
    {
      name: "Betty Martinez",
      company: "Martinez Solar Insurance",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      text: "Solar insurance policies surged! Protecting 1,200+ solar installations. Monthly insurance premiums: $95K.",
      industry: "solar",
      results: "1,200+ policies, $95K monthly premiums",
      rating: 5
    },
    
    // Fitness Industry (Additional testimonials)
    {
      name: "Marcus Johnson",
      company: "Johnson Fitness Empire",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=face",
      text: "Personal training clients exploded! From 15 to 120+ active clients at $80/session. Monthly revenue jumped from $4.8K to $38K. Booked solid!",
      industry: "fitness",
      results: "700% client growth, $33K monthly increase",
      rating: 5
    },
    {
      name: "Tanya Rodriguez",
      company: "Rodriguez Yoga Studio",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      text: "Yoga class memberships through the roof! Premium memberships at $150/month with 300+ active members. Monthly revenue: $45K.",
      industry: "fitness",
      results: "300+ members, $45K monthly",
      rating: 5
    },
    {
      name: "Derek Wilson",
      company: "Wilson CrossFit Box",
      image: "https://images.unsplash.com/photo-1567013127542-490d757e51cd?w=150&h=150&fit=crop&crop=face",
      text: "CrossFit memberships sold out! Unlimited memberships at $180/month. 220+ members with waiting list. Monthly revenue: $39.6K.",
      industry: "fitness",
      results: "220+ CrossFit members, $39.6K monthly",
      rating: 5
    },
    {
      name: "Carmen Martinez",
      company: "Martinez Dance Fitness",
      image: "https://images.unsplash.com/photo-1594736797933-d0c6ed204443?w=150&h=150&fit=crop&crop=face",
      text: "Dance fitness classes packed! Zumba and dance programs at $25/class. 150+ regular attendees. Monthly class revenue: $28K.",
      industry: "fitness",
      results: "150+ dancers, $28K monthly",
      rating: 5
    },
    {
      name: "Trevor Davis",
      company: "Davis Strength Training",
      image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=150&h=150&fit=crop&crop=face",
      text: "Strength coaching programs incredible! Powerlifting and strength training at $120/session. 85+ serious lifters. Monthly revenue: $41K.",
      industry: "fitness",
      results: "85+ strength athletes, $41K monthly",
      rating: 5
    },
    {
      name: "Melissa Garcia",
      company: "Garcia Pilates Studio",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=face",
      text: "Pilates sessions fully booked! Reformer Pilates at $65/session. 140+ regular clients. Monthly session revenue: $36K.",
      industry: "fitness",
      results: "140+ Pilates clients, $36K monthly",
      rating: 5
    },
    {
      name: "Keith Anderson",
      company: "Anderson Athletic Performance",
      image: "https://images.unsplash.com/photo-1506629905474-11897b314786?w=150&h=150&fit=crop&crop=face",
      text: "Sports performance training booming! Training high school and college athletes. Performance programs generating $52K monthly.",
      industry: "fitness",
      results: "Student athletes, $52K monthly",
      rating: 5
    },
    {
      name: "Rachel Thompson",
      company: "Thompson Wellness Center",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=face",
      text: "Holistic fitness programs incredible! Mind-body wellness at $95/session. 110+ wellness clients. Monthly revenue: $42K.",
      industry: "fitness",
      results: "110+ wellness clients, $42K monthly",
      rating: 5
    },
    {
      name: "Brandon Lopez",
      company: "Lopez HIIT Studio",
      image: "https://images.unsplash.com/photo-1567013127542-490d757e51cd?w=150&h=150&fit=crop&crop=face",
      text: "HIIT classes selling out daily! High-intensity training memberships at $140/month. 180+ members. Monthly revenue: $25.2K.",
      industry: "fitness",
      results: "180+ HIIT members, $25.2K monthly",
      rating: 5
    },
    {
      name: "Stephanie Brown",
      company: "Brown Nutrition Coaching",
      image: "https://images.unsplash.com/photo-1594736797933-d0c6ed204443?w=150&h=150&fit=crop&crop=face",
      text: "Nutrition coaching in huge demand! Meal planning and nutrition guidance at $85/session. 95+ nutrition clients. Monthly revenue: $32K.",
      industry: "fitness",
      results: "95+ nutrition clients, $32K monthly",
      rating: 5
    },
    
    // E-commerce Industry (Additional testimonials)
    {
      name: "Alex Chen",
      company: "Chen Electronics Store",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      text: "Electronics sales skyrocketed online! From $25K to $280K monthly revenue. The AI found tech enthusiasts perfectly. Inventory turns weekly!",
      industry: "ecommerce",
      results: "$255K monthly increase, weekly inventory turns",
      rating: 5
    },
    {
      name: "Priya Patel",
      company: "Patel Home Goods",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      text: "Home decor sales exploded! Online store revenue jumped from $18K to $165K monthly. The AI targeting brought interior design enthusiasts.",
      industry: "ecommerce",
      results: "$147K monthly growth, design targeting",
      rating: 5
    },
    {
      name: "Jordan Smith",
      company: "Smith Outdoor Gear",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      text: "Outdoor equipment sales incredible! Camping and hiking gear revenue hit $195K monthly. AI found adventure seekers globally.",
      industry: "ecommerce",
      results: "$195K monthly outdoor gear sales",
      rating: 5
    },
    {
      name: "Lisa Wong",
      company: "Wong Pet Supplies",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      text: "Pet product sales through the roof! Monthly revenue grew from $12K to $125K. The AI targets pet lovers perfectly. 95% customer retention!",
      industry: "ecommerce",
      results: "$113K monthly increase, 95% retention",
      rating: 5
    },
    {
      name: "Carlos Martinez",
      company: "Martinez Auto Parts",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face",
      text: "Auto parts sales incredible! From $30K to $220K monthly revenue. AI found car enthusiasts and mechanics nationwide. Wholesale orders exploded!",
      industry: "ecommerce",
      results: "$190K monthly growth, wholesale explosion",
      rating: 5
    },
    {
      name: "Aisha Johnson",
      company: "Johnson Baby Products",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
      text: "Baby product sales amazing! New parent targeting brought $145K monthly revenue. Premium baby gear flying off virtual shelves!",
      industry: "ecommerce",
      results: "New parent targeting, $145K monthly",
      rating: 5
    },
    {
      name: "Ryan Kim",
      company: "Kim Sports Equipment",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
      text: "Sports equipment sales booming! Athletic gear and equipment revenue hit $185K monthly. AI targets athletes and fitness enthusiasts perfectly.",
      industry: "ecommerce",
      results: "Athletic targeting, $185K monthly",
      rating: 5
    },
    {
      name: "Maya Rodriguez",
      company: "Rodriguez Kitchen Store",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
      text: "Kitchen gadget sales exploded! Cooking enthusiasts love our products. Monthly revenue jumped from $15K to $135K. Repeat customers 85%!",
      industry: "ecommerce",
      results: "$120K monthly growth, 85% repeat rate",
      rating: 5
    },
    {
      name: "Nathan Davis",
      company: "Davis Gaming Store",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      text: "Gaming product sales incredible! From $20K to $175K monthly revenue. AI found serious gamers wanting premium equipment. Pre-orders sold out!",
      industry: "ecommerce",
      results: "$155K monthly growth, pre-order sellouts",
      rating: 5
    },
    {
      name: "Zoe Wilson",
      company: "Wilson Craft Supplies",
      image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=150&h=150&fit=crop&crop=face",
      text: "Craft supply sales booming! DIY enthusiasts driving $95K monthly revenue. The AI targeting brings serious crafters who buy premium supplies regularly.",
      industry: "ecommerce",
      results: "DIY targeting, $95K monthly",
      rating: 5
    },
    
    // Healthcare Industry (Additional testimonials)
    {
      name: "Dr. Michael Rodriguez",
      company: "Rodriguez Family Practice",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
      text: "New patient appointments increased 600%! From 50 to 350+ new patients monthly. Practice revenue grew from $45K to $185K monthly. Incredible targeting!",
      industry: "healthcare",
      results: "600% patient growth, $140K monthly increase",
      rating: 5
    },
    {
      name: "Dr. Sarah Johnson",
      company: "Johnson Dental Care",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
      text: "Dental practice bookings exploded! Cosmetic dentistry and implants booked solid. Monthly revenue hit $95K with 3-month waiting list for procedures.",
      industry: "healthcare",
      results: "Cosmetic dentistry boom, $95K monthly",
      rating: 5
    },
    {
      name: "Dr. James Chen",
      company: "Chen Specialty Clinic",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
      text: "Specialist referrals increased 800%! Cardiology consultations at $300+ each. Monthly specialty revenue hit $125K. AI found patients needing specialists.",
      industry: "healthcare",
      results: "800% specialist referrals, $125K monthly",
      rating: 5
    },
    {
      name: "Dr. Emily Davis",
      company: "Davis Pediatric Practice",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
      text: "Pediatric appointments through the roof! New families with young children booking constantly. Monthly revenue grew to $78K. Waiting list for new patients!",
      industry: "healthcare",
      results: "Family targeting, $78K monthly",
      rating: 5
    },
    {
      name: "Dr. Robert Martinez",
      company: "Martinez Physical Therapy",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
      text: "Physical therapy sessions booked solid! Sports injury and rehab clients paying $120/session. Monthly revenue hit $68K with excellent outcomes.",
      industry: "healthcare",
      results: "Sports rehab focus, $68K monthly",
      rating: 5
    },
    {
      name: "Dr. Lisa Anderson",
      company: "Anderson Mental Health",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
      text: "Mental health counseling in high demand! Therapy sessions at $150 each. Monthly revenue hit $82K. AI found people seeking quality mental healthcare.",
      industry: "healthcare",
      results: "Mental health focus, $82K monthly",
      rating: 5
    },
    {
      name: "Dr. David Wilson",
      company: "Wilson Chiropractic",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
      text: "Chiropractic treatments booming! Pain relief and wellness programs at $85/visit. Monthly revenue grew to $55K with high patient satisfaction.",
      industry: "healthcare",
      results: "Pain relief focus, $55K monthly",
      rating: 5
    },
    {
      name: "Dr. Jennifer Garcia",
      company: "Garcia Women's Health",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
      text: "Women's health services expanded rapidly! OB/GYN and wellness programs. Monthly revenue hit $115K. AI targeting brought women seeking specialized care.",
      industry: "healthcare",
      results: "Women's health, $115K monthly",
      rating: 5
    },
    {
      name: "Dr. Christopher Lee",
      company: "Lee Dermatology Clinic",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
      text: "Dermatology appointments booked months ahead! Cosmetic and medical dermatology at $250+ per visit. Monthly revenue: $135K.",
      industry: "healthcare",
      results: "Dermatology boom, $135K monthly",
      rating: 5
    },
    {
      name: "Dr. Amanda Taylor",
      company: "Taylor Urgent Care",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
      text: "Urgent care visits increased dramatically! Fast, quality care attracting 400+ patients monthly. Monthly revenue hit $98K with excellent patient reviews.",
      industry: "healthcare",
      results: "400+ monthly patients, $98K revenue",
      rating: 5
    }
  ];

  const industries = [
    { value: 'all', label: 'All Industries' },
    { value: 'real-estate', label: 'Real Estate' },
    { value: 'beauty-fashion', label: 'Beauty & Fashion' },
    { value: 'coaching', label: 'Coaching' },
    { value: 'solar', label: 'Solar' },
    { value: 'fitness', label: 'Fitness' },
    { value: 'ecommerce', label: 'E-commerce' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'technology', label: 'Technology' },
    { value: 'financial', label: 'Financial Services' }
  ];

  const filteredTestimonials = useMemo(() => {
    if (selectedIndustry === 'all') return allTestimonials;
    return allTestimonials.filter(testimonial => testimonial.industry === selectedIndustry);
  }, [selectedIndustry]);

  const totalPages = Math.ceil(filteredTestimonials.length / testimonialsPerPage);
  const currentTestimonials = filteredTestimonials.slice(
    (currentPage - 1) * testimonialsPerPage,
    currentPage * testimonialsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleIndustryChange = (industry: string) => {
    setSelectedIndustry(industry);
    setCurrentPage(1);
  };

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white pt-20 sm:pt-24 px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 relative overflow-hidden">
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
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          />
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="bg-blue-600 text-white mb-4 sm:mb-6 text-base sm:text-lg px-3 sm:px-4 py-1 sm:py-2">
              Client Success Stories
            </Badge>
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6">
              Real Results from <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Real Clients</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-6 sm:mb-8">
              Discover how AI AdMaxify has transformed businesses across multiple industries with 
              data-driven marketing strategies that deliver exceptional ROI.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {[
              { icon: Users, value: "500+", label: "Happy Clients" },
              { icon: TrendingUp, value: "342%", label: "Average ROI" },
              { icon: Award, value: "97%", label: "Success Rate" },
              { icon: Star, value: "4.9/5", label: "Client Rating" }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="text-center p-4 sm:p-6 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg"
              >
                <stat.icon size={32} className="sm:w-10 sm:h-10 text-purple-600 mx-auto mb-2 sm:mb-4" />
                <div className="text-2xl sm:text-4xl lg:text-6xl font-bold text-purple-600 mb-1 sm:mb-2">{stat.value}</div>
                <div className="text-xs sm:text-base text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="bg-gradient-to-br from-purple-50 to-blue-50 px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Success Stories by <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Industry</span>
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mb-4">
              <span className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                <ChevronDown className="w-4 h-4" />
                Scroll down to see our diverse industry expertise
              </span>
            </p>
            <div className="max-w-md mx-auto">
              <Select value={selectedIndustry} onValueChange={handleIndustryChange}>
                <SelectTrigger className="w-full text-base sm:text-lg h-12 sm:h-14 bg-white border-2 border-purple-200 hover:border-purple-300 focus:border-purple-500">
                  <SelectValue placeholder="Filter by industry" />
                </SelectTrigger>
                <SelectContent className="bg-white border-purple-200 z-50">
                  {industries.map((industry) => (
                    <SelectItem key={industry.value} value={industry.value} className="text-base sm:text-lg hover:bg-purple-50">
                      {industry.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="bg-white px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {currentTestimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="h-full"
              >
                <Card className="h-full bg-white shadow-xl border-0 overflow-hidden hover:shadow-2xl transition-all duration-300">
                  <CardContent className="p-4 sm:p-6 h-full flex flex-col">
                    <div className="flex items-center mb-3 sm:mb-4">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover mr-3 sm:mr-4"
                      />
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 text-sm sm:text-base">{testimonial.name}</h3>
                        <p className="text-purple-600 font-medium text-xs sm:text-sm">{testimonial.company}</p>
                        <div className="flex items-center mt-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} size={14} className="text-yellow-400 fill-current" />
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative mb-3 sm:mb-4 flex-1">
                      <Quote className="absolute top-0 left-0 text-purple-200 w-6 h-6 sm:w-8 sm:h-8" />
                      <p className="text-gray-600 text-sm sm:text-base pl-6 sm:pl-8 leading-relaxed">
                        {testimonial.text}
                      </p>
                    </div>
                    
                    <div className="mt-auto">
                      <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg p-3 sm:p-4">
                        <p className="text-purple-700 font-bold text-sm sm:text-base text-center">
                          {testimonial.results}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 sm:mt-16">
              <Pagination>
                <PaginationContent className="flex justify-center gap-2">
                  {currentPage > 1 && (
                    <PaginationItem>
                      <PaginationPrevious 
                        href="#" 
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(currentPage - 1);
                        }}
                        className="text-sm sm:text-base"
                      />
                    </PaginationItem>
                  )}
                  
                  {[...Array(Math.min(5, totalPages))].map((_, index) => {
                    const pageNumber = currentPage <= 3 
                      ? index + 1 
                      : currentPage >= totalPages - 2 
                        ? totalPages - 4 + index 
                        : currentPage - 2 + index;
                    
                    if (pageNumber < 1 || pageNumber > totalPages) return null;
                    
                    return (
                      <PaginationItem key={pageNumber}>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(pageNumber);
                          }}
                          isActive={currentPage === pageNumber}
                          className="text-sm sm:text-base"
                        >
                          {pageNumber}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}
                  
                  {currentPage < totalPages && (
                    <PaginationItem>
                      <PaginationNext 
                        href="#" 
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(currentPage + 1);
                        }}
                        className="text-sm sm:text-base"
                      />
                    </PaginationItem>
                  )}
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6">
              Ready to Be Our <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Next Success Story</span>?
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8">
              Join hundreds of businesses that have transformed their marketing results with AI AdMaxify.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4">
                  Get Your Free Strategy Call
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" className="w-full sm:w-auto border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4">
                  View Our Services
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <EnhancedFooter />
    </>
  );
};

export default Testimonials;
