-- Create the database
CREATE DATABASE bloodsync;

-- Use the database
USE bloodsync;

-- Create the admin_info table
CREATE TABLE admin_info (
    admin_id INT AUTO_INCREMENT PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
);

-- Insert sample data into admin_info
INSERT INTO admin_info (password, name, email) VALUES
('admin123', 'John Doe', 'john.doe@example.com'),
('admin456', 'Jane Smith', 'jane.smith@example.com');

-- Create the need_blood table
CREATE TABLE need_blood (
    id INT AUTO_INCREMENT PRIMARY KEY,
    blood_type VARCHAR(3) NOT NULL,
    quantity INT NOT NULL,
    date DATE NOT NULL
);

-- Insert sample data into need_blood
INSERT INTO need_blood (blood_type, quantity, date) VALUES
('A+', 5, '2023-10-01'),
('O-', 3, '2023-10-02');

-- Create the donor table
CREATE TABLE donor (
    donor_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    blood_type VARCHAR(3) NOT NULL,
    contact_info VARCHAR(255) NOT NULL,
    last_donation_date DATE
);

-- Insert sample data into donor
INSERT INTO donor (name, blood_type, contact_info, last_donation_date) VALUES
('Alice Johnson', 'B+', 'alice.johnson@example.com', '2023-09-15'),
('Bob Brown', 'AB-', 'bob.brown@example.com', '2023-08-20');