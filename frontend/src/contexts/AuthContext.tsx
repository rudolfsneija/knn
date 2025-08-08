import React, { useState, useEffect } from 'react';
import api from '../config/api';
import { AuthContext, type User } from './AuthContextDefinition';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('admin-token');
    if (token) {
      // Token is automatically added by interceptor
      // Verify token validity using the correct endpoint
      api.get('/api/users/me')
        .then(response => {
          setUser(response.data.data);
        })
        .catch(() => {
          localStorage.removeItem('admin-token');
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const response = await api.post('/api/auth/login', { username, password });
      const { token, user } = response.data.data;
      
      localStorage.setItem('admin-token', token);
      setUser(user);
      
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('admin-token');
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
