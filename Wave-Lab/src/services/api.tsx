// services/api.tsx

// Define response types
export interface AuthResponse {
    token: string;
  }
  
  export interface ErrorResponse {
    error: string;
  }
  
  export interface LoginCredentials {
    email: string;
    password: string;
  }
  
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
  
  export const authApi = {
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
  
      if (!response.ok) {
        const errorData: ErrorResponse = await response.json();
        throw new Error(errorData.error || 'Login failed');
      }
  
      return response.json();
    },
  
    async register(credentials: LoginCredentials): Promise<AuthResponse> {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
  
      if (!response.ok) {
        const errorData: ErrorResponse = await response.json();
        throw new Error(errorData.error || 'Registration failed');
      }
  
      return response.json();
    },
  };