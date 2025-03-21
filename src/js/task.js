class Task {
  constructor(...args) {
    let [category, title, dueDate, priority] = args;
    this.category = category;
    this.title = title;
    this.dueDate = dueDate;
    this.priority = priority;
    this.checklist = false;
  }

  static fromJSON(obj) {
    const task = new Task(obj.category, obj.title, obj.dueDate, obj.priority);
    task.checklist = obj.checklist;
    return task;
  }

  getCategory() {
    return this.category;
  }
  setCategory(value) {
    this.category = value;
  }

  getTitle() {
    return this.title;
  }
  setTitle(value) {
    this.title = value;
  }

  getDate() {
    return this.dueDate;
  }
  setDate(value) {
    this.dueDate = value;
  }

  getPriority() {
    return this.priority;
  }
  setPriority(value) {
    this.priority = value;
  }

  getChecklist() {
    return this.checklist;
  }
  setChecklist(value) {
    this.checklist = value;
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
  for (let category in tasksData) {
    tasksData[category] = tasksData[category].map(Task.fromJSON);
  }

  return tasksData;
}

function saveTasks(obj) {
  const tasks = Object.groupBy(obj, ({ category }) => category);

  if (Object.keys(tasks).length > 0) {
    localStorage.setItem('todoList', JSON.stringify(tasks));
  } else {
    localStorage.removeItem('todoList'); // Completely removes storage if there are no tasks
  }
}

export {
  Task,
  saveTasks,
  loadTasks,
}