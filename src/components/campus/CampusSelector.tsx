import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchCampuses, fetchCampusesByCity } from '../../lib/supabase';
import { Campus } from '../../types';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { MapPin, ChevronRight } from 'lucide-react';

const CampusSelector: React.FC = () => {
  const [cities, setCities] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [campuses, setCampuses] = useState<Campus[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCities = async () => {
      try {
        const { data, error } = await fetchCampuses();
        if (error) {
          setError('Failed to load cities. Please try again.');
        } else if (data) {
          const uniqueCities = [...new Set(data.map(campus => campus.city))];
          setCities(uniqueCities);
        }
      } catch (err) {
        setError('An unexpected error occurred. Please try again.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadCities();
  }, []);

  useEffect(() => {
    const loadCampuses = async () => {
      if (!selectedCity) return;
      
      setIsLoading(true);
      try {
        const { data, error } = await fetchCampusesByCity(selectedCity);
        if (error) {
          setError('Failed to load campuses. Please try again.');
        } else if (data) {
          setCampuses(data);
        }
      } catch (err) {
        setError('An unexpected error occurred. Please try again.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadCampuses();
  }, [selectedCity]);

  const handleCampusSelect = (campus: Campus) => {
    // Store selected campus in localStorage
    localStorage.setItem('selectedCampus', JSON.stringify(campus));
    
    // Navigate to dashboard with campus ID
    navigate(`/dashboard/${campus.id}`);
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-4xl p-6">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
        </div>
        <p className="text-center mt-4 text-neutral-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-4xl p-6">
        <div className="p-4 bg-red-100 text-red-700 rounded-md">
          <p className="font-medium">Error</p>
          <p>{error}</p>
        </div>
        <div className="mt-4 text-center">
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl p-6">
      <h2 className="text-2xl font-bold text-neutral-800 mb-6">Select Your Campus</h2>
      
      {/* City Selection */}
      {!selectedCity ? (
        <div>
          <h3 className="text-lg font-medium text-neutral-700 mb-4">Choose your city</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cities.map(city => (
              <motion.div
                key={city}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card 
                  clickable 
                  onClick={() => setSelectedCity(city)}
                  className="p-6"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-primary-500 mr-2" />
                      <h3 className="text-lg font-medium text-neutral-800">{city}</h3>
                    </div>
                    <ChevronRight className="h-5 w-5 text-neutral-400" />
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-center mb-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedCity(null)}
              className="mr-4"
            >
              Back to Cities
            </Button>
            <h3 className="text-lg font-medium text-neutral-700">
              Campuses in {selectedCity}
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {campuses.map(campus => (
              <motion.div
                key={campus.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card 
                  clickable 
                  onClick={() => handleCampusSelect(campus)}
                  className="overflow-hidden"
                >
                  <div className="relative h-40 overflow-hidden">
                    <img 
                      src={campus.image} 
                      alt={campus.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-neutral-800">{campus.name}</h3>
                    <div className="mt-2 flex items-start">
                      <MapPin className="h-5 w-5 text-neutral-500 mr-2 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-neutral-600">{campus.address}</p>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button 
                        size="sm" 
                        variant="primary"
                        rightIcon={<ChevronRight className="h-4 w-4" />}
                      >
                        Select
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CampusSelector;