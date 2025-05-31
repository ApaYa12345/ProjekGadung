import React, { useState, useEffect } from 'react';
import { MapPin, Search, Filter } from 'lucide-react';
import AppHeader from '../components/layout/AppHeader';
import AppFooter from '../components/layout/AppFooter';
import RestaurantCard from '../components/restaurant/RestaurantCard';
import Button from '../components/ui/Button';
import { Restaurant, Campus, MenuItem } from '../types';

const RestaurantsPage: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCampus, setSelectedCampus] = useState<Campus | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activePriceFilter, setActivePriceFilter] = useState<string | null>(null);
  const [activeCuisineFilter, setActiveCuisineFilter] = useState<string | null>(null);
  
  useEffect(() => {
    // Get selected campus from localStorage
    const campusData = localStorage.getItem('selectedCampus');
    if (campusData) {
      setSelectedCampus(JSON.parse(campusData));
    }
    
    // Placeholder menu items
    const popularMenuItems1: MenuItem[] = [
      { id: 1, name: "Nasi Goreng Special", description: "Fried rice with chicken, egg and vegetables", price: 28000, isPopular: true },
      { id: 2, name: "Ayam Penyet", description: "Smashed fried chicken with sambal", price: 32000, isPopular: true },
      { id: 3, name: "Es Teh Manis", description: "Sweet iced tea", price: 8000, isPopular: true },
      { id: 4, name: "Mie Goreng", description: "Fried noodles with egg and vegetables", price: 25000, isPopular: false }
    ];
    
    const popularMenuItems2: MenuItem[] = [
      { id: 5, name: "Beef Burger", description: "Grilled beef patty with cheese and vegetables", price: 35000, isPopular: true },
      { id: 6, name: "French Fries", description: "Crispy potato fries", price: 20000, isPopular: true },
      { id: 7, name: "Iced Latte", description: "Espresso with cold milk", price: 25000, isPopular: true },
      { id: 8, name: "Chicken Wings", description: "Spicy fried chicken wings", price: 30000, isPopular: false }
    ];
    
    const popularMenuItems3: MenuItem[] = [
      { id: 9, name: "Bakso Spesial", description: "Beef meatball soup with noodles", price: 30000, isPopular: true },
      { id: 10, name: "Soto Ayam", description: "Chicken soup with rice and vegetables", price: 28000, isPopular: true },
      { id: 11, name: "Es Jeruk", description: "Fresh orange juice", price: 12000, isPopular: true },
      { id: 12, name: "Siomay", description: "Steamed fish dumplings", price: 25000, isPopular: false }
    ];
    
    // Placeholder data for development
    const placeholderRestaurants: Restaurant[] = [
      {
        id: 1,
        name: "Warung Makan Barokah",
        address: "Jl. Kebon Jeruk Raya No. 15, Jakarta Barat",
        distance: 0.2,
        campusId: 1,
        cuisine: "Indonesian",
        priceRange: "low",
        images: [
          "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          "https://images.pexels.com/photos/5835353/pexels-photo-5835353.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        ],
        menuItems: popularMenuItems1,
        openingHours: "08:00 - 21:00",
        rating: 4.3,
        reviewCount: 42,
        latitude: -6.201520,
        longitude: 106.782952,
        hasPromotion: true,
        promotionDetails: "10% off for BINUS students (show your student ID)"
      },
      {
        id: 2,
        name: "Cafe Corner",
        address: "Jl. Palmerah Barat No. 8, Jakarta Barat",
        distance: 0.5,
        campusId: 1,
        cuisine: "Western",
        priceRange: "medium",
        images: [
          "https://images.pexels.com/photos/2074130/pexels-photo-2074130.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          "https://images.pexels.com/photos/5835353/pexels-photo-5835353.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        ],
        menuItems: popularMenuItems2,
        openingHours: "10:00 - 22:00",
        rating: 4.5,
        reviewCount: 37,
        latitude: -6.202162,
        longitude: 106.785602,
        hasPromotion: false
      },
      {
        id: 3,
        name: "Bakso Pak Tono",
        address: "Jl. Rawa Belong No. 23, Jakarta Barat",
        distance: 0.8,
        campusId: 1,
        cuisine: "Indonesian",
        priceRange: "low",
        images: [
          "https://images.pexels.com/photos/5835353/pexels-photo-5835353.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          "https://images.pexels.com/photos/2074130/pexels-photo-2074130.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        ],
        menuItems: popularMenuItems3,
        openingHours: "09:00 - 20:00",
        rating: 4.7,
        reviewCount: 56,
        latitude: -6.199962,
        longitude: 106.783502,
        hasPromotion: true,
        promotionDetails: "Free iced tea with any meatball soup order"
      }
    ];
    
    setRestaurants(placeholderRestaurants);
    setFilteredRestaurants(placeholderRestaurants);
    setIsLoading(false);
  }, []);
  
  useEffect(() => {
    applyFilters();
  }, [searchQuery, activePriceFilter, activeCuisineFilter]);
  
  const applyFilters = () => {
    let filtered = [...restaurants];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        restaurant => 
          restaurant.name.toLowerCase().includes(query) || 
          restaurant.cuisine.toLowerCase().includes(query) ||
          restaurant.menuItems.some(item => item.name.toLowerCase().includes(query))
      );
    }
    
    // Apply price filter
    if (activePriceFilter) {
      filtered = filtered.filter(restaurant => restaurant.priceRange === activePriceFilter);
    }
    
    // Apply cuisine filter
    if (activeCuisineFilter) {
      filtered = filtered.filter(restaurant => restaurant.cuisine === activeCuisineFilter);
    }
    
    setFilteredRestaurants(filtered);
  };
  
  const handlePriceFilter = (price: string) => {
    setActivePriceFilter(activePriceFilter === price ? null : price);
  };
  
  const handleCuisineFilter = (cuisine: string) => {
    setActiveCuisineFilter(activeCuisineFilter === cuisine ? null : cuisine);
  };
  
  const cuisines = [...new Set(restaurants.map(restaurant => restaurant.cuisine))];
  
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
                Showing restaurants near <span className="font-medium">{selectedCampus.name}</span>
              </p>
            </div>
          )}
          
          {/* Search and Filters */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-neutral-800 mb-4">Restaurants</h2>
            
            <div className="flex flex-col md:flex-row items-start gap-4 mb-4">
              {/* Search */}
              <div className="relative w-full md:w-auto md:flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search restaurants or dishes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
              </div>
              
              {/* Filter buttons */}
              <div className="flex flex-wrap gap-2 w-full md:w-auto">
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={activePriceFilter === 'low' ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => handlePriceFilter('low')}
                  >
                    $
                  </Button>
                  <Button
                    variant={activePriceFilter === 'medium' ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => handlePriceFilter('medium')}
                  >
                    $$
                  </Button>
                  <Button
                    variant={activePriceFilter === 'high' ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => handlePriceFilter('high')}
                  >
                    $$$
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-2 ml-2">
                  {cuisines.map(cuisine => (
                    <Button
                      key={cuisine}
                      variant={activeCuisineFilter === cuisine ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => handleCuisineFilter(cuisine)}
                    >
                      {cuisine}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Restaurant List */}
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRestaurants.map(restaurant => (
                <RestaurantCard 
                  key={restaurant.id} 
                  restaurant={restaurant} 
                />
              ))}
              
              {filteredRestaurants.length === 0 && (
                <div className="col-span-full py-12 text-center">
                  <p className="text-neutral-600 text-lg">No restaurants match your search or filters. Try adjusting your criteria.</p>
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

export default RestaurantsPage;