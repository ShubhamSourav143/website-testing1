/*
  # Initial Schema for IIT KGP Animal Welfare

  1. New Tables
    - `animals`
      - `id` (uuid, primary key)
      - `name` (text)
      - `type` (text)
      - `breed` (text)
      - `age` (text)
      - `gender` (text)
      - `location` (text)
      - `image` (text)
      - `description` (text)
      - `vaccinated` (boolean)
      - `neutered` (boolean)
      - `special_needs` (boolean)
      - `care_type` (text)
      - `tags` (text[])
      - `story` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `blog_posts`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `content` (text)
      - `image` (text)
      - `tags` (text[])
      - `author` (text)
      - `date` (text)
      - `views` (integer)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `donations`
      - `id` (uuid, primary key)
      - `amount` (integer)
      - `donor_name` (text)
      - `donor_email` (text)
      - `purpose` (text)
      - `payment_method` (text)
      - `status` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access
    - Add policies for authenticated write access
*/

-- Animals table
CREATE TABLE IF NOT EXISTS animals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL DEFAULT 'Dog',
  breed text NOT NULL,
  age text NOT NULL,
  gender text NOT NULL,
  location text NOT NULL DEFAULT 'IIT Kharagpur Campus',
  image text NOT NULL,
  description text NOT NULL,
  vaccinated boolean DEFAULT true,
  neutered boolean DEFAULT true,
  special_needs boolean DEFAULT false,
  care_type text NOT NULL,
  tags text[] DEFAULT '{}',
  story text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  content text,
  image text NOT NULL,
  tags text[] DEFAULT '{}',
  author text NOT NULL,
  date text NOT NULL,
  views integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Donations table
CREATE TABLE IF NOT EXISTS donations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  amount integer NOT NULL,
  donor_name text,
  donor_email text,
  purpose text NOT NULL,
  payment_method text NOT NULL,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE animals ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;

-- Policies for animals table
CREATE POLICY "Animals are viewable by everyone"
  ON animals
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Animals can be inserted by authenticated users"
  ON animals
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Animals can be updated by authenticated users"
  ON animals
  FOR UPDATE
  TO authenticated
  USING (true);

-- Policies for blog_posts table
CREATE POLICY "Blog posts are viewable by everyone"
  ON blog_posts
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Blog posts can be inserted by authenticated users"
  ON blog_posts
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Blog posts can be updated by authenticated users"
  ON blog_posts
  FOR UPDATE
  TO authenticated
  USING (true);

-- Policies for donations table
CREATE POLICY "Donations can be inserted by everyone"
  ON donations
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Donations are viewable by authenticated users"
  ON donations
  FOR SELECT
  TO authenticated
  USING (true);

-- Insert sample data
INSERT INTO animals (name, type, breed, age, gender, location, image, description, vaccinated, neutered, special_needs, care_type, tags, story) VALUES
('Romi', 'Dog', 'Indian Pariah', '5 years', 'Male', 'IIT Kharagpur Campus', 'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=600', 'Romi became paraplegic after a car accident in 2020. Despite his condition, he''s curious, playful, and loves to interact with everyone. He receives daily physiotherapy and personalized attention.', true, true, true, 'Permanent 24/7 Care', '{"Paraplegic", "Playful", "Needs Wheelchair"}', 'Rescued after car accident in 2020, now thriving with specialized care'),
('Bunti', 'Dog', 'Indian Pariah', '5 years', 'Male', 'IIT Kharagpur Campus', 'https://images.pexels.com/photos/2023384/pexels-photo-2023384.jpeg?auto=compress&cs=tinysrgb&w=600', 'Bitten and paralyzed at just one month old, Bunti is full of energy and joy. He enjoys his walks in a specially designed wheelchair and is a favorite among student volunteers.', true, true, true, 'Permanent 24/7 Care', '{"Paraplegic", "Energetic", "Wheelchair User"}', 'Paralyzed at one month old, now enjoys life with his special wheelchair'),
('Shanti', 'Dog', 'Indian Pariah', '4 years', 'Female', 'IIT Kharagpur Campus', 'https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=600', 'Rescued from Kolkata in a paraplegic state, Shanti is the embodiment of resilience. She welcomes new volunteers and often encourages others to see the beauty in caring for disabled animals.', true, true, true, 'Permanent 24/7 Care', '{"Paraplegic", "Resilient", "Volunteer Favorite"}', 'Rescued from Kolkata, now inspires everyone with her resilience');

INSERT INTO blog_posts (title, description, image, tags, author, date, views) VALUES
('Romi''s Journey: From Accident to Inspiration', 'How a car accident in 2020 couldn''t stop Romi''s spirit. His story of resilience and daily physiotherapy.', 'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=600', '{"Rescue Story", "Permanent Care", "Inspiration"}', 'Animal Welfare Team', '2025-01-15', 892),
('The 320-Dog Feeding Challenge', 'Inside our massive feeding program during campus breaks - how we ensure no animal goes hungry.', 'https://images.pexels.com/photos/4498185/pexels-photo-4498185.jpeg?auto=compress&cs=tinysrgb&w=600', '{"Feeding Program", "Campus Life", "Volunteer Work"}', 'Volunteer Coordinator', '2025-01-10', 654),
('Train Accident Survivor: A 6-Month Journey', 'The emotional story of a young pup who survived a train accident and touched thousands of hearts.', 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=600', '{"Emergency Rescue", "Medical Care", "Community Support"}', 'Emergency Response Team', '2025-01-05', 1247);