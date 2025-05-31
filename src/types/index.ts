import { Database } from '@supabase/supabase-js';

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  profileImage?: string;
}

export interface Campus {
  id: number;
  name: string;
  address: string;
  city: string;
  latitude: number;
  longitude: number;
  image: string;
}

export interface Accommodation {
  id: number;
  name: string;
  address: string;
  distance: number;
  campusId: number;
  price: number;
  gender: 'male' | 'female' | 'mixed';
  hasAC: boolean;
  hasPrivateBathroom: boolean;
  hasFurnishedBed: boolean;
  hasWifi: boolean;
  hasParking: boolean;
  images: string[];
  videos?: string[];
  description: string;
  rules: string[];
  facilities: string[];
  benefits: string[];
  rating: number;
  reviewCount: number;
  latitude: number;
  longitude: number;
  hasPromotion: boolean;
  promotionDetails?: string;
  availability: number;
  roomTypes: RoomType[];
}

export interface RoomType {
  id: number;
  name: string;
  description: string;
  price: number;
  size: string;
  availability: number;
  images: string[];
  videos?: string[];
  facilities: string[];
}

export interface Restaurant {
  id: number;
  name: string;
  address: string;
  distance: number;
  campusId: number;
  cuisine: string;
  priceRange: 'low' | 'medium' | 'high';
  images: string[];
  menuItems: MenuItem[];
  menuCategories: MenuCategory[];
  openingHours: string;
  rating: number;
  reviewCount: number;
  latitude: number;
  longitude: number;
  hasPromotion: boolean;
  promotionDetails?: string;
}

export interface MenuCategory {
  id: number;
  name: string;
  description?: string;
  items: MenuItem[];
}

export interface MenuItem {
  id: number;
  categoryId: number;
  name: string;
  description: string;
  price: number;
  image?: string;
  isPopular: boolean;
  isAvailable: boolean;
}

export interface Clinic {
  id: number;
  name: string;
  address: string;
  distance: number;
  campusId: number;
  images: string[];
  doctors: Doctor[];
  services: string[];
  openingHours: string;
  hasEmergencyService: boolean;
  emergencyContact?: string;
  rating: number;
  reviewCount: number;
  latitude: number;
  longitude: number;
  insuranceAccepted: string[];
  facilities: string[];
}

export interface Doctor {
  id: number;
  name: string;
  specialization: string;
  image?: string;
  education: string[];
  experience: string[];
  schedule: Schedule[];
  rating: number;
  isAvailable: boolean;
}

export interface Schedule {
  id: number;
  doctorId: number;
  day: string;
  startTime: string;
  endTime: string;
  available: boolean;
  maxPatients: number;
  bookedPatients: number;
}

export interface Appointment {
  id: number;
  userId: string;
  clinicId: number;
  doctorId: number;
  scheduleId: number;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  symptoms?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: number;
  userId: string;
  entityId: number;
  entityType: 'accommodation' | 'restaurant' | 'clinic' | 'doctor';
  rating: number;
  comment: string;
  images?: string[];
  date: string;
  userName: string;
  userImage?: string;
  helpful: number;
  reply?: {
    comment: string;
    date: string;
    name: string;
  };
}

export interface Filter {
  [key: string]: any;
}