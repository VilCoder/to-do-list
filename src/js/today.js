import { parse, isToday } from 'date-fns';
import sortIcon from '../icons/sort.svg';

import { loadTasks } from './task';
import DOM from './DOM';


function displayToday() {
  const main = document.querySelector('.layout__main');
  main.textContent = '';
  main.insertAdjacentHTML(
    'beforeend',
    `
    <div class="main__sort"><i class="icon">${sortIcon}</i> <p>Sort by priority</p></div>
    <h3 class="main__title">Today</h3>
    <h4 class="main___subtitle">My Projects</h4>
    `
  );

  const tasks = loadTasks();

  for (let category in tasks) {
    tasks[category].forEach(task => {
      // Extracts only the date part without the time
      const date = task.getDate().split(',')[0]; // "13/mar/2025"

      if (date) {
        // Converts the date to the correct format
        const parsedDate = parse(date.trim(), 'd/MM/y', new Date());
      
      if (isToday(parsedDate)) { // Check if the date is today
          DOM.updateDom(main, task);
          DOM.removeTaskDom();
          DOM.editTaskDom();
          DOM.completeTaskDom();
          DOM.sortTaskDom();
        }
      }
    });
  }

  DOM.closeDialog();
}

export { displayToday };
