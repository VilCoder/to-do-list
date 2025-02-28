import sadFaceIcon from '../icons/emoticon-sad-outline.svg';

import { search, updateTodoList, removeTodoList } from "./todoList"
import { closeDialog } from './handlerDialog';

function displaySearch(elem) {
  document.querySelector('#search').addEventListener('keydown', (e) => {
    if (e.key === "Enter") {
      const main = document.querySelector('.layout__main');
      main.textContent = '';
      
      let searchValue = elem.value.toLowerCase();
      const searchedValue = search(searchValue);

      closeDialog();

      if ( !searchValue || (searchedValue.length === 0) ) {
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
        updateTodoList(main, todo, index)

        const todoList = document.querySelector(`.todo__list-${index}`);
        removeTodoList(todoList, index);
      });
    }
  });
}

export {
  displaySearch,
}