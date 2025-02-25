import { format, formatDistance } from 'date-fns';

import alarmIcon from '../icons/alarm.svg';
import sync from '../icons/sync.svg';
import trashIcon from '../icons/trash.svg';

import { getTodoList } from "./todo";

const todos = getTodoList();

function updateTodoList() {
  const main = document.querySelector('.main__todo');
  main.textContent = '';

  todos.forEach((todo, index) => {
    let startDate = new Date();
    startDate = format(startDate, 'y-M-d');

    const endDate = todo.getDate().split(' ');
    const diff = formatDistance(endDate[0], startDate);

    if (!diff.includes('day')) {
      main.insertAdjacentHTML(
        'beforeend',
        `
        <div class="todo__list todo__list-${index}">
          <input type="checkbox" class="list__checklist">
          <p class="list__title">${todo.getTitle()}</p>
          <div class="list__date">
            <i class="list__date-icon">${sync}</i>
            <p>${format(todo.getDate(), 'p').toLowerCase()}</p>
            <i class="list__date-icon">${alarmIcon}</i>
          </div>
        </div>
       `
      );

      const todoList = document.querySelector(`.todo__list-${index}`);
      removeTodoList(todoList, index);
    }
  });
}

function removeTodoList(todoList, index) {
  todoList.insertAdjacentHTML('beforeend', `<button class="list__remove">${trashIcon}</button>`);
  todoList.lastChild.onclick = () => {
    todoList.remove();
    todos.splice(index, 1);
  };
}

export {
  updateTodoList,
};