
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Target, Award, TrendingUp, Calendar, CheckCircle } from 'lucide-react';

const About = () => {
  const stats = [
    { icon: Users, label: 'Happy Clients', value: '500+' },
    { icon: Target, label: 'Success Rate', value: '95%' },
    { icon: Award, label: 'Awards Won', value: '15' },
    { icon: TrendingUp, label: 'Growth Rate', value: '300%' }
  ];

  const journey = [
    {
      year: '2017',
      title: 'Foundation',
      description: 'Started as a small digital marketing consultancy with a vision to revolutionize online advertising.',
      achievements: ['First client acquired', 'Team of 3 founded', 'Initial strategies developed']
    },
    {
      year: '2018',
      title: 'Growth Phase',
      description: 'Expanded services and began incorporating AI technologies into our marketing strategies.',
      achievements: ['50+ clients served', 'AI integration started', 'First major campaign success']
    },
    {
      year: '2019',
      title: 'Innovation',
      description: 'Developed proprietary AI algorithms for better targeting and campaign optimization.',
      achievements: ['Proprietary AI developed', '100+ clients milestone', 'Industry recognition']
    },
    {
      year: '2020',
      title: 'Expansion',
      description: 'Despite global challenges, we thrived by helping businesses adapt to digital-first strategies.',
      achievements: ['Remote-first operations', '200+ clients served', 'COVID-19 adaptation strategies']
    },
    {
      year: '2021',
      title: 'AI Leadership',
      description: 'Became industry leaders in AI-powered marketing with breakthrough results for clients.',
      achievements: ['AI leadership established', '300+ clients milestone', 'Industry awards received']
    },
    {
      year: '2022',
      title: 'Scale & Excellence',
      description: 'Scaled operations globally while maintaining our commitment to personalized service.',
      achievements: ['Global expansion', '400+ clients served', 'Excellence certifications']
    },
    {
      year: '2023',
      title: 'Market Dominance',
      description: 'Established ourselves as the go-to agency for AI-powered marketing solutions.',
      achievements: ['Market leadership', '500+ clients milestone', 'Strategic partnerships']
    },
    {
      year: '2024',
      title: 'Future Vision',
      description: 'Continued innovation with next-generation AI technologies and predictive analytics.',
      achievements: ['Next-gen AI launch', 'Predictive analytics', 'Industry transformation']
    },
    {
      year: '2025',
      title: 'Innovation Frontier',
      description: 'Leading the industry into the future with cutting-edge AI solutions and unprecedented results.',
      achievements: ['Industry frontier', 'AI evolution', 'Future-ready solutions']
    }
  ];

  const values = [
    {
      title: 'Innovation First',
      description: 'We constantly push the boundaries of what\'s possible in digital marketing through cutting-edge AI technology.'
    },
    {
      title: 'Results Driven',
      description: 'Every strategy we implement is designed with one goal in mind: delivering measurable, impactful results for our clients.'
    },
    {
      title: 'Client Success',
      description: 'Your success is our success. We\'re committed to being true partners in your business growth journey.'
    },
    {
      title: 'Transparency',
      description: 'We believe in complete transparency in our processes, reporting, and communication with our clients.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-accent/5">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">
              About AIAdMaxify
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              We're not just another marketing agency. We're your growth partners, 
              leveraging cutting-edge AI technology to transform your business and maximize your advertising potential.
            </p>
            <Badge className="text-lg py-2 px-6 bg-gradient-to-r from-primary to-accent">
              Established 2017 • 500+ Success Stories
            </Badge>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                  <stat.icon className="text-white" size={32} />
                </div>
                <h3 className="text-3xl font-bold text-primary mb-2">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              Our Journey: 2017 - 2025
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From a small startup to industry leaders, here's how we've grown and evolved 
              to become the premier AI-powered marketing agency.
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gradient-to-b from-primary to-accent"></div>
              
              {journey.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className={`relative flex items-center mb-12 ${
                    index % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-white shadow-lg z-10"></div>
                  
                  {/* Content */}
                  <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                    <Card className="p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <CardContent className="p-0">
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center mr-4">
                            <Calendar className="text-white" size={20} />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-primary">{milestone.year}</h3>
                            <h4 className="text-lg font-semibold text-gray-800">{milestone.title}</h4>
                          </div>
                        </div>
                        <p className="text-gray-600 mb-4">{milestone.description}</p>
                        <div className="space-y-2">
                          {milestone.achievements.map((achievement, achIndex) => (
                            <div key={achIndex} className="flex items-center">
                              <CheckCircle className="text-green-500 mr-2" size={16} />
                              <span className="text-sm text-gray-700">{achievement}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These principles guide everything we do and shape how we serve our clients.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-6 h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-0">
                    <h3 className="text-xl font-bold text-primary mb-4">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Be Part of Our Success Story?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join hundreds of successful businesses who have transformed their growth with our AI-powered marketing solutions.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <button className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Get Started Today
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors">
                Schedule a Call
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
