export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  organizer: string;
  price: number;
  category: string;
  imageUrl: string;
  attendees: number;
  capacity: number;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface EventsState {
  events: Event[];
  filteredEvents: Event[];
  selectedEvent: Event | null;
  isLoading: boolean;
  error: string | null;
}