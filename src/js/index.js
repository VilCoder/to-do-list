import '../css/reset.css';
import '../css/styles.css';
// import '../css/responsive.css';

import { displayAddTask } from './addTask';
import { handlerEnterSearch } from './search';
import { displayNext } from './next';
import { displayToday } from './today';
import { closeDialog } from './handlerDialog';
import { displayNameProject } from './projects';
import { displayComplete } from './complete';

document.addEventListener('DOMContentLoaded', () => {
  displayToday();
  displayNameProject();

  const aside = document.querySelector('.layout__aside');
  const menuButton = document.querySelector('.layout__menu-toggle');
  const iconBars = document.querySelector('.icon-tabler-dots-vertical');
  const iconClose = document.querySelector('.icon-tabler-x');
  const options = document.querySelectorAll('.aside__user-options > div');
  const asideButtons = document.querySelectorAll('.user-options__text');
  const icons = document.querySelectorAll('.icon-tabler');
  const dialog = document.querySelector('#dialog');
  const closeDialogBtn = document.querySelector('.form__close');
  const projectContain = document.querySelectorAll('.project__content');

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

  options.forEach((option, index) => {
    option.addEventListener('click', () => {
      options.forEach(option => option.classList.remove('option__active'));
      icons.forEach(icon => icon.classList.remove('icon__active'));
      projectContain.forEach(icon => icon.classList.remove('option__active'));
      
      option.classList.add('option__active');
      icons[index + 1].classList.add('icon__active');
    });
  });

  dialog.addEventListener('cancel', (event) => {
    event.preventDefault();
    closeDialog();
  });

  closeDialogBtn.addEventListener('click', closeDialog);

  asideButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      switch (index) {
        case 0:
          displayAddTask();
          break;

        case 1:
          handlerEnterSearch();
          break;

        case 3:
          displayNext();
          break;

        case 4:
          displayComplete();
          break;
          
        default:
          displayToday();
      }
    });
  });
});