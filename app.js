// Define UI Vars

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//  Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  // DOM load event
  document.addEventListener('DOMContentLoaded', getTasks);
  // Add tesk event
  form.addEventListener('submit', addTask);
  // remove task event
  taskList.addEventListener('click', removeTask);
  // clear task event
  clearBtn.addEventListener('click', clearTasks);
  // filter tasks event
  filter.addEventListener('keyup', filterTasks);
}

// Get Tasks from Local storage
function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = []; //ako u storageu nema nista prosledi prazan array
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks')); //uzmi stagod da ima iz storega i parsuj ga u array uz pomoc json.parse
  }

  tasks.forEach(function (task) {
    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(task));
    // Create new link element (x)
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon
    link.innerHTML = "<i class= 'fa fa-remove'></i>";
    // Append the link to li
    li.appendChild(link);

    // append li to ul
    taskList.appendChild(li);
  });
}

// Add task
function addTask(e) {
  if (taskInput.value === '') {
    alert('Add a task');
  }
  // Create li element
  const li = document.createElement('li');
  // Add class
  li.className = 'collection-item';
  // Create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  // Create new link element (x)
  const link = document.createElement('a');
  // Add class
  link.className = 'delete-item secondary-content';
  // Add icon
  link.innerHTML = "<i class= 'fa fa-remove'></i>";
  // Append the link to li
  li.appendChild(link);

  // append li to ul
  taskList.appendChild(li);

  // store in LS
  storeTaskInLocalStorage(taskInput.value);

  // Clear input
  taskInput.value = '';

  e.preventDefault();
}

// Store Task
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = []; //ako u storageu nema nista prosledi prazan array
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks')); //uzmi stagod da ima iz storega i parsuj ga u array uz pomoc json.parse
  }

  tasks.push(task); //dodavanje stagod da je parsovano u array tasks

  localStorage.setItem('tasks', JSON.stringify(tasks)); //stavljamo tasks u local storage ali mora da ga prebacimo u string uz pomoc json.stringify
}

// Remove task

function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove();

      // Remove from Local storage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Remove from Local storage
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = []; //ako u storageu nema nista prosledi prazan array
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks')); //uzmi stagod da ima iz storega i parsuj ga u array uz pomoc json.parse
  }

  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear task

function clearTasks() {
  // taskList.innerHTML = ""; // first way

  // FASTER
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  clearTasksFromLocalStorage();
}

// Clear Tasks from LS
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}
