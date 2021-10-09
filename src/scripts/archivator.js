import { archive } from "./archiveData.js";
import { addIcon } from "./main.js";
import { todos } from "./data.js";
import { currentTable } from "./main.js";

export const archiveTable = document.querySelector('.archive-table');

archiveTable.insertAdjacentHTML('beforeend',
  archive.map((item) =>
    `<tr class="todo-item">
      <td class="can-edit" contenteditable="false">${item.title}
      <br>
      ${addIcon(item.category)}
      </td>
      <td class="can-edit" contenteditable="false">
        ${item.created}
      </td>
      <td class="can-edit" contenteditable="false">
        ${item.category}
      </td>
      <td class="can-edit" contenteditable="false">
        ${item.content}
      </td>
      <td class="can-edit" contenteditable="false">
        ${item.dates}
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
archiveTable.addEventListener('click', (e) => {
  const canEdit = e.target.closest('tr').querySelectorAll('td');

  if (e.target.matches('.btn-edit')) {
    for (let i = 0; i < 5; i++) {
      canEdit.item(i).setAttribute('contenteditable', true);
    }
  }
});

//archive
archiveTable.addEventListener('click', (e) => {
  const archivedItem = e.target.closest('.todo-item');
  if (!e.target.matches('.btn-archive')) {
    return;
  }

  archivedItem.remove();
  todos.push(archivedItem);
  currentTable.append(archivedItem);
});

//delete
archiveTable.addEventListener('click', (e) => {
  if (!e.target.matches('.btn-delete')) {
    return;
  }

  e.target.closest('.todo-item').remove();
});
