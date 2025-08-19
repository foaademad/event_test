import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, AuthState } from '../types';

// Mock data for demonstration
const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    isAdmin: true,
  },
  {
    id: '2',
    name: 'Regular User',
    email: 'user@example.com',
    isAdmin: false,
  },
];

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  });
  
  const navigate = useNavigate();
  
  const login = useCallback(async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find the user with matching email
      const user = MOCK_USERS.find(u => u.email === email);
      
      if (user && password === 'password') {
        // In a real app, we would store the token in localStorage or a secure cookie
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
        
        navigate('/');
        return true;
      } else {
        setAuthState(prev => ({
          ...prev,
          isLoading: false,
          error: 'Invalid email or password',
        }));
        return false;
      }
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: 'An error occurred during login',
      }));
      return false;
    }
  }, [navigate]);
  
  const signup = useCallback(async (name: string, email: string, password: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user with email already exists
      const existingUser = MOCK_USERS.find(u => u.email === email);
      
      if (existingUser) {
        setAuthState(prev => ({
          ...prev,
          isLoading: false,
          error: 'User with this email already exists',
        }));
        return false;
      }
      
      // Create new user (in a real app, this would be done server-side)
      const newUser: User = {
        id: `${MOCK_USERS.length + 1}`,
        name,
        email,
        isAdmin: false,
      };
      
      // In a real app, we would store the token in localStorage or a secure cookie
      setAuthState({
        user: newUser,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
      
      navigate('/');
      return true;
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: 'An error occurred during signup',
      }));
      return false;
    }
  }, [navigate]);
  
  const logout = useCallback(() => {
    // In a real app, we would clear the token from localStorage or remove the cookie
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
    
    navigate('/');
  }, [navigate]);
  
  return {
    user: authState.user,
    isAuthenticated: authState.isAuthenticated,
    isLoading: authState.isLoading,
    error: authState.error,
    login,
    signup,
    logout,
  };
};