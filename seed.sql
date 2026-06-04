-- Drop existing tables to enable clean re-runs
DROP TABLE IF EXISTS property_activities CASCADE;
DROP TABLE IF EXISTS property_bundles CASCADE;
DROP TABLE IF EXISTS testimonials CASCADE;
DROP TABLE IF EXISTS activities CASCADE;
DROP TABLE IF EXISTS properties CASCADE;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Create properties table
CREATE TABLE properties (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('camping', 'cottage', 'villa', 'activity')),
  description TEXT NOT NULL,
  short_description TEXT NOT NULL,
  pricing JSONB NOT NULL,
  location TEXT NOT NULL,
  image_url TEXT NOT NULL,
  photos TEXT[] NOT NULL DEFAULT '{}',
  is_featured BOOLEAN NOT NULL DEFAULT false,
  max_guests INTEGER NOT NULL DEFAULT 1,
  amenities TEXT[] NOT NULL DEFAULT '{}',
  activities TEXT[] NOT NULL DEFAULT '{}',
  category TEXT[] NOT NULL DEFAULT '{}',
  group_discount_percent NUMERIC,
  weekday_pricing JSONB,
  weekend_pricing JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Create activities table
CREATE TABLE activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  short_description TEXT NOT NULL,
  pricing JSONB NOT NULL,
  duration TEXT NOT NULL,
  image_url TEXT NOT NULL,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('easy', 'moderate', 'hard')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. Create property_activities join table
CREATE TABLE property_activities (
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  activity_id UUID REFERENCES activities(id) ON DELETE CASCADE,
  PRIMARY KEY (property_id, activity_id)
);

-- 4. Create property_bundles table
CREATE TABLE property_bundles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  included_activities TEXT[] NOT NULL DEFAULT '{}',
  original_price NUMERIC NOT NULL,
  bundle_price NUMERIC NOT NULL,
  discount_percent NUMERIC NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 5. Create testimonials table
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  reviewer_name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT NOT NULL,
  date TEXT NOT NULL,
  verified_guest BOOLEAN NOT NULL DEFAULT false,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security (RLS) on all tables
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_bundles ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Create Policies to allow public read-only access (anonymous SELECT)
CREATE POLICY "Allow public read access" ON properties FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON activities FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON property_activities FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON property_bundles FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON testimonials FOR SELECT USING (true);

-- =========================================================================
-- SEED DATA INSERTION
-- =========================================================================

-- Define static UUIDs for stays (properties)
-- Lakeside Camping: a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d
-- Cozy Cottage:    b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e
-- Sunset Villa:    c3d4e5f6-a7b8-9c0d-1e2f-3a4b5c6d7e8f

-- Define static UUIDs for activities
-- Kayaking: d4e5f6a7-b8c9-0d1e-2f3a-4b5c6d7e8f9a
-- Trekking: e5f6a7b8-c9d0-1e2f-3a4b-5c6d7e8f9a0b
-- Bonfire:  f6a7b8c9-d0e1-2f3a-4b5c-6d7e8f9a0b1c

-- 1. Insert Stays (Properties)
INSERT INTO properties (id, name, slug, type, description, short_description, pricing, location, image_url, photos, is_featured, max_guests, amenities, activities, category, group_discount_percent, weekday_pricing, weekend_pricing)
VALUES 
(
  'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
  'Lakeside Camping at Thakursai',
  'lakeside-camping-thakursai',
  'camping',
  'Experience the ultimate outdoor escape under a canopy of stars on the banks of beautiful Pawana Lake. Located at Thakursai, our campsite offers premium waterproof tents, comfortable bedding, unlimited BBQ, and a cozy evening campfire with live acoustic music. Perfect for families, friend groups, and couples looking to disconnect from the hustle of city life and reconnect with nature.',
  'Lakeside waterproof tents, BBQ, live acoustic music, and bonfire near Pawana.',
  '{"type": "camping", "price_per_person": 1500}'::jsonb,
  'Thakursai, Pawana Lake',
  '/images/camping-featured.png',
  ARRAY['/images/camping-featured.png', '/images/bonfire-activity.png', '/images/kayaking-activity.png'],
  true,
  50,
  ARRAY['Lakeside View', 'Waterproof Tents', 'Mattress & Blanket', 'Charging Points', 'Clean Washrooms', 'Parking', 'First Aid', 'BBQ & Dinner'],
  ARRAY['Guided Lake Kayaking', 'Lakeside Bonfire & Acoustic Music'],
  ARRAY['Lakefront', 'Adventure', 'Pet Friendly'],
  10,
  '{"type": "camping", "price_per_person": 1200}'::jsonb,
  '{"type": "camping", "price_per_person": 1500}'::jsonb
),
(
  'b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e',
  'Cozy Lakeview Cottage',
  'lakeview-cottage-ambegaon',
  'cottage',
  'Charming wooden cottages overlooking the pristine waters of Pawana Lake. Located in the peaceful village of Ambegaon, these premium cottages feature a private balcony, plush queen-size beds, attached modern bathrooms, and a private lawn. Indulge in home-cooked local meals, watch the sunrise from your porch, and enjoy the perfect balance of rustic charm and modern comfort.',
  'Charming wooden cottages with private balconies and stunning lake views.',
  '{"type": "cottage", "price_per_couple": 4500, "extra_guest_price": 1200}'::jsonb,
  'Ambegaon, Pawana Lake',
  '/images/cottage-featured.png',
  ARRAY['/images/cottage-featured.png', '/images/bonfire-activity.png', '/images/trekking-activity.png'],
  true,
  4,
  ARRAY['Private Balcony', 'AC & Geyser', 'Queen Bed', 'Attached Bathroom', 'Private Lawn', 'In-room Dining', 'Wi-Fi', 'Tea/Coffee Maker'],
  ARRAY['Lakeside Bonfire & Acoustic Music', 'Tikona Fort Sunrise Trek'],
  ARRAY['Lakefront', 'Couples', 'Pet Friendly'],
  15,
  '{"type": "cottage", "price_per_couple": 3800, "extra_guest_price": 1000}'::jsonb,
  '{"type": "cottage", "price_per_couple": 4800, "extra_guest_price": 1500}'::jsonb
),
(
  'c3d4e5f6-a7b8-9c0d-1e2f-3a4b5c6d7e8f',
  'Luxury Sunset Pool Villa',
  'sunset-pool-villa-pawana',
  'villa',
  'An exquisite 4-bedroom luxury villa offering unmatched privacy and spectacular sunset views over Pawana Lake. Perched on a gentle slope in Lonavala Outer, this private retreat boasts an infinity swimming pool, a massive open-deck lounge, a fully equipped modular kitchen, and custom glass architecture. Ideal for family reunions, private celebrations, or a lavish weekend escape.',
  'Ultra-private 4-bedroom villa with infinity pool and panoramic sunset views.',
  '{"type": "villa", "base_price": 22000, "extra_guest_price": 2000, "max_guests": 10}'::jsonb,
  'Lonavala Outer, Pawana Lake',
  '/images/villa-featured.png',
  ARRAY['/images/villa-featured.png', '/images/kayaking-activity.png', '/images/trekking-activity.png'],
  true,
  16,
  ARRAY['Infinity Pool', '4 AC Bedrooms', 'Private Chef Available', 'Open Deck Lounge', 'Wi-Fi & Smart TV', 'Music System', 'Indoor Games', 'Secure Parking'],
  ARRAY['Guided Lake Kayaking', 'Tikona Fort Sunrise Trek'],
  ARRAY['Private Pool', 'Lakefront', 'Pet Friendly'],
  10,
  '{"type": "villa", "base_price": 18000, "extra_guest_price": 1500, "max_guests": 10}'::jsonb,
  '{"type": "villa", "base_price": 25000, "extra_guest_price": 2500, "max_guests": 10}'::jsonb
);

-- 2. Insert Activities
INSERT INTO activities (id, name, slug, description, short_description, pricing, duration, image_url, is_featured, difficulty)
VALUES
(
  'd4e5f6a7-b8c9-0d1e-2f3a-4b5c6d7e8f9a',
  'Guided Lake Kayaking',
  'guided-lake-kayaking',
  'Paddle across the calm, mirror-like waters of Pawana Lake. Our guided kayaking tour provides high-quality single/double kayaks, certified life vests, and professional instructors. Perfect for beginners and seasoned paddlers alike, this activity offers a unique perspective of the surrounding hills and Tikona Fort.',
  'Safe, guided kayaking experience on the calm waters of Pawana Lake.',
  '{"type": "activity", "price": 400, "unit": "person"}'::jsonb,
  '1 Hour',
  '/images/kayaking-activity.png',
  true,
  'easy'
),
(
  'e5f6a7b8-c9d0-1e2f-3a4b-5c6d7e8f9a0b',
  'Tikona Fort Sunrise Trek',
  'tikona-fort-trek',
  'Embark on an early morning hike to Tikona Fort (Vihangad), one of the most prominent hill forts in Maval region. Climb the iconic stone steps, explore the ancient caves, and reach the summit just in time to witness a breathtaking sunrise lighting up Pawana Lake and the surrounding Sahyadri mountain range. A local guide will accompany you and share stories of the fort''s rich history.',
  'Guided morning hike to Tikona Fort with panoramic lake sunrise views.',
  '{"type": "activity", "price": 600, "unit": "person"}'::jsonb,
  '3 Hours',
  '/images/trekking-activity.png',
  true,
  'moderate'
),
(
  'f6a7b8c9-d0e1-2f3a-4b5c-6d7e8f9a0b1c',
  'Lakeside Bonfire & Acoustic Music',
  'lakeside-bonfire-music',
  'Unwind by the warm glow of a crackling bonfire as local acoustic musicians perform classic tunes under the starry sky. Savor fresh charcoal-grilled barbecue snacks, share stories, and soak in the magical lakeside atmosphere. An ideal way to spend your evening after a day of exploration.',
  'Cozy evening bonfire, charcoal BBQ starters, and live acoustic music.',
  '{"type": "activity", "price": 350, "unit": "person"}'::jsonb,
  '4 Hours',
  '/images/bonfire-activity.png',
  true,
  'easy'
);

-- 3. Insert Property-Activity Relations
INSERT INTO property_activities (property_id, activity_id)
VALUES
('a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'd4e5f6a7-b8c9-0d1e-2f3a-4b5c6d7e8f9a'), -- Camping has Kayaking
('a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'f6a7b8c9-d0e1-2f3a-4b5c-6d7e8f9a0b1c'), -- Camping has Bonfire
('b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e', 'f6a7b8c9-d0e1-2f3a-4b5c-6d7e8f9a0b1c'), -- Cottage has Bonfire
('b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e', 'e5f6a7b8-c9d0-1e2f-3a4b-5c6d7e8f9a0b'), -- Cottage has Trekking
('c3d4e5f6-a7b8-9c0d-1e2f-3a4b5c6d7e8f', 'd4e5f6a7-b8c9-0d1e-2f3a-4b5c6d7e8f9a'), -- Villa has Kayaking
('c3d4e5f6-a7b8-9c0d-1e2f-3a4b5c6d7e8f', 'e5f6a7b8-c9d0-1e2f-3a4b-5c6d7e8f9a0b'); -- Villa has Trekking

-- 4. Insert Property Bundles
INSERT INTO property_bundles (property_id, name, included_activities, original_price, bundle_price, discount_percent)
VALUES
(
  'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
  'Adventure Camping Bundle',
  ARRAY['Guided Lake Kayaking', 'Lakeside Bonfire & Acoustic Music'],
  2250,
  1700,
  24
),
(
  'b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e',
  'Romantic Cottage Escape',
  ARRAY['Lakeside Bonfire & Acoustic Music'],
  4850,
  4200,
  13
),
(
  'c3d4e5f6-a7b8-9c0d-1e2f-3a4b5c6d7e8f',
  'Ultimate Villa Retreat',
  ARRAY['Guided Lake Kayaking', 'Tikona Fort Sunrise Trek'],
  23000,
  19500,
  15
);

-- 5. Insert Testimonials
INSERT INTO testimonials (property_id, reviewer_name, rating, review_text, date, verified_guest)
VALUES
(
  'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
  'Rohan Sharma',
  5,
  'Amazing campsite! The lake view is spectacular and the live music by the bonfire made our night. Tents were clean and dry even though it rained slightly.',
  'May 24, 2026',
  true
),
(
  'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
  'Neha Patil',
  4,
  'BBQ was delicious and the staff was very friendly. Kayaking in the morning was the highlight of the trip.',
  'May 18, 2026',
  true
),
(
  'b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e',
  'Amit Verma',
  5,
  'The wooden cottages are beautiful and well-maintained. Watching the sunrise over the lake from the private balcony is worth every penny.',
  'May 29, 2026',
  true
),
(
  'b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e',
  'Priya Rao',
  5,
  'Perfect romantic getaway. Highly recommend ordering dinner to the room, local style food was super tasty.',
  'May 12, 2026',
  true
),
(
  'c3d4e5f6-a7b8-9c0d-1e2f-3a4b5c6d7e8f',
  'Vikram Malhotra',
  5,
  'Stunning infinity pool with sunset views. The villa is modern, spacious, and perfect for our family reunion. Excellent service from the local caretaker.',
  'May 31, 2026',
  true
);
