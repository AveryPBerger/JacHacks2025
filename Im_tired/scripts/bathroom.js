"use strict";

import { default as Action } from "./utility";
import { default as Player } from "./player";
import openPopupWindow from "./popupwindow"; // Removed .js extension

let player = null;

document.addEventListener("DOMContentLoaded", function () {
    const possible_actions = [
        new Action('Take a Shower', 0.50, 'Take a 10-minute shower using standard shower head.', 80),
        new Action('Flush Toilet', 0.05, 'Flush a standard toilet once.', 6),
        new Action('Wash Hands', 0.10, 'Wash hands for 20 seconds.', 5),
        new Action('Brush Teeth (with tap running)', 0.15, 'Brush teeth without turning off the tap.', 10),
        new Action('Brush Teeth (tap off)', 0.05, 'Brush teeth while turning off the tap when not rinsing.', 1),
        new Action('Water Garden', 0.30, 'Water the garden using a hose for 5 minutes.', 40),
        new Action('Hand Wash Dishes', 0.25, 'Wash dishes by hand with running water.', 30),
        new Action('Dishwasher Load', 0.40, 'Run a full load in a water-efficient dishwasher.', 15),
        new Action('Laundry Load', 0.60, 'Wash one load of laundry in a washing machine.', 50),
        new Action('Drink Glass of Water', 0.01, 'Drink a glass of water.', 0.2)
    ];
    
    player = new Player('Player 1');
    
    // Set up the image switching functionality
    const displayImage = document.getElementById('displayImage');
    if (displayImage) {
        const defaultImageSrc = displayImage.src;
        
        const hoverButton1 = document.getElementById('hoverButton1');
        const hoverButton2 = document.getElementById('hoverButton2');
        const hoverButton3 = document.getElementById('hoverButton3');
        
        // Check if buttons exist before adding event listeners
        if (hoverButton1 && hoverButton2 && hoverButton3) {
            const images = [
                "./assets/bedroom/Bedroom_highlighted1.png", // Changed path from "../" to "./"
                "./assets/bedroom/Bedroom_highlighted2.png",
                "./assets/bedroom/Bedroom_highlighted3.png"
            ];
            
            // Information to display in popup for each button
            const buttonInfo = [
                {
                    title: "Bedroom Water Usage - Laundry",
                    content: "The average American household does about 300 loads of laundry per year, using approximately 40-50 gallons of water per load with a standard washer. High-efficiency washers use about 15-30 gallons per load. Tips: Only run full loads, use cold water when possible, and consider upgrading to high-efficiency machines.",
                    waterUsage: "40-50 gallons per load"
                },
                {
                    title: "Bedroom Water Usage - Personal Hygiene",
                    content: "Daily activities like showering use significant water. A standard shower uses 2.5 gallons per minute (25 gallons for 10 minutes). Installing a water-efficient showerhead can reduce this to 1.5 gallons per minute, saving about 10 gallons per shower.",
                    waterUsage: "25 gallons per 10-minute shower"
                },
                {
                    title: "Bedroom Water Usage - Humidifiers",
                    content: "Bedrooms often contain humidifiers which use water to add moisture to the air. The average humidifier can use between 1-12 gallons per day depending on the size and settings. Consider using only when necessary and at lower settings to conserve water.",
                    waterUsage: "1-12 gallons per day"
                }
            ];
            
            // Hover functionality
            hoverButton1.addEventListener('mouseover', () => {
                displayImage.src = images[0];
            });
            
            hoverButton2.addEventListener('mouseover', () => {
                displayImage.src = images[1];
            });
            
            hoverButton3.addEventListener('mouseover', () => {
                displayImage.src = images[2];
            });
            
            // Reset image on mouseout
            [hoverButton1, hoverButton2, hoverButton3].forEach(button => {
                button.addEventListener('mouseout', () => {
                    displayImage.src = defaultImageSrc;
                });
            });
            
            // Click functionality to open popup with relevant info
            hoverButton1.addEventListener('click', () => {
                openPopupWindow(buttonInfo[0]); // Fixed index from 3 to 0
            });
            
            hoverButton2.addEventListener('click', () => {
                openPopupWindow(buttonInfo[1]); // Fixed index from 4 to 1
            });
            
            hoverButton3.addEventListener('click', () => {
                window.location.href = "./bedroom.html";
            });
        }
    }
});

export { player };