import { parse, differenceInDays } from 'date-fns';

import { displayContentProject } from "./projects";
import { displayToday } from './today';
import { displayNext } from './next';
import { displaySearch } from './search';

import alarmIcon from '../icons/alarm.svg';

function updateScreen(main, task, hidden = 1) {
  const todo = document.createElement('div');
  todo.classList.add('todo__list');
  todo.dataset.date = task.getDate();
  todo.dataset.category = task.getCategory();

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = task.getChecklist();
  checkbox.disabled = task.getChecklist();
  checkbox.classList.add('list__checklist');
  checkbox.dataset.category = task.getCategory();
  checkbox.dataset.date = task.getDate();

  if (task.getPriority()) {
    let priority = task.getPriority();

    switch (priority) {
      case 'p1':
        checkbox.classList.add('checklist__p-1');
        break;

      case 'p2':
        checkbox.classList.add('checklist__p-2');
        break;

      case 'p3':
        checkbox.classList.add('checklist__p-3');
        break;
    }
  }

  if (checkbox.disabled) {
    if (hidden) {
      todo.style.display = 'none';
    }

    todo.style.opacity = 0.5;
  }

  const span = document.createElement('span');
  span.classList.add('list__info');

  // Extracts only the date part without the time
  const date = task.getDate().split(',')[0]; // "13/mar/2025"

  if (date) {
    // Converts the date to the correct format
    const parsedDate = parse(date.trim(), 'd/MM/y', new Date());

    // Calculate the difference in days
    const daysPassed = differenceInDays(parsedDate, new Date());

    if (daysPassed < 0) { // check if the date has already passed
      span.classList.add('list__info-expired');
      span.textContent = 'Expired';
    }
  }

  todo.appendChild(span);
  todo.appendChild(checkbox);
  todo.insertAdjacentHTML(
    'beforeend',
    `
      <p class="list__title">${task.getTitle()}</p>
      <div class="list__date">
        <p>${task.getDate()}</p>
        <i class="list__date-icon">${alarmIcon}</i>
      </div>
   `
  );

  main.appendChild(todo);
}

function reloadScreen(value) {
  let mainTitle = document.querySelector('.main__title').textContent.toLowerCase();

  if (mainTitle === 'today') {
    displayToday();
  } else if (mainTitle === 'next') {
    displayNext();
  } else if (mainTitle === value) {
    displayContentProject(value);
  } else {
    displaySearch(value);
  }
}

export {
  updateScreen,
  reloadScreen,
};