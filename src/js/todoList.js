import { format } from 'date-fns';

import { displayContentProject, displayNameProject } from "./projects";
import { openDialog, closeDialog } from './handlerDialog';
import { displayToday } from './today';
import { displayNext } from './next';
import { displaySearch } from './search';

import trashIcon from '../icons/trash.svg';
import alarmIcon from '../icons/alarm.svg';
import editIcon from '../icons/square-edit-outline.svg';

class Task {
  constructor(...args) {
    let [category, title, dueDate, priority] = args;
    this.category = category;
    this.title = title;
    this.dueDate = dueDate;
    this.priority = priority;
    this.checklist = false;
  }

  static fromJSON(obj) {
    const task = new Task(obj.category, obj.title, obj.dueDate, obj.priority);
    task.checklist = obj.checklist;
    return task;
  }

  getCategory() {
    return this.category;
  }
  setCategory(value) {
    this.category = value;
  }

  getTitle() {
    return this.title;
  }
  setTitle(value) {
    this.title = value;
  }

  getDate() {
    return this.dueDate;
  }
  setDate(value) {
    this.dueDate = value;
  }

  getPriority() {
    return this.priority;
  }
  setPriority(value) {
    this.priority = value;
  }

  getChecklist() {
    return this.checklist;
  }
  setChecklist(value) {
    this.checklist = value;
  }
}

function createTask(...args) {
  const task = new Task(...args);
  const storedTasks = getStoredTodoListData();
  const category = task.getCategory();

  if (!storedTasks[category]) {
    storedTasks[category] = [];
  }

  storedTasks[category].push(task);
  setStoredTodoListData(Object.values(storedTasks).flat()); // Flattens nested arrays
}

function sortByPriority() {
  return [...arrayTodoList].sort((a, b) => {
    let highestPriority = parseInt(a.getPriority().slice(1));
    let lowerPriority = parseInt(b.getPriority().slice(1));

    return highestPriority - lowerPriority;
  });
}

function searchTodoList(value) {
  const searchedValue = [];
  const tasks = getStoredTodoListData();

  for (let category in tasks) {
    tasks[category].forEach(task => {
      if (task.getTitle().toLowerCase().includes(value)) {
        searchedValue.push(task);
      }
    });
  }

  return searchedValue;
}

function updateTodoList(main, task, hidden=1) {
  const todo = document.createElement('div');
  todo.classList.add('todo__list');
  todo.dataset.date = task.getDate();
  todo.dataset.category = task.getCategory();

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = task.getChecklist();
  checkbox.disabled = task.getChecklist();
  checkbox.classList.add('list__checklist');
  checkbox.dataset.category = task.getCategory();
  checkbox.dataset.date = task.getDate();

  if (task.getPriority()) {
    let priority = task.getPriority();

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

  if (checkbox.checked) {
    if(hidden) {
      todo.style.display = 'none';
    }

    todo.style.opacity = 0.5;
  }

  todo.appendChild(checkbox);
  // Add DOM elements to the end of the to-do list
  todo.insertAdjacentHTML(
    'beforeend',
    `
      <p class="list__title">${task.getTitle()}</p>
      <div class="list__date">
        <p>${task.getDate()}</p>
        <i class="list__date-icon">${alarmIcon}</i>
      </div>
   `
  );

  main.appendChild(todo);
}

function editTodoList(value = '') {
  const todoList = document.querySelectorAll('.todo__list');
  let mainTitle = document.querySelector('.main__title').textContent.toLowerCase();

  todoList.forEach(todo => {
    const existingButton = todo.querySelector('.list__edit');
    if (existingButton) {
      existingButton.remove();
    }

    const editButton = document.createElement('button');
    editButton.classList.add('list__edit');
    editButton.innerHTML = editIcon;
    editButton.onclick = () => {
      const tasks = getStoredTodoListData();
      let categoryTask = todo.dataset.category;
      let dateTask = todo.dataset.date;

      if (tasks[categoryTask]) {
        const todoList = tasks[categoryTask].find(task => task.getDate() === dateTask);

        if (todoList) {
          openDialog();

          const category = document.querySelector('#category');
          category.value = todoList.getCategory();

          const title = document.querySelector('#title');
          title.value = todoList.getTitle();

          const date = document.querySelector('#date');

          const priority = document.querySelector('#priority');
          priority.value = todoList.getPriority();

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

            todoList.setCategory(category.value);
            todoList.setTitle(title.value);
            todoList.setDate(endDate);
            todoList.setPriority(priority.value);

            setStoredTodoListData(Object.values(tasks).flat()); // Flattens nested arrays
            closeDialog();

            if (mainTitle === 'today') {
              displayToday();
            } else if (mainTitle === 'next') {
              displayNext();
            } else if (mainTitle === value) {
              displayContentProject(value);
            } else {
              displaySearch(value);
            }
          }, { once: true }); // Automatically removes the addEventListener after it runs
        }
      }
    };

    // Add edit button to the top of the to-do list
    todo.insertAdjacentElement('afterbegin', editButton);
  });
}


function removeTodoList() {
  const todoList = document.querySelectorAll('.todo__list');
  todoList.forEach(todo => {
    todo.insertAdjacentHTML('beforeend', `<button class="list__remove">${trashIcon}</button>`);
    todo.lastChild.onclick = () => {
      todo.remove();

      const tasks = getStoredTodoListData();
      let category = todo.dataset.category;
      let date = todo.dataset.date;

      if (tasks[category]) {
        tasks[category] = tasks[category].filter(task => task.getDate() !== date);

        if (tasks[category].length === 0) {
          delete tasks[category];
        }

        setStoredTodoListData(Object.values(tasks).flat()); // Flattens nested arrays
      }

      displayNameProject();
    };
  });
}

function changeCheckedTodoList() {
  document.querySelectorAll('.list__checklist').forEach(checkbox => {
    checkbox.addEventListener('change', function () {
      const category = this.dataset.category;
      const checkboxDate = this.dataset.date;
      const tasks = getStoredTodoListData();
      let mainTitle = document.querySelector('.main__title').textContent.toLowerCase();

      if (tasks[category]) {
        const todoList = tasks[category].find(task => task.getDate() === checkboxDate);

        if (todoList) {
          todoList.setChecklist(this.checked);

          setStoredTodoListData(Object.values(tasks).flat()); // Flattens nested arrays

          if (mainTitle === 'today') {
            displayToday();
          } else if (mainTitle === 'next') {
            displayNext();
          } else if (mainTitle === value) {
            displayContentProject(value);
          } else {
            displaySearch(value);
          }
        }
      }
    });
  });
}

function getStoredTodoListData() {
  const storedTasksData = localStorage.getItem('todoList');

  if (!storedTasksData) {
    console.log('Todo list data not found in local storage');
    return {};
  }

  const tasksData = JSON.parse(storedTasksData);

  // Converts each object into an instance of Task
  for (let category in tasksData) {
    tasksData[category] = tasksData[category].map(Task.fromJSON);
  }

  return tasksData;
}

function setStoredTodoListData(obj) {
  const tasks = Object.groupBy(obj, ({ category }) => category);

  if (Object.keys(tasks).length > 0) {
    localStorage.setItem('todoList', JSON.stringify(tasks));
  }
}

export {
  createTask,
  sortByPriority,
  searchTodoList,
  getStoredTodoListData,
  updateTodoList,
  editTodoList,
  removeTodoList,
  changeCheckedTodoList,
}
