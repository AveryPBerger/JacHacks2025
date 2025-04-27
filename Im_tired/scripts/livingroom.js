"use strict";

import { default as Action } from "./utility.js";
import { default as Player } from "./player.js";
import openPopupWindow from "./popupwindow.js";

let player = null;

document.addEventListener("DOMContentLoaded", function () {
    // const possible_actions = [
    //     new Action('Take a Shower', 0.50, 'Take a 10-minute shower using standard shower head.', 80),
    //     new Action('Flush Toilet', 0.05, 'Flush a standard toilet once.', 6),
    //     new Action('Wash Hands', 0.10, 'Wash hands for 20 seconds.', 5),
    //     new Action('Brush Teeth (with tap running)', 0.15, 'Brush teeth without turning off the tap.', 10),
    //     new Action('Brush Teeth (tap off)', 0.05, 'Brush teeth while turning off the tap when not rinsing.', 1),
    //     new Action('Water Garden', 0.30, 'Water the garden using a hose for 5 minutes.', 40),
    //     new Action('Hand Wash Dishes', 0.25, 'Wash dishes by hand with running water.', 30),
    //     new Action('Dishwasher Load', 0.40, 'Run a full load in a water-efficient dishwasher.', 15),
    //     new Action('Laundry Load', 0.60, 'Wash one load of laundry in a washing machine.', 50),
    //     new Action('Drink Glass of Water', 0.01, 'Drink a glass of water.', 0.2)
    // ];
    
    player = new Player('Player 1');
    
    // Set up the image switching functionality
    const displayImage = document.getElementById('displayImage');
    const defaultImageSrc = displayImage.src;
    
    const hoverButton1 = document.getElementById('hoverButton1');
    const hoverButton2 = document.getElementById('hoverButton2');
    const hoverButton3 = document.getElementById('hoverButton3');
    const hoverButton4 = document.getElementById('hoverButton4');
    
    const images = [
        "../assets/livingroom/ArchwayArrow.png",
        "../assets/livingroom/PlantAnimation.png",
        "../assets/livingroom/AirConditonerAnimation.png",
        "../assets/livingroom/TVAnimation.png"
    ];
    
    // Information to display in popup for each button
    const buttonInfo = [
        {
            title: "Personal Computer Water Usage",
            content: "While at home desktops and laptops don't use as much power, they still require energy to run. The average desktop computer uses about 200-400 watts per hour, while laptops use about 50-100 watts.",
            waterUsage: "????"
        },
        {
            title: "Bed",
            content: "Sleep.",
            waterUsage: "None"
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

    hoverButton4.addEventListener('mouseover', () => {
        displayImage.src = images[3];
    });
    
    // Reset image on mouseout
    [hoverButton1, hoverButton2, hoverButton3, hoverButton4].forEach(button => {
        button.addEventListener('mouseout', () => {
            displayImage.src = defaultImageSrc;
        });
    });
    
    // Click functionality to open popup with relevant info
    hoverButton1.addEventListener('click', () => {
        window.location.href = "./hallway.html";
    });
    
    hoverButton2.addEventListener('click', () => {
        window.location.href = "./bathroom.html";
    });
    
    hoverButton3.addEventListener('click', () => {
        window.location.href = "./bedroom.html";
    });

    hoverButton4.addEventListener('click', () => {
        window.location.href = "./livingroom.html";
    });
});

export { player };