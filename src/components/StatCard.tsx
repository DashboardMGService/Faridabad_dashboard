import React, { useState } from 'react';
import { ArrowUpRight, ArrowDownRight, TrendingUp, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatIndianCurrency } from '../utils/formatting';

interface StatCardProps {
  title: string;
  value: string | number;
  percentChange?: number;
  icon: React.ReactNode;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'accent';
  subValue?: string;
  className?: string;
  mechValue?: number;
  bpValue?: number;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  subValue,
  percentChange, 
  icon, 
  color = 'primary',
  className = '',
  mechValue = 0,
  bpValue = 0,
}) => {
  
  const [isHovered, setIsHovered] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleDoubleClick = () => {
    setIsFlipped(!isFlipped);
  };
  
  const colorClasses = {
    primary: 'border-primary-500 bg-gradient-to-br from-white to-primary-50 shadow-primary-100/40',
    secondary: 'border-secondary-500 bg-gradient-to-br from-white to-secondary-50 shadow-secondary-100/40',
    success: 'border-success-500 bg-gradient-to-br from-white to-success-50 shadow-success-100/40',
    warning: 'border-warning-500 bg-gradient-to-br from-white to-warning-50 shadow-warning-100/40',
    danger: 'border-danger-500 bg-gradient-to-br from-white to-danger-50 shadow-danger-100/40',
    accent: 'border-accent-500 bg-gradient-to-br from-white to-accent-50 shadow-accent-100/40'
  };
  
  const iconBgClasses = {
    primary: 'bg-primary-50 text-primary-500',
    secondary: 'bg-secondary-50 text-secondary-500',
    success: 'bg-success-50 text-success-500',
    warning: 'bg-warning-50 text-warning-500',
    danger: 'bg-danger-50 text-danger-500',
    accent: 'bg-accent-50 text-accent-500'
  };

  const gradientClasses = {
    primary: 'from-primary-500 to-primary-600',
    secondary: 'from-secondary-500 to-secondary-600',
    success: 'from-success-500 to-success-600',
    warning: 'from-warning-500 to-warning-600',
    danger: 'from-danger-500 to-danger-600',
    accent: 'from-accent-500 to-accent-600'
  };

  return (
    <div style={{ perspective: 1000 }} onDoubleClick={handleDoubleClick}>
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        whileHover={{ y: isFlipped ? 0 : -5 }}
        onHoverStart={() => !isFlipped && setIsHovered(true)}
        onHoverEnd={() => !isFlipped && setIsHovered(false)}
      >
        {/* Front Side */}
        <div
          className={`stat-card ${colorClasses[color]} ${className} w-full h-full`}
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' as any }}
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h4 className="text-sm font-medium text-gray-500">{title}</h4>
              <motion.div
                className="mt-2 flex items-baseline"
                initial={{ scale: 1 }}
                animate={{ scale: isHovered ? 1.05 : 1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <p className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">{value}</p>
                {subValue && (
                  <p className="ml-2 text-sm text-gray-500">{subValue}</p>
                )}
              </motion.div>
              
              {percentChange !== undefined && (
                <div className="mt-2 flex items-center text-xs">
                  {percentChange >= 0 ? (
                    <div className="flex items-center bg-success-50 text-success-600 px-2 py-1 rounded-full">
                      <div className="relative">
                        <ArrowUpRight className="text-success-500 mr-1" size={14} />
                        {isHovered && (
                          <motion.div
                            className="absolute -top-1 -right-1"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 }}
                          >
                            <TrendingUp size={10} className="text-success-400" />
                          </motion.div>
                        )}
                      </div>
                      <span className="text-success-600 font-medium">
                        +{Math.abs(percentChange)}%
                      </span>
                      <span className="ml-1 text-success-600/70">vs prev. year</span>
                    </div>
                  ) : (
                    <div className="flex items-center bg-danger-50 text-danger-600 px-2 py-1 rounded-full">
                      <div className="relative">
                        <ArrowDownRight className="text-danger-500 mr-1" size={14} />
                        {isHovered && (
                          <motion.div
                            className="absolute -top-1 -right-1"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 }}
                          >
                            <TrendingDown size={10} className="text-danger-400" />
                          </motion.div>
                        )}
                      </div>
                      <span className="text-danger-600 font-medium">
                        -{Math.abs(percentChange)}%
                      </span>
                      <span className="ml-1 text-danger-600/70">vs prev. year</span>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <motion.div
              className={`p-3 rounded-full ${isHovered ? `bg-gradient-to-br ${gradientClasses[color]} text-white` : iconBgClasses[color]}`}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {icon}
            </motion.div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 h-1 mt-4">
            <div
              className={`h-full bg-gradient-to-r ${gradientClasses[color]} ${isHovered ? 'rounded-b-xl' : 'rounded-bl-xl'}`}
              style={{
                width: isHovered ? '100%' : '30%',
                transition: 'width 0.5s ease-in-out'
              }}
            />
          </div>
        </div>

        {/* Back Side */}
        <div
          className={`stat-card absolute inset-0 ${colorClasses[color]} ${className} w-full h-full flex flex-col justify-center items-center`}
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <h4 className="text-sm font-medium text-gray-500 mb-2">{title} Breakdown</h4>
          <div className="flex justify-around w-full mt-2">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-500">Mechanical</p>
              <p className="text-lg font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">{formatIndianCurrency(mechValue)}</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-500">Body & Paint</p>
              <p className="text-lg font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">{formatIndianCurrency(bpValue)}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default StatCard;