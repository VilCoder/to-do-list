import { format } from 'date-fns';
import { displayProjects } from "./projects";

import trashIcon from '../icons/trash.svg';
import alarmIcon from '../icons/alarm.svg';
import sync from '../icons/sync.svg';

const arrayTodoList = [];
let groupTodoList;

class TodoList {
  constructor(...args) {
    let [category, title, dueDate, priority] = args;
    this.category = category;
    this.title = title;
    this.dueDate = dueDate;
    this.priority = priority;
    this.checklist = false;
  }

  getCategory() {
    return this.category;
  }
  setCategory(category) {
    this.category = category;
  }

  getTitle() {
    return this.title;
  }
  setTitle(title) {
    this.title = title;
  }

  getDate() {
    return this.dueDate;
  }
  setDate(date) {
    this.dueDate = date;
  }

  getPriority() {
    return this.priority;
  }
  setPriority(priority) {
    this.priority = priority;
  }

  getChecklist() {
    return this.checklist;
  }
  setChecklist(checklist) {
    this.checklist = checklist;
  }
}

function createTodo(...args) {
  const todoList = new TodoList(...args);
  arrayTodoList.push(todoList);
}

function sortByPriority() {
  return [...arrayTodoList].sort((a, b) => {
    let highestPriority = parseInt(a.getPriority().slice(1));
    let lowerPriority = parseInt(b.getPriority().slice(1));

    return highestPriority - lowerPriority;
  });
}

function search(value) {
  const searchedValue = [];

  for (let category in groupTodoList) {
    groupTodoList[category].forEach(todoList => {
      if (todoList.getTitle().toLowerCase().includes(value)) {
        searchedValue.push(todoList);
      }
    });
  }

  return searchedValue;
}

function getTodoList() {
  // Group by 'category'
  groupTodoList = Object.groupBy(arrayTodoList, ({ category }) => category);
  return groupTodoList;
}

function updateTodoList(main, todoList) {
  let date = '';

  if (todoList.getDate()) {
    date = format(todoList.getDate(), 'd/MMM/y, p').toLowerCase();
  }

  const todo = document.createElement('div');
  todo.classList.add('todo__list');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.classList.add('list__checklist');

  if (todoList.getPriority()) {;
    let priority = todoList.getPriority();

    switch (priority) {
      case 'p1':
        checkbox.classList.add('checklist__p-1');
        break;
  
      case 'p2':
        checkbox.classList.add('checklist__p-2');
        break;
  
      case 'p3':
        checkbox.classList.add('checklist__p-3');
        break;
    }
  }

  todo.appendChild(checkbox);
  todo.insertAdjacentHTML(
    'beforeend',
    `
      <p class="list__title">${todoList.getTitle()}</p>
      <div class="list__date">
        <i class="list__date-icon">${sync}</i>
        <p>${date}</p>
        <i class="list__date-icon">${alarmIcon}</i>
      </div>
   `
  );

  main.appendChild(todo);
}

function removeTodoList(todoList, index) {
  todoList.forEach(todo => {
    todo.insertAdjacentHTML('afterbegin', `<button class="list__remove">${trashIcon}</button>`);
    todo.firstChild.onclick = () => {
      todo.remove();

      arrayTodoList.splice(index, 1);
      displayProjects();
    };
  });
}

export {
  createTodo,
  sortByPriority,
  search,
  getTodoList,
  updateTodoList,
  removeTodoList,
}
