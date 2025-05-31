import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Logo from '../components/ui/Logo';

const SplashPage: React.FC = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      const isLoggedIn = localStorage.getItem('user') !== null;
      
      // Redirect after animation (3 seconds)
      setTimeout(() => {
        if (isLoggedIn) {
          const hasCampus = localStorage.getItem('selectedCampus') !== null;
          navigate(hasCampus ? '/dashboard' : '/campus-select');
        } else {
          navigate('/signin');
        }
      }, 3000);
    };
    
    checkAuth();
  }, [navigate]);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-primary-500 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <Logo variant="full" size="xl" className="mb-8" />
        
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 2, delay: 0.5 }}
          className="h-1 bg-secondary-500 rounded-full max-w-xs mx-auto mt-8"
        />
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-white mt-4 text-lg"
        >
          Your Campus Companion
        </motion.p>
      </motion.div>
    </div>
  );
};

export default SplashPage;