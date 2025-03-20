import { format } from 'date-fns';

import { displayNameProject } from "./projects";
import { openDialog, closeDialog } from './handlerDialog';
import { reloadScreen } from "./handlerScreen";

import trashIcon from '../icons/trash.svg';
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

function sortByPriorityTodoList(value = '') {
  document.querySelector('.main__sort').addEventListener('click', () => {
    const tasks = getStoredTodoListData();

    // Gets all tasks from each category in a single array
    const allTasks = Object.values(tasks).flat();

    // Sort by priority (p1 > p2 > p3)
    const orderedTasks = allTasks.sort((a, b) => {
      const priorityA = parseInt(a.getPriority().slice(1)); // Extract only the number from "p1", "p2", "p3"
      const priorityB = parseInt(b.getPriority().slice(1));

      return priorityA - priorityB; // Ascending order
    });

    setStoredTodoListData(Object.values(orderedTasks).flat()); // Flattens nested arrays
    reloadScreen(value);
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

function editTodoList(value = '') {
  const todoList = document.querySelectorAll('.todo__list');

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

          const buttonText = document.querySelector('.button__text');
          buttonText.textContent = 'Ok';

          const formButton = document.querySelector('.form__button');

          // Before adding a new listener, delete the previous ones
          const newButton = formButton.cloneNode(true);
          formButton.replaceWith(newButton); // Delete previous events

          newButton.addEventListener('click', () => {
            let endDate = date.value;

            if (endDate) {
              const formattedDated = new Date(endDate);
              endDate = format(formattedDated, 'd/MM/y, p').toLowerCase();
            }

            todoList.setCategory(category.value);
            todoList.setTitle(title.value);
            todoList.setDate(endDate);
            todoList.setPriority(priority.value);

            setStoredTodoListData(Object.values(tasks).flat()); // Flattens nested arrays
            closeDialog();
            displayNameProject();
            reloadScreen(value);
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

function changeCheckedTodoList(value = '') {
  document.querySelectorAll('.list__checklist').forEach(checkbox => {
    checkbox.addEventListener('change', function () {
      const category = this.dataset.category;
      const checkboxDate = this.dataset.date;
      const tasks = getStoredTodoListData();

      if (tasks[category]) {
        const todoList = tasks[category].find(task => task.getDate() === checkboxDate);

        if (todoList) {
          todoList.setChecklist(this.checked);

          setStoredTodoListData(Object.values(tasks).flat()); // Flattens nested arrays
          reloadScreen(value);
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
  } else {
    localStorage.removeItem('todoList'); // Completely removes storage if there are no tasks
  }
}

export {
  createTask,
  sortByPriorityTodoList,
  searchTodoList,
  getStoredTodoListData,
  editTodoList,
  removeTodoList,
  changeCheckedTodoList,
}
