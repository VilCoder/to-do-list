import { Task, saveTasks, loadTasks } from './task';

const todoList = (function () {
  function createTask(...args) {
    const task = new Task(...args);
    const storedTasks = loadTasks();
    const category = task.getCategory();
  
    if (!storedTasks[category]) {
      storedTasks[category] = [];
    }
  
    storedTasks[category].push(task);
    saveTasks(Object.values(storedTasks).flat()); // Flattens nested arrays
  }

  function editTask(...args) {
    let [categoryTask, dateTask, category, title, date, priority] = args;
    const tasks = loadTasks();
  
    if (tasks[categoryTask]) {
      const task = tasks[categoryTask].find(task => task.getDate() === dateTask);
  
      if (task) { 
        task.setCategory(category);
        task.setTitle(title);
        task.setDate(date);
        task.setPriority(priority);
  
        saveTasks(Object.values(tasks).flat()); // Flattens nested arrays
      }
    }
  }

  function removeTask(categoryTask, dateTask) {
    const tasks = loadTasks();
  
    if (tasks[categoryTask]) {
      tasks[categoryTask] = tasks[categoryTask].filter(task => task.getDate() !== dateTask);
  
      if (tasks[categoryTask].length === 0) {
        delete tasks[categoryTask];
      }
  
      saveTasks(Object.values(tasks).flat()); // Flattens nested arrays
    }
  }

  function sortTask() {
    const tasks = loadTasks();
  
    // Gets all tasks from each category in a single array
    const allTasks = Object.values(tasks).flat();
  
    // Sort by priority (p1 > p2 > p3)
    const orderedTasks = allTasks.sort((a, b) => {
      const priorityA = parseInt(a.getPriority().slice(1)); // Extract only the number from "p1", "p2", "p3"
      const priorityB = parseInt(b.getPriority().slice(1));
  
      return priorityA - priorityB; // Ascending order
    });
  
    saveTasks(Object.values(orderedTasks).flat()); // Flattens nested arrays
  }

  function searchTasks(value) {
    const searchedValue = [];
    const tasks = loadTasks();
  
    for (let category in tasks) {
      tasks[category].forEach(task => {
        if (task.getTitle().toLowerCase().includes(value)) {
          searchedValue.push(task);
        }
      });
    }
  
    return searchedValue;
  }

  function completeTask(categoryTask, dateTask, checked) {
    const tasks = loadTasks();
  
    if (tasks[categoryTask]) {
      const task = tasks[categoryTask].find(task => task.getDate() === dateTask);
  
      if (task) {
        task.setChecklist(checked);
  
        saveTasks(Object.values(tasks).flat()); // Flattens nested arrays
      }
    }
  }

  return { 
    createTask, 
    editTask, 
    removeTask, 
    sortTask, 
    searchTasks, 
    completeTask 
  }
})();

export default todoList;