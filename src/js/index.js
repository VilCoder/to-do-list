import '../css/reset.css';
import '../css/styles.css';
// import '../css/responsive.css';

import { displayAddTask } from './addTask';
import { displaySearch } from './search';
import { displayNext } from './next';
import { displayInbox } from './inbox';
import { closeDialog } from './handlerDialog';

document.addEventListener('DOMContentLoaded', () => {
  const aside = document.querySelector('.layout__aside');
  const menuButton = document.querySelector('.layout__menu-toggle');
  let iconBars = document.querySelector('.icon-tabler-dots-vertical');
  let iconClose = document.querySelector('.icon-tabler-x');
  const options = document.querySelectorAll('.aside__user-options > div');
  const asideButtons = document.querySelectorAll('.user-options__text');
  const icons = document.querySelectorAll('.icon-tabler');
  const dialog = document.querySelector('#dialog');
  const closeDialogBtn = document.querySelector('.form__close');

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

      icons[index + 1].classList.add('icon__active');
      option.classList.add('option__active');
    });
  });

  dialog.addEventListener('cancel', (event) => {
    event.preventDefault();
    closeDialog();
  });

  closeDialogBtn.addEventListener('click', closeDialog);
  
  asideButtons.forEach((button, index) => {
    button.addEventListener('click', (e) => {
      switch (index) {
        case 0:
          displayAddTask();
          break;
        case 1:
          displaySearch(e.currentTarget);
          break;
        case 2:
          displayInbox();
          break;
        case 4:
          displayNext();
          break;
      }
    });
  });
});