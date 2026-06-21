// DOM AND CONSTANTS
const newTaskBtn = document.querySelector('#add-task-btn');
const taskForm = document.querySelector('#create-task-form');
const taskFormOverlay = document.querySelector('#task-form-overlay');
const cancelTaskFormBtn = document.querySelector('#cancel-task-btn');
const todoContainer = document.querySelector('#todo-container');
const progressContainer = document.querySelector('#progress-container');
const doneContainer = document.querySelector('#done-container');
const todoCount = document.querySelector('#todo-count');
const progressCount = document.querySelector('#progress-count');
const doneCount = document.querySelector('#done-count');
const todoList = document.querySelector('#todo-list');
const progressList = document.querySelector('#progress-list');
const doneList = document.querySelector('#done-list');

// Define Classes & Counters for smooth drag and drop
const todoClasses = ["ring-2", "ring-indigo-400", "scale-[1.02]", "bg-slate-950"];
const progressClasses = ["ring-2", "ring-amber-400", "scale-[1.02]", "bg-slate-950"];
const doneClasses = ["ring-2", "ring-emerald-400", "scale-[1.02]", "bg-slate-950"];

let draggedTaskId = null;
const existingData = localStorage.getItem('myTasks');
let allTasks = existingData ? JSON.parse(existingData) : [];

// HELPERS
function openModal() {
  taskFormOverlay.classList.remove('hidden');
}
function closeModal() {
  taskForm.reset();
  taskFormOverlay.classList.add('hidden');
}

function createCard(task) {
  const card = document.createElement('div');
  card.className = 'flex flex-col gap-2 bg-slate-800 rounded-lg p-3';

  const title = document.createElement('h3');
  title.className = 'text-xl capitalize text-slate-50';
  title.textContent = task['task-title'];

  const description = document.createElement('p');
  description.className = 'leading-relaxed text-slate-300 text-sm';
  description.textContent = task['task-description'];
  const deleteBtn = document.createElement('button');
  deleteBtn.className =
    'flex self-end bg-red-500 hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400 text-slate-50 rounded-lg py-1 px-2 font-semibold text-sm capitalize';
  deleteBtn.textContent = 'delete';
  deleteBtn.addEventListener('click', () => {
    deleteTask(task.Id);
  });

  card.appendChild(title);
  card.appendChild(description);
  card.appendChild(deleteBtn);

  // Drag Configuration
  card.draggable = true;
  // Drag Starts
  card.addEventListener('dragstart', () => {
    draggedTaskId = task.Id;
  });
  // Drag Ends
  card.addEventListener('dragend', () => {
    draggedTaskId = null;
  });

  const container = document.querySelector(`#${task.status}-container`);
  container.appendChild(card);
}
function handleDrop(status) {
  const task = allTasks.find((task) => task.Id === draggedTaskId);
  if (task) {
    task.status = status;
    saveTasks();
    refreshUI();
  }
}

// CREATING AND UPDATING STATES
function createTask(e) {
  e.preventDefault();
  //* Automatically extracts all named inputs from the form and converts them into a clean JavaScript object.
  const newTask = Object.fromEntries(new FormData(e.target));
  newTask.Id = Date.now().toString(); // Using timestamp for unique ID
  newTask.status = 'todo';

  addTask(newTask);
  saveTasks();
  refreshUI();
  closeModal();
}
function addTask(newTask) {
  allTasks.push(newTask);
}
function saveTasks() {
  localStorage.setItem('myTasks', JSON.stringify(allTasks));
}
function deleteTask(Id) {
  allTasks = allTasks.filter((task) => task.Id !== Id);
  saveTasks();
  refreshUI();
}
function updateCounts() {
  const counts = {
    todo: allTasks.filter((t) => t.status === 'todo').length,
    progress: allTasks.filter((t) => t.status === 'progress').length,
    done: allTasks.filter((t) => t.status === 'done').length,
  };
  todoCount.textContent = `${counts.todo}`;
  progressCount.textContent = `${counts.progress}`;
  doneCount.textContent = `${counts.done}`;
}
// RENDER
function renderTasks() {
  allTasks.forEach((task) => {
    createCard(task);
  });
}
function refreshUI() {
  todoContainer.innerHTML = '';
  progressContainer.innerHTML = '';
  doneContainer.innerHTML = '';
  renderTasks();
  updateCounts();
}

// INITIALLY UI RENDERING
refreshUI();

// USER ACTIONS
// Button
newTaskBtn.addEventListener('click', openModal);
cancelTaskFormBtn.addEventListener('click', closeModal);
taskForm.addEventListener('submit', createTask);

// This holds all the unique data for each column in one place, and we added counter for smooth style apply without any jitter effect due to bubbling
const kanbanColumns = [
  { status: 'todo', container: todoContainer, list: todoList, classes: todoClasses, counter: 0 },
  { status: 'progress', container: progressContainer, list: progressList, classes: progressClasses, counter: 0 },
  { status: 'done', container: doneContainer, list: doneList, classes: doneClasses, counter: 0 }
];

// 2. Loop through each column and apply the logic once
kanbanColumns.forEach((col) => {

  // DragOver: Required to allow the browser to drop an element into this container
  col.container.addEventListener('dragover', (e) => e.preventDefault());

  // DragEnter: Increment counter and add premium hover styles

  col.container.addEventListener('dragenter', () => {
    col.counter++;
    col.list.classList.add(...col.classes);
  });

  // DragLeave: Decrement counter and remove styles ONLY if mouse truly left the column
  col.container.addEventListener('dragleave', () => {
    col.counter--;
    if (col.counter === 0) {
      col.list.classList.remove(...col.classes);
    }
  });

  // Drop: Reset everything and trigger your custom drop handler
  col.container.addEventListener('drop', () => {
    col.counter = 0;
    col.list.classList.remove(...col.classes);
    handleDrop(col.status); // Passes 'todo', 'progress', or 'done' dynamically
  });
});
