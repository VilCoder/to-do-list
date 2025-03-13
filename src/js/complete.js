import { getStoredTodoListData, updateTodoList, removeTodoList } from "./todoList";
import { closeDialog } from "./handlerDialog";

function displayComplete() {
  const tasks = getStoredTodoListData();
  const main = document.querySelector('.layout__main');
  main.textContent = '';
  main.insertAdjacentHTML( // Add DOM elements to the end of main
    'beforeend',
    `
    <h3 class="main__title">Complete</h3>
    <h4 class="main___subtitle">My Projects</h4>
    `
  );

  for (let category in tasks) {
    tasks[category].forEach(task => {
      if (task.getChecklist()) {
        updateTodoList(main, task, 0);
        removeTodoList();
      }
    });
  }

  closeDialog();
}

export {
  displayComplete,
}