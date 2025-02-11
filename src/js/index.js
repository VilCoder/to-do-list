import '../css/styles.css';
import '../css/responsive.css';

import { displayHome } from './home';
import { displayMenu } from './menu';
import { displayAbout } from './about';
import { displayContact } from './contact';

document.addEventListener('DOMContentLoaded', () => {
    const containerNavbar = document.querySelector('.container__navbar');
    const navbarButtons = document.querySelectorAll('.navbar__button');
    const menuButton = document.querySelector('.menu__toggle');

    navbarButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            navbarButtons.forEach(button => button.classList.remove('navbar__button--active'));

            button.classList.add('navbar__button--active');

            if (index === 0) {
                displayHome();
            } else if (index === 1) {
                displayMenu();
            } else if (index === 2) {
                displayAbout();
            } else if (index === 3) {
                displayContact();
            }
        });
    });


    // Button responsive
    menuButton.addEventListener('click', () => {
        containerNavbar.classList.toggle('container__navbar--visible');

        let visible = document.querySelector('.container__navbar--visible');
        let iconBars = document.querySelector(".icon-bars");
        let iconXmark = document.querySelector(".icon-xmark");
        
        if (visible) {
            iconBars.style.opacity = 0;
            iconXmark.style.opacity = 1;
        } else {
            iconBars.style.opacity = 1;
            iconXmark.style.opacity = 0;
        }
    });

    displayHome();
});