import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import EventsPage from './pages/EventsPage';
import EventDetailPage from './pages/EventDetailPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AdminEventsPage from './pages/AdminEventsPage';
import AdminEventCreate from './pages/AdminEventCreate';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import { useAuth } from './hooks/useAuth';
import './i18n';

// Protected route component
const ProtectedRoute = ({ 
  isAuthenticated, 
  isAdmin = false, 
  children 
}: { 
  isAuthenticated: boolean;
  isAdmin?: boolean;
  children: React.ReactNode;
}) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (isAdmin && !isAuthenticated) {
    return <Navigate to="/" />;
  }
  
  return <>{children}</>;
};

const App: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const isAdmin = user?.isAdmin || false;
  
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/events" element={<EventsPage />} />
      <Route path="/events/:id" element={<EventDetailPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/contact" element={<ContactPage />} />
      
      {/* Protected Routes */}
      <Route path="/my-events" element={
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <EventsPage />
        </ProtectedRoute>
      } />
      
      {/* Admin Routes */}
      <Route path="/admin/events" element={
        <ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={true}>
          <AdminEventsPage />
        </ProtectedRoute>
      } />
      <Route path="/admin/events/create" element={
        <ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={true}>
          <AdminEventCreate />
        </ProtectedRoute>
      } />
      
      {/* Fallback Route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;