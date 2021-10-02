CREATE DATABASE mlb;
USE mlb;
CREATE TABLE year2021hitting (
    id INT NOT NULL AUTO_INCREMENT,
    nameLast VARCHAR(31) NOT NULL,
    nameFirst VARCHAR(31) NOT NULL,
    age INT NOT NULL,
    team VARCHAR(3) NOT NULL, /* three-letter codes for each team (NYM, STL, etc.)*/
    pos VARCHAR(2) NOT NULL,
    g INT, /* games played */
    ab INT, /* at bats */
    pa INT, /* plate appearances */
    PRIMARY KEY (id)
);
CREATE TABLE year2021pitching (
    id INT NOT NULL AUTO_INCREMENT,
    nameLast VARCHAR(31) NOT NULL,
    nameFirst VARCHAR(31) NOT NULL,
    age INT NOT NULL,
    team VARCHAR(3) NOT NULL, /* three-letter codes for each team (NYM, STL, etc.)*/
    pos VARCHAR(2) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id) REFERENCES year2021hitting(id)
);