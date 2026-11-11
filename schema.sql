-- Run this in the Vercel Postgres Query editor.

CREATE TABLE IF NOT EXISTS projects (
  id           SERIAL PRIMARY KEY,
  title        TEXT   NOT NULL,
  description  TEXT   NOT NULL,
  technologies TEXT[] NOT NULL DEFAULT '{}',
  link         TEXT,
  type         TEXT   NOT NULL CHECK (type IN ('school', 'personal'))
);

INSERT INTO projects (title, description, technologies, link, type) VALUES
(
  'OrbitWatch',
  'A space situational awareness dashboard with live satellite tracking, NOAA space weather feeds, and a satellite watchlist.',
  ARRAY['JavaScript', 'HTML', 'CSS', 'Vite', 'N2YO API', 'NOAA API'],
  'https://github.com/Jgallardo613/Orbitwatch',
  'school'
),
(
  'Aether LIDAR API',
  'A RESTful API with full CRUD operations, GitHub OAuth authentication, and Swagger documentation.',
  ARRAY['Node.js', 'Express', 'MongoDB', 'OAuth', 'Swagger'],
  'https://github.com/Jgallardo613/aether-lidar-api',
  'personal'
);
