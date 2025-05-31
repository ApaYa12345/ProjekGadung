import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Home, Utensils, Heart } from 'lucide-react';
import AppHeader from '../components/layout/AppHeader';
import AppFooter from '../components/layout/AppFooter';
import DashboardFeatureCard from '../components/dashboard/DashboardFeatureCard';
import { Campus } from '../types';

const DashboardPage: React.FC = () => {
  const [selectedCampus, setSelectedCampus] = useState<Campus | null>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Get selected campus from localStorage
    const campusData = localStorage.getItem('selectedCampus');
    
    if (campusData) {
      setSelectedCampus(JSON.parse(campusData));
    } else {
      // Redirect to campus selection if no campus is selected
      navigate('/campus-select');
    }
  }, [navigate]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      
      <main className="flex-grow bg-gradient-to-b from-primary-50 to-primary-100">
        {/* Hero Section */}
        <div className="bg-primary-600 text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Welcome to BINUSLIFE
            </h1>
            {selectedCampus && (
              <div className="flex items-center mb-6">
                <MapPin className="h-5 w-5 mr-2" />
                <p className="text-lg">{selectedCampus.name}</p>
              </div>
            )}
            <p className="text-xl max-w-2xl">
              Your complete resource for finding accommodations, food, and healthcare services near your BINUS campus.
            </p>
          </div>
        </div>
        
        {/* Main Features */}
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-2xl font-semibold text-neutral-800 mb-8">What are you looking for?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <DashboardFeatureCard 
              title="Accommodations" 
              description="Find your perfect student housing with filters for price, facilities, and location."
              icon={<Home className="h-6 w-6 text-primary-600" />}
              to="/accommodations"
              color="border-primary-500"
              index={0}
            />
            
            <DashboardFeatureCard 
              title="Restaurants" 
              description="Discover nearby restaurants, cafes, and food options with menus and promotions."
              icon={<Utensils className="h-6 w-6 text-primary-600" />}
              to="/restaurants"
              color="border-secondary-500"
              index={1}
            />
            
            <DashboardFeatureCard 
              title="Healthcare" 
              description="Locate clinics, schedule appointments with doctors, and find emergency services."
              icon={<Heart className="h-6 w-6 text-primary-600" />}
              to="/clinics"
              color="border-red-500"
              index={2}
            />
          </div>
        </div>
        
        {/* Current Promotions */}
        <div className="bg-white py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-semibold text-neutral-800 mb-8">Current Promotions</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Placeholder promotions */}
              <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg overflow-hidden shadow-card">
                <div className="p-6 text-white">
                  <h3 className="text-xl font-semibold mb-2">New Student Special</h3>
                  <p className="mb-4">Get 10% off your first month's rent at participating accommodations.</p>
                  <button className="bg-white text-primary-600 px-4 py-2 rounded-md font-medium hover:bg-neutral-100 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-lg overflow-hidden shadow-card">
                <div className="p-6 text-neutral-900">
                  <h3 className="text-xl font-semibold mb-2">Lunch Discount</h3>
                  <p className="mb-4">Enjoy 15% off lunch menu items at selected restaurants near campus.</p>
                  <button className="bg-white text-secondary-600 px-4 py-2 rounded-md font-medium hover:bg-neutral-100 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg overflow-hidden shadow-card">
                <div className="p-6 text-white">
                  <h3 className="text-xl font-semibold mb-2">Health Check Package</h3>
                  <p className="mb-4">Special student rates on comprehensive health check packages.</p>
                  <button className="bg-white text-red-600 px-4 py-2 rounded-md font-medium hover:bg-neutral-100 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <AppFooter />
    </div>
  );
};

export default DashboardPage;