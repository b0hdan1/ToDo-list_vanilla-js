export const noteCategory = document.querySelector('.note-category_tbody');

export const counterNotesActive = {
  task: 0,
  randomThought: 0,
  idea: 0,
  quote: 0,
};

const titleTodos = [
  {
    title: `Task <i class="fa fa-shopping-cart" aria-hidden="true"></i>`,
    activeTask: 0,
    archiveTask: 0,
  },

  {
    title: `Random Thought <i class="fas fa-head-side-virus"></i>`,
    activeTask: 0,
    archiveTask: 0,
  },

  {
    title: `Idea <i class="fa fa-lightbulb-o" aria-hidden="true"></i>`,
    activeTask: 0,
    archiveTask: 0,
  },

  {
    title: 'Quote <i class="fa fa-quote-right" aria-hidden="true"></i>',
    activeTask: 0,
    archiveTask: 0,
  },
];

export const counterNotesArchive = {
  task: 0,
  randomThought: 0,
  idea: 0,
  quote: 0,
}

console.log(noteCategory);

noteCategory.insertAdjacentHTML('afterbegin',
  titleTodos.map((icon) => 
  `<tr>
    <td>${icon.title}</td>
    <td>${icon.activeTask}</td>
    <td>${icon.archiveTask}</td>
  </tr>`
  ).join('')
);

