CREATE DATABASE record_company;
USE record_company;

CREATE TABLE bands (
  id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
);

CREATE TABLE albums (
  id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  release_year INT,
  band_id INT NOT NULL,
  FOREIGN KEY (band_id) REFERENCES bands.id
);

DROP DATABASE record_company;