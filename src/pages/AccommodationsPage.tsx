import React, { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';
import AppHeader from '../components/layout/AppHeader';
import AppFooter from '../components/layout/AppFooter';
import AccommodationFilters from '../components/accommodation/AccommodationFilters';
import AccommodationCard from '../components/accommodation/AccommodationCard';
import { Accommodation, Campus } from '../types';

const AccommodationsPage: React.FC = () => {
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [filteredAccommodations, setFilteredAccommodations] = useState<Accommodation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCampus, setSelectedCampus] = useState<Campus | null>(null);
  
  useEffect(() => {
    // Get selected campus from localStorage
    const campusData = localStorage.getItem('selectedCampus');
    if (campusData) {
      setSelectedCampus(JSON.parse(campusData));
    }
    
    // Placeholder data for development
    const placeholderAccommodations: Accommodation[] = [
      {
        id: 1,
        name: "Kost Singgahsini",
        address: "Jl. Kebon Jeruk Raya No. 35, Jakarta Barat",
        distance: 0.5,
        campusId: 1,
        price: 3000000,
        gender: "male",
        hasAC: true,
        hasPrivateBathroom: true,
        hasFurnishedBed: true,
        hasWifi: true,
        hasParking: true,
        images: [
          '/images/kost3.jpg'
        ],
        description: "Clean and comfortable kost located just 5 minutes walking distance from BINUS Anggrek. All rooms are equipped with AC, private bathroom, and furnished with a bed, desk, and wardrobe.",
        rules: ["No smoking", "No pets", "No visitors after 10 PM", "Quiet hours: 10 PM - 6 AM"],
        facilities: ["AC", "Private Bathroom", "Furnished Bed", "WiFi", "Parking", "Laundry Service", "Security"],
        benefits: ["Close to campus", "Near convenience stores", "Near restaurants"],
        rating: 4.5,
        reviewCount: 28,
        latitude: -6.201920,
        longitude: 106.783352,
        hasPromotion: true,
        promotionDetails: "10% off first month for new students",
        availability: 3
      },
      {
        id: 2,
        name: "Kost Averio",
        address: "Jl. Palmerah Barat No. 12, Jakarta Barat",
        distance: 0.8,
        campusId: 1,
        price: 2500000,
        gender: "female",
        hasAC: true,
        hasPrivateBathroom: false,
        hasFurnishedBed: true,
        hasWifi: true,
        hasParking: false,
        images: [
          '/images/kost2.jpg'
        ],
        description: "Female-only kost with comfortable rooms, shared bathrooms, and a communal kitchen. Located in a quiet neighborhood about 10 minutes walking distance from BINUS Anggrek.",
        rules: ["Female only", "No smoking", "No pets", "Quiet hours: 10 PM - 6 AM"],
        facilities: ["AC", "Shared Bathroom", "Furnished Bed", "WiFi", "Communal Kitchen", "Security"],
        benefits: ["Close to campus", "Near shopping mall", "Near public transportation"],
        rating: 4.2,
        reviewCount: 15,
        latitude: -6.202462,
        longitude: 106.786102,
        hasPromotion: false,
        availability: 2
      },
      {
        id: 3,
        name: "Kost Sejahtera",
        address: "Jl. Rawa Belong No. 45, Jakarta Barat",
        distance: 1.2,
        campusId: 1,
        price: 2100000,
        gender: "mixed",
        hasAC: true,
        hasPrivateBathroom: true,
        hasFurnishedBed: true,
        hasWifi: true,
        hasParking: true,
        images: [
          "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          "https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        ],
        description: "Modern kost with spacious rooms, all equipped with private bathrooms and AC. The building has a rooftop common area for residents to relax and socialize.",
        rules: ["No smoking inside rooms", "No loud music after 10 PM", "Visitors allowed until 9 PM"],
        facilities: ["AC", "Private Bathroom", "Furnished Bed", "WiFi", "Parking", "Rooftop Area", "Security"],
        benefits: ["Near restaurants", "Near convenience stores", "Public transportation access"],
        rating: 4.7,
        reviewCount: 32,
        latitude: -6.199462,
        longitude: 106.783102,
        hasPromotion: true,
        promotionDetails: "Free first week for minimum 6-month contract",
        availability: 5
      },
      {
        id: 4,
        name: "Kost Nyaman",
        address: "Jl. Kemanggisan Raya No. 28, Jakarta Barat",
        distance: 0.3,
        campusId: 1,
        price: 1700000,
        gender: "male",
        hasAC: true,
        hasPrivateBathroom: true,
        hasFurnishedBed: false,
        hasWifi: true,
        hasParking: true,
        images: [
          "https://images.pexels.com/photos/1743227/pexels-photo-1743227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          "https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        ],
        description: "Clean and strategic kost just 3 minutes walk from BINUS Anggrek. Rooms are equipped with AC and private bathroom but unfurnished (you can bring your own furniture).",
        rules: ["No smoking", "No loud music", "No visitors after 9 PM"],
        facilities: ["AC", "Private Bathroom", "WiFi", "Parking", "Security"],
        benefits: ["Very close to campus", "Near food stalls", "Near minimarket"],
        rating: 4.0,
        reviewCount: 12,
        latitude: -6.200920,
        longitude: 106.782352,
        hasPromotion: false,
        availability: 1
      }
    ];
    
    setAccommodations(placeholderAccommodations);
    setFilteredAccommodations(placeholderAccommodations);
    setIsLoading(false);
  }, []);
  
  const handleApplyFilters = (filters: any) => {
    let filtered = [...accommodations];
    
    if (filters.minPrice !== undefined) {
      filtered = filtered.filter(acc => acc.price >= filters.minPrice);
    }
    
    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter(acc => acc.price <= filters.maxPrice);
    }
    
    if (filters.gender) {
      filtered = filtered.filter(acc => acc.gender === filters.gender);
    }
    
    if (filters.facilities && filters.facilities.length > 0) {
      filtered = filtered.filter(acc => {
        if (filters.facilities.includes('ac') && !acc.hasAC) return false;
        if (filters.facilities.includes('privateBathroom') && !acc.hasPrivateBathroom) return false;
        if (filters.facilities.includes('wifi') && !acc.hasWifi) return false;
        if (filters.facilities.includes('furnishedBed') && !acc.hasFurnishedBed) return false;
        return true;
      });
    }
    
    setFilteredAccommodations(filtered);
  };
  
  const handleResetFilters = () => {
    setFilteredAccommodations(accommodations);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      
      <main className="flex-grow bg-gradient-to-b from-primary-50 to-primary-100 px-4 py-6">
        <div className="container mx-auto">
          {/* Campus Location */}
          {selectedCampus && (
            <div className="flex items-center mb-6">
              <MapPin className="h-5 w-5 text-primary-600 mr-2" />
              <p className="text-neutral-700">
                Showing accommodations near <span className="font-medium">{selectedCampus.name}</span>
              </p>
            </div>
          )}
          
          {/* Filters */}
          <AccommodationFilters 
            onApplyFilters={handleApplyFilters}
            onResetFilters={handleResetFilters}
          />
          
          {/* Accommodation List */}
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAccommodations.map(accommodation => (
                <AccommodationCard 
                  key={accommodation.id} 
                  accommodation={accommodation} 
                />
              ))}
              
              {filteredAccommodations.length === 0 && (
                <div className="col-span-full py-12 text-center">
                  <p className="text-neutral-600 text-lg">No accommodations match your filters. Try adjusting your criteria.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      
      <AppFooter />
    </div>
  );
};

export default AccommodationsPage;