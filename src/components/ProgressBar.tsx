import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  value: number;
  max: number;
  label?: string;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'accent';
  showPercentage?: boolean; // If true and unit is not provided, shows value as percentage
  unit?: string; // e.g., "%", "days", "pts". If provided, this unit is shown next to the value.
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max,
  label,
  color = 'primary',
  showPercentage = true,
  unit,
  size = 'md',
  className = '',
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  
  const colorClasses = {
    primary: 'bg-gradient-to-r from-primary-400 to-primary-600',
    secondary: 'bg-gradient-to-r from-secondary-400 to-secondary-600',
    success: 'bg-gradient-to-r from-success-400 to-success-600',
    warning: 'bg-gradient-to-r from-warning-400 to-warning-600',
    danger: 'bg-gradient-to-r from-danger-400 to-danger-600',
    accent: 'bg-gradient-to-r from-accent-400 to-accent-600',
  };
  
  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  const labelColor = percentage >= 100 ? 'text-success-600' : 
                     percentage >= 75 ? 'text-primary-600' :
                     percentage >= 50 ? 'text-warning-600' : 'text-danger-600';

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          {(unit || showPercentage) && (
            <span className={`text-sm font-medium ${labelColor}`}>
              {unit ? `${value.toFixed(0)}${unit}` : (showPercentage ? `${percentage.toFixed(0)}%` : '')}
            </span>
          )}
        </div>
      )}
      <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${sizeClasses[size]}`}>
        <motion.div
          className={`${colorClasses[color]} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ height: '100%' }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;