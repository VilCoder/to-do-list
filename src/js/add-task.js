import { format } from 'date-fns';

import { createTodo } from '../js/todo';
import { openDialog, closeDialog } from './handlerDialog';
import { updateTodoList } from './display-todolist';

function addTask() {
  openDialog();

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

  closeDialog();
  updateTodoList();
}

export {
  addTask,
};