import { format } from 'date-fns';
import { createTodo } from '../js/todo';
import { updateTodoList } from './display-todolist';

function addTask() {
  DialogHandler.open();

  const addTaskButton = document.querySelector('.form__button');
  addTaskButton.removeEventListener('click', addTaskHandler);
  addTaskButton.addEventListener('click', addTaskHandler);
}

function addTaskHandler() {
  const title = document.querySelector('#title');
  const date = document.querySelector('#date');
  const priority = document.querySelector('#priority');
  let endDate;

  try {
    const formattedDated = new Date(date.value); 
    endDate = format(formattedDated, 'y-M-d p');
  } catch (error) {
    console.log(error.message);
    endDate = date.value;
  }

  createTodo(title.value, endDate, priority.value);

  title.value = '';
  date.value = '';
  priority.value = '';

  DialogHandler.close();
  updateTodoList();
}

const DialogHandler = (function () {
  const dialog = document.querySelector('.layout__dialog');

  const open = () => {
    dialog.showModal();
    dialog.classList.add('dialog__visible');
  };

  const close = () => {
    dialog.classList.remove("dialog__visible");

    setTimeout(() => {
      dialog.close();
    }, 500);
  };

  return {open, close};
})();


export {
  addTask,
};