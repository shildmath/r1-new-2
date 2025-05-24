
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowRight, Award, Users, Target, Brain, TrendingUp, Zap } from 'lucide-react';

const About = () => {
  const teamMembers = [
    {
      name: "Alex Rivera",
      position: "CEO & Founder",
      image: "/placeholder.svg",
      bio: "Former Google marketing executive with 12+ years in AI-powered digital marketing. Led campaigns for Fortune 500 companies generating over $100M in revenue.",
      expertise: ["AI Marketing Strategy", "Growth Hacking", "Team Leadership"]
    },
    {
      name: "Sarah Kim",
      position: "Head of AI & Data Science",
      image: "/placeholder.svg",
      bio: "PhD in Machine Learning from MIT. Previously at Facebook's AI division, developing algorithmic marketing solutions used by millions of businesses.",
      expertise: ["Machine Learning", "Predictive Analytics", "Algorithm Development"]
    },
    {
      name: "Marcus Johnson",
      position: "Creative Director",
      image: "/placeholder.svg",
      bio: "Award-winning creative director with 10+ years experience. Former creative lead at top agencies, creating campaigns for Nike, Apple, and Tesla.",
      expertise: ["Brand Strategy", "Creative Campaigns", "Visual Storytelling"]
    },
    {
      name: "Emily Chen",
      position: "Head of Performance Marketing",
      image: "/placeholder.svg",
      bio: "Performance marketing expert who's managed over $50M in ad spend. Specialized in scaling startups from $0 to $10M+ in revenue through paid channels.",
      expertise: ["PPC Management", "Conversion Optimization", "Analytics"]
    },
    {
      name: "David Martinez",
      position: "SEO & Content Strategist",
      image: "/placeholder.svg",
      bio: "SEO expert who's helped 200+ businesses achieve first-page rankings. Former content strategist at HubSpot, developing strategies for high-growth companies.",
      expertise: ["Technical SEO", "Content Strategy", "Link Building"]
    },
    {
      name: "Jessica Taylor",
      position: "Client Success Director",
      image: "/placeholder.svg",
      bio: "Client relationship expert with 8+ years experience. Maintains 98% client retention rate and ensures every client achieves their growth objectives.",
      expertise: ["Client Relations", "Project Management", "Success Strategy"]
    }
  ];

  const awards = [
    {
      title: "Best AI Marketing Agency 2024",
      organization: "Marketing Excellence Awards",
      year: "2024"
    },
    {
      title: "Top 10 Digital Marketing Agencies",
      organization: "Forbes",
      year: "2023"
    },
    {
      title: "Innovation in AI Marketing",
      organization: "TechCrunch Awards",
      year: "2023"
    },
    {
      title: "Client Choice Award",
      organization: "Clutch.co",
      year: "2023"
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
      <section className="bg-gradient-primary text-white pt-24 section-padding">
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
                Founded in 2019, AIAdMaxify has been at the forefront of AI-powered digital marketing, 
                helping over 450 businesses achieve unprecedented growth through innovative strategies 
                and cutting-edge technology.
              </p>
              <Link to="/strategy-call">
                <Button className="agency-btn text-lg px-8 py-4">
                  Work With Us <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                <div className="grid grid-cols-2 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold text-accent mb-2">5+</div>
                    <div className="text-gray-300">Years Experience</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-accent mb-2">450+</div>
                    <div className="text-gray-300">Clients Served</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-accent mb-2">$50M+</div>
                    <div className="text-gray-300">Revenue Generated</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-accent mb-2">97%</div>
                    <div className="text-gray-300">Satisfaction Rate</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-white section-padding">
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
              can compete and thrive in the digital landscape, regardless of their marketing budget.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="agency-card h-full">
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
              <Card className="agency-card h-full">
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
      <section className="bg-secondary section-padding">
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
              >
                <Card className="agency-card h-full text-center">
                  <CardHeader>
                    <value.icon size={48} className="text-accent mx-auto mb-4" />
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
      <section className="bg-white section-padding">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="agency-card h-full">
                  <CardHeader className="text-center">
                    <div className="w-24 h-24 bg-accent rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Users size={48} className="text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-primary">
                      {member.name}
                    </CardTitle>
                    <CardDescription className="text-accent font-medium">
                      {member.position}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {member.bio}
                    </p>
                    <div>
                      <h4 className="font-semibold text-primary mb-2">Expertise:</h4>
                      <div className="flex flex-wrap gap-2">
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
      <section className="bg-secondary section-padding">
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
              and prestigious organizations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {awards.map((award, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="agency-card h-full text-center">
                  <CardHeader>
                    <Award size={48} className="text-accent mx-auto mb-4" />
                    <CardTitle className="text-lg font-bold text-primary">
                      {award.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600">
                      {award.organization}
                    </CardDescription>
                    <Badge className="bg-accent text-white mt-2">
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
