
import { motion } from 'framer-motion';
import { TrendingUp, Users, Award, DollarSign } from 'lucide-react';
import { Graph } from '@/components/ui/graph';

const PremiumStats = () => {
  const roiData = [
    { name: 'Q1', value: 12 },
    { name: 'Q2', value: 15 },
    { name: 'Q3', value: 17 },
    { name: 'Q4', value: 17 }
  ];

  const clientGrowthData = [
    { name: 'Jan', value: 100 },
    { name: 'Feb', value: 150 },
    { name: 'Mar', value: 220 },
    { name: 'Apr', value: 310 },
    { name: 'May', value: 420 },
    { name: 'Jun', value: 450 }
  ];

  const stats = [
    {
      icon: Award,
      label: "Average ROI",
      value: "17X",
      description: "Return on Investment",
      color: "text-green-600"
    },
    {
      icon: Users,
      label: "Happy Clients",
      value: "450+",
      description: "Satisfied Customers",
      color: "text-blue-600"
    },
    {
      icon: TrendingUp,
      label: "Growth Rate",
      value: "300%+",
      description: "Average Client Growth",
      color: "text-purple-600"
    },
    {
      icon: DollarSign,
      label: "Revenue Generated",
      value: "$50M+",
      description: "Total Client Revenue",
      color: "text-orange-600"
    }
  ];

  return (
    <section className="bg-gradient-to-br from-gray-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Proven <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Results</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our data-driven approach delivers exceptional ROI and sustainable growth for our clients
          </p>
        </motion.div>

        {/* Key Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center"
            >
              <stat.icon className={`w-12 h-12 ${stat.color} mx-auto mb-4`} />
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="font-semibold text-gray-700 mb-1">{stat.label}</div>
              <div className="text-sm text-gray-500">{stat.description}</div>
            </motion.div>
          ))}
        </div>

        {/* Graphs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Graph 
              data={roiData} 
              type="line" 
              color="#10b981" 
              title="Average ROI Growth" 
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Graph 
              data={clientGrowthData} 
              type="bar" 
              color="#8b5cf6" 
              title="Client Growth Over Time" 
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PremiumStats;
