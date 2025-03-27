import DOM from './DOM';
import todoList from './todoList';

export default function displayToday() {
  const tasks = todoList.getTodayTasks();

  DOM.updateDOM(tasks, 'Today');
  DOM.removeTaskDOM();
  DOM.editTaskDOM();
  DOM.completeTaskDOM();
  DOM.sortTaskDOM();
  DOM.closeDialog();
}