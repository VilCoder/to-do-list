import '../css/reset.css';
import '../css/styles.css';
// import '../css/responsive.css';

import { addTask } from './add-task';

document.addEventListener('DOMContentLoaded', () => {
  const aside = document.querySelector('.layout__aside');
  const menuButton = document.querySelector('.layout__menu-toggle');
  let iconBars = document.querySelector('.icon-tabler-dots-vertical');
  let iconClose = document.querySelector('.icon-tabler-x');
  const options = document.querySelectorAll('.aside__user-options > div');
  const asideButtons = document.querySelectorAll('.user-options__text');

  menuButton.addEventListener('click', function () {
    let visible = document.querySelector(".layout__aside-visible");

    if (!visible) {
      aside.classList.add("layout__aside-visible");
      iconBars.style.opacity = 0;
      iconClose.style.opacity = 1;
    } else {
      aside.classList.remove("layout__aside-visible");
      iconBars.style.opacity = 1;
      iconClose.style.opacity = 0;
    }
  });

  options.forEach(option => {
    option.addEventListener('click', () => {
      options.forEach(option => option.classList.remove('option__active'));
      
      option.classList.add('option__active');
    });
  });

  asideButtons.forEach((button, index) => {
    button.addEventListener('click', (e) => {
      switch (index) {
        case 0:
          addTask();
          break;
      }
    });
  });
});