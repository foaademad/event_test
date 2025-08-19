import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, Users } from 'lucide-react';
import { Event } from '../../types';
import Card from '../common/Card';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const {
    id,
    title,
    date,
    time,
    location,
    imageUrl,
    price,
    category,
    attendees,
    capacity,
  } = event;

  // Format the price
  const formattedPrice = price === 0 
    ? 'Free' 
    : new Intl.NumberFormat('en-US', { 
        style: 'currency', 
        currency: 'USD' 
      }).format(price);

  // Calculate percentage of capacity filled
  const capacityPercentage = Math.round((attendees / capacity) * 100);
  const isNearlyFull = capacityPercentage >= 80;
  const isFull = attendees >= capacity;

  return (
    <Card className="h-full transition-all duration-300 hover:shadow-lg">
      <div className="relative">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-0 right-0 m-2">
          <span className="inline-block bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
            {category}
          </span>
        </div>
        {isFull && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-bold text-lg">Sold Out</span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 text-gray-900 line-clamp-2">{title}</h3>
        
        <div className="mb-4 space-y-2">
          <div className="flex items-center text-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            <span className="text-sm">{date}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <Clock className="h-4 w-4 mr-2" />
            <span className="text-sm">{time}</span>
          </div>
          
          <div className="flex items-start text-gray-600">
            <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
            <span className="text-sm line-clamp-1">{location}</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="font-bold text-blue-600">{formattedPrice}</span>
          
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1 text-gray-600" />
            <div className="text-sm">
              <div className="w-24 bg-gray-200 rounded-full h-2.5">
                <div 
                  className={`h-2.5 rounded-full ${
                    isNearlyFull 
                      ? isFull 
                        ? 'bg-red-600' 
                        : 'bg-orange-500' 
                      : 'bg-green-500'
                  }`}
                  style={{ width: `${capacityPercentage}%` }}
                ></div>
              </div>
              <span className="text-xs text-gray-600 mt-1">
                {attendees}/{capacity} spots
              </span>
            </div>
          </div>
        </div>
        
        <Link 
          to={`/events/${id}`}
          className="block w-full mt-4 py-2 px-4 bg-transparent border border-blue-600 text-blue-600 text-center rounded hover:bg-blue-50 transition-colors duration-300"
        >
          View Details
        </Link>
      </div>
    </Card>
  );
};

export default EventCard;