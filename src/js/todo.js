const todos = [];

class TodoList {
  constructor(...args) {
    this._title = args[0];
    this._dueDate = args[1];
    this._priority = args[2];
    this._checklist = false;
  }

  getTitle() {
    return this._title;
  }
  setTitle(title) {
    this._title = title;
  }

  getDate() {
    return this._dueDate;
  }
  setDate(date) {
    this._dueDate = date;
  }

  getPriority() {
    return this._priority;
  }
  setPriority(priority) {
    this._priority = priority;
  }

  getChecklist() {
    return this._checklist;
  }
  setChecklist(checklist) {
    this._checklist = checklist;
  }
}

function createTodo(...args) {
  const todo = new TodoList(...args);
  todos.push(todo);
}

function sortByPriority() {
  return [...todos].sort((a, b) => {
    const highestPriority = parseInt(a.getPriority().slice(1));
    const lowerPriority = parseInt(b.getPriority().slice(1));

    return highestPriority - lowerPriority;
  });
}

function search(value) {
  return todos.filter(todo => {
    if (todo.getTitle().includes(value)) {
      return todo.getTitle();
    }
  });
}

function getTodoList() {
  return todos;
}

export {
  createTodo,
  sortByPriority,
  search,
  getTodoList,
}