export interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    sounds: Sound[];
    createdAt: string;
    updatedAt: string;
  }
  
  export interface Sound {
    _id: string;
    userId: string;
    title: string;
    audioData: string;
    instrument: Instrument;
    duration?: number;
    waveformData?: number[];
    frequencyData?: number[];
    createdAt: string;
    updatedAt: string;
  }
  
  export interface Instrument {
    piano: boolean;
    guitar: boolean;
    trumpet: boolean;
  }
  
  export interface AuthResponse {
    token: string;
    user: User;
  }
  
  // Query response types
  export interface MeQueryResponse {
    me: User;
  }
  
  export interface UserQueryResponse {
    user: User;
  }
  
  export interface SoundsQueryResponse {
    getSounds: Sound[];
  }
  
  export interface SoundQueryResponse {
    getSound: Sound;
  }
  
  // Mutation input types
  export interface UserInput {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }
  
  export interface LoginInput {
    email: string;
    password: string;
  }
  
  export interface SoundInput {
    title: string;
    audioData: string;
    instrument: Instrument;
    duration?: number;
    waveformData?: number[];
    frequencyData?: number[];
  }