import DOM from './DOM';
import todoList from './todoList';

export function displayNext() {
  const tasks = todoList.getTasks();

  DOM.updateDom(tasks, 'Next');
  DOM.removeTaskDom();
  DOM.editTaskDom();
  DOM.completeTaskDom();
  DOM.sortTaskDom();
  DOM.closeDialog();
}