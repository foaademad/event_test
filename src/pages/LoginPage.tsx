import React from 'react';
import Layout from '../components/layout/Layout';
import LoginForm from '../components/auth/LoginForm';
import { useAuth } from '../hooks/useAuth';

const LoginPage: React.FC = () => {
  const { login, isLoading, error } = useAuth();
  
  const handleLogin = (email: string, password: string) => {
    login(email, password);
  };
  
  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <LoginForm 
            onLogin={handleLogin} 
            isLoading={isLoading} 
            error={error} 
          />
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;