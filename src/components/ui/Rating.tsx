import React from 'react';
import { Star } from 'lucide-react';

interface RatingProps {
  value: number;
  count?: number;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
}

const Rating: React.FC<RatingProps> = ({ 
  value, 
  count, 
  size = 'md',
  showCount = true
}) => {
  const starSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };
  
  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };
  
  const renderStars = () => {
    const stars = [];
    const roundedValue = Math.round(value * 2) / 2;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= roundedValue) {
        // Full star
        stars.push(
          <Star key={i} className={`${starSizes[size]} fill-yellow-400 text-yellow-400`} />
        );
      } else if (i - 0.5 === roundedValue) {
        // Half star
        stars.push(
          <div key={i} className="relative">
            <Star className={`${starSizes[size]} text-gray-300`} />
            <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
              <Star className={`${starSizes[size]} fill-yellow-400 text-yellow-400`} />
            </div>
          </div>
        );
      } else {
        // Empty star
        stars.push(
          <Star key={i} className={`${starSizes[size]} text-gray-300`} />
        );
      }
    }
    
    return stars;
  };
  
  return (
    <div className="flex items-center">
      <div className="flex">{renderStars()}</div>
      {showCount && count !== undefined && (
        <span className={`ml-1 ${textSizes[size]} text-gray-600`}>({count})</span>
      )}
    </div>
  );
};

export default Rating;