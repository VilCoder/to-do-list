import { format, formatDistance } from 'date-fns';

import { getStoredTodoListData, updateTodoList, editTodoList, removeTodoList, changeCheckedTodoList } from "./todoList";
import { closeDialog } from './handlerDialog';

function displayToday() {
  const main = document.querySelector('.layout__main');
  main.textContent = '';
  main.insertAdjacentHTML( // Add DOM elements to the end of main
    'beforeend',
    `
    <h3 class="main__title">Today</h3>
    <h4 class="main___subtitle">My Projects</h4>
    `
  );

  const tasks = getStoredTodoListData();

  for (const category in tasks) {
    tasks[category].forEach((task) => {
      let startDate = new Date();
      startDate = format(startDate, 'y-M-d');

      const endDate = task.dueDate.split(' ');

      if (endDate[0]) {
        const diff = formatDistance(endDate[0], startDate);

        if (!diff.includes('day')) {
          updateTodoList(main, task);
          removeTodoList();
          editTodoList();
          changeCheckedTodoList();
        }
      }
    });
  }

  closeDialog();
}

export {
  displayToday,
};