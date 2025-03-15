import { updateTodoList, getStoredTodoListData, removeTodoList, editTodoList, changeCheckedTodoList } from "./todoList";
import { closeDialog } from "./handlerDialog";

import sortIcon from '../icons/sort.svg';

function random(min, max) {
  let num = Math.floor(Math.random() * (max - min)) + min;
  return num
}

function randomColor() {
  return `rgb(${random(0, 255)}  ${random(0, 255)} ${random(0, 255)})`;
}

function displayContentProject(category) {
  const tasks = getStoredTodoListData();
  const main = document.querySelector('.layout__main');
  main.textContent = '';
  main.insertAdjacentHTML( // Add DOM elements to the end of main
    'beforeend',
    `
    <div class="main__sort"><i class="icon">${sortIcon}</i> <p>Sort by priority</p></div>
    <h3 class="main__title">${category}</h3>
    `
  );

  tasks[category].forEach((task) => {
    updateTodoList(main, task);
    removeTodoList();
    editTodoList(category);
    changeCheckedTodoList(category);
    closeDialog();
  });
}

function handlerClickProject() {
  const projectContain = document.querySelectorAll('.project__content');
  const projectsTitle = document.querySelectorAll('.project__title');
  const options = document.querySelectorAll('.aside__user-options > div');
  const icons = document.querySelectorAll('.icon-tabler');

  if (projectsTitle) {
    projectsTitle.forEach((title, index) => {
      title.addEventListener('click', function () {
        options.forEach(option => option.classList.remove('option__active'));
        icons.forEach(icon => icon.classList.remove('icon__active'));
        projectContain.forEach(icon => icon.classList.remove('icon__active'));

        projectContain[index].classList.add('option__active');

        let category = this.dataset.title;
        displayContentProject(category)
      });
    });
  }
}

function displayNameProject() {
  const userProjects = document.querySelector('.user-projects__project');
  userProjects.textContent = '';

  const tasks = getStoredTodoListData();

  for (let category in tasks) {
    if (category) {
      let color = randomColor();
      const projectContain = document.createElement('div');
      projectContain.classList.add('project__content');

      const projectSymbol = document.createElement('span');
      projectSymbol.classList.add('project__symbol');
      projectSymbol.textContent = '#';
      projectSymbol.style.setProperty("--symbol-color", color);

      const projectTitle = document.createElement('button');
      projectTitle.classList.add('project__title');
      projectTitle.style.setProperty("--after-bg-color", color);
      projectTitle.dataset.title = category;
      projectTitle.textContent = category;

      projectContain.appendChild(projectSymbol);
      projectContain.appendChild(projectTitle);
      userProjects.appendChild(projectContain);
    }
  }

  handlerClickProject();
}

export {
  displayContentProject,
  displayNameProject,
};