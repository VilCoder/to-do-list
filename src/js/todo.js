const todos = [];

class Todo {
  constructor(...args) {
    this._title = args[0];
    this._description = args[1];
    this._dueDate = args[2];
    this._priority = args[3];
    this._checklist = false;
  }

  getTitle() {
    return this._title;
  }
  setTitle(title) {
    this._title = title;
  }

  getDescription() {
    return this._description;
  }
  setDescription(description) {
    this._description = description;
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
  const todo = new Todo(...args);
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

export {
  createTodo,
  sortByPriority,
  search,
}