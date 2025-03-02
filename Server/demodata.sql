use bloodsync;
create table users(
	name varchar(255),
    email varchar(255),
    password varchar(255)
);
select * from users;
CREATE TABLE donor (
    donor_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    age INT NOT NULL,
    gender VARCHAR(10) NOT NULL,
    blood VARCHAR(10) NOT NULL,
    address VARCHAR(255),
    mail VARCHAR(100),
    number VARCHAR(15)
);
select * from donor;

CREATE TABLE bloodstock (
    blood_id INT PRIMARY KEY AUTO_INCREMENT,
    donor VARCHAR(255),
    blood_group VARCHAR(5) NOT NULL,
    volume DECIMAL(5,2) NOT NULL,
    donated_date DATE NOT NULL,
    expired_date DATE NOT NULL
);
select * from bloodstock;
CREATE TABLE BloodRequest (
    request_id INT PRIMARY KEY AUTO_INCREMENT,
    hospital_name VARCHAR(255) NOT NULL,
    patient_name VARCHAR(255) NOT NULL,
    contact_number VARCHAR(15) NOT NULL,
    blood_group VARCHAR(5) NOT NULL,
    requested_volume DECIMAL(5,2) NOT NULL,
    request_date DATE NOT NULL,
    status ENUM('Pending', 'Approved', 'Completed', 'Rejected') DEFAULT 'Pending'
);
select * from BloodRequest;
CREATE TABLE Vaccination (
    vaccination_id INT PRIMARY KEY AUTO_INCREMENT,
    donor_id INT NOT NULL,
    vaccine_name VARCHAR(100) NOT NULL,
    dose_number INT NOT NULL,
    vaccination_date DATE NOT NULL,
    expiry_date DATE NOT NULL,
    administered_by VARCHAR(100),
    hospital_name VARCHAR(255),
    FOREIGN KEY (donor_id) REFERENCES donor(donor_id) ON DELETE CASCADE
);


