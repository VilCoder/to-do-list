class Task {
  constructor(...args) {
    const [category, title, dueDate, priority] = args;
    this.category = category;
    this.title = title;
    this.dueDate = dueDate;
    this.priority = priority;
    this.checked = false;
  }

  static fromJSON(obj) {
    const task = new Task(obj.category, obj.title, obj.dueDate, obj.priority);
    task.checked = obj.checked;
    return task;
  }

  getCategory() {
    return this.category;
  }
  setCategory(value) {
    this.category = value;
    return this;
  }

  getTitle() {
    return this.title;
  }
  setTitle(value) {
    this.title = value;
    return this;
  }

  getDate() {
    return this.dueDate;
  }
  setDate(value) {
    this.dueDate = value;
    return this;
  }

  getPriority() {
    return this.priority;
  }
  setPriority(value) {
    this.priority = value;
    return this;
  }

  isChecked() {
    return this.checked;
  }
  setChecked(value) {
    this.checked = value;
    return this;
  }
}

function loadTasks() {
  const storedTasksData = localStorage.getItem('todoList');

  if (!storedTasksData) {
    console.log('Todo list data not found in local storage');
    return {};
  }

  const tasksData = JSON.parse(storedTasksData);

  // Converts each object into an instance of Task
  Object.keys(tasksData).forEach((category) => {
    tasksData[category] = tasksData[category].map(Task.fromJSON);
  });

  return tasksData;
}

function saveTasks(obj) {
  const tasks = Object.groupBy(obj, ({ category }) => category);

  if (Object.keys(tasks).length > 0) {
    localStorage.setItem('todoList', JSON.stringify(tasks));
  } else {
    // Completely removes storage if there are no tasks
    localStorage.removeItem('todoList');
  }
}

export { Task, saveTasks, loadTasks };
