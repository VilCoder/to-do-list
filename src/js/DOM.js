import editIcon from '../icons/square-edit-outline.svg';
import trashIcon from '../icons/trash.svg';
import alarmIcon from '../icons/alarm.svg';
import sortIcon from '../icons/sort.svg';

import { format, isPast, parseISO } from 'date-fns';

import { loadTasks } from './task';
import todoList from './todoList';
import project from './project';
import displayNext from './next';
import { displaySearch } from './search';
import displayToday from './today';

const DOM = (function () {
  const dialog = document.querySelector('#dialog');
  const categoryInput = document.querySelector('#category');
  const titleInput = document.querySelector('#title');
  const dateInput = document.querySelector('#date');
  const priorityInput = document.querySelector('#priority');
  const searchInput = document.querySelector('#search');

  function openDialog() {
    dialog.showModal();
    dialog.classList.add('dialog__visible');
  }

  function closeDialog() {
    titleInput.value = '';
    dateInput.value = '';
    priorityInput.value = '';
    categoryInput.value = '';
    searchInput.value = '';
    dialog.classList.remove('dialog__visible');

    setTimeout(() => {
      dialog.close();
    }, 500);

    document
      .querySelector('.layout__aside')
      .classList.remove('layout__aside-visible');
    document.querySelector('.icon-tabler-dots-vertical').style.opacity = 1;
    document.querySelector('.icon-tabler-x').style.opacity = 0;
  }

  function updateDOM(tasks, title, hidden = 1) {
    const mainContent = document.querySelector('.layout__main');
    mainContent.textContent = '';
    mainContent.insertAdjacentHTML(
      // Add DOM elements to the end of main
      'beforeend',
      `
      <div class="main__sort"><i class="icon">${sortIcon}</i> <p>Sort by priority</p></div>
      <h3 class="main__title">${title}</h3>
      <h4 class="main___subtitle">My Projects</h4>
      `,
    );

    tasks.forEach((task) => {
      const taskDiv = document.createElement('div');
      taskDiv.classList.add('todo__list');
      taskDiv.dataset.date = task.getDate();
      taskDiv.dataset.category = task.getCategory();
      taskDiv.dataset.checked = task.isChecked();

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = task.isChecked();
      checkbox.disabled = task.isChecked();
      checkbox.classList.add('list__checklist');
      checkbox.dataset.category = task.getCategory();
      checkbox.dataset.date = task.getDate();

      if (task.getPriority()) {
        const priority = task.getPriority();

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
          taskDiv.style.display = 'none';
        }

        taskDiv.style.opacity = 0.5;
      }

      const span = document.createElement('span');
      span.classList.add('list__info');

      const date = task.getDate();
      let parsedDate = '';

      if (date) {
        if (isPast(parseISO(date))) {
          span.classList.add('list__info-expired');
          span.textContent = 'Expired';
        }

        parsedDate = format(
          parseISO(task.getDate()),
          'd/MM/y, p',
        ).toLowerCase();
      }

      taskDiv.appendChild(span);
      taskDiv.appendChild(checkbox);
      taskDiv.insertAdjacentHTML(
        'beforeend',
        `
          <p class="list__title">${task.getTitle()}</p>
          <div class="list__date">
            <p>${parsedDate}</p>
            <i class="list__date-icon">${alarmIcon}</i>
            <span class="list__date-category">${task.getCategory()}</span>
          </div>
        `,
      );

      mainContent.appendChild(taskDiv);
    });
  }

  function reloadDOM(value) {
    const mainTitle = document
      .querySelector('.main__title')
      .textContent.toLowerCase();

    if (mainTitle === 'today') {
      displayToday();
    } else if (mainTitle === 'next') {
      displayNext();
    } else if (mainTitle === value) {
      project.displayContent(value);
    } else {
      displaySearch(value);
    }
  }

  function displayAddTaskDOM() {
    openDialog();

    const buttonText = document.querySelector('.create__text');
    buttonText.textContent = 'Add Task';

    const addTaskButton = document.querySelector('.form__create');
    addTaskButton.removeEventListener('click', addTaskDOM);
    addTaskButton.addEventListener('click', addTaskDOM);
  }

  function addTaskDOM() {
    todoList.createTask(
      categoryInput.value,
      titleInput.value,
      dateInput.value,
      priorityInput.value,
    );
    closeDialog();
    project.displayProject();
    displayToday();
  }

  function editTaskDOM(value = '') {
    const taskContainer = document.querySelectorAll('.todo__list');
    taskContainer.forEach((element) => {
      if (element.dataset.checked === 'true') {
        return;
      }

      const editButton = document.createElement('button');
      editButton.classList.add('list__edit');
      editButton.innerHTML = editIcon;
      editButton.addEventListener('click', () => {
        const tasks = loadTasks();
        const categoryTask = element.dataset.category;
        const dateTask = element.dataset.date;

        if (tasks[categoryTask]) {
          const taskFound = tasks[categoryTask].find(
            (task) => task.getDate() === dateTask,
          );

          if (taskFound) {
            openDialog();

            categoryInput.value = taskFound.getCategory();
            titleInput.value = taskFound.getTitle();
            dateInput.value = taskFound.getDate();
            priorityInput.value = taskFound.getPriority();

            document.querySelector('.create__text').textContent = 'Ok';

            const formButton = document.querySelector('.form__create');

            // Before adding a new listener, delete the previous ones
            const newButton = formButton.cloneNode(true);
            formButton.replaceWith(newButton); // Delete previous events
            newButton.addEventListener(
              'click',
              () => {
                todoList.editTask(
                  categoryTask,
                  dateTask,
                  categoryInput.value,
                  titleInput.value,
                  dateInput.value,
                  priorityInput.value,
                );
                closeDialog();
                project.displayProject();
                reloadDOM(value);

                // Automatically removes the addEventListener after it runs;
              },
              { once: true },
            );
          }
        }
      });

      // Add edit button to the top of the to-do list
      element.insertAdjacentElement('afterbegin', editButton);
    });
  }

  function removeTaskDOM() {
    const taskContainer = document.querySelectorAll('.todo__list');
    taskContainer.forEach((element) => {
      element.insertAdjacentHTML(
        'beforeend',
        `<button class="list__remove">${trashIcon}</button>`,
      );
      element.lastChild.onclick = () => {
        element.remove();

        const categoryTask = element.dataset.category;
        const dateTask = element.dataset.date;

        todoList.removeTask(categoryTask, dateTask);
        project.displayProject();
      };
    });
  }

  function sortTaskDOM(value = '') {
    document.querySelector('.main__sort').addEventListener('click', () => {
      todoList.sortTask();
      reloadDOM(value);
    });
  }

  function completeTaskDOM(value = '') {
    document.querySelectorAll('.list__checklist').forEach((checkbox) => {
      checkbox.addEventListener('change', function () {
        const categoryTask = this.dataset.category;
        const dateTask = this.dataset.date;

        todoList.completeTask(categoryTask, dateTask, this.checked);
        reloadDOM(value);
      });
    });
  }

  return {
    openDialog,
    closeDialog,
    updateDOM,
    reloadDOM,
    displayAddTaskDOM,
    editTaskDOM,
    removeTaskDOM,
    sortTaskDOM,
    completeTaskDOM,
  };
})();

export default DOM;
