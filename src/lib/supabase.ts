import { createClient } from '@supabase/supabase-js';
import type { 
  Accommodation, 
  Restaurant, 
  Clinic, 
  Appointment,
  Review,
  Filter 
} from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Authentication helpers
export const signIn = async (email: string, password: string) => {
  return supabase.auth.signInWithPassword({ email, password });
};

export const signUp = async (email: string, password: string) => {
  return supabase.auth.signUp({ email, password });
};

export const signOut = async () => {
  return supabase.auth.signOut();
};

export const resetPassword = async (email: string) => {
  return supabase.auth.resetPasswordForEmail(email);
};

// Fetch data from database
export const fetchCampuses = async () => {
  return supabase.from('campuses').select('*');
};

export const fetchCampusesByCity = async (city: string) => {
  return supabase
    .from('campuses')
    .select('*')
    .eq('city', city);
};

export const fetchAccommodations = async (filters: Filter = {}) => {
  let query = supabase
    .from('accommodations')
    .select(`
      *,
      room_types (*),
      reviews (*)
    `);
  
  if (filters.campusId) {
    query = query.eq('campus_id', filters.campusId);
  }
  
  if (filters.gender) {
    query = query.eq('gender', filters.gender);
  }
  
  if (filters.minPrice) {
    query = query.gte('price', filters.minPrice);
  }
  
  if (filters.maxPrice) {
    query = query.lte('price', filters.maxPrice);
  }
  
  if (filters.facilities) {
    filters.facilities.forEach((facility: string) => {
      query = query.contains('facilities', [facility]);
    });
  }
  
  return query;
};

export const fetchAccommodationDetails = async (id: number) => {
  return supabase
    .from('accommodations')
    .select(`
      *,
      room_types (*),
      reviews (*)
    `)
    .eq('id', id)
    .single();
};

export const fetchRestaurants = async (filters: Filter = {}) => {
  let query = supabase
    .from('restaurants')
    .select(`
      *,
      menu_categories (
        *,
        menu_items (*)
      ),
      reviews (*)
    `);
  
  if (filters.campusId) {
    query = query.eq('campus_id', filters.campusId);
  }
  
  if (filters.priceRange) {
    query = query.eq('price_range', filters.priceRange);
  }
  
  if (filters.cuisine) {
    query = query.eq('cuisine', filters.cuisine);
  }
  
  return query;
};

export const fetchRestaurantDetails = async (id: number) => {
  return supabase
    .from('restaurants')
    .select(`
      *,
      menu_categories (
        *,
        menu_items (*)
      ),
      reviews (*)
    `)
    .eq('id', id)
    .single();
};

export const fetchClinics = async (filters: Filter = {}) => {
  let query = supabase
    .from('clinics')
    .select(`
      *,
      doctors (
        *,
        schedules (*)
      ),
      reviews (*)
    `);
  
  if (filters.campusId) {
    query = query.eq('campus_id', filters.campusId);
  }
  
  if (filters.hasEmergency) {
    query = query.eq('has_emergency_service', true);
  }
  
  return query;
};

export const fetchClinicDetails = async (id: number) => {
  return supabase
    .from('clinics')
    .select(`
      *,
      doctors (
        *,
        schedules (*),
        reviews (*)
      ),
      reviews (*)
    `)
    .eq('id', id)
    .single();
};

export const createAppointment = async (appointment: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'>) => {
  return supabase
    .from('appointments')
    .insert(appointment);
};

export const fetchUserAppointments = async (userId: string) => {
  return supabase
    .from('appointments')
    .select(`
      *,
      clinic:clinics (*),
      doctor:doctors (*)
    `)
    .eq('user_id', userId)
    .order('date', { ascending: true });
};

export const createReview = async (review: Omit<Review, 'id' | 'date'>) => {
  return supabase
    .from('reviews')
    .insert(review);
};

export const updateReviewHelpful = async (reviewId: number, helpful: number) => {
  return supabase
    .from('reviews')
    .update({ helpful })
    .eq('id', reviewId);
};