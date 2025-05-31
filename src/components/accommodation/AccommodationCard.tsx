import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, BedDouble, Bath, Wifi, Fan, Tag } from 'lucide-react';
import Card from '../ui/Card';
import Rating from '../ui/Rating';
import { Accommodation } from '../../types';

interface AccommodationCardProps {
  accommodation: Accommodation;
}

const AccommodationCard: React.FC<AccommodationCardProps> = ({ accommodation }) => {
  const truncateDescription = (text: string, maxLength: number = 120) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <Card withHover>
      <div className="relative">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={accommodation.images[0]} 
            alt={accommodation.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
          {accommodation.hasPromotion && (
            <div className="absolute top-3 left-3 bg-secondary-500 text-neutral-900 py-1 px-2 rounded-md text-xs font-medium flex items-center">
              <Tag className="h-3 w-3 mr-1" />
              Promo
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-20 opacity-70"></div>
          <div className="absolute bottom-3 left-3">
            <Rating value={accommodation.rating} count={accommodation.reviewCount} size="sm" />
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-lg text-neutral-800 mb-1">{accommodation.name}</h3>
            <span className="text-lg font-bold text-primary-600">
              {new Intl.NumberFormat('id-ID', { 
                style: 'currency', 
                currency: 'IDR',
                maximumFractionDigits: 0
              }).format(accommodation.price)}<span className="text-sm font-normal text-neutral-500">/mo</span>
            </span>
          </div>
          
          <div className="flex items-start mb-3">
            <MapPin className="h-4 w-4 text-neutral-500 mr-1 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-neutral-600">{accommodation.address}</p>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-3">
            {accommodation.gender === 'male' && (
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800">
                Male Only
              </span>
            )}
            {accommodation.gender === 'female' && (
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-pink-100 text-pink-800">
                Female Only
              </span>
            )}
            {accommodation.gender === 'mixed' && (
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-purple-100 text-purple-800">
                Mixed Gender
              </span>
            )}
            {accommodation.hasAC && (
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                <Fan className="h-3 w-3 mr-1" />
                AC
              </span>
            )}
            {accommodation.hasPrivateBathroom && (
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                <Bath className="h-3 w-3 mr-1" />
                Private Bathroom
              </span>
            )}
            {accommodation.hasFurnishedBed && (
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                <BedDouble className="h-3 w-3 mr-1" />
                Furnished
              </span>
            )}
            {accommodation.hasWifi && (
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                <Wifi className="h-3 w-3 mr-1" />
                WiFi
              </span>
            )}
          </div>
          
          <p className="text-neutral-600 text-sm mb-4">
            {truncateDescription(accommodation.description)}
          </p>
          
          <div className="flex justify-between items-center">
            <div className="text-sm text-neutral-500">
              <span className="font-medium text-primary-600">{accommodation.availability}</span> rooms available
            </div>
            <Link
              to={`/accommodations/${accommodation.id}`}
              className="inline-flex items-center px-3 py-1.5 border border-primary-500 text-primary-600 rounded-md text-sm font-medium hover:bg-primary-50 transition-colors"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AccommodationCard;