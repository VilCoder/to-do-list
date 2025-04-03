import DOM from './DOM';
import { loadTasks } from './task';
import todoList from './todoList';

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min)) + min;
  return num;
}

function randomColor() {
  return `rgb(${random(0, 255)}  ${random(0, 255)} ${random(0, 255)})`;
}

const project = (function () {
  function displayContent(category) {
    const categoryTasks = todoList.getCategoryTasks(category);

    DOM.updateDOM(categoryTasks, category, 0);
    DOM.removeTaskDOM();
    DOM.editTaskDOM(category);
    DOM.completeTaskDOM(category);
    DOM.sortTaskDOM(category);
    DOM.closeDialog();
  }

  function displayProject() {
    const userProjects = document.querySelector('.user-projects__project');
    userProjects.textContent = '';

    const tasks = loadTasks();
    Object.keys(tasks).forEach((category) => {
      if (category) {
        const color = randomColor();
        const projectContain = document.createElement('li');
        projectContain.classList.add('project__content');

        const projectSymbol = document.createElement('span');
        projectSymbol.classList.add('project__symbol');
        projectSymbol.textContent = '#';
        projectSymbol.style.setProperty('--symbol-color', color);

        const projectTitle = document.createElement('button');
        projectTitle.classList.add('project__title');
        projectTitle.style.setProperty('--after-bg-color', color);
        projectTitle.dataset.title = category;
        projectTitle.textContent = category;

        projectTitle.addEventListener('click', () => {
          document
            .querySelectorAll('.aside__user-options > li')
            .forEach((option) => option.classList.remove('option__active'));

          document
            .querySelectorAll('.icon-tabler')
            .forEach((icon) => icon.classList.remove('icon__active'));

          document
            .querySelectorAll('.project__content')
            .forEach((projectElement) =>
              projectElement.classList.remove('option__active'),
            );

          projectContain.classList.add('option__active');

          displayContent(category);
        });

        projectContain.appendChild(projectSymbol);
        projectContain.appendChild(projectTitle);
        userProjects.appendChild(projectContain);
      }
    });
  }

  return {
    displayContent,
    displayProject,
  };
})();

export default project;
