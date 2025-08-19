import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Search, ArrowRight } from 'lucide-react';
import Layout from '../components/layout/Layout';
import EventGrid from '../components/events/EventGrid';
import Button from '../components/common/Button';
import { Event } from '../types';
import { useEvents } from '../hooks/useEvents';
import { useTranslation } from 'react-i18next';

const FEATURED_CATEGORIES = [
  { name: 'music', icon: '🎵', color: 'bg-rose-400' },
  { name: 'technology', icon: '💻', color: 'bg-rose-300' },
  { name: 'business', icon: '💼', color: 'bg-rose-200' },
  { name: 'food', icon: '🍔', color: 'bg-rose-300' },
  { name: 'arts', icon: '🎨', color: 'bg-rose-400' },
  { name: 'sports', icon: '⚽', color: 'bg-rose-200' },
];

const HomePage: React.FC = () => {
  const { events, isLoading, fetchEvents } = useEvents();
  const [searchTerm, setSearchTerm] = useState('');
  const [featuredEvents, setFeaturedEvents] = useState<Event[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  useEffect(() => {
    if (events.length > 0) {
      setFeaturedEvents(events.slice(0, 3));
    }
  }, [events]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-rose-50 to-rose-100 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-gray-900">
                {t('hero.title')}
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                {t('hero.subtitle')}
              </p>
              
              <form onSubmit={handleSearch} className="max-w-lg mx-auto md:mx-0">
                <div className="relative">
                  <input
                    type="text"
                    placeholder={t('hero.searchPlaceholder')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-6 py-4 rounded-full shadow-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-400 bg-white/90 backdrop-blur-sm"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-2 bg-rose-400 text-white p-2 rounded-full hover:bg-rose-500 transition-colors duration-300"
                  >
                    <Search className="h-6 w-6" />
                  </button>
                </div>
              </form>
            </div>
            
            <div className="hidden md:block relative">
              <div className="absolute inset-0 bg-gradient-to-r from-rose-400/20 to-rose-300/20 rounded-2xl"></div>
              <img
                src="https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg"
                alt="Events"
                className="rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('categories.title')}
            </h2>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
            {FEATURED_CATEGORIES.map((category) => (
              <Link
                key={category.name}
                to={`/events?category=${category.name}`}
                className="flex flex-col items-center bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 group"
              >
                <div className={`${category.color} w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {category.icon}
                </div>
                <span className="text-gray-900 font-medium text-center group-hover:text-rose-400 transition-colors duration-300">
                  {t(`categories.${category.name}`)}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="py-16 bg-rose-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              {t('featured.title')}
            </h2>
            <Link 
              to="/events" 
              className="flex items-center text-rose-400 hover:text-rose-500 font-medium"
            >
              {t('featured.viewAll')} <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
          
          <EventGrid events={featuredEvents} isLoading={isLoading} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-rose-400 to-rose-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Calendar className="h-16 w-16 mx-auto mb-8 text-white/90" />
          <h2 className="text-3xl font-bold mb-4">
            {t('cta.title')}
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            {t('cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button
              size="lg"
              className="bg-white text-rose-500 hover:bg-rose-50"
            >
              {t('cta.createEvent')}
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-rose-400"
            >
              {t('cta.learnMore')}
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;