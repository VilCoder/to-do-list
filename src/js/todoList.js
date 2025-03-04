import { format } from 'date-fns';

import trashIcon from '../icons/trash.svg';
import alarmIcon from '../icons/alarm.svg';
import sync from '../icons/sync.svg';

const arrayTodoList = [];
let groupTodoList;

class TodoList {
  constructor(...args) {
    let [category, title, dueDate, priority] = args;
    this.category = category;
    this.title = title;
    this.dueDate = dueDate;
    this.priority = priority;
    this.checklist = false;
  }

  getCategory() {
    return this.category;
  }
  setCategory(category) {
    this.category = category;
  }

  getTitle() {
    return this.title;
  }
  setTitle(title) {
    this.title = title;
  }

  getDate() {
    return this.dueDate;
  }
  setDate(date) {
    this.dueDate = date;
  }

  getPriority() {
    return this.priority;
  }
  setPriority(priority) {
    this.priority = priority;
  }

  getChecklist() {
    return this.checklist;
  }
  setChecklist(checklist) {
    this.checklist = checklist;
  }
}

function createTodo(...args) {
  const todoList = new TodoList(...args);
  arrayTodoList.push(todoList);

  // Group by 'category'
  groupTodoList = Object.groupBy(arrayTodoList, ({ category }) => category);
}

function sortByPriority() {
  return [...arrayTodoList].sort((a, b) => {
    const highestPriority = parseInt(a.getPriority().slice(1));
    const lowerPriority = parseInt(b.getPriority().slice(1));

    return highestPriority - lowerPriority;
  });
}

function search(value) {
  const searchedValue = [];

  for (const category in groupTodoList) {
    groupTodoList[category].forEach(todoList => {
      if (todoList.getTitle().toLowerCase().includes(value)) {
        searchedValue.push(todoList);
      }
    })

    return searchedValue;
  }
}

function getTodoList() {
  console.log( groupTodoList );
  return groupTodoList;
}

function updateTodoList(...args) {
  const [main, todoList, index, category] = args;
  let date = '';

  if (todoList.getDate()) {
    date = format(todoList.getDate(), 'd/MMM/y, p').toLowerCase();
  }

  main.insertAdjacentHTML(
    'beforeend',
    `
    <div class="todo__list ${category}-${index}">
      <input type="checkbox" class="list__checklist">
      <p class="list__title">${todoList.getTitle()}</p>
      <div class="list__date">
        <i class="list__date-icon">${sync}</i>
        <p>${date}</p>
        <i class="list__date-icon">${alarmIcon}</i>
      </div>
    </div>
   `
  );
}

function removeTodoList(todoList, index) {
  todoList.insertAdjacentHTML('beforeend', `<button class="list__remove">${trashIcon}</button>`);
  todoList.lastChild.onclick = () => {
    todoList.remove();

    arrayTodoList.splice(index, 1);

    // if (todos[category].length === 0) {
    //   delete todos[category];
    // }
  };
}

export {
  createTodo,
  sortByPriority,
  search,
  getTodoList,
  updateTodoList,
  removeTodoList,
}
