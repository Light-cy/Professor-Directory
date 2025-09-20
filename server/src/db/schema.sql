-- Professor Directory Database Schema
-- Run this script to create the initial database structure

CREATE DATABASE IF NOT EXISTS professor_directory;
USE professor_directory;

-- Create professors table
CREATE TABLE IF NOT EXISTS professors (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  department VARCHAR(255) NOT NULL,
  office_location VARCHAR(255),
  email VARCHAR(255) NOT NULL UNIQUE,
  profile_image_url VARCHAR(500),
  schedule_monday TEXT,
  schedule_tuesday TEXT,
  schedule_wednesday TEXT,
  schedule_thursday TEXT,
  schedule_friday TEXT,
  schedule_saturday TEXT,
  schedule_sunday TEXT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create admin_users table for authentication
CREATE TABLE IF NOT EXISTS admin_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default admin user (password: admin123)
-- Hash generated using bcrypt with cost factor 10
INSERT INTO admin_users (username, password_hash)
VALUES ('admin', '$2a$10$5B/y9a/AP3YpEC3sGRbS5.IOyee0yprh/a5f2xI2m2G2p5i4f.S.q');
