-- Proovd Database Schema
-- Run this SQL script to initialize your database

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL CHECK (role IN ('founder', 'affiliate')),
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMP,
  is_active BOOLEAN DEFAULT true
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at);

-- Create sessions table (optional - for server-side sessions if needed later)
CREATE TABLE IF NOT EXISTS sessions (
  id VARCHAR(255) PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_expires_at ON sessions(expires_at);

-- Add updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create pitches table
CREATE TABLE IF NOT EXISTS pitches (
  id SERIAL PRIMARY KEY,
  founder_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255),
  problem TEXT NOT NULL,
  solution TEXT NOT NULL,
  competition TEXT,
  visuals TEXT, 
  branding JSONB,
  interview TEXT,
  story TEXT,
  socials JSONB,
  is_high_effort BOOLEAN DEFAULT false,
  teaser_mode BOOLEAN DEFAULT false,
  status VARCHAR(20) DEFAULT 'active', -- draft, active, funded, ended
  commission_rate DECIMAL(5,2) DEFAULT 20.00,
  price_per_sale DECIMAL(10,2),
  campaign_duration INTEGER DEFAULT 21,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_pitches_founder_id ON pitches(founder_id);
CREATE INDEX IF NOT EXISTS idx_pitches_status ON pitches(status);

CREATE TRIGGER update_pitches_updated_at BEFORE UPDATE ON pitches
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create matches table
CREATE TABLE IF NOT EXISTS matches (
  id SERIAL PRIMARY KEY,
  pitch_id INTEGER REFERENCES pitches(id) ON DELETE CASCADE,
  affiliate_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  status VARCHAR(20) DEFAULT 'pending', -- pending, accepted, declined
  commission_bid DECIMAL(5,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(pitch_id, affiliate_id)
);

CREATE INDEX IF NOT EXISTS idx_matches_pitch_id ON matches(pitch_id);
CREATE INDEX IF NOT EXISTS idx_matches_affiliate_id ON matches(affiliate_id);

CREATE TRIGGER update_matches_updated_at BEFORE UPDATE ON matches
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
