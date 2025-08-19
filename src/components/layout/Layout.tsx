import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { useAuth } from '../../hooks/useAuth';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, isAuthenticated, logout } = useAuth();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header 
        isAuthenticated={isAuthenticated} 
        isAdmin={user?.isAdmin || false} 
        onLogout={logout}
      />
      <main className="flex-grow bg-gray-50">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;