import DOM from './DOM';
import todoList from './todoList';

export function displayToday() {
  const tasks = todoList.getTodayTasks();

  DOM.updateDom(tasks, 'Today');
  DOM.removeTaskDom();
  DOM.editTaskDom();
  DOM.completeTaskDom();
  DOM.sortTaskDom();
  DOM.closeDialog();
}