import React from 'react';
import Layout from '../components/layout/Layout';
import SignupForm from '../components/auth/SignupForm';
import { useAuth } from '../hooks/useAuth';

const SignupPage: React.FC = () => {
  const { signup, isLoading, error } = useAuth();
  
  const handleSignup = (name: string, email: string, password: string) => {
    signup(name, email, password);
  };
  
  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <SignupForm 
            onSignup={handleSignup} 
            isLoading={isLoading} 
            error={error} 
          />
        </div>
      </div>
    </Layout>
  );
};

export default SignupPage;