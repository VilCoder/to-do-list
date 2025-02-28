import { format, formatDistance } from 'date-fns';

import { getTodoList, updateTodoList, removeTodoList } from "./todoList";

function displayToday(todoList = getTodoList()) {
  const main = document.querySelector('.layout__main');
  main.textContent = '';
  main.insertAdjacentHTML(
    'beforeend',
    `
    <h3 class="main__title">Hoy</h3>
    <h4 class="main___subtitle">My Projects</h4>
    `
  );

  todoList.forEach((todo, index) => {
    let startDate = new Date();
    startDate = format(startDate, 'y-M-d');

    const endDate = todo.getDate().split(' ');
    console.log( endDate instanceof Date );

    // if (endDate instanceof Date) {
      const diff = formatDistance(endDate[0], startDate);

      if (!diff.includes('day')) {
        updateTodoList(main, todo, index);
  
        const todoList = document.querySelector(`.todo__list-${index}`);
        removeTodoList(todoList, index);
      }
    // }
  });
}



export {
  displayToday,
};