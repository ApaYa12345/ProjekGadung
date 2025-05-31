import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface DashboardFeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  to: string;
  color: string;
  index: number;
}

const DashboardFeatureCard: React.FC<DashboardFeatureCardProps> = ({ 
  title, 
  description, 
  icon, 
  to,
  color,
  index
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Link 
        to={to}
        className="block group"
      >
        <div className={`bg-white rounded-lg shadow-card overflow-hidden border-t-4 ${color} transition-all duration-300 hover:shadow-card-hover`}>
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="p-2 rounded-md bg-primary-50 mr-4">
                {icon}
              </div>
              <h3 className="text-xl font-semibold text-neutral-800">{title}</h3>
            </div>
            
            <p className="text-neutral-600 mb-4">{description}</p>
            
            <div className="flex items-center text-primary-600 font-medium group-hover:text-primary-700">
              <span>Explore</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default DashboardFeatureCard;