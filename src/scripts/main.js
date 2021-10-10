'use strict';
import { todos } from "./data.js";
import { archive } from "./archiveData.js";
import { archiveTable } from "./archivator.js";
import { counterNotesActive, counterNotesArchive } from "./counterNotes.js";

export const currentTable = document.querySelector('.current-tbody');
const form = document.querySelector('form');
const div = document.createElement('div');

const addZeroToDay = (day) => {
  return (day < 10) ? '0' + day : day;
}

const createDate = () => {
  const year = new Date().getFullYear();
  const month = new Date().toLocaleString('en', {month: 'long'});
  const day = addZeroToDay(new Date().getDate());

  return `${month} ${day},${year}`;
};

function createNotification(title, description, type, color) {
  div.style.backgroundColor = color;
  div.classList = `notification ${type}`;
  div.innerHTML = `<h2>${title}</h2>` + `<h3>${description}</h3>`;
  form.append(div);
  setTimeout(() => div.remove(), 3000);
}

function isValid() {
  const title = form.title.value;
  const content = form.content.value;
  const category = form.categorie.value;

  switch (true) {
    case (title.length === 0):
      createNotification('Error!'
        , 'Please, enter the title'
        , 'error'
        , 'red');

      return false;
    case (content.length === 0):
      createNotification('Error!'
        , 'Please, enter content'
        , 'error'
        , 'red');

      return false;
    case (category === 'Choose category'):
      createNotification('Error!'
        , 'Please, choose category'
        , 'error'
        , 'red');

      return false;
    
    default:
      createNotification('Congratulations!'
        , 'You have a new note'
        , 'success'
        , 'green');
    
       return true;
  };
}

export function addIcon(categorie) {
  if (categorie === 'Task') {
    return `<i class="fa fa-shopping-cart" aria-hidden="true"></i>`;
  }

  if (categorie === 'Random Thought') {
    return `<i class="fas fa-head-side-virus"></i>`;
  }

  if (categorie === 'Idea') {
    return `<i class="fa fa-lightbulb-o" aria-hidden="true"></i>`;
  }

  if (categorie === 'Quote') {
    return `<i class="fa fa-quote-right" aria-hidden="true"></i>`;
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const createdTodo = document.createElement('tr');
  createdTodo.className = 'todo-item';
  const data = new FormData(form);
  const newTodo = Object.fromEntries(data.entries());

  if (!isValid()) {
    return;
  }

  createdTodo.insertAdjacentHTML('afterbegin', `
      <td class="can-edit" contenteditable="false">${addIcon(newTodo.categorie)}
        <br>
        ${newTodo.title}
      </td>
      <td class="can-edit" contenteditable="false">${createDate()}</td>
      <td class="can-edit" contenteditable="false">${newTodo.categorie}</td>
      <td class="can-edit" contenteditable="false">${newTodo.content}</td>
      <td class="can-edit" contenteditable="false"></td>
      <td>
        <button class="btn btn-edit fa fa-pencil"></button>
      </td>
      <td>
        <button class="btn btn-archive fa fa-archive" aria-hidden="true"></button>
      </td>
      <td>
        <button class="btn btn-delete fa fa-trash"></button>
      </td>
  `);

  todos.push(createdTodo);
  currentTable.append(createdTodo);
  form.reset();
})

currentTable.insertAdjacentHTML('afterbegin',
  todos.map((todo) =>
    `<tr class="todo-item">
        <td class="can-edit" contenteditable="false">${todo.title}
          <br>
          ${addIcon(todo.category)}
        </td>
        <td class="can-edit" contenteditable="false">
          ${todo.created}
        </td>
        <td class="can-edit" contenteditable="false">
          ${todo.category}
        </td>
        <td class="can-edit" contenteditable="false">
          ${todo.content}
        </td>
        <td class="can-edit" contenteditable="false">
          ${todo.dates}
        </td>
        <td>
          <button class="btn btn-edit fa fa-pencil"></button>
        </td>
        <td>
          <button class="btn btn-archive fa fa-archive" aria-hidden="true"></button>
        </td>
        <td>
          <button class="btn btn-delete fa fa-trash"></button>
        </td>
    </tr>
  `).join('')
);

//edit
currentTable.addEventListener('click', (e) => {
  const canEdit = e.target.closest('tr').querySelectorAll('td');

  if (e.target.matches('.btn-edit')) {
    for (let i = 0; i < 5; i++) {
      canEdit.item(i).setAttribute('contenteditable', true);
    }
  }
  return;
});

//archive
currentTable.addEventListener('click', (e) => {
  const currentItem = e.target.closest('.todo-item');
  if (!e.target.matches('.btn-archive')) {
    return;
  }

  currentItem.remove();
  archive.push(currentItem);
  archiveTable.append(currentItem);
});


//delete
currentTable.addEventListener('click', (e) => {
  if (!e.target.matches('.btn-delete')) {
    return;
  }

  e.target.closest('.todo-item').remove();
});
