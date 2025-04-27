import Utility from "./utility";
import Player from "./player";

let player: Player | null = null;

document.addEventListener("DOMContentLoaded", () => {

    
    const possible_actions: Array<Utility> = [
        new Utility('Take a Shower', 0.50, 'Take a 10-minute shower using standard shower head.', 80),
        new Utility('Flush Toilet', 0.05, 'Flush a standard toilet once.', 6),
        new Utility('Wash Hands', 0.10, 'Wash hands for 20 seconds.', 5),
        new Utility('Brush Teeth (with tap running)', 0.15, 'Brush teeth without turning off the tap.', 10),
        new Utility('Brush Teeth (tap off)', 0.05, 'Brush teeth while turning off the tap when not rinsing.', 1),
        new Utility('Water Garden', 0.30, 'Water the garden using a hose for 5 minutes.', 40),
        new Utility('Hand Wash Dishes', 0.25, 'Wash dishes by hand with running water.', 30),
        new Utility('Dishwasher Load', 0.40, 'Run a full load in a water-efficient dishwasher.', 15),
        new Utility('Laundry Load', 0.60, 'Wash one load of laundry in a washing machine.', 50),
        new Utility('Drink Glass of Water', 0.01, 'Drink a glass of water.', 0.2)
    ];

    player = new Player('Player 1');
});

export { player };



