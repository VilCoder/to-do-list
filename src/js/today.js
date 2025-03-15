import { parse, isToday } from 'date-fns';

import { getStoredTodoListData, updateTodoList, editTodoList, removeTodoList, changeCheckedTodoList, sortByPriorityTodoList } from "./todoList";
import { closeDialog } from './handlerDialog';

import sortIcon from '../icons/sort.svg';

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

  const tasks = getStoredTodoListData();

  for (let category in tasks) {
    tasks[category].forEach((task) => {
      // Extracts only the date part without the time
      const date = task.getDate().split(',')[0]; // "13/mar/2025"

      if (date) {
        // Converts the date to the correct format
        const parsedDate = parse(date.trim(), 'd/MMM/y', new Date());
      
      if (isToday(parsedDate)) { // Check if the date is today
          updateTodoList(main, task);
          removeTodoList();
          editTodoList();
          changeCheckedTodoList();
        }
      }
    });
  }

  closeDialog();

  // document.querySelector('.main__sort').addEventListener('click', () => {
  //   const orderedTasks = sortByPriorityTodoList();
  //   for (let category in tasks) {
  //     tasks[category].forEach((task) => {
  //       // Extracts only the date part without the time
  //       const date = task.getDate().split(',')[0]; // "13/mar/2025"
  
  //       if (date) {
  //         // Converts the date to the correct format
  //         const parsedDate = parse(date.trim(), 'd/MMM/y', new Date());
        
  //       if (isToday(parsedDate)) { // Check if the date is today
  //           updateTodoList(main, task);
  //           removeTodoList();
  //           editTodoList();
  //           changeCheckedTodoList();
  //         }
  //       }
  //     });
  //   }
  //   // updateTodoList(main, task);
  // })
}

export { displayToday };
