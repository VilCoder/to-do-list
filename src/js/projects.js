import { updateTodoList, getTodoList, removeTodoList } from "./todoList";
import { closeDialog } from "./handlerDialog";

function displayProjects() {
  const userProjects = document.querySelector('.user-projects__project');
  userProjects.textContent = '';

  const todoList = getTodoList();

  for (let category in todoList) {
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
  
      // Capture and display categories
      projectTitle.textContent = todoList[category][0].getCategory();
  
      projectContain.appendChild(projectSymbol);
      projectContain.appendChild(projectTitle);
      userProjects.appendChild(projectContain);
    }
  }

  handlerClickProject();
}

function handlerClickProject() {
  const todoList = getTodoList();
  const projectsTitle = document.querySelectorAll('.project__title');

  if (projectsTitle) {
    projectsTitle.forEach(title => {
      title.onclick = () => {
        const main = document.querySelector('.layout__main');
        main.textContent = '';

        let titleValue = title.textContent;

        for (let category in todoList) {
          if (category === titleValue) {
            todoList[category].forEach((todo, index) => {
              updateTodoList(main, todo);

              const todoList = document.querySelectorAll('.todo__list');
              removeTodoList(todoList, index);

              closeDialog();
            })
          }
        }
      }
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