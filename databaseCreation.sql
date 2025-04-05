CREATE DATABASE HotelReservationsManager;
USE HotelReservationsManager;

-- Table for users (employees)
CREATE TABLE Users (
    userid INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    firstname VARCHAR(50) NOT NULL,
    middlename VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    egn CHAR(10) UNIQUE NOT NULL,
    phone VARCHAR(10) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    hiredate DATE NOT NULL,
    isactive BOOLEAN DEFAULT TRUE,
    releasedate DATE DEFAULT NULL,
    role VARCHAR(20) NOT NULL
);

-- Table for clients
CREATE TABLE Clients (
    clientid INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    phone VARCHAR(10) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    isadult BOOLEAN NOT NULL
);

-- Table for rooms
CREATE TABLE Rooms (
    roomid INT AUTO_INCREMENT PRIMARY KEY,
    capacity INT NOT NULL,
    roomtype VARCHAR(50) NOT NULL,
    isavailable BOOLEAN DEFAULT TRUE,
    priceperadult DECIMAL(10,2) NOT NULL,
    priceperchild DECIMAL(10,2) NOT NULL,
    roomnumber VARCHAR(10) UNIQUE NOT NULL
);

-- Table for reservations
CREATE TABLE Reservations (
    reservationid INT AUTO_INCREMENT PRIMARY KEY,
    roomid INT NOT NULL,
    createdbyclientid INT NOT NULL, 
    checkin DATE NOT NULL,
    checkout DATE NOT NULL,
    includesbreakfast BOOLEAN DEFAULT FALSE,
    allinclusive BOOLEAN DEFAULT FALSE,
    numberofadults INT NOT NULL,
    numberofchildren INT NOT NULL,
    totalprice DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (roomid) REFERENCES Rooms(roomid) ON DELETE CASCADE,
    FOREIGN KEY (createdbyclientid) REFERENCES Clients(clientid) ON DELETE CASCADE
);

INSERT INTO Users (username, password, firstname, middlename, lastname, egn, phone, email, hiredate, isactive, releasedate, role) VALUES
('jsmith', 'password123', 'John', 'A.', 'Smith', '9001011234', '0888123456', 'jsmith@example.com', '2020-01-15', TRUE, NULL, 'Admin'),
('abrown', 'pass456', 'Alice', 'T.', 'Brown', '9102022233', '0888123457', 'abrown@example.com', '2021-03-10', TRUE, NULL, 'User'),
('mwhite', 'pass789', 'Michael', 'T.', 'White', '8903033344', '0888123458', 'mwhite@example.com', '2019-08-20', TRUE, NULL, 'User'),
('rblack', 'securepass', 'Rachel', 'B.', 'Black', '9204044455', '0888123459', 'rblack@example.com', '2022-01-01', TRUE, NULL, 'User'),
('dgreen', '123pass', 'Daniel', 'T.', 'Green', '9305055566', '0888123460', 'dgreen@example.com', '2023-05-01', TRUE, NULL, 'User'),
('clane', 'lanepass', 'Chloe', 'E.', 'Lane', '9406066677', '0888123461', 'clane@example.com', '2020-10-15', TRUE, NULL, 'User'),
('tjones', 'jonespass', 'Tom', 'J.', 'Jones', '9507077788', '0888123462', 'tjones@example.com', '2018-12-01', TRUE, NULL, 'User'),
('nsimons', 'simpass', 'Nina', 'T.', 'Simons', '9608088899', '0888123463', 'nsimons@example.com', '2019-06-20', TRUE, NULL, 'User'),
('hlee', 'leepass', 'Henry', 'Q.', 'Lee', '9709099900', '0888123464', 'hlee@example.com', '2021-07-07', TRUE, NULL, 'User'),
('test', 'test', 'test', 'test.', 'test', '9801011122', '0888123465', 'test@gmail.com', '2022-02-02', TRUE, NULL, 'User');

INSERT INTO Clients (firstname, lastname, phone, email, isadult) VALUES
('Emma', 'Johnson', '0887000001', 'emma.johnson@example.com', TRUE),
('Liam', 'Williams', '0887000002', 'liam.williams@example.com', TRUE),
('Olivia', 'Brown', '0887000003', 'olivia.brown@example.com', TRUE),
('Noah', 'Jones', '0887000004', 'noah.jones@example.com', TRUE),
('Ava', 'Garcia', '0887000005', 'ava.garcia@example.com', TRUE),
('Sophia', 'Martinez', '0887000006', 'sophia.martinez@example.com', TRUE),
('Jackson', 'Rodriguez', '0887000007', 'jackson.rodriguez@example.com', TRUE),
('Isabella', 'Lopez', '0887000008', 'isabella.lopez@example.com', TRUE),
('Lucas', 'Hernandez', '0887000009', 'lucas.hernandez@example.com', TRUE),
('Mia', 'Gonzalez', '0887000010', 'mia.gonzalez@example.com', TRUE),
('Ben', 'Smith', '0887000011', 'ben.smith@example.com', FALSE),
('Lily', 'Taylor', '0887000012', 'lily.taylor@example.com', FALSE),
('Max', 'Clark', '0887000013', 'max.clark@example.com', FALSE),
('Ella', 'Lewis', '0887000014', 'ella.lewis@example.com', FALSE),
('Leo', 'Walker', '0887000015', 'leo.walker@example.com', FALSE),
('Zoe', 'Young', '0887000016', 'zoe.young@example.com', FALSE),
('Aria', 'Hall', '0887000017', 'aria.hall@example.com', FALSE),
('Ethan', 'Allen', '0887000018', 'ethan.allen@example.com', FALSE),
('Grace', 'Wright', '0887000019', 'grace.wright@example.com', FALSE),
('James', 'King', '0887000020', 'james.king@example.com', FALSE);

INSERT INTO Rooms (capacity, roomtype, isavailable, priceperadult, priceperchild, roomnumber) VALUES
(2, 'Standard', TRUE, 50.00, 25.00, '101'),
(3, 'Deluxe', TRUE, 80.00, 40.00, '102'),
(4, 'Suite', TRUE, 120.00, 60.00, '103'),
(1, 'Single', TRUE, 40.00, 20.00, '104'),
(2, 'Standard', TRUE, 55.00, 28.00, '105'),
(3, 'Deluxe', TRUE, 85.00, 42.00, '106'),
(2, 'Standard', TRUE, 50.00, 25.00, '107'),
(4, 'Suite', TRUE, 130.00, 65.00, '108'),
(3, 'Deluxe', TRUE, 90.00, 45.00, '109'),
(1, 'Single', TRUE, 45.00, 22.00, '110'),
(2, 'Standard', TRUE, 52.00, 26.00, '111'),
(3, 'Deluxe', TRUE, 88.00, 44.00, '112'),
(4, 'Suite', TRUE, 125.00, 62.00, '113'),
(2, 'Standard', TRUE, 50.00, 25.00, '114'),
(1, 'Single', TRUE, 43.00, 21.00, '115'),
(3, 'Deluxe', TRUE, 82.00, 41.00, '116'),
(2, 'Standard', TRUE, 54.00, 27.00, '117'),
(4, 'Suite', TRUE, 140.00, 70.00, '118'),
(3, 'Deluxe', TRUE, 86.00, 43.00, '119'),
(1, 'Single', TRUE, 41.00, 20.00, '120'),
(2, 'Standard', TRUE, 53.00, 26.00, '121'),
(3, 'Deluxe', TRUE, 89.00, 44.00, '122'),
(4, 'Suite', TRUE, 135.00, 68.00, '123'),
(2, 'Standard', TRUE, 51.00, 25.00, '124'),
(1, 'Single', TRUE, 42.00, 21.00, '125'),
(3, 'Deluxe', TRUE, 83.00, 41.00, '126'),
(2, 'Standard', TRUE, 56.00, 28.00, '127'),
(4, 'Suite', TRUE, 145.00, 72.00, '128'),
(3, 'Deluxe', TRUE, 91.00, 46.00, '129'),
(1, 'Single', TRUE, 40.00, 20.00, '130');


INSERT INTO Reservations (roomid, createdbyclientid, checkin, checkout, includesbreakfast, allinclusive, numberofadults, numberofchildren, totalprice) VALUES
(1, 1, '2025-05-01', '2025-05-05', TRUE, FALSE, 2, 0, 200.00),
(2, 2, '2025-06-10', '2025-06-15', FALSE, TRUE, 2, 1, 600.00),
(3, 3, '2025-04-20', '2025-04-25', TRUE, TRUE, 3, 1, 750.00),
(4, 4, '2025-07-01', '2025-07-03', FALSE, FALSE, 1, 0, 80.00),
(5, 5, '2025-08-15', '2025-08-20', TRUE, TRUE, 2, 0, 550.00),
(6, 6, '2025-09-10', '2025-09-13', FALSE, FALSE, 3, 0, 255.00),
(7, 7, '2025-05-01', '2025-05-04', TRUE, FALSE, 2, 1, 225.00),
(8, 8, '2025-06-15', '2025-06-20', FALSE, TRUE, 4, 0, 650.00),
(9, 9, '2025-04-05', '2025-04-10', TRUE, TRUE, 3, 1, 720.00),
(10, 10, '2025-05-12', '2025-05-14', FALSE, FALSE, 1, 0, 90.00),
(11, 11, '2025-07-05', '2025-07-10', TRUE, TRUE, 1, 1, 260.00),
(12, 12, '2025-08-01', '2025-08-06', TRUE, FALSE, 3, 0, 440.00),
(13, 13, '2025-09-15', '2025-09-18', FALSE, TRUE, 4, 0, 540.00),
(14, 14, '2025-10-10', '2025-10-15', TRUE, FALSE, 2, 1, 330.00),
(15, 15, '2025-04-02', '2025-04-04', FALSE, FALSE, 1, 0, 86.00),
(16, 16, '2025-05-10', '2025-05-15', TRUE, TRUE, 3, 0, 410.00),
(17, 17, '2025-06-01', '2025-06-05', FALSE, FALSE, 2, 2, 352.00),
(18, 18, '2025-07-01', '2025-07-03', TRUE, FALSE, 4, 0, 280.00),
(19, 19, '2025-08-10', '2025-08-13', FALSE, TRUE, 3, 1, 516.00),
(20, 20, '2025-09-05', '2025-09-07', TRUE, FALSE, 1, 1, 122.00);
