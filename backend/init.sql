-- Create Database if not exists
CREATE DATABASE IF NOT EXISTS haupcar_db;
USE haupcar_db;

-- Create cars table
CREATE TABLE IF NOT EXISTS cars (
  id INT AUTO_INCREMENT PRIMARY KEY,
  registration_number VARCHAR(50) NOT NULL UNIQUE,
  brand VARCHAR(100) NOT NULL,
  model VARCHAR(100) NOT NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert sample data (optional)
INSERT IGNORE INTO cars (registration_number, brand, model, notes) VALUES
('กก 1234 ก', 'Toyota', 'Camry', 'ทดสอบ'),
('กก 5678 ก', 'Honda', 'Civic', 'ทดสอบ');
