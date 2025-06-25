
import React from "react";
import { motion } from "framer-motion";
import { Star, Trophy, Zap, Target, Users2, Lightbulb, Globe, Award } from 'lucide-react';
import { useTeamMembers, useAboutStats, useAwards, useJourneyMilestones } from "@/hooks/useAboutData";

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
    <div className="min-h-screen bg-gradient-to-br from-accent-light to-secondary">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-primary mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            About AIAdMaxify
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            We're revolutionizing digital marketing through cutting-edge AI technology, 
            helping businesses achieve unprecedented growth and success.
          </motion.p>
        </div>
      </section>

      {/* Stats Section */}
      {stats && (
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <motion.div 
                className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="text-3xl font-bold text-primary mb-2">{stats.happy_clients}</div>
                <div className="text-muted-foreground">Happy Clients</div>
              </motion.div>
              <motion.div 
                className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="text-3xl font-bold text-primary mb-2">{stats.success_rate}</div>
                <div className="text-muted-foreground">Success Rate</div>
              </motion.div>
              <motion.div 
                className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="text-3xl font-bold text-primary mb-2">{stats.awards_won}</div>
                <div className="text-muted-foreground">Awards Won</div>
              </motion.div>
              <motion.div 
                className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="text-3xl font-bold text-primary mb-2">{stats.growth_rate}</div>
                <div className="text-muted-foreground">Growth Rate</div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Our Journey Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-primary mb-4">Our Journey</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From a visionary startup to a leading AI marketing powerhouse
            </p>
          </motion.div>

          <div className="relative">
            {/* Central Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-primary to-accent h-full"></div>
            
            <div className="space-y-16">
              {journeyMilestones.map((milestone, index) => {
                const IconComponent = iconMap[milestone.icon as keyof typeof iconMap] || Zap;
                const isLeft = index % 2 === 0;
                
                return (
                  <motion.div
                    key={milestone.id}
                    className={`flex items-center ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
                    initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                  >
                    {/* Content Card */}
                    <div className={`w-5/12 ${isLeft ? 'pr-8' : 'pl-8'}`}>
                      <motion.div 
                        className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-accent/20"
                        whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <div className={`w-12 h-12 rounded-full ${milestone.color} flex items-center justify-center`}>
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-primary">{milestone.year}</div>
                            <div className="text-sm text-accent font-semibold">{milestone.highlight}</div>
                          </div>
                        </div>
                        <h3 className="text-xl font-bold text-primary mb-3">{milestone.title}</h3>
                        <p className="text-muted-foreground mb-4">{milestone.description}</p>
                        <div className="bg-accent/10 rounded-lg p-3">
                          <div className="text-sm font-semibold text-accent">{milestone.metrics}</div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Central Circle */}
                    <div className="w-2/12 flex justify-center">
                      <motion.div 
                        className="w-16 h-16 bg-white rounded-full border-4 border-primary shadow-lg flex items-center justify-center z-10"
                        whileHover={{ scale: 1.1, rotate: 180 }}
                        transition={{ duration: 0.5 }}
                      >
                        <IconComponent className="w-8 h-8 text-primary" />
                      </motion.div>
                    </div>

                    {/* Empty Space */}
                    <div className="w-5/12"></div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      {awards.length > 0 && (
        <section className="py-20 px-4 bg-white/50">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-primary mb-4">Awards & Recognition</h2>
              <p className="text-lg text-muted-foreground">
                Recognized for excellence in AI-driven marketing innovation
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {awards.map((award, index) => {
                const IconComponent = iconMap[award.icon as keyof typeof iconMap] || Trophy;
                return (
                  <motion.div
                    key={award.id}
                    className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-accent/20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className={`w-16 h-16 bg-gradient-to-r ${award.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-lg font-bold text-primary mb-2">{award.year}</div>
                    <h3 className="text-lg font-semibold mb-2">{award.title}</h3>
                    <p className="text-sm text-muted-foreground">{award.organization}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Team Section */}
      {teamMembers.length > 0 && (
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-primary mb-4">Meet Our Team</h2>
              <p className="text-lg text-muted-foreground">
                The brilliant minds behind AIAdMaxify's success
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.id}
                  className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-accent/20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  {member.profile_photo ? (
                    <img
                      src={member.profile_photo}
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                      <Users2 className="w-12 h-12 text-accent" />
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-primary mb-2">{member.name}</h3>
                  <div className="text-accent font-semibold mb-3">{member.role}</div>
                  {member.bio && (
                    <p className="text-sm text-muted-foreground">{member.bio}</p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default About;
