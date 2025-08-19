import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import EventGrid from '../components/events/EventGrid';
import EventFilters, { EventFilters as FilterType } from '../components/events/EventFilters';
import { useEvents } from '../hooks/useEvents';

const EventsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { events, filteredEvents, isLoading, fetchEvents, filterEvents } = useEvents();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [filters, setFilters] = useState<FilterType>({
    category: searchParams.get('category') || '',
    date: searchParams.get('date') || '',
    price: searchParams.get('price') || '',
  });

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  useEffect(() => {
    const category = searchParams.get('category');
    const date = searchParams.get('date');
    const price = searchParams.get('price');
    const search = searchParams.get('search');
    
    if (category || date || price || search) {
      const newFilters = {
        category: category || '',
        date: date || '',
        price: price || '',
      };
      
      setFilters(newFilters);
      setSearchTerm(search || '');
      
      filterEvents(newFilters, search || '');
    }
  }, [searchParams, filterEvents]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    
    const newParams = new URLSearchParams(searchParams);
    if (term) {
      newParams.set('search', term);
    } else {
      newParams.delete('search');
    }
    
    setSearchParams(newParams);
    filterEvents(filters, term);
  };

  const handleFilterChange = (newFilters: FilterType) => {
    setFilters(newFilters);
    
    const newParams = new URLSearchParams(searchParams);
    
    if (newFilters.category) {
      newParams.set('category', newFilters.category);
    } else {
      newParams.delete('category');
    }
    
    if (newFilters.date) {
      newParams.set('date', newFilters.date);
    } else {
      newParams.delete('date');
    }
    
    if (newFilters.price) {
      newParams.set('price', newFilters.price);
    } else {
      newParams.delete('price');
    }
    
    setSearchParams(newParams);
    filterEvents(newFilters, searchTerm);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Explore Events</h1>
          <p className="text-gray-600">
            Discover and attend exciting events in your area
          </p>
        </div>
        
        <EventFilters 
          onSearch={handleSearch} 
          onFilterChange={handleFilterChange} 
        />
        
        <EventGrid 
          events={filteredEvents.length > 0 ? filteredEvents : events} 
          isLoading={isLoading} 
        />
        
        {/* Pagination would go here in a real application */}
        <div className="mt-8 flex justify-center">
          <nav className="inline-flex rounded-md shadow">
            <button className="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              Previous
            </button>
            <button className="px-3 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium text-gray-700">
              1
            </button>
            <button className="px-3 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium text-blue-600 bg-blue-50">
              2
            </button>
            <button className="px-3 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium text-gray-700">
              3
            </button>
            <button className="px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              Next
            </button>
          </nav>
        </div>
      </div>
    </Layout>
  );
};

export default EventsPage;