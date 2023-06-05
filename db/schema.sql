-- Drop the database if it already exists
DROP DATABASE IF EXISTS vpnUser_db;

-- Create the database
CREATE DATABASE vpnUser_db;

-- Switch to the newly created database
USE vpnUser_db;

-- Create the Users table
CREATE TABLE Users (
  Userid INT NOT NULL,
  UserName VARCHAR(30) NOT NULL,
  Password VARCHAR(30) NOT NULL
);
