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


INSERT INTO utilities(name, cost, waterCost, description) VALUES
('Take a Shower', 0.50, 80, 'Take a 10-minute shower using standard shower head.'),
('Flush Toilet', 0.05, 6, 'Flush a standard toilet once.'),
('Wash Hands', 0.10, 5, 'Wash hands for 20 seconds.'),
('Brush Teeth (with tap running)', 0.15, 10, 'Brush teeth without turning off the tap.'),
('Brush Teeth (tap off)', 0.05, 1, 'Brush teeth while turning off the tap when not rinsing.'),
('Water Garden', 0.30, 40, 'Water the garden using a hose for 5 minutes.'),
('Hand Wash Dishes', 0.25, 30, 'Wash dishes by hand with running water.'),
('Dishwasher Load', 0.40, 15, 'Run a full load in a water-efficient dishwasher.'),
('Laundry Load', 0.60, 50, 'Wash one load of laundry in a washing machine.'),
('Drink Glass of Water', 0.01, 0.2, 'Drink a glass of water.');
