import { getTodoList, updateTodoList, removeTodoList } from "./todoList";

function displayNext() {
  const todoList = getTodoList();

  const main = document.querySelector('.layout__main');
  main.textContent = '';

  for (const category in todoList) {
    todoList[category].forEach((todo, index) => {
      updateTodoList(main, todo, index, category);

      const todoList = document.querySelector(`.${category}-${index}`);
      removeTodoList(todoList, index);
    });
  }
}



export {
  displayNext,
};