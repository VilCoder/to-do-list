import { getTodoList, updateTodoList, removeTodoList } from "./todoList";


function displayNext() {
  const todoList = getTodoList();

  const main = document.querySelector('.layout__main');
  main.textContent = '';

  for (let category in todoList) {
    todoList[category].forEach((todo, index) => {
      updateTodoList(main, todo);

      const todoList = document.querySelectorAll('.todo__list');
      removeTodoList(todoList, index);
    });
  }
}



export {
  displayNext,
};