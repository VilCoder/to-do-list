import sadFaceIcon from '../icons/emoticon-sad-outline.svg';

import todoList from './todoList';
import DOM from './DOM';

function handlerEnterSearch() {
  const searchButton = document.querySelector('#search');

  // Before adding a new listener, delete the previous ones
  const newSearchButton = searchButton.cloneNode(true);
  searchButton.replaceWith(newSearchButton); // Delete previous events

  newSearchButton.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const searchValue = newSearchButton.value.toLowerCase();
      displaySearch(searchValue);
    }
  });
}

function displaySearch(searchValue) {
  const searchedValue = todoList.searchTasks(searchValue);
  const title = `Search result for '${searchValue}'`;

  DOM.closeDialog();

  if (!searchValue || searchedValue.length === 0) {
    const mainContent = document.querySelector('.layout__main');
    mainContent.textContent = '';
    mainContent.insertAdjacentHTML(
      'beforeend',
      `
      <h3 class="main__title">${title}</h3>
      <div class="todo__list">
           <p class="list__notfound">Not Found <i class="icon">${sadFaceIcon}</i></p>
       </div>
      `,
    );

    return;
  }

  DOM.updateDOM(searchedValue, title, 0);
  DOM.removeTaskDOM();
  DOM.editTaskDOM(searchValue);
  DOM.completeTaskDOM(searchValue);
  DOM.sortTaskDOM(searchValue);
}

export { displaySearch, handlerEnterSearch };
