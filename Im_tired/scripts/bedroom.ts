import { player } from "../scripts/index";

const bedroomHtml = document.querySelector('html');

const button1 = document.getElementById('hoverButton1')!;
const button2 = document.getElementById('hoverButton2')!;
const button3 = document.getElementById('hoverButton3')!;
const displayImage = document.getElementById('displayImage') as HTMLImageElement;

document.addEventListener('DOMContentLoaded', () => {
    if (bedroomHtml) {
        bedroomHtml.style.backgroundImage = "url('../assets/bedroom/Bedroom.png')";
    }
});
button1.addEventListener('mouseover', () => {
    displayImage.src = '../assets/bedroom/DoorAnimation.png';
});

button1.addEventListener('mouseout', () => {
    displayImage.src = '../assets/bedroom/Bedroom.png';
});

button1.addEventListener('click', () => {
    window.location.href = `./bathroom.html`;
});

button2.addEventListener('mouseover', () => {
    displayImage.src = '../assets/bedroom/ComputerAnimation.png';
});

button2.addEventListener('mouseout', () => {
    displayImage.src = '../assets/bedroom/Bedroom.png';
});

button3.addEventListener('mouseover', () => {
    displayImage.src = '../assets/bedroom/Bedanimation.png';
});

button3.addEventListener('mouseout', () => {
    displayImage.src = '../assets/bedroom/Bedroom.png';
});
