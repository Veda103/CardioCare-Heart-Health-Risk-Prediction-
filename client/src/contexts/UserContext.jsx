import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Create the UserContext
const UserContext = createContext();

// Custom hook to use the UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

// UserProvider component to wrap the app
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check localStorage for existing token on initial load
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const storedToken = localStorage.getItem('token');

        if (storedToken) {
          // Check if token is expired (basic check)
          const tokenPayload = parseJWT(storedToken);
          const currentTime = Date.now() / 1000;
          
          if (tokenPayload && tokenPayload.exp > currentTime) {
            setToken(storedToken);
            // Fetch fresh user data from the server
            await fetchUserProfile(storedToken);
          } else {
            // Token expired, clear storage
            localStorage.removeItem('token');
            localStorage.removeItem('user');
          }
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        // Clear potentially corrupted data
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Parse JWT token (basic parsing, not verification)
  const parseJWT = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error parsing JWT:', error);
      return null;
    }
  };

  // Fetch user profile from server
  const fetchUserProfile = async (authToken = token) => {
    try {
      const response = await axios.get('http://localhost:5000/api/users/me', {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });

      // Backend returns { "user": {...} }
      if (response.data && response.data.user) {
        const userData = response.data.user;
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        console.log('User profile fetched successfully:', userData.email);
        return userData;
      } else {
        throw new Error('Invalid user profile response');
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      if (error.response?.status === 401) {
        // Token is invalid, logout user
        logout();
      }
      throw error;
    }
  };

  // Update user profile
  const updateUserProfile = async (profileData) => {
    try {
      const response = await axios.put('http://localhost:5000/api/users/me', profileData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      // Check if backend returns success response
      if (response.data && response.data.user) {
        const updatedUser = response.data.user;
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        console.log('User profile updated successfully:', updatedUser.email);
        return updatedUser;
      } else {
        throw new Error('Invalid profile update response');
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  };

  // Login function
  const login = async (userData, authToken) => {
    try {
      console.log('UserContext login called with:', { 
        userData: userData ? 'received' : 'null', 
        authToken: authToken ? 'received' : 'null' 
      });
      
      // Save token and fetch fresh profile data
      setToken(authToken);
      localStorage.setItem('token', authToken);

      console.log('Fetching user profile with token...');
      
      // Fetch complete user profile from server
      const profileData = await fetchUserProfile(authToken);
      
      console.log('User logged in successfully:', profileData?.email || 'No email found');
    } catch (error) {
      console.error('Error during login:', error);
      throw new Error('Failed to complete login process');
    }
  };

  // Logout function
  const logout = () => {
    try {
      // Clear state
      setUser(null);
      setToken(null);

      // Clear localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      console.log('User logged out successfully');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!(user && token);
  };

  // Get authorization header for API requests
  const getAuthHeader = () => {
    return token ? `Bearer ${token}` : null;
  };

  // Context value
  const value = {
    user,
    token,
    isLoading,
    login,
    logout,
    isAuthenticated,
    getAuthHeader,
    fetchUserProfile,
    updateUserProfile,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;