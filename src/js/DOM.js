import editIcon from '../icons/square-edit-outline.svg';
import trashIcon from '../icons/trash.svg';
import alarmIcon from '../icons/alarm.svg';

import { differenceInDays, format, parse } from 'date-fns';

import { loadTasks } from "./task";
import todoList from './todoList';
import { displayContentProject, displayNameProject } from './projects';
import { displayNext } from './next';
import { displaySearch } from './search';
import { displayToday } from './today';

const DOM = (function () {
  function openDialog() {
    dialog.showModal();
    dialog.classList.add('dialog__visible');
  }

  function closeDialog() {
    title.value = '';
    date.value = '';
    priority.value = '';
    category.value = '';
    search.value = '';
    dialog.classList.remove("dialog__visible");

    setTimeout(() => {
      dialog.close();
    }, 500);

    document.querySelector('.layout__aside').classList.remove('layout__aside-visible');
    document.querySelector('.icon-tabler-dots-vertical').style.opacity = 1;
    document.querySelector('.icon-tabler-x').style.opacity = 0;
  }

  function updateDom(main, task, hidden = 1) {
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

    if (checkbox.disabled) {
      if (hidden) {
        todo.style.display = 'none';
      }

      todo.style.opacity = 0.5;
    }

    const span = document.createElement('span');
    span.classList.add('list__info');

    // Extracts only the date part without the time
    const date = task.getDate().split(',')[0]; // "13/mar/2025"

    if (date) {
      // Converts the date to the correct format
      const parsedDate = parse(date.trim(), 'd/MM/y', new Date());

      // Calculate the difference in days
      const daysPassed = differenceInDays(parsedDate, new Date());

      if (daysPassed < 0) { // check if the date has already passed
        span.classList.add('list__info-expired');
        span.textContent = 'Expired';
      }
    }

    todo.appendChild(span);
    todo.appendChild(checkbox);
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

  function reloadDOM(value) {
    let mainTitle = document.querySelector('.main__title').textContent.toLowerCase();

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

  function displayAddTaskDom() {
    openDialog();

    const addTaskButton = document.querySelector('.form__button');
    const buttonText = document.querySelector('.button__text');
    buttonText.textContent = 'Add Task';

    addTaskButton.removeEventListener('click', addTaskDom);
    addTaskButton.addEventListener('click', addTaskDom);
  }

  function addTaskDom() {
    let endDate;
    let category = document.querySelector('#category').value;
    let title = document.querySelector('#title').value;
    let date = document.querySelector('#date').value;
    let priority = document.querySelector('#priority').value;

    console.log(date);

    try {
      const formattedDated = new Date(date);
      endDate = format(formattedDated, 'd/MM/y, p').toLowerCase();
    } catch (error) {
      endDate = date;
    }

    todoList.createTask(category, title, endDate, priority);
    closeDialog();
    displayNameProject();
    displayToday();
  }

  function editTaskDom(value = '') {
    const taskContainer = document.querySelectorAll('.todo__list');
    taskContainer.forEach(element => {
      const editButton = document.createElement('button');
      editButton.classList.add('list__edit');
      editButton.innerHTML = editIcon;
      editButton.addEventListener('click', () => {
        const tasks = loadTasks();
        let categoryTask = element.dataset.category;
        let dateTask = element.dataset.date;

        if (tasks[categoryTask]) {
          const task = tasks[categoryTask].find(task => task.getDate() === dateTask);

          if (task) {
            openDialog();

            const category = document.querySelector('#category');
            category.value = task.getCategory();

            const title = document.querySelector('#title');
            title.value = task.getTitle();

            const date = document.querySelector('#date');
            
            // Divide the date into day, month, year and time["13", "03", "2025", "10:00 AM"]
            const [day, month, year, time, meridian] = task.getDate().replace(',', '').split(/[\s/]/);
            let [hours, minutes] = time.split(':');

            // Checks if the time is in 12-hour ("AM" or "PM") and converts it to 24-hour format
            if (meridian === 'PM' && hours !== '12') hours = String(+hours + 12);
            if (meridian === 'AM' && hours === '12') hours = '00';

            const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T${hours.padStart(2, '0')}:${minutes}`;
            date.value = formattedDate;

            const priority = document.querySelector('#priority');
            priority.value = task.getPriority();

            document.querySelector('.button__text').textContent = 'Ok';

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

              todoList.editTask(categoryTask, dateTask, category.value, title.value, endDate, priority.value);
              closeDialog();
              displayNameProject();
              reloadDOM(value);
            }, { once: true }); // Automatically removes the addEventListener after it runs;
          }
        }
      });

      // Add edit button to the top of the to-do list
      element.insertAdjacentElement('afterbegin', editButton);
    });
  }

  function removeTaskDom() {
    const taskContainer = document.querySelectorAll('.todo__list');
    taskContainer.forEach(element => {
      element.insertAdjacentHTML('beforeend', `<button class="list__remove">${trashIcon}</button>`);
      element.lastChild.onclick = () => {
        element.remove();

        let categoryTask = element.dataset.category;
        let dateTask = element.dataset.date;

        todoList.removeTask(categoryTask, dateTask);
        displayNameProject();
      };
    });
  }

  function sortTaskDom(value = '') {
    document.querySelector('.main__sort').addEventListener('click', () => {
      todoList.sortTask();
      reloadDOM(value);
    });
  }

  function completeTaskDom(value = '') {
    document.querySelectorAll('.list__checklist').forEach(checkbox => {
      checkbox.addEventListener('change', function () {
        let categoryTask = this.dataset.category;
        let dateTask = this.dataset.date;

        todoList.completeTask(categoryTask, dateTask, this.checked);
        reloadDOM(value);
      });
    });
  }

  return {
    openDialog,
    closeDialog,
    updateDom,
    reloadDOM,
    displayAddTaskDom,
    editTaskDom,
    removeTaskDom,
    sortTaskDom,
    completeTaskDom
  }
})();

export default DOM;
