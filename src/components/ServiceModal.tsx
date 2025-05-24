
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Star, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: {
    title: string;
    fullDescription: string;
    features: string[];
    benefits: string[];
    icon: any;
  } | null;
}

const ServiceModal: React.FC<ServiceModalProps> = ({ isOpen, onClose, service }) => {
  if (!service) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center space-x-4">
                  <service.icon size={48} className="text-purple-600" />
                  <h2 className="text-3xl font-bold text-gray-900">{service.title}</h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Description */}
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                {service.fullDescription}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Features */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <CheckCircle className="text-green-500 mr-2" size={20} />
                    Key Features
                  </h3>
                  <ul className="space-y-3">
                    {service.features.map((feature, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start space-x-3"
                      >
                        <CheckCircle size={16} className="text-purple-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Benefits */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <TrendingUp className="text-blue-500 mr-2" size={20} />
                    Expected Benefits
                  </h3>
                  <ul className="space-y-3">
                    {service.benefits.map((benefit, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                        className="flex items-start space-x-3"
                      >
                        <Star size={16} className="text-yellow-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">{benefit}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* CTA */}
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Ready to Get Started?
                </h3>
                <p className="text-gray-600 mb-4">
                  Let's discuss how this service can transform your business
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/strategy-call">
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3">
                      Book Free Consultation
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50 px-8 py-3">
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ServiceModal;
