import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Menu, Search, X, User, LogOut } from 'lucide-react';
import Button from '../common/Button';
import { useTranslation } from 'react-i18next';
import ThemeToggle from '../ThemeToggle';
import LanguageToggle from '../LanguageToggle';

interface HeaderProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  isAuthenticated, 
  isAdmin,
  onLogout
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { t } = useTranslation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Calendar className="h-8 w-8 text-sky-400" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">EventHub</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-gray-700 dark:text-gray-200 hover:text-sky-400 dark:hover:text-sky-400 px-3 py-2 rounded-md text-sm font-medium">
              {t('nav.home')}
            </Link>
            <Link to="/events" className="text-gray-700 dark:text-gray-200 hover:text-sky-400 dark:hover:text-sky-400 px-3 py-2 rounded-md text-sm font-medium">
              {t('nav.events')}
            </Link>
            <Link to="/services" className="text-gray-700 dark:text-gray-200 hover:text-sky-400 dark:hover:text-sky-400 px-3 py-2 rounded-md text-sm font-medium">
              {t('nav.services')}
            </Link>
            <Link to="/about" className="text-gray-700 dark:text-gray-200 hover:text-sky-400 dark:hover:text-sky-400 px-3 py-2 rounded-md text-sm font-medium">
              {t('nav.about')}
            </Link>
            
            {isAdmin && (
              <Link to="/admin" className="text-gray-700 dark:text-gray-200 hover:text-sky-400 dark:hover:text-sky-400 px-3 py-2 rounded-md text-sm font-medium">
                Admin
              </Link>
            )}
            
            <div className="relative">
              <Link to="/search" className="text-gray-700 dark:text-gray-200 hover:text-sky-400 dark:hover:text-sky-400 px-3 py-2 rounded-md text-sm font-medium flex items-center">
                <Search className="h-4 w-4 mr-1" />
                {t('nav.search')}
              </Link>
            </div>

            <div className="flex items-center space-x-2">
              <ThemeToggle />
              <LanguageToggle />
            </div>
            
            {!isAuthenticated ? (
              <div className="flex space-x-2">
                <Link to="/login">
                  <Button variant="outline" size="sm">{t('nav.login')}</Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm">{t('nav.signup')}</Button>
                </Link>
              </div>
            ) : (
              <div className="relative ml-3">
                <div>
                  <button
                    type="button"
                    className="flex items-center max-w-xs rounded-full bg-gray-100 dark:bg-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 p-1"
                    id="user-menu-button"
                    onClick={toggleProfileMenu}
                  >
                    <span className="sr-only">Open user menu</span>
                    <User className="h-6 w-6 text-gray-700 dark:text-gray-200" />
                  </button>
                </div>
                
                {isProfileMenuOpen && (
                  <div
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                  >
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      role="menuitem"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      {t('nav.profile')}
                    </Link>
                    <Link
                      to="/my-events"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      role="menuitem"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      {t('nav.myEvents')}
                    </Link>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      role="menuitem"
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                        onLogout();
                      }}
                    >
                      <div className="flex items-center">
                        <LogOut className="h-4 w-4 mr-2" />
                        {t('nav.signOut')}
                      </div>
                    </button>
                  </div>
                )}
              </div>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <LanguageToggle />
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-sky-400 dark:hover:text-sky-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-400"
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-sky-400 dark:hover:text-sky-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav.home')}
            </Link>
            <Link
              to="/events"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-sky-400 dark:hover:text-sky-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav.events')}
            </Link>
            <Link
              to="/services"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-sky-400 dark:hover:text-sky-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav.services')}
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-sky-400 dark:hover:text-sky-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav.about')}
            </Link>
            {isAdmin && (
              <Link
                to="/admin"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-sky-400 dark:hover:text-sky-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Admin
              </Link>
            )}
            <Link
              to="/search"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-sky-400 dark:hover:text-sky-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="flex items-center">
                <Search className="h-4 w-4 mr-2" />
                {t('nav.search')}
              </div>
            </Link>
            
            {!isAuthenticated ? (
              <div className="flex flex-col space-y-2 px-3 py-2">
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="outline" fullWidth>{t('nav.login')}</Button>
                </Link>
                <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button fullWidth>{t('nav.signup')}</Button>
                </Link>
              </div>
            ) : (
              <>
                <Link
                  to="/profile"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-sky-400 dark:hover:text-sky-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('nav.profile')}
                </Link>
                <Link
                  to="/my-events"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-sky-400 dark:hover:text-sky-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('nav.myEvents')}
                </Link>
                <button
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-sky-400 dark:hover:text-sky-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onLogout();
                  }}
                >
                  <div className="flex items-center">
                    <LogOut className="h-4 w-4 mr-2" />
                    {t('nav.signOut')}
                  </div>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;