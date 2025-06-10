
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface ModernCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  gradient: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  delay?: number;
}

export const ModernCard = ({ title, value, icon: Icon, gradient, trend, delay = 0 }: ModernCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.02 }}
      className="transform transition-all duration-300"
    >
      <Card className={`${gradient} text-white border-0 shadow-xl hover:shadow-2xl transition-shadow duration-300`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium opacity-90">
            {title}
          </CardTitle>
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Icon className="text-white" size={20} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold mb-2">{value}</div>
          {trend && (
            <div className={`text-sm flex items-center ${trend.isPositive ? 'text-green-200' : 'text-red-200'}`}>
              <span className="mr-1">{trend.isPositive ? '↗' : '↘'}</span>
              {Math.abs(trend.value)}% from last month
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};
