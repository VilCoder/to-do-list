import { format } from 'date-fns';

import { displayProjects } from "./projects";
import { openDialog, closeDialog } from './handlerDialog';
import { displayToday } from './today';
import { displayNext } from './next';
import { displaySearch } from './search';

import trashIcon from '../icons/trash.svg';
import alarmIcon from '../icons/alarm.svg';
import editIcon from '../icons/square-edit-outline.svg';

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
  const todo = document.createElement('div');
  todo.classList.add('todo__list');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = todoList.getChecklist();
  checkbox.classList.add('list__checklist');

  if (todoList.getPriority()) {
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
  // Add DOM elements to the end of the to-do list
  todo.insertAdjacentHTML(
    'beforeend',
    `
      <p class="list__title">${todoList.getTitle()}</p>
      <div class="list__date">
        <p>${todoList.getDate()}</p>
        <i class="list__date-icon">${alarmIcon}</i>
      </div>
   `
  );

  main.appendChild(todo);
}

function editTodoList(todoList, index) {
  todoList.forEach(todo => {
    const existingButton = todo.querySelector('.list__edit');
    if (existingButton) {
      existingButton.remove();
    }

    const editButton = document.createElement('button');
    editButton.classList.add('list__edit');
    editButton.innerHTML = editIcon;

    editButton.onclick = () => {
      const editTodoList = arrayTodoList[index];

      openDialog();

      const category = document.querySelector('#category');
      category.value = editTodoList.getCategory();

      const title = document.querySelector('#title');
      title.value = editTodoList.getTitle();

      const date = document.querySelector('#date');

      const priority = document.querySelector('#priority');
      priority.value = editTodoList.getPriority();

      const formButton = document.querySelector('.form__button');
      // Before adding a new listener, delete the previous ones
      const newButton = formButton.cloneNode(true);
      newButton.textContent = 'Ok';
      formButton.replaceWith(newButton); // Delete previous events

      newButton.addEventListener('click', () => {
        let endDate = date.value;

        if (endDate) {
          const formattedDated = new Date(endDate);
          endDate = format(formattedDated, 'd/MMM/y, p').toLowerCase();
        }

        editTodoList.setCategory(category.value);
        editTodoList.setTitle(title.value);
        editTodoList.setDate(endDate);
        editTodoList.setPriority(priority.value);

        title.value = '';
        date.value = '';
        priority.value = '';
        category.value = '';

        closeDialog();
        displayToday();
        displayNext();
        displaySearch();
      });
    };

    // Add edit button to the top of the to-do list
    todo.insertAdjacentElement('afterbegin', editButton);
  });
}


function removeTodoList(todoList, index) {
  todoList.forEach(todo => {
    todo.insertAdjacentHTML('beforeend', `<button class="list__remove">${trashIcon}</button>`);
    todo.lastChild.onclick = () => {
      todo.remove();

      arrayTodoList.splice(index, 1);
      displayProjects();
    };
  });
}

function changeCheckedTodoList() {
  document.querySelectorAll('.list__checklist').forEach((checkbox, index) => {
    checkbox.addEventListener('change', function () {
      const todoList = arrayTodoList[index];
      todoList.setChecklist(this.checked);
    });
  });
}

export {
  createTodo,
  sortByPriority,
  search,
  getTodoList,
  updateTodoList,
  editTodoList,
  removeTodoList,
  changeCheckedTodoList,
}
