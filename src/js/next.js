import { getTodoList, updateTodoList, editTodoList, removeTodoList, changeCheckedTodoList } from "./todoList";
import { closeDialog } from './handlerDialog';


function displayNext() {
  const todoList = getTodoList();

  const main = document.querySelector('.layout__main');
  main.textContent = '';

  for (let category in todoList) {
    todoList[category].forEach((todo, index) => {
      updateTodoList(main, todo);

      const todoList = document.querySelectorAll('.todo__list');
      removeTodoList(todoList, index);
      editTodoList(todoList, index);
      changeCheckedTodoList();
    });
  }

  closeDialog();
}



export {
  displayNext,
};