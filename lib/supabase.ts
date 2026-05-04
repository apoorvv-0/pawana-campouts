import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/* ---------- Pricing Types ---------- */

export type PricingType = 'camping' | 'cottage' | 'villa' | 'activity';

export interface VillaPricing {
  type: 'villa';
  base_price: number;
  extra_guest_price: number;
  max_guests: number;
}

export interface CottagePricing {
  type: 'cottage';
  price_per_couple: number;
  extra_guest_price: number;
}

export interface CampingPricing {
  type: 'camping';
  price_per_person: number;
}

export interface ActivityPricing {
  type: 'activity';
  price: number;
  unit: 'person' | 'group' | 'hour';
}

export type Pricing = VillaPricing | CottagePricing | CampingPricing | ActivityPricing;

/* ---------- Entity Types ---------- */

export interface Property {
  id: string;
  name: string;
  slug: string;
  type: 'camping' | 'cottage' | 'villa' | 'activity';
  description: string;
  short_description: string;
  pricing: Pricing;
  location: string;
  image_url: string;
  photos?: string[];
  is_featured: boolean;
  max_guests: number;
  amenities: string[];
  activities?: string[];
  category: string[];
  group_discount_percent?: number;
  weekday_pricing?: Pricing;
  weekend_pricing?: Pricing;
  created_at: string;
}

export interface Activity {
  id: string;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  pricing: ActivityPricing;
  duration: string;
  image_url: string;
  is_featured: boolean;
  difficulty: 'easy' | 'moderate' | 'hard';
  created_at: string;
}

export interface Bundle {
  id: string;
  property_id: string;
  name: string;
  included_activities: string[];
  original_price: number;
  bundle_price: number;
  discount_percent: number;
}

export interface Testimonial {
  id: string;
  property_id?: string;
  reviewer_name: string;
  rating: number;
  review_text: string;
  date: string;
  verified_guest: boolean;
  avatar_url?: string | null;
  created_at: string;
}
