import { format } from 'date-fns';

import { getTodoList, updateTodoList, removeTodoList } from "./todoList";

function displayInbox(todoList = getTodoList()) {
  const main = document.querySelector('.layout__main');
  main.textContent = '';

  todoList.forEach((todo, index) => {
    let startDate = new Date();
    startDate = format(startDate, 'y-M-d');

    const endDate = todo._dueDate.split(' ');

    updateTodoList(main, todo, index);

    const todoList = document.querySelector(`.todo__list-${index}`);
    removeTodoList(todoList, index);
  });
}



export {
  displayInbox,
};