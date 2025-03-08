import { format, formatDistance } from 'date-fns';

import { getTodoList, updateTodoList, editTodoList, removeTodoList, changeCheckedTodoList } from "./todoList";
import { closeDialog } from './handlerDialog';

function displayToday() {
  const main = document.querySelector('.layout__main');
  main.textContent = '';
  main.insertAdjacentHTML(
    'beforeend',
    `
    <h3 class="main__title">Hoy</h3>
    <h4 class="main___subtitle">My Projects</h4>
    `
  );

  const todoList = getTodoList();
  for (const category in todoList) {
    todoList[category].forEach((todo, index) => {
      let startDate = new Date();
      startDate = format(startDate, 'y-M-d');

      const endDate = todo.getDate().split(' ');

      if (endDate[0]) {
        const diff = formatDistance(endDate[0], startDate);

        if (!diff.includes('day')) {
          updateTodoList(main, todo);

          const todoList = document.querySelectorAll('.todo__list');
          removeTodoList(todoList, index);
          editTodoList(todoList, index);
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