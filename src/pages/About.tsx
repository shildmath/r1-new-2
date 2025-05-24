
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowRight, Award, Users, Target, Brain, TrendingUp, Zap, Calendar, Star, Trophy, Shield, Globe } from 'lucide-react';

const About = () => {
  const teamMembers = [
    {
      name: "Alex Rivera",
      position: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      bio: "Former Google marketing executive with 12+ years in AI-powered digital marketing. Led campaigns for Fortune 500 companies generating over $100M in revenue.",
      expertise: ["AI Marketing Strategy", "Growth Hacking", "Team Leadership"]
    },
    {
      name: "Sarah Kim",
      position: "Head of AI & Data Science",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=300&h=300&fit=crop&crop=face",
      bio: "PhD in Machine Learning from MIT. Previously at Facebook's AI division, developing algorithmic marketing solutions used by millions of businesses.",
      expertise: ["Machine Learning", "Predictive Analytics", "Algorithm Development"]
    },
    {
      name: "Marcus Johnson",
      position: "Creative Director",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      bio: "Award-winning creative director with 10+ years experience. Former creative lead at top agencies, creating campaigns for Nike, Apple, and Tesla.",
      expertise: ["Brand Strategy", "Creative Campaigns", "Visual Storytelling"]
    },
    {
      name: "Emily Chen",
      position: "Head of Performance Marketing",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
      bio: "Performance marketing expert who's managed over $50M in ad spend. Specialized in scaling startups from $0 to $10M+ in revenue through paid channels.",
      expertise: ["PPC Management", "Conversion Optimization", "Analytics"]
    },
    {
      name: "David Martinez",
      position: "SEO & Content Strategist",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face",
      bio: "SEO expert who's helped 200+ businesses achieve first-page rankings. Former content strategist at HubSpot, developing strategies for high-growth companies.",
      expertise: ["Technical SEO", "Content Strategy", "Link Building"]
    },
    {
      name: "Jessica Taylor",
      position: "Client Success Director",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop&crop=face",
      bio: "Client relationship expert with 8+ years experience. Maintains 98% client retention rate and ensures every client achieves their growth objectives.",
      expertise: ["Client Relations", "Project Management", "Success Strategy"]
    },
    {
      name: "Ryan O'Connor",
      position: "VP of Technology",
      image: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=300&h=300&fit=crop&crop=face",
      bio: "Full-stack engineer with expertise in AI integration. Former lead developer at Amazon, specializing in scalable marketing automation platforms.",
      expertise: ["AI Integration", "Marketing Automation", "System Architecture"]
    },
    {
      name: "Lisa Wang",
      position: "Social Media Strategist",
      image: "https://images.unsplash.com/photo-1507101105822-7472b28e22ac?w=300&h=300&fit=crop&crop=face",
      bio: "Social media expert who's grown brands from 0 to 1M+ followers. Specializes in viral content creation and community management.",
      expertise: ["Social Strategy", "Content Creation", "Community Building"]
    }
  ];

  const awards = [
    {
      title: "Best AI Marketing Agency 2024",
      organization: "Marketing Excellence Awards",
      year: "2024",
      icon: Trophy
    },
    {
      title: "Top 10 Digital Marketing Agencies",
      organization: "Forbes",
      year: "2024",
      icon: Star
    },
    {
      title: "Innovation in AI Marketing",
      organization: "TechCrunch Awards",
      year: "2023",
      icon: Brain
    },
    {
      title: "Client Choice Award",
      organization: "Clutch.co",
      year: "2023",
      icon: Shield
    },
    {
      title: "Global Marketing Excellence",
      organization: "IAB Awards",
      year: "2023",
      icon: Globe
    },
    {
      title: "Fastest Growing Agency",
      organization: "Inc. 5000",
      year: "2022",
      icon: TrendingUp
    }
  ];

  const journey = [
    {
      year: "2017",
      title: "Company Founded",
      description: "Started with a vision to democratize AI-powered marketing for businesses of all sizes.",
      milestone: "Founded by Alex Rivera with $50K seed funding"
    },
    {
      year: "2018",
      title: "First AI Algorithm",
      description: "Developed our proprietary AI content optimization algorithm, achieving 300% better engagement rates.",
      milestone: "Served first 25 clients with 250% average ROI"
    },
    {
      year: "2019",
      title: "Team Expansion",
      description: "Grew to 15 team members and launched our comprehensive marketing automation platform.",
      milestone: "Reached $1M in annual revenue"
    },
    {
      year: "2020",
      title: "Market Leadership",
      description: "Became a recognized leader in AI marketing, helping businesses thrive during challenging times.",
      milestone: "Helped 500+ businesses pivot their marketing strategies"
    },
    {
      year: "2021",
      title: "International Expansion",
      description: "Expanded services globally and launched advanced predictive analytics for marketing campaigns.",
      milestone: "Opened offices in 3 countries, $5M revenue"
    },
    {
      year: "2022",
      title: "Innovation Awards",
      description: "Won multiple industry awards for innovation in AI marketing and client satisfaction.",
      milestone: "98% client satisfaction rate, 1000+ active clients"
    },
    {
      year: "2023",
      title: "Platform Revolution",
      description: "Launched next-generation AI platform with real-time optimization and predictive insights.",
      milestone: "$15M revenue, named top agency by Forbes"
    },
    {
      year: "2024",
      title: "Industry Leadership",
      description: "Continued innovation with advanced AI models and expanded service offerings.",
      milestone: "2500+ clients served, $25M revenue milestone"
    },
    {
      year: "2025",
      title: "Future Vision",
      description: "Expanding AI capabilities and aiming to serve 10,000+ businesses worldwide.",
      milestone: "Targeting $50M revenue and global market leadership"
    }
  ];

  const values = [
    {
      icon: Brain,
      title: "AI-First Approach",
      description: "We leverage cutting-edge artificial intelligence to deliver data-driven results that traditional agencies can't match."
    },
    {
      icon: Target,
      title: "Results-Driven",
      description: "Every strategy, campaign, and decision is made with one goal in mind: delivering measurable, profitable growth for our clients."
    },
    {
      icon: Users,
      title: "Client Partnership",
      description: "We don't just work for you, we work with you. Your success is our success, and we're committed to long-term partnerships."
    },
    {
      icon: TrendingUp,
      title: "Continuous Innovation",
      description: "The digital landscape evolves rapidly. We stay ahead of trends and continuously innovate our strategies and technologies."
    }
  ];

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-primary text-white pt-24 section-padding overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge className="bg-accent text-white mb-6 text-lg px-4 py-2">
                Award-Winning Agency
              </Badge>
              <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
                Pioneering the Future of 
                <span className="gradient-text"> AI Marketing</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Founded in 2017, AIAdMaxify has been at the forefront of AI-powered digital marketing, 
                helping over 2,500 businesses achieve unprecedented growth through innovative strategies 
                and cutting-edge technology.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/strategy-call">
                  <Button className="agency-btn text-lg px-8 py-4">
                    Work With Us <ArrowRight className="ml-2" size={20} />
                  </Button>
                </Link>
                <Button variant="outline" className="agency-btn-outline text-lg px-8 py-4">
                  View Our Journey
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop" 
                  alt="Team collaboration" 
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl"></div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <div className="grid grid-cols-2 gap-6 text-center">
                  <div>
                    <div className="text-2xl font-bold text-accent mb-1">8+</div>
                    <div className="text-gray-300 text-sm">Years Experience</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-accent mb-1">2500+</div>
                    <div className="text-gray-300 text-sm">Clients Served</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-accent mb-1">$250M+</div>
                    <div className="text-gray-300 text-sm">Revenue Generated</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-accent mb-1">17X</div>
                    <div className="text-gray-300 text-sm">Average ROI</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Company Journey Section */}
      <section className="bg-white section-padding">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary mb-6">
              Our <span className="gradient-text">Journey</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From a small startup to industry leaders - here's how we've grown and evolved 
              to become the AI marketing agency of choice for ambitious businesses.
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-accent to-primary rounded-full"></div>
            
            <div className="space-y-8">
              {journey.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <Card className="agency-card">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <Badge className="bg-accent text-white">{item.year}</Badge>
                          <Calendar className="text-accent" size={20} />
                        </div>
                        <CardTitle className="text-xl font-bold text-primary">
                          {item.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-3">{item.description}</p>
                        <p className="text-sm text-accent font-semibold">{item.milestone}</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="w-6 h-6 bg-accent rounded-full border-4 border-white shadow-lg relative z-10 flex-shrink-0"></div>
                  
                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-secondary section-padding">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary mb-6">
              Our <span className="gradient-text">Mission & Vision</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              We exist to democratize AI-powered marketing, making advanced marketing technologies 
              accessible to businesses of all sizes. Our vision is a world where every business 
              can compete and thrive in the digital landscape.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="agency-card h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-accent/20 to-transparent"></div>
                <CardHeader>
                  <Zap size={48} className="text-accent mb-4" />
                  <CardTitle className="text-2xl font-bold text-primary">Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-700 text-lg leading-relaxed">
                    To empower businesses with AI-driven marketing solutions that deliver measurable, 
                    profitable growth while maintaining the human touch that builds lasting relationships 
                    and trust with customers.
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="agency-card h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/20 to-transparent"></div>
                <CardHeader>
                  <Target size={48} className="text-accent mb-4" />
                  <CardTitle className="text-2xl font-bold text-primary">Our Vision</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-700 text-lg leading-relaxed">
                    To be the global leader in AI-powered marketing, setting industry standards 
                    for innovation, results, and client success while helping 10,000+ businesses 
                    achieve their growth objectives by 2030.
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-white section-padding">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary mb-6">
              Our <span className="gradient-text">Core Values</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These principles guide everything we do and shape how we work with our clients, 
              partners, and each other.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="agency-card h-full text-center group">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <value.icon size={32} className="text-white" />
                    </div>
                    <CardTitle className="text-lg font-bold text-primary">
                      {value.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600">
                      {value.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-secondary section-padding">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary mb-6">
              Meet Our <span className="gradient-text">Expert Team</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our team combines decades of marketing expertise with cutting-edge AI knowledge 
              to deliver exceptional results for our clients.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="agency-card h-full group overflow-hidden">
                  <CardHeader className="text-center pb-4">
                    <div className="relative mx-auto mb-4">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-24 h-24 rounded-full object-cover mx-auto group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 w-24 h-24 rounded-full bg-gradient-to-br from-accent/20 to-primary/20 mx-auto"></div>
                    </div>
                    <CardTitle className="text-lg font-bold text-primary">
                      {member.name}
                    </CardTitle>
                    <CardDescription className="text-accent font-medium">
                      {member.position}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                      {member.bio}
                    </p>
                    <div>
                      <h4 className="font-semibold text-primary mb-2 text-sm">Expertise:</h4>
                      <div className="flex flex-wrap gap-1">
                        {member.expertise.map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="bg-white section-padding">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary mb-6">
              Awards & <span className="gradient-text">Recognition</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our commitment to excellence and innovation has been recognized by industry leaders 
              and prestigious organizations worldwide.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {awards.map((award, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="agency-card h-full text-center group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-accent/10 to-transparent"></div>
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <award.icon size={32} className="text-white" />
                    </div>
                    <CardTitle className="text-lg font-bold text-primary">
                      {award.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 mb-3">
                      {award.organization}
                    </CardDescription>
                    <Badge className="bg-accent text-white">
                      {award.year}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-primary text-white section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">
              Ready to Work with the <span className="gradient-text">Best</span>?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join the ranks of successful businesses that have trusted us to transform 
              their growth with AI-powered marketing strategies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/strategy-call">
                <Button className="agency-btn text-lg px-8 py-4">
                  Schedule Consultation <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
              <Link to="/testimonials">
                <Button variant="outline" className="agency-btn-outline text-lg px-8 py-4">
                  View Client Results
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default About;
