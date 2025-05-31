import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  clickable?: boolean;
  onClick?: () => void;
  withHover?: boolean;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  clickable = false,
  onClick,
  withHover = true
}) => {
  const baseClasses = 'bg-white rounded-lg overflow-hidden';
  const shadowClasses = 'shadow-card';
  const hoverClasses = withHover ? 'transition-all duration-300 hover:shadow-card-hover' : '';
  const clickableClasses = clickable ? 'cursor-pointer' : '';
  
  const variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    hover: { y: -5, transition: { duration: 0.2 } }
  };
  
  return (
    <motion.div
      className={`${baseClasses} ${shadowClasses} ${hoverClasses} ${clickableClasses} ${className}`}
      initial="initial"
      animate="animate"
      whileHover={withHover ? "hover" : undefined}
      variants={variants}
      onClick={clickable ? onClick : undefined}
    >
      {children}
    </motion.div>
  );
};

export default Card;