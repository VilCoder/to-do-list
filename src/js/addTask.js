import { format } from 'date-fns';

import { createTask } from './todoList';
import { openDialog, closeDialog } from './handlerDialog';
import { displayToday } from './today';
import { displayNameProject } from "./projects";

function displayAddTask() {
  openDialog();

  const addTaskButton = document.querySelector('.form__button');
  const buttonText = document.querySelector('.button__text');
  buttonText.textContent = 'Add Task';

  addTaskButton.removeEventListener('click', addTaskHandler);
  addTaskButton.addEventListener('click', addTaskHandler);
}

function addTaskHandler() {
  const category = document.querySelector('#category').value;
  const title = document.querySelector('#title').value;
  const date = document.querySelector('#date').value;
  const priority = document.querySelector('#priority').value;
  let endDate;

  try {
    const formattedDated = new Date(date);
    endDate = format(formattedDated, 'd/MM/y, p').toLowerCase();
  } catch (error) {
    endDate = date;
  }

  createTask(category, title, endDate, priority);
  closeDialog();
  displayNameProject();
  displayToday();
}

export {
  displayAddTask,
};