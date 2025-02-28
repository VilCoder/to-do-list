import { format } from 'date-fns';

import trashIcon from '../icons/trash.svg';
import alarmIcon from '../icons/alarm.svg';
import sync from '../icons/sync.svg';

const arrayTodoList = [];

class TodoList {
  constructor(...args) {
    let [title, dueDate, priority] = args;
    this._title = title;
    this._dueDate = dueDate;
    this._priority = priority;
    this._checklist = false;
  }

  getTitle() {
    return this._title;
  }
  setTitle(title) {
    this._title = title;
  }

  getDate() {
    return this._dueDate;
  }
  setDate(date) {
    this._dueDate = date;
  }

  getPriority() {
    return this._priority;
  }
  setPriority(priority) {
    this._priority = priority;
  }

  getChecklist() {
    return this._checklist;
  }
  setChecklist(checklist) {
    this._checklist = checklist;
  }
}

function createTodo(...args) {
  const todoList = new TodoList(...args);
  arrayTodoList.push(todoList);
}

function sortByPriority() {
  return [...arrayTodoList].sort((a, b) => {
    const highestPriority = parseInt(a.getPriority().slice(1));
    const lowerPriority = parseInt(b.getPriority().slice(1));

    return highestPriority - lowerPriority;
  });
}

function search(value) {
  return arrayTodoList.filter(todoList => {
    if (todoList.getTitle().toLowerCase().includes(value)) {
      return todoList;
    }
  });
}

function getTodoList() {
  return arrayTodoList;
}

function updateTodoList(...args) {
  const [main, todoList, index] = args;

  main.insertAdjacentHTML(
    'beforeend',
    `
    <div class="todo__list todo__list-${index}">
      <input type="checkbox" class="list__checklist">
      <p class="list__title">${todoList.getTitle()}</p>
      <div class="list__date">
        <i class="list__date-icon">${sync}</i>
        <p>${format(todoList.getDate(), 'd/MMM/y, p').toLowerCase()}</p>
        <i class="list__date-icon">${alarmIcon}</i>
      </div>
    </div>
   `
  );
}

function removeTodoList(todoList, index) {
  const todos = getTodoList();
  todoList.insertAdjacentHTML('beforeend', `<button class="list__remove">${trashIcon}</button>`);
  todoList.lastChild.onclick = () => {
    todoList.remove();
    todos.splice(index, 1);
  };
}

export {
  createTodo,
  sortByPriority,
  search,
  getTodoList,
  updateTodoList,
  removeTodoList,
}