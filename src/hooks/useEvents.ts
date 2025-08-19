import { useState, useCallback } from 'react';
import { Event, EventsState } from '../types';
import { EventFilters } from '../components/events/EventFilters';

// Mock data for demonstration
const MOCK_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Tech Conference 2025',
    description: 'Join us for the largest tech conference of the year. Learn from industry experts, network with professionals, and discover the latest trends in technology.',
    date: '2025-05-15',
    time: '09:00',
    location: 'San Francisco Convention Center',
    organizer: 'TechEvents Inc',
    price: 299.99,
    category: 'technology',
    imageUrl: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg',
    attendees: 850,
    capacity: 1000,
  },
  {
    id: '2',
    title: 'Summer Music Festival',
    description: 'Experience three days of amazing performances by top artists across multiple genres. Food, camping, and unforgettable memories included!',
    date: '2025-07-10',
    time: '12:00',
    location: 'Golden Gate Park, San Francisco',
    organizer: 'Festival Productions',
    price: 150,
    category: 'music',
    imageUrl: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg',
    attendees: 5000,
    capacity: 5000,
  },
  {
    id: '3',
    title: 'Business Leadership Workshop',
    description: 'Develop your leadership skills in this intensive one-day workshop. Learn strategies for team management, decision making, and effective communication.',
    date: '2025-06-05',
    time: '10:00',
    location: 'Downtown Business Center',
    organizer: 'Leadership Institute',
    price: 199.99,
    category: 'business',
    imageUrl: 'https://images.pexels.com/photos/1181435/pexels-photo-1181435.jpeg',
    attendees: 45,
    capacity: 50,
  },
  {
    id: '4',
    title: 'Culinary Masterclass',
    description: 'Learn to cook like a professional chef in this hands-on masterclass. Explore techniques, ingredients, and recipes that will elevate your cooking skills.',
    date: '2025-05-20',
    time: '18:00',
    location: 'Gourmet Cooking School',
    organizer: 'Chef Anthony',
    price: 85,
    category: 'food',
    imageUrl: 'https://images.pexels.com/photos/3184188/pexels-photo-3184188.jpeg',
    attendees: 18,
    capacity: 20,
  },
  {
    id: '5',
    title: 'Art Exhibition Opening',
    description: 'Be among the first to experience this stunning new collection from renowned international artists. Wine and appetizers will be served.',
    date: '2025-04-30',
    time: '19:00',
    location: 'Metropolitan Art Gallery',
    organizer: 'Arts Foundation',
    price: 0,
    category: 'arts',
    imageUrl: 'https://images.pexels.com/photos/1509534/pexels-photo-1509534.jpeg',
    attendees: 120,
    capacity: 200,
  },
  {
    id: '6',
    title: 'Marathon 2025',
    description: 'Challenge yourself in this annual marathon event. Beautiful scenic route through the city with various distance options for all fitness levels.',
    date: '2025-08-10',
    time: '07:00',
    location: 'City Center',
    organizer: 'Sports Association',
    price: 75,
    category: 'sports',
    imageUrl: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg',
    attendees: 3500,
    capacity: 5000,
  },
];

export const useEvents = () => {
  const [eventsState, setEventsState] = useState<EventsState>({
    events: [],
    filteredEvents: [],
    selectedEvent: null,
    isLoading: false,
    error: null,
  });
  
  const fetchEvents = useCallback(async () => {
    setEventsState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setEventsState(prev => ({
        ...prev,
        events: MOCK_EVENTS,
        isLoading: false,
      }));
    } catch (error) {
      setEventsState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Failed to fetch events',
      }));
    }
  }, []);
  
  const fetchEventById = useCallback(async (id: string) => {
    setEventsState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const event = MOCK_EVENTS.find(event => event.id === id);
      
      if (event) {
        setEventsState(prev => ({
          ...prev,
          selectedEvent: event,
          isLoading: false,
        }));
      } else {
        setEventsState(prev => ({
          ...prev,
          isLoading: false,
          error: 'Event not found',
        }));
      }
    } catch (error) {
      setEventsState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Failed to fetch event',
      }));
    }
  }, []);
  
  const createEvent = useCallback(async (eventData: Partial<Event>) => {
    setEventsState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate a new ID (in a real app, this would be done server-side)
      const newEvent: Event = {
        ...eventData,
        id: `${MOCK_EVENTS.length + 1}`,
        attendees: 0,
      } as Event;
      
      setEventsState(prev => ({
        ...prev,
        events: [...prev.events, newEvent],
        isLoading: false,
      }));
      
      return newEvent;
    } catch (error) {
      setEventsState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Failed to create event',
      }));
      throw error;
    }
  }, []);
  
  const updateEvent = useCallback(async (id: string, eventData: Partial<Event>) => {
    setEventsState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setEventsState(prev => {
        const updatedEvents = prev.events.map(event => 
          event.id === id ? { ...event, ...eventData } : event
        );
        
        return {
          ...prev,
          events: updatedEvents,
          selectedEvent: prev.selectedEvent?.id === id
            ? { ...prev.selectedEvent, ...eventData }
            : prev.selectedEvent,
          isLoading: false,
        };
      });
      
      return true;
    } catch (error) {
      setEventsState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Failed to update event',
      }));
      return false;
    }
  }, []);
  
  const deleteEvent = useCallback(async (id: string) => {
    setEventsState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setEventsState(prev => ({
        ...prev,
        events: prev.events.filter(event => event.id !== id),
        filteredEvents: prev.filteredEvents.filter(event => event.id !== id),
        isLoading: false,
      }));
      
      return true;
    } catch (error) {
      setEventsState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Failed to delete event',
      }));
      return false;
    }
  }, []);
  
  const filterEvents = useCallback((filters: EventFilters, searchTerm: string = '') => {
    setEventsState(prev => {
      // Start with all events
      let filtered = [...prev.events];
      
      // Apply category filter if selected
      if (filters.category) {
        filtered = filtered.filter(event => 
          event.category.toLowerCase() === filters.category.toLowerCase()
        );
      }
      
      // Apply date filter if selected
      if (filters.date) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        const thisWeekStart = new Date(today);
        thisWeekStart.setDate(today.getDate() - today.getDay());
        
        const thisWeekEnd = new Date(thisWeekStart);
        thisWeekEnd.setDate(thisWeekStart.getDate() + 6);
        
        const nextWeekStart = new Date(thisWeekEnd);
        nextWeekStart.setDate(thisWeekEnd.getDate() + 1);
        
        const nextWeekEnd = new Date(nextWeekStart);
        nextWeekEnd.setDate(nextWeekStart.getDate() + 6);
        
        const thisMonthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        
        switch (filters.date) {
          case 'today':
            filtered = filtered.filter(event => {
              const eventDate = new Date(event.date);
              return (
                eventDate.getDate() === today.getDate() &&
                eventDate.getMonth() === today.getMonth() &&
                eventDate.getFullYear() === today.getFullYear()
              );
            });
            break;
          case 'tomorrow':
            filtered = filtered.filter(event => {
              const eventDate = new Date(event.date);
              return (
                eventDate.getDate() === tomorrow.getDate() &&
                eventDate.getMonth() === tomorrow.getMonth() &&
                eventDate.getFullYear() === tomorrow.getFullYear()
              );
            });
            break;
          case 'this-week':
            filtered = filtered.filter(event => {
              const eventDate = new Date(event.date);
              return eventDate >= thisWeekStart && eventDate <= thisWeekEnd;
            });
            break;
          case 'this-weekend':
            filtered = filtered.filter(event => {
              const eventDate = new Date(event.date);
              const day = eventDate.getDay();
              return (
                (day === 0 || day === 6) && // Saturday or Sunday
                eventDate >= today &&
                eventDate <= thisWeekEnd
              );
            });
            break;
          case 'next-week':
            filtered = filtered.filter(event => {
              const eventDate = new Date(event.date);
              return eventDate >= nextWeekStart && eventDate <= nextWeekEnd;
            });
            break;
          case 'this-month':
            filtered = filtered.filter(event => {
              const eventDate = new Date(event.date);
              return (
                eventDate >= today &&
                eventDate <= thisMonthEnd
              );
            });
            break;
        }
      }
      
      // Apply price filter if selected
      if (filters.price) {
        switch (filters.price) {
          case 'free':
            filtered = filtered.filter(event => event.price === 0);
            break;
          case 'paid':
            filtered = filtered.filter(event => event.price > 0);
            break;
          case 'under-25':
            filtered = filtered.filter(event => event.price > 0 && event.price < 25);
            break;
          case '25-50':
            filtered = filtered.filter(event => event.price >= 25 && event.price <= 50);
            break;
          case '50-100':
            filtered = filtered.filter(event => event.price > 50 && event.price <= 100);
            break;
          case 'over-100':
            filtered = filtered.filter(event => event.price > 100);
            break;
        }
      }
      
      // Apply search term if provided
      if (searchTerm) {
        filtered = filtered.filter(event => {
          const term = searchTerm.toLowerCase();
          return (
            event.title.toLowerCase().includes(term) ||
            event.description.toLowerCase().includes(term) ||
            event.location.toLowerCase().includes(term) ||
            event.organizer.toLowerCase().includes(term) ||
            event.category.toLowerCase().includes(term)
          );
        });
      }
      
      return {
        ...prev,
        filteredEvents: filtered,
      };
    });
  }, []);
  
  return {
    events: eventsState.events,
    filteredEvents: eventsState.filteredEvents,
    selectedEvent: eventsState.selectedEvent,
    isLoading: eventsState.isLoading,
    error: eventsState.error,
    fetchEvents,
    fetchEventById,
    createEvent,
    updateEvent,
    deleteEvent,
    filterEvents,
  };
};