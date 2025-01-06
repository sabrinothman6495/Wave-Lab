// types/auth.ts
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