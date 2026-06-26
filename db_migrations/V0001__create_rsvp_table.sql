CREATE TABLE rsvp (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  attending BOOLEAN NOT NULL,
  guests_count INTEGER NOT NULL DEFAULT 1,
  comment TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);