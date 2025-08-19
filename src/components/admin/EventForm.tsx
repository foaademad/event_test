import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, DollarSign, Users, Image, Info } from 'lucide-react';
import Input from '../common/Input';
import Button from '../common/Button';
import { Event } from '../../types';

interface EventFormProps {
  event?: Event;
  onSubmit: (eventData: Partial<Event>) => void;
  isLoading: boolean;
  error: string | null;
}

const EventForm: React.FC<EventFormProps> = ({ 
  event, 
  onSubmit, 
  isLoading, 
  error 
}) => {
  const [eventData, setEventData] = useState<Partial<Event>>({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    organizer: '',
    price: 0,
    category: '',
    imageUrl: '',
    capacity: 100,
  });
  
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string;
  }>({});

  useEffect(() => {
    if (event) {
      setEventData(event);
    }
  }, [event]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setEventData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'capacity' ? parseFloat(value) : value
    }));
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    
    if (!eventData.title) {
      errors.title = 'Title is required';
    }
    
    if (!eventData.description) {
      errors.description = 'Description is required';
    }
    
    if (!eventData.date) {
      errors.date = 'Date is required';
    }
    
    if (!eventData.time) {
      errors.time = 'Time is required';
    }
    
    if (!eventData.location) {
      errors.location = 'Location is required';
    }
    
    if (!eventData.category) {
      errors.category = 'Category is required';
    }
    
    if (!eventData.imageUrl) {
      errors.imageUrl = 'Image URL is required';
    }
    
    if (eventData.capacity && eventData.capacity <= 0) {
      errors.capacity = 'Capacity must be greater than 0';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(eventData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Event Title
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Info className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              id="title"
              name="title"
              type="text"
              placeholder="Enter event title"
              value={eventData.title}
              onChange={handleChange}
              error={validationErrors.title}
              className="pl-10"
              fullWidth
            />
          </div>
        </div>
        
        <div className="md:col-span-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            placeholder="Enter event description"
            value={eventData.description}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${
              validationErrors.description ? 'border-red-500' : 'border-gray-300'
            } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
          />
          {validationErrors.description && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.description}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
            Event Date
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              id="date"
              name="date"
              type="date"
              value={eventData.date}
              onChange={handleChange}
              error={validationErrors.date}
              className="pl-10"
              fullWidth
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
            Event Time
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Clock className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              id="time"
              name="time"
              type="time"
              value={eventData.time}
              onChange={handleChange}
              error={validationErrors.time}
              className="pl-10"
              fullWidth
            />
          </div>
        </div>
        
        <div className="md:col-span-2">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              id="location"
              name="location"
              type="text"
              placeholder="Enter event location"
              value={eventData.location}
              onChange={handleChange}
              error={validationErrors.location}
              className="pl-10"
              fullWidth
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="organizer" className="block text-sm font-medium text-gray-700 mb-1">
            Organizer
          </label>
          <Input
            id="organizer"
            name="organizer"
            type="text"
            placeholder="Enter organizer name"
            value={eventData.organizer}
            onChange={handleChange}
            error={validationErrors.organizer}
            fullWidth
          />
        </div>
        
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={eventData.category}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${
              validationErrors.category ? 'border-red-500' : 'border-gray-300'
            } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
          >
            <option value="">Select a category</option>
            <option value="music">Music</option>
            <option value="technology">Technology</option>
            <option value="business">Business</option>
            <option value="food">Food & Drink</option>
            <option value="arts">Arts & Culture</option>
            <option value="sports">Sports</option>
            <option value="health">Health & Wellness</option>
          </select>
          {validationErrors.category && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.category}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
            Price ($)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <DollarSign className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              id="price"
              name="price"
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              value={eventData.price}
              onChange={handleChange}
              error={validationErrors.price}
              className="pl-10"
              fullWidth
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 mb-1">
            Capacity
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Users className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              id="capacity"
              name="capacity"
              type="number"
              min="1"
              placeholder="100"
              value={eventData.capacity}
              onChange={handleChange}
              error={validationErrors.capacity}
              className="pl-10"
              fullWidth
            />
          </div>
        </div>
        
        <div className="md:col-span-2">
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
            Event Image URL
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Image className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              id="imageUrl"
              name="imageUrl"
              type="url"
              placeholder="https://example.com/image.jpg"
              value={eventData.imageUrl}
              onChange={handleChange}
              error={validationErrors.imageUrl}
              className="pl-10"
              fullWidth
            />
          </div>
        </div>
      </div>
      
      <div className="flex justify-end space-x-3">
        <Button type="button" variant="outline">
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {event ? 'Updating Event...' : 'Creating Event...'}
            </span>
          ) : (
            event ? 'Update Event' : 'Create Event'
          )}
        </Button>
      </div>
    </form>
  );
};

export default EventForm;