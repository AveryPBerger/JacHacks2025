DROP DATABASE IF EXISTS "WaterWaster";
CREATE DATABASE "WaterWaster";

DROP TABLE IF EXISTS utilities;
CREATE TABLE utilities (
  utilityId SERIAL,
  name TEXT NOT NULL,
  cost numeric NOT NULL,
  waterCost numeric NOT NULL,
  --roomId numeric,
  description TEXT NOT NULL 
)

DROP TABLE IF EXISTS actionsTaken;
CREATE TABLE actionsTaken (
  actionId SERIAL,
  utilityId INTEGER REFERENCES utilities(utilityId) NOT NULL,
  timeTaken TIMESTAMP NOT NULL
)

