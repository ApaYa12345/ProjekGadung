import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Tag } from 'lucide-react';
import Card from '../ui/Card';
import Rating from '../ui/Rating';
import { Restaurant } from '../../types';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  const getPriceRangeSymbol = (range: string) => {
    switch (range) {
      case 'low':
        return '$';
      case 'medium':
        return '$$';
      case 'high':
        return '$$$';
      default:
        return '$$';
    }
  };

  return (
    <Card withHover>
      <div className="relative">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={restaurant.images[0]} 
            alt={restaurant.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
          {restaurant.hasPromotion && (
            <div className="absolute top-3 left-3 bg-secondary-500 text-neutral-900 py-1 px-2 rounded-md text-xs font-medium flex items-center">
              <Tag className="h-3 w-3 mr-1" />
              Promo
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-20 opacity-70"></div>
          <div className="absolute bottom-3 left-3">
            <Rating value={restaurant.rating} count={restaurant.reviewCount} size="sm" />
          </div>
          <div className="absolute bottom-3 right-3">
            <span className="text-white text-sm font-medium py-0.5 px-2 bg-black bg-opacity-50 rounded">
              {getPriceRangeSymbol(restaurant.priceRange)}
            </span>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-lg text-neutral-800 mb-1">{restaurant.name}</h3>
            <span className="text-sm font-medium px-2 py-0.5 bg-primary-100 text-primary-700 rounded">
              {restaurant.cuisine}
            </span>
          </div>
          
          <div className="flex items-start mb-2">
            <MapPin className="h-4 w-4 text-neutral-500 mr-1 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-neutral-600">{restaurant.address}</p>
          </div>
          
          <div className="flex items-start mb-4">
            <Clock className="h-4 w-4 text-neutral-500 mr-1 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-neutral-600">{restaurant.openingHours}</p>
          </div>
          
          {/* Popular menu items */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-neutral-700 mb-2">Popular Menu:</h4>
            <div className="space-y-1">
              {restaurant.menuItems
                .filter(item => item.isPopular)
                .slice(0, 3)
                .map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-neutral-600">{item.name}</span>
                    <span className="font-medium text-neutral-700">
                      {new Intl.NumberFormat('id-ID', { 
                        style: 'currency', 
                        currency: 'IDR',
                        maximumFractionDigits: 0
                      }).format(item.price)}
                    </span>
                  </div>
                ))}
            </div>
          </div>
          
          <div className="flex justify-end">
            <Link
              to={`/restaurants/${restaurant.id}`}
              className="inline-flex items-center px-3 py-1.5 border border-primary-500 text-primary-600 rounded-md text-sm font-medium hover:bg-primary-50 transition-colors"
            >
              View Menu
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RestaurantCard;