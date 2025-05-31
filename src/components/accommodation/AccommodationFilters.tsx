import React, { useState } from 'react';
import { Filter, ChevronDown, Check } from 'lucide-react';
import Button from '../ui/Button';

interface AccommodationFiltersProps {
  onApplyFilters: (filters: any) => void;
  onResetFilters: () => void;
}

const AccommodationFilters: React.FC<AccommodationFiltersProps> = ({ 
  onApplyFilters,
  onResetFilters
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000000]);
  const [gender, setGender] = useState<string | null>(null);
  const [facilities, setFacilities] = useState<string[]>([]);
  
  const handleToggleFacility = (facility: string) => {
    if (facilities.includes(facility)) {
      setFacilities(facilities.filter(f => f !== facility));
    } else {
      setFacilities([...facilities, facility]);
    }
  };
  
  const handleApplyFilters = () => {
    onApplyFilters({
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      gender,
      facilities
    });
    setIsOpen(false);
  };
  
  const handleResetFilters = () => {
    setPriceRange([0, 5000000]);
    setGender(null);
    setFacilities([]);
    onResetFilters();
  };
  
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-neutral-800">Accommodations</h2>
        
        <Button
          variant="outline"
          size="sm"
          leftIcon={<Filter className="h-4 w-4" />}
          onClick={() => setIsOpen(!isOpen)}
        >
          Filters
          <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </Button>
      </div>
      
      {isOpen && (
        <div className="bg-white rounded-lg shadow-card p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Price Range */}
            <div>
              <h3 className="font-medium text-neutral-700 mb-2">Price Range</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-neutral-500">
                  <span>
                    {new Intl.NumberFormat('id-ID', { 
                      style: 'currency', 
                      currency: 'IDR',
                      maximumFractionDigits: 0
                    }).format(priceRange[0])}
                  </span>
                  <span>
                    {new Intl.NumberFormat('id-ID', { 
                      style: 'currency', 
                      currency: 'IDR',
                      maximumFractionDigits: 0
                    }).format(priceRange[1])}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="5000000"
                  step="100000"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                  className="w-full"
                />
                <input
                  type="range"
                  min="0"
                  max="5000000"
                  step="100000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full"
                />
              </div>
            </div>
            
            {/* Gender */}
            <div>
              <h3 className="font-medium text-neutral-700 mb-2">Gender</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    checked={gender === 'male'}
                    onChange={() => setGender('male')}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                  />
                  <span className="ml-2 text-neutral-700">Male Only</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    checked={gender === 'female'}
                    onChange={() => setGender('female')}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                  />
                  <span className="ml-2 text-neutral-700">Female Only</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    checked={gender === 'mixed'}
                    onChange={() => setGender('mixed')}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                  />
                  <span className="ml-2 text-neutral-700">Mixed</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    checked={gender === null}
                    onChange={() => setGender(null)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                  />
                  <span className="ml-2 text-neutral-700">Any</span>
                </label>
              </div>
            </div>
            
            {/* Facilities */}
            <div>
              <h3 className="font-medium text-neutral-700 mb-2">Facilities</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={facilities.includes('ac')}
                    onChange={() => handleToggleFacility('ac')}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                  />
                  <span className="ml-2 text-neutral-700">Air Conditioning</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={facilities.includes('privateBathroom')}
                    onChange={() => handleToggleFacility('privateBathroom')}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                  />
                  <span className="ml-2 text-neutral-700">Private Bathroom</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={facilities.includes('wifi')}
                    onChange={() => handleToggleFacility('wifi')}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                  />
                  <span className="ml-2 text-neutral-700">WiFi</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={facilities.includes('furnishedBed')}
                    onChange={() => handleToggleFacility('furnishedBed')}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                  />
                  <span className="ml-2 text-neutral-700">Furnished</span>
                </label>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end mt-6 space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleResetFilters}
            >
              Reset
            </Button>
            <Button
              variant="primary"
              size="sm"
              leftIcon={<Check className="h-4 w-4" />}
              onClick={handleApplyFilters}
            >
              Apply Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccommodationFilters;