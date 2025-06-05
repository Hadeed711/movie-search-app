// src/config/api.js
const API_CONFIG = {
  PRODUCTION_FRONTEND: 'https://movie-search-app-ten-eta.vercel.app',
  PRODUCTION_BACKEND: 'https://web-production-94cb.up.railway.app',
  DEVELOPMENT_BACKEND: 'http://127.0.0.1:8000',
};

// Check if we're in production
const isProduction = window.location.origin === API_CONFIG.PRODUCTION_FRONTEND;

export const API_BASE_URL = isProduction 
  ? API_CONFIG.PRODUCTION_BACKEND 
  : API_CONFIG.DEVELOPMENT_BACKEND;

// ✅ Updated API endpoints to match your Django URL structure
export const API_ENDPOINTS = {
  // Using Djoser endpoints (after the URL fix)
  SIGNUP: `${API_BASE_URL}/auth/users/`,                    // POST - Create user
  LOGIN: `${API_BASE_URL}/auth/jwt/create/`,                // POST - Login and get JWT tokens
  REFRESH_TOKEN: `${API_BASE_URL}/auth/jwt/refresh/`,       // POST - Refresh access token
  VERIFY_TOKEN: `${API_BASE_URL}/auth/jwt/verify/`,         // POST - Verify token
  
  // Alternative endpoints (if you want to use your custom ones)
  CUSTOM_LOGIN: `${API_BASE_URL}/api/auth/token/`,          // Your custom login
  ALTERNATIVE_TOKEN: `${API_BASE_URL}/api/token/`,          // Alternative token endpoint
};

// Helper function to make API calls
export const apiCall = async (url, options = {}) => {
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  };

  // Add auth token if available
  const token = localStorage.getItem('access_token');
  if (token) {
    defaultOptions.headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    console.log('Making API call to:', url);
    console.log('With config:', config);
    
    const response = await fetch(url, config);
    const data = await response.json();
    
    console.log('Response status:', response.status);
    console.log('Response data:', data);
    
    if (!response.ok) {
      throw new Error(data.detail || data.message || `HTTP ${response.status}`);
    }
    
    return { data, response };
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export default API_CONFIG;