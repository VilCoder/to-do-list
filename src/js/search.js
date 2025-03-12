import sadFaceIcon from '../icons/emoticon-sad-outline.svg';

import { searchTodoList, updateTodoList, editTodoList, removeTodoList, changeCheckedTodoList } from "./todoList"
import { closeDialog } from './handlerDialog';

function displaySearch() {
  const searchButton = document.querySelector('#search');
  // Before adding a new listener, delete the previous ones
  const newSearchButton = searchButton.cloneNode(true);
  searchButton.replaceWith(newSearchButton); // Delete previous events

  newSearchButton.addEventListener('keydown', (e) => {
    if (e.key === "Enter") {
      let searchValue = newSearchButton.value.toLowerCase();
      const searchedValue = searchTodoList(searchValue);

      const main = document.querySelector('.layout__main');
      main.textContent = '';
      main.insertAdjacentHTML( // Add DOM elements to the end of main
        'beforeend',
        `
        <h3 class="main__title">Search result for '${searchValue}'</h3>
        `
      );

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

      searchedValue.forEach((task) => {
        updateTodoList(main, task)
        removeTodoList();
        editTodoList();
        changeCheckedTodoList();
      });
    }
  });
}

export {
  displaySearch,
}