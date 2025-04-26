DROP DATABASE IF EXISTS "WaterWaster";
CREATE DATABASE "WaterWaster";

DROP TABLE IF EXISTS utilities;
CREATE TABLE utilities (
  utilityId SERIAL,
  name TEXT,
  cost numeric,
  waterCost numeric,
  --roomId numeric,
  description TEXT 
)

DROP TABLE IF EXISTS actionsTaken;
CREATE TABLE actionsTaken (
  actionId SERIAL,
  utilityId INTEGER,
  name TEXT,
  cost numeric,
  waterCost numeric,
  --roomId numeric,
  description TEXT
)

