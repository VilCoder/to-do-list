import { updateTodoList, getStoredTodoListData, removeTodoList, editTodoList, changeCheckedTodoList } from "./todoList";
import { closeDialog } from "./handlerDialog";

function displayProjects() {
  const userProjects = document.querySelector('.user-projects__project');
  userProjects.textContent = '';

  const tasks = getStoredTodoListData();

  for (let category in tasks) {
    if (category) {
      let color = randomColor();
      const projectContain = document.createElement('div');

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

  handlerClickProject(tasks);
}

function handlerClickProject(tasks) {
  const projectsTitle = document.querySelectorAll('.project__title');

  if (projectsTitle) {
    projectsTitle.forEach(title => {
      title.addEventListener('click', function () {
        let category = this.dataset.title;

        const main = document.querySelector('.layout__main');
        main.textContent = '';
        main.insertAdjacentHTML( // Add DOM elements to the end of main
          'beforeend',
          `
          <h3 class="main__title">${category}</h3>
          `
        );

        tasks[category].forEach((task) => {
          updateTodoList(main, task);
          removeTodoList();
          editTodoList();
          changeCheckedTodoList();
          closeDialog();
        });
      });
    });
  }
}

function random(min, max) {
  let num = Math.floor(Math.random() * (max - min)) + min;
  return num
}

function randomColor() {
  return `rgb(${random(0, 255)}  ${random(0, 255)} ${random(0, 255)})`;
}

export {
  displayProjects,
};