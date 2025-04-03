import DOM from './DOM';
import todoList from './todoList';

export default function displayNext() {
  const tasks = todoList.getTasks();

  DOM.updateDOM(tasks, 'Next');
  DOM.removeTaskDOM();
  DOM.editTaskDOM();
  DOM.completeTaskDOM();
  DOM.sortTaskDOM();
  DOM.closeDialog();
}
