import sadFaceIcon from '../icons/emoticon-sad-outline.svg';

import { search, updateTodoList, editTodoList, removeTodoList, changeCheckedTodoList } from "./todoList"
import { closeDialog } from './handlerDialog';

function displaySearch(elem) {
  document.querySelector('#search').addEventListener('keydown', (e) => {
    if (e.key === "Enter") {
      const main = document.querySelector('.layout__main');
      main.textContent = '';

      let searchValue = elem.value.toLowerCase();
      const searchedValue = search(searchValue);

      closeDialog();

      if (!searchValue || (searchedValue.length === 0)) {
        main.insertAdjacentHTML(
          'beforeend',
          `<div class="todo__list">
               <p class="list__notfound">Not Found <i class="icon">${sadFaceIcon}</i></p>
           </div>
          `
        );

        return;
      }

      searchedValue.forEach((todo, index) => {
        updateTodoList(main, todo)

        const todoList = document.querySelectorAll('.todo__list');
        removeTodoList(todoList, index);
        editTodoList(todoList, index)
        changeCheckedTodoList();
      });
    }
  });
}

export {
  displaySearch,
}