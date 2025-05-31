import React, { useState, useEffect } from 'react';
import { MapPin, Search } from 'lucide-react';
import AppHeader from '../components/layout/AppHeader';
import AppFooter from '../components/layout/AppFooter';
import ClinicCard from '../components/clinic/ClinicCard';
import Button from '../components/ui/Button';
import { Clinic, Campus, Doctor, Schedule } from '../types';

const ClinicsPage: React.FC = () => {
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [filteredClinics, setFilteredClinics] = useState<Clinic[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCampus, setSelectedCampus] = useState<Campus | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSpecialtyFilter, setActiveSpecialtyFilter] = useState<string | null>(null);
  const [showEmergencyOnly, setShowEmergencyOnly] = useState(false);
  
  useEffect(() => {
    // Get selected campus from localStorage
    const campusData = localStorage.getItem('selectedCampus');
    if (campusData) {
      setSelectedCampus(JSON.parse(campusData));
    }
    
    // Placeholder schedules
    const weekdaySchedule: Schedule[] = [
      { day: 'Monday', startTime: '08:00', endTime: '17:00', available: true },
      { day: 'Tuesday', startTime: '08:00', endTime: '17:00', available: true },
      { day: 'Wednesday', startTime: '08:00', endTime: '17:00', available: true },
      { day: 'Thursday', startTime: '08:00', endTime: '17:00', available: true },
      { day: 'Friday', startTime: '08:00', endTime: '17:00', available: true },
      { day: 'Saturday', startTime: '09:00', endTime: '14:00', available: true },
      { day: 'Sunday', startTime: '', endTime: '', available: false },
    ];
    
    const fullWeekSchedule: Schedule[] = [
      { day: 'Monday', startTime: '08:00', endTime: '20:00', available: true },
      { day: 'Tuesday', startTime: '08:00', endTime: '20:00', available: true },
      { day: 'Wednesday', startTime: '08:00', endTime: '20:00', available: true },
      { day: 'Thursday', startTime: '08:00', endTime: '20:00', available: true },
      { day: 'Friday', startTime: '08:00', endTime: '20:00', available: true },
      { day: 'Saturday', startTime: '09:00', endTime: '17:00', available: true },
      { day: 'Sunday', startTime: '09:00', endTime: '15:00', available: true },
    ];
    
    // Placeholder doctors
    const doctors1: Doctor[] = [
      { 
        id: 1, 
        name: 'Dr. Andi Wijaya', 
        specialization: 'General Practitioner',
        schedule: weekdaySchedule,
        rating: 4.5,
      },
      { 
        id: 2, 
        name: 'Dr. Siti Rahayu', 
        specialization: 'Dentist',
        schedule: weekdaySchedule,
        rating: 4.7,
      }
    ];
    
    const doctors2: Doctor[] = [
      { 
        id: 3, 
        name: 'Dr. Budi Santoso', 
        specialization: 'General Practitioner',
        schedule: fullWeekSchedule,
        rating: 4.3,
      },
      { 
        id: 4, 
        name: 'Dr. Maya Putri', 
        specialization: 'Pediatrician',
        schedule: weekdaySchedule,
        rating: 4.8,
      },
      { 
        id: 5, 
        name: 'Dr. Hendra Wijaya', 
        specialization: 'Dermatologist',
        schedule: weekdaySchedule,
        rating: 4.6,
      }
    ];
    
    const doctors3: Doctor[] = [
      { 
        id: 6, 
        name: 'Dr. Ahmad Hidayat', 
        specialization: 'General Practitioner',
        schedule: fullWeekSchedule,
        rating: 4.4,
      },
      { 
        id: 7, 
        name: 'Dr. Dewi Suryani', 
        specialization: 'Ophthalmologist',
        schedule: weekdaySchedule,
        rating: 4.9,
      }
    ];
    
    // Placeholder data for development
    const placeholderClinics: Clinic[] = [
      {
        id: 1,
        name: "Klinik Utama Kemanggisan Medical Center",
        address: "Jl. Kebon Jeruk Raya No. 10, Jakarta Barat",
        distance: 0.3,
        campusId: 1,
        images: [
          '/images/kost1.jpg'
        ],
        doctors: doctors1,
        services: ["General Check-up", "Dental Care", "Laboratory Tests", "Vaccinations"],
        openingHours: "08:00 - 17:00 (Mon-Fri), 09:00 - 14:00 (Sat)",
        hasEmergencyService: false,
        rating: 4.5,
        reviewCount: 28,
        latitude: -6.201820,
        longitude: 106.782352
      },
      {
        id: 2,
        name: "Klinik Medika Plus",
        address: "Jl. Palmerah Barat No. 15, Jakarta Barat",
        distance: 0.7,
        campusId: 1,
        images: [
          "https://images.pexels.com/photos/668300/pexels-photo-668300.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          "https://images.pexels.com/photos/3938022/pexels-photo-3938022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        ],
        doctors: doctors2,
        services: ["General Check-up", "Pediatric Care", "Dermatology", "Minor Surgery", "Laboratory Tests", "X-Ray"],
        openingHours: "08:00 - 20:00 (Mon-Fri), 09:00 - 17:00 (Sat-Sun)",
        hasEmergencyService: true,
        rating: 4.7,
        reviewCount: 42,
        latitude: -6.202462,
        longitude: 106.786102
      },
      {
        id: 3,
        name: "Klinik Mata Sejahtera",
        address: "Jl. Rawa Belong No. 35, Jakarta Barat",
        distance: 1.1,
        campusId: 1,
        images: [
          "https://images.pexels.com/photos/3938022/pexels-photo-3938022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          "https://images.pexels.com/photos/1692693/pexels-photo-1692693.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        ],
        doctors: doctors3,
        services: ["Eye Examination", "Eyeglasses Prescription", "Contact Lens Fitting", "Eye Surgery Consultation"],
        openingHours: "08:00 - 17:00 (Mon-Fri), 09:00 - 14:00 (Sat)",
        hasEmergencyService: false,
        rating: 4.8,
        reviewCount: 35,
        latitude: -6.199462,
        longitude: 106.784102
      }
    ];
    
    setClinics(placeholderClinics);
    setFilteredClinics(placeholderClinics);
    setIsLoading(false);
  }, []);
  
  useEffect(() => {
    applyFilters();
  }, [searchQuery, activeSpecialtyFilter, showEmergencyOnly]);
  
  const applyFilters = () => {
    let filtered = [...clinics];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        clinic => 
          clinic.name.toLowerCase().includes(query) || 
          clinic.services.some(service => service.toLowerCase().includes(query)) ||
          clinic.doctors.some(doctor => 
            doctor.name.toLowerCase().includes(query) || 
            doctor.specialization.toLowerCase().includes(query)
          )
      );
    }
    
    // Apply specialty filter
    if (activeSpecialtyFilter) {
      filtered = filtered.filter(clinic => 
        clinic.doctors.some(doctor => doctor.specialization === activeSpecialtyFilter)
      );
    }
    
    // Apply emergency filter
    if (showEmergencyOnly) {
      filtered = filtered.filter(clinic => clinic.hasEmergencyService);
    }
    
    setFilteredClinics(filtered);
  };
  
  const handleSpecialtyFilter = (specialty: string) => {
    setActiveSpecialtyFilter(activeSpecialtyFilter === specialty ? null : specialty);
  };
  
  // Get all unique specializations
  const specializations = [...new Set(
    clinics.flatMap(clinic => clinic.doctors.map(doctor => doctor.specialization))
  )];
  
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
                Showing healthcare facilities near <span className="font-medium">{selectedCampus.name}</span>
              </p>
            </div>
          )}
          
          {/* Search and Filters */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-neutral-800 mb-4">Healthcare Facilities</h2>
            
            <div className="flex flex-col md:flex-row items-start gap-4 mb-4">
              {/* Search */}
              <div className="relative w-full md:w-auto md:flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search clinics, doctors, or services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
              </div>
              
              {/* Filter buttons */}
              <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
                <div className="flex flex-wrap gap-2">
                  {specializations.map(specialization => (
                    <Button
                      key={specialization}
                      variant={activeSpecialtyFilter === specialization ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => handleSpecialtyFilter(specialization)}
                    >
                      {specialization}
                    </Button>
                  ))}
                </div>
                
                <Button
                  variant={showEmergencyOnly ? 'primary' : 'outline'}
                  size="sm"
                  className={showEmergencyOnly ? 'bg-red-500 hover:bg-red-600 border-red-500' : 'text-red-500 border-red-500 hover:bg-red-50'}
                  onClick={() => setShowEmergencyOnly(!showEmergencyOnly)}
                >
                  24/7 Emergency
                </Button>
              </div>
            </div>
          </div>
          
          {/* Clinics List */}
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredClinics.map(clinic => (
                <ClinicCard 
                  key={clinic.id} 
                  clinic={clinic} 
                />
              ))}
              
              {filteredClinics.length === 0 && (
                <div className="col-span-full py-12 text-center">
                  <p className="text-neutral-600 text-lg">No healthcare facilities match your search or filters. Try adjusting your criteria.</p>
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

export default ClinicsPage;