import DOM from './DOM';
import todoList from './todoList';

export function displayComplete() {
  const tasks = todoList.getCompleteTasks();

  DOM.updateDom(tasks, 'Complete', 0);
  DOM.removeTaskDom();
  DOM.closeDialog();
}