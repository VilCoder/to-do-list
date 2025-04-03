import '../css/reset.css';
import '../css/scroll.css';
import '../css/styles.css';
import '../css/responsive.css';

import DOM from './DOM';
import { handlerEnterSearch } from './search';
import displayNext from './next';
import displayToday from './today';
import project from './project';
import displayComplete from './complete';

document.addEventListener('DOMContentLoaded', () => {
  displayToday();
  project.displayProject();

  const aside = document.querySelector('.layout__aside');
  const menuButton = document.querySelector('.layout__menu-toggle');
  const options = document.querySelectorAll('.aside__user-options > li');
  const asideButtons = document.querySelectorAll('.user-options__text');
  const icons = document.querySelectorAll('.icon-tabler');
  const dialog = document.querySelector('#dialog');
  const closeDialogBtn = document.querySelector('.form__cancel');

  menuButton.addEventListener('click', function () {
    aside.classList.toggle('layout__aside-visible');

    const iconBars = document.querySelector('.icon-tabler-dots-vertical');
    const iconClose = document.querySelector('.icon-tabler-x');
    const visible = document.querySelector('.layout__aside-visible');

    if (visible) {
      iconBars.style.opacity = 0;
      iconClose.style.opacity = 1;
    } else {
      iconBars.style.opacity = 1;
      iconClose.style.opacity = 0;
    }
  });

  options.forEach((option, index) => {
    option.addEventListener('click', () => {
      options.forEach((element) => element.classList.remove('option__active'));
      icons.forEach((icon) => icon.classList.remove('icon__active'));
      document
        .querySelectorAll('.project__content')
        .forEach((element) => element.classList.remove('option__active'));

      option.classList.add('option__active');
      icons[index + 1].classList.add('icon__active');
    });
  });

  dialog.addEventListener('cancel', (event) => {
    event.preventDefault();
    DOM.closeDialog();
  });

  dialog.addEventListener('click', () => {
    DOM.closeDialog();
  });

  closeDialogBtn.addEventListener('click', DOM.closeDialog);
  document
    .querySelector('.dialog__form')
    .addEventListener('click', (event) => event.stopPropagation());

  asideButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      switch (index) {
        case 0:
          DOM.displayAddTaskDOM();
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
