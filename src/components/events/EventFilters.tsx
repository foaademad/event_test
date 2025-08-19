import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import Button from '../common/Button';

interface EventFiltersProps {
  onSearch: (term: string) => void;
  onFilterChange: (filters: EventFilters) => void;
}

export interface EventFilters {
  category: string;
  date: string;
  price: string;
}

const EventFilters: React.FC<EventFiltersProps> = ({ onSearch, onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<EventFilters>({
    category: '',
    date: '',
    price: '',
  });

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const resetFilters = {
      category: '',
      date: '',
      price: '',
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="mb-8 bg-white rounded-lg shadow p-4">
      <form onSubmit={handleSearchSubmit} className="mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pl-10 pr-12 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center">
            <button
              type="button"
              onClick={toggleFilters}
              className="p-2 mr-1 text-gray-500 hover:text-blue-600 focus:outline-none"
              aria-label="Toggle filters"
            >
              <Filter className="h-5 w-5" />
            </button>
            <button
              type="submit"
              className="p-2 mr-1 text-white bg-blue-600 rounded-r-md hover:bg-blue-700 focus:outline-none"
            >
              Search
            </button>
          </div>
        </div>
      </form>

      {showFilters && (
        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-medium text-gray-900">Filters</h3>
            <button
              type="button"
              onClick={clearFilters}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Clear all
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Categories</option>
                <option value="music">Music</option>
                <option value="technology">Technology</option>
                <option value="business">Business</option>
                <option value="food">Food & Drink</option>
                <option value="arts">Arts & Culture</option>
                <option value="sports">Sports</option>
                <option value="health">Health & Wellness</option>
              </select>
            </div>
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <select
                id="date"
                name="date"
                value={filters.date}
                onChange={handleFilterChange}
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Any Date</option>
                <option value="today">Today</option>
                <option value="tomorrow">Tomorrow</option>
                <option value="this-week">This Week</option>
                <option value="this-weekend">This Weekend</option>
                <option value="next-week">Next Week</option>
                <option value="this-month">This Month</option>
              </select>
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                Price
              </label>
              <select
                id="price"
                name="price"
                value={filters.price}
                onChange={handleFilterChange}
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Any Price</option>
                <option value="free">Free</option>
                <option value="paid">Paid</option>
                <option value="under-25">Under $25</option>
                <option value="25-50">$25 - $50</option>
                <option value="50-100">$50 - $100</option>
                <option value="over-100">Over $100</option>
              </select>
            </div>
          </div>
          <div className="mt-4 md:hidden">
            <Button 
              variant="outline" 
              fullWidth 
              onClick={toggleFilters}
              className="flex items-center justify-center"
            >
              <X className="h-4 w-4 mr-2" /> Close Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventFilters;

export { EventFilters }