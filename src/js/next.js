import { getStoredTodoListData, updateTodoListScreen, editTodoList, removeTodoList, changeCheckedTodoList, sortByPriorityTodoList } from "./todoList";
import { closeDialog } from './handlerDialog';

import sortIcon from '../icons/sort.svg';

function displayNext() {
  const tasks = getStoredTodoListData();

  const main = document.querySelector('.layout__main');
  main.textContent = '';
  main.insertAdjacentHTML( // Add DOM elements to the end of main
    'beforeend',
    `
    <div class="main__sort"><i class="icon">${sortIcon}</i> <p>Sort by priority</p></div>
    <h3 class="main__title">Next</h3>
    <h4 class="main___subtitle">My Projects</h4>
    `
  );

  for (let category in tasks) {
    tasks[category].forEach((task) => {
      updateTodoListScreen(main, task);
      removeTodoList();
      editTodoList();
      changeCheckedTodoList();
      sortByPriorityTodoList();
    });
  }

  closeDialog();
}



export {
  displayNext,
};