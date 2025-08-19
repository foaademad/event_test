import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, DollarSign, Share2, Heart, BookOpen } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Button from '../components/common/Button';
import { useEvents } from '../hooks/useEvents';
import { useAuth } from '../hooks/useAuth';

const EventDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { selectedEvent, fetchEventById, isLoading } = useEvents();
  const { isAuthenticated } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (id) {
      fetchEventById(id);
    }
  }, [id, fetchEventById]);

  const handleRegister = () => {
    setIsRegistering(true);
    // In a real app, this would call an API to register the user
    setTimeout(() => {
      setIsRegistering(false);
      // Show success message or redirect
    }, 1000);
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
    // In a real app, this would call an API to save the like status
  };

  if (isLoading || !selectedEvent) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="h-96 bg-gray-300 rounded-lg mb-8"></div>
            <div className="h-10 bg-gray-300 rounded w-3/4 mb-4"></div>
            <div className="h-6 bg-gray-300 rounded w-1/2 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="col-span-2">
                <div className="h-6 bg-gray-300 rounded w-1/4 mb-4"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
              </div>
              <div>
                <div className="h-64 bg-gray-300 rounded mb-4"></div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  const {
    title,
    description,
    date,
    time,
    location,
    organizer,
    price,
    category,
    imageUrl,
    attendees,
    capacity,
  } = selectedEvent;

  // Format the price
  const formattedPrice = price === 0
    ? 'Free'
    : new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(price);

  // Calculate if event is sold out
  const isSoldOut = attendees >= capacity;
  const capacityPercentage = Math.round((attendees / capacity) * 100);
  const isNearlyFull = capacityPercentage >= 80;

  return (
    <Layout>
      <div>
        {/* Hero Section with Image */}
        <div className="relative">
          <div className="w-full h-72 md:h-96 bg-gray-300 relative">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          </div>
          
          <div className="absolute top-4 right-4 flex space-x-2">
            <button 
              className={`p-2 rounded-full ${isLiked ? 'bg-red-500 text-white' : 'bg-white text-gray-700'} shadow-md transition-colors duration-300`}
              onClick={toggleLike}
            >
              <Heart className="h-5 w-5" fill={isLiked ? 'currentColor' : 'none'} />
            </button>
            <button className="p-2 rounded-full bg-white text-gray-700 shadow-md">
              <Share2 className="h-5 w-5" />
            </button>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/2">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div>
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full mb-2">
                    {category}
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                    {title}
                  </h1>
                  <div className="flex items-center text-gray-600">
                    <p className="flex items-center mr-4">
                      <Calendar className="h-4 w-4 mr-1" />
                      {date}
                    </p>
                    <p className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {time}
                    </p>
                  </div>
                </div>
                <div className="mt-4 sm:mt-0 sm:text-right">
                  <p className="font-bold text-2xl text-blue-600 mb-1">
                    {formattedPrice}
                  </p>
                  {!isAuthenticated ? (
                    <div className="mt-2">
                      <Link to="/login" className="text-blue-600 font-medium hover:text-blue-800">
                        Login to register
                      </Link>
                    </div>
                  ) : (
                    <Button
                      onClick={handleRegister}
                      disabled={isSoldOut || isRegistering}
                      className={`${isSoldOut ? 'bg-gray-400' : ''}`}
                    >
                      {isRegistering ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </span>
                      ) : isSoldOut ? (
                        'Sold Out'
                      ) : (
                        'Register Now'
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Event Details */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <BookOpen className="h-6 w-6 mr-2 text-blue-600" />
                  About This Event
                </h2>
                <div className="prose max-w-none text-gray-700">
                  <p>{description}</p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Organizer
                </h2>
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
                    {organizer.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium text-gray-900">{organizer}</h3>
                    <p className="text-gray-600 text-sm">Event Organizer</p>
                  </div>
                </div>
                <div className="mt-4">
                  <Button variant="outline" size="sm">
                    Contact Organizer
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Event Information Sidebar */}
            <div>
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h3 className="font-bold text-gray-900 mb-4 text-lg">Event Information</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
                    <div>
                      <h4 className="font-medium text-gray-900">Date & Time</h4>
                      <p className="text-gray-600">{date} • {time}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
                    <div>
                      <h4 className="font-medium text-gray-900">Location</h4>
                      <p className="text-gray-600">{location}</p>
                      <a 
                        href={`https://maps.google.com/?q=${encodeURIComponent(location)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-1 inline-block"
                      >
                        View on Map
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <DollarSign className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
                    <div>
                      <h4 className="font-medium text-gray-900">Price</h4>
                      <p className="text-gray-600">{formattedPrice}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Users className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
                    <div>
                      <h4 className="font-medium text-gray-900">Capacity</h4>
                      <div className="flex items-center mt-1">
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                          <div 
                            className={`h-2.5 rounded-full ${
                              isNearlyFull 
                                ? isSoldOut 
                                  ? 'bg-red-600' 
                                  : 'bg-orange-500' 
                                : 'bg-green-500'
                            }`}
                            style={{ width: `${capacityPercentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">
                          {attendees}/{capacity}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 mt-6 pt-6">
                  {!isAuthenticated ? (
                    <Link to="/login">
                      <Button fullWidth>Login to Register</Button>
                    </Link>
                  ) : (
                    <Button
                      onClick={handleRegister}
                      disabled={isSoldOut || isRegistering}
                      fullWidth
                      className={`${isSoldOut ? 'bg-gray-400' : ''}`}
                    >
                      {isRegistering ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </span>
                      ) : isSoldOut ? (
                        'Sold Out'
                      ) : (
                        'Register Now'
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EventDetailPage;