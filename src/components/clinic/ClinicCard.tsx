import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, AlertCircle } from 'lucide-react';
import Card from '../ui/Card';
import Rating from '../ui/Rating';
import { Clinic } from '../../types';

interface ClinicCardProps {
  clinic: Clinic;
}

const ClinicCard: React.FC<ClinicCardProps> = ({ clinic }) => {
  return (
    <Card withHover>
      <div className="relative">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={clinic.images[0]} 
            alt={clinic.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
          {clinic.hasEmergencyService && (
            <div className="absolute top-3 left-3 bg-red-500 text-white py-1 px-2 rounded-md text-xs font-medium flex items-center">
              <AlertCircle className="h-3 w-3 mr-1" />
              24/7 Emergency
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-20 opacity-70"></div>
          <div className="absolute bottom-3 left-3">
            <Rating value={clinic.rating} count={clinic.reviewCount} size="sm" />
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-lg text-neutral-800 mb-1">{clinic.name}</h3>
          
          <div className="flex items-start mb-2">
            <MapPin className="h-4 w-4 text-neutral-500 mr-1 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-neutral-600">{clinic.address}</p>
          </div>
          
          <div className="flex items-start mb-4">
            <Clock className="h-4 w-4 text-neutral-500 mr-1 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-neutral-600">{clinic.openingHours}</p>
          </div>
          
          {/* Services */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-neutral-700 mb-2">Services:</h4>
            <div className="flex flex-wrap gap-1">
              {clinic.services.slice(0, 3).map((service, index) => (
                <span 
                  key={index}
                  className="text-xs px-2 py-1 bg-primary-100 text-primary-700 rounded"
                >
                  {service}
                </span>
              ))}
              {clinic.services.length > 3 && (
                <span className="text-xs px-2 py-1 bg-neutral-100 text-neutral-700 rounded">
                  +{clinic.services.length - 3} more
                </span>
              )}
            </div>
          </div>
          
          {/* Doctors */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-neutral-700 mb-2">Available Doctors:</h4>
            <div className="space-y-1">
              {clinic.doctors.slice(0, 2).map(doctor => (
                <div key={doctor.id} className="flex justify-between items-center text-sm">
                  <span className="text-neutral-600">{doctor.name}</span>
                  <span className="text-xs px-2 py-0.5 bg-neutral-100 text-neutral-700 rounded">
                    {doctor.specialization}
                  </span>
                </div>
              ))}
              {clinic.doctors.length > 2 && (
                <div className="text-sm text-neutral-500">
                  +{clinic.doctors.length - 2} more doctors
                </div>
              )}
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <Link
              to={`/clinics/${clinic.id}`}
              className="inline-flex items-center px-3 py-1.5 border border-primary-500 text-primary-600 rounded-md text-sm font-medium hover:bg-primary-50 transition-colors"
            >
              View Details
            </Link>
            
            <Link
              to={`/clinics/${clinic.id}/book`}
              className="inline-flex items-center px-3 py-1.5 bg-primary-500 text-white rounded-md text-sm font-medium hover:bg-primary-600 transition-colors"
            >
              Book Appointment
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ClinicCard;