use bloodsync;

show tables;
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
    blood_group VARCHAR(5) NOT NULL,
    volume DECIMAL(5,2) NOT NULL,
    donated_date DATE NOT NULL,
    expired_date DATE NOT NULL
);
select * from bloodstock;


