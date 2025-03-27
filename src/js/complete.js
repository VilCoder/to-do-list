import DOM from './DOM';
import todoList from './todoList';

export default function displayComplete() {
  const tasks = todoList.getCompleteTasks();

  DOM.updateDOM(tasks, 'Complete', 0);
  DOM.removeTaskDOM();
  DOM.closeDialog();
}