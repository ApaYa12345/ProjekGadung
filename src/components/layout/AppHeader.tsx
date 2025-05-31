import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, LogOut, User, Settings, Building } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../ui/Logo';
import { signOut } from '../../lib/supabase';
import { Campus } from '../../types';

const AppHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [selectedCampus, setSelectedCampus] = useState<Campus | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Close menus when location changes
    setIsMenuOpen(false);
    setIsProfileMenuOpen(false);
  }, [location]);
  
  useEffect(() => {
    // Get selected campus from localStorage
    const campusData = localStorage.getItem('selectedCampus');
    if (campusData) {
      setSelectedCampus(JSON.parse(campusData));
    }
  }, []);
  
  const handleSignOut = async () => {
    await signOut();
    navigate('/signin');
  };
  
  const navLinks = [
    { name: 'Accommodations', path: '/accommodations' },
    { name: 'Restaurants', path: '/restaurants' },
    { name: 'Clinics', path: '/clinics' },
  ];
  
  const isAuthPage = ['/signin', '/signup', '/forgot-password', '/verification'].includes(location.pathname);
  const isCampusSelect = location.pathname === '/campus-select';
  
  if (isAuthPage) {
    return (
      <header className="bg-primary-500 shadow-md py-4">
        <div className="container mx-auto px-4 flex justify-center">
          <Link to="/">
            <Logo variant="full\" size="lg" />
          </Link>
        </div>
      </header>
    );
  }
  
  return (
    <header className="bg-primary-500 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex-shrink-0">
            <Logo variant="full" size="md" />
          </Link>
          
          {/* Selected Campus (Desktop) */}
          {selectedCampus && !isCampusSelect && (
            <div className="hidden md:flex items-center ml-6 text-white">
              <Building className="h-4 w-4 mr-1" />
              <span className="text-sm font-medium">{selectedCampus.name}</span>
              <Link 
                to="/campus-select" 
                className="text-xs ml-2 underline hover:text-secondary-300"
              >
                Change
              </Link>
            </div>
          )}
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <nav className="flex items-center space-x-2">
              {!isCampusSelect && navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === link.path
                      ? 'bg-primary-600 text-white'
                      : 'text-white hover:bg-primary-600 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            
            {/* Profile Dropdown */}
            <div className="relative ml-3">
              <button
                className="flex items-center text-white hover:bg-primary-600 px-3 py-2 rounded-md text-sm font-medium"
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              >
                <span className="sr-only">Open user menu</span>
                <User className="h-5 w-5 mr-1" />
                <span>Profile</span>
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isProfileMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {isProfileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
                  >
                    <div className="py-1">
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                      >
                        <User className="h-4 w-4 mr-2 text-neutral-500" />
                        Your Profile
                      </Link>
                      <Link
                        to="/settings"
                        className="flex items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                      >
                        <Settings className="h-4 w-4 mr-2 text-neutral-500" />
                        Settings
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="flex w-full items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                      >
                        <LogOut className="h-4 w-4 mr-2 text-neutral-500" />
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-primary-600 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-primary-600"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {selectedCampus && !isCampusSelect && (
                <div className="px-3 py-2 text-white">
                  <div className="flex items-center">
                    <Building className="h-4 w-4 mr-1" />
                    <span className="text-sm font-medium">{selectedCampus.name}</span>
                  </div>
                  <Link 
                    to="/campus-select" 
                    className="text-xs ml-5 underline hover:text-secondary-300"
                  >
                    Change
                  </Link>
                </div>
              )}
              
              {!isCampusSelect && navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === link.path
                      ? 'bg-primary-700 text-white'
                      : 'text-white hover:bg-primary-700'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              <Link
                to="/profile"
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-primary-700"
              >
                Your Profile
              </Link>
              
              <Link
                to="/settings"
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-primary-700"
              >
                Settings
              </Link>
              
              <button
                onClick={handleSignOut}
                className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-primary-700"
              >
                Sign Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default AppHeader;