import { getStoredTodoListData, updateTodoList, editTodoList, removeTodoList, changeCheckedTodoList } from "./todoList";
import { closeDialog } from './handlerDialog';


function displayNext() {
  const tasks = getStoredTodoListData();

  const main = document.querySelector('.layout__main');
  main.textContent = '';
  main.insertAdjacentHTML( // Add DOM elements to the end of main
    'beforeend',
    `
    <h3 class="main__title">Next</h3>
    <h4 class="main___subtitle">My Projects</h4>
    `
  );

  for (let category in tasks) {
    tasks[category].forEach((task) => {
      updateTodoList(main, task);
      removeTodoList();
      editTodoList();
      changeCheckedTodoList();
    });
  }

  closeDialog();
}



export {
  displayNext,
};