
import React from "react";
import { motion } from "framer-motion";
import { Star, Trophy, Zap, Target, Users2, Lightbulb, Globe, Award, ArrowRight, Sparkles } from 'lucide-react';
import { useTeamMembers, useAboutStats, useAwards, useJourneyMilestones } from "@/hooks/useAboutData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const iconMap = {
  star: Star,
  trophy: Trophy,
  zap: Zap,
  target: Target,
  'users-2': Users2,
  lightbulb: Lightbulb,
  globe: Globe,
  award: Award,
};

const About = () => {
  const { data: teamMembers = [] } = useTeamMembers();
  const { data: stats } = useAboutStats();
  const { data: awards = [] } = useAwards();
  const { data: journeyMilestones = [] } = useJourneyMilestones();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Navbar />
      
      {/* Hero Section - Premium Design */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Premium AI Marketing Solutions
            </div>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-6">
              About AIAdMaxify
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              We're revolutionizing digital marketing through cutting-edge AI technology, 
              helping businesses achieve unprecedented growth and transformational success.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2">
              Discover Our Story
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full font-semibold text-lg hover:border-blue-600 hover:text-blue-600 transition-all duration-300">
              View Our Work
            </button>
          </motion.div>
        </div>
      </section>

      {/* Stats Section - Luxury Cards */}
      {stats && (
        <section className="py-20 px-4 relative">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Numbers That Speak Volumes
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Our commitment to excellence is reflected in our outstanding results
              </p>
            </motion.div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: stats.happy_clients, label: "Happy Clients", color: "from-blue-500 to-blue-600" },
                { value: stats.success_rate, label: "Success Rate", color: "from-green-500 to-green-600" },
                { value: stats.awards_won, label: "Awards Won", color: "from-purple-500 to-purple-600" },
                { value: stats.growth_rate, label: "Growth Rate", color: "from-orange-500 to-orange-600" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                    <div className="text-white text-2xl font-bold">
                      {stat.value.slice(0, 1)}
                    </div>
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Our Journey Section - Premium Timeline */}
      <section className="py-20 px-4 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Journey</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From a visionary startup to a leading AI marketing powerhouse, 
              discover the milestones that shaped our success story
            </p>
          </motion.div>

          <div className="relative">
            {/* Enhanced Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 h-full rounded-full"></div>
            
            <div className="space-y-24">
              {journeyMilestones.map((milestone, index) => {
                const IconComponent = iconMap[milestone.icon as keyof typeof iconMap] || Zap;
                const isLeft = index % 2 === 0;
                
                return (
                  <motion.div
                    key={milestone.id}
                    className={`flex items-center ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
                    initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    viewport={{ once: true }}
                  >
                    {/* Content Card - Premium Design */}
                    <div className={`w-5/12 ${isLeft ? 'pr-12' : 'pl-12'}`}>
                      <motion.div
                        className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 relative overflow-hidden"
                        whileHover={{ scale: 1.02, y: -5 }}
                      >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full -translate-y-16 translate-x-16"></div>
                        
                        <div className="flex items-center gap-4 mb-6 relative z-10">
                          <div className={`w-16 h-16 rounded-2xl ${milestone.color} flex items-center justify-center shadow-lg`}>
                            <IconComponent className="w-8 h-8 text-white" />
                          </div>
                          <div>
                            <div className="text-3xl font-bold text-gray-900">{milestone.year}</div>
                            <div className="text-sm text-blue-600 font-semibold uppercase tracking-wide">
                              {milestone.highlight}
                            </div>
                          </div>
                        </div>
                        
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">{milestone.title}</h3>
                        <p className="text-gray-600 text-lg leading-relaxed mb-6">{milestone.description}</p>
                        
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 border border-blue-100">
                          <div className="text-sm font-semibold text-blue-800 mb-1">Key Achievement</div>
                          <div className="text-blue-700 font-medium">{milestone.metrics}</div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Central Circle - Enhanced */}
                    <div className="w-2/12 flex justify-center">
                      <motion.div
                        className="w-20 h-20 bg-white rounded-full border-4 border-blue-500 shadow-xl flex items-center justify-center z-10 relative"
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-20"></div>
                        <IconComponent className="w-10 h-10 text-blue-600 relative z-10" />
                      </motion.div>
                    </div>

                    <div className="w-5/12"></div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Awards Section - Luxury Grid */}
      {awards.length > 0 && (
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Awards & Recognition</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Recognized globally for excellence in AI-driven marketing innovation and outstanding client results
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {awards.map((award, index) => {
                const IconComponent = iconMap[award.icon as keyof typeof iconMap] || Trophy;
                return (
                  <motion.div
                    key={award.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -10 }}
                    className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 text-center border border-gray-100 relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full -translate-y-12 translate-x-12"></div>
                    
                    <div className={`w-20 h-20 bg-gradient-to-r ${award.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                      <IconComponent className="w-10 h-10 text-white" />
                    </div>
                    
                    <div className="text-2xl font-bold text-gray-900 mb-2">{award.year}</div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">{award.title}</h3>
                    <p className="text-gray-600 font-medium">{award.organization}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Team Section - Premium Cards */}
      {teamMembers.length > 0 && (
        <section className="py-20 px-4 bg-gradient-to-r from-gray-50 to-blue-50">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Meet Our Experts</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                The brilliant minds and visionary leaders behind AIAdMaxify's revolutionary success
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.03, y: -10 }}
                  className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 text-center border border-gray-100 relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full -translate-y-16 -translate-x-16"></div>
                  
                  <div className="relative z-10">
                    {member.profile_photo ? (
                      <img
                        src={member.profile_photo}
                        alt={member.name}
                        className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 border-white shadow-lg"
                      />
                    ) : (
                      <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <Users2 className="w-16 h-16 text-white" />
                      </div>
                    )}
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{member.name}</h3>
                    <div className="text-blue-600 font-semibold text-lg mb-4">{member.role}</div>
                    {member.bio && (
                      <p className="text-gray-600 leading-relaxed">{member.bio}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full -translate-y-48 -translate-x-48"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-y-48 translate-x-48"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join hundreds of successful businesses that have revolutionized their marketing with our AI-powered solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
                Start Your Journey
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300">
                Schedule a Call
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
