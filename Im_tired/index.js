"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utility_1 = require("./scripts/utility");
document.addEventListener("DOMContentLoaded", function () {
    var possible_actions = [
        new utility_1.default(0, 'Take a Shower', 0.50, 'Take a 10-minute shower using standard shower head.', 80),
        new utility_1.default(1, 'Flush Toilet', 0.05, 'Flush a standard toilet once.', 6),
        new utility_1.default(2, 'Wash Hands', 0.10, 'Wash hands for 20 seconds.', 5),
        new utility_1.default(3, 'Brush Teeth (with tap running)', 0.15, 'Brush teeth without turning off the tap.', 10),
        new utility_1.default(4, 'Brush Teeth (tap off)', 0.05, 'Brush teeth while turning off the tap when not rinsing.', 1),
        new utility_1.default(5, 'Water Garden', 0.30, 'Water the garden using a hose for 5 minutes.', 40),
        new utility_1.default(6, 'Hand Wash Dishes', 0.25, 'Wash dishes by hand with running water.', 30),
        new utility_1.default(7, 'Dishwasher Load', 0.40, 'Run a full load in a water-efficient dishwasher.', 15),
        new utility_1.default(8, 'Laundry Load', 0.60, 'Wash one load of laundry in a washing machine.', 50),
        new utility_1.default(9, 'Drink Glass of Water', 0.01, 'Drink a glass of water.', 0.2)
    ];
    console.log(possible_actions[0].getInfo());
    var player = null;
});
