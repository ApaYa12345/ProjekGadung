import React from 'react';
import { Leaf } from 'lucide-react';

interface LogoProps {
  variant?: 'full' | 'icon';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  variant = 'full', 
  size = 'md',
  className = ''
}) => {
  const sizeClasses = {
    sm: { icon: 'w-6 h-6', text: 'text-lg' },
    md: { icon: 'w-8 h-8', text: 'text-xl' },
    lg: { icon: 'w-10 h-10', text: 'text-2xl' },
    xl: { icon: 'w-12 h-12', text: 'text-3xl' }
  };
  
  return (
    <div className={`flex items-center ${className}`}>
      {variant === 'full' ? (
        <>
          <span className={`font-display font-bold ${sizeClasses[size].text} text-white`}>
            BINUS<span className="text-secondary-500">LIFE</span>
          </span>
          <Leaf className={`${sizeClasses[size].icon} text-secondary-500 ml-1`} />
        </>
      ) : (
        <div className="relative">
          <Leaf className={`${sizeClasses[size].icon} text-secondary-500`} />
        </div>
      )}
    </div>
  );
};

export default Logo;