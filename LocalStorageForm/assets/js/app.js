//variable
const taskList = document.getElementById("tweet-list");

//Event Listeners
eventListeners();
function eventListeners() {
  //form submission
  document.getElementById("form").addEventListener("submit", newTask);
  //remove task from the list
  taskList.addEventListener("click", removeTask);
  //document
  document.addEventListener("DOMContentLoaded", localStorageOnLoad);
}

//functions
function newTask(e) {
  e.preventDefault();

  //Read the textarea value
  const task = document.getElementById("tweet").value;
  //create remove btn
  const removeBtn = document.createElement("a");
  removeBtn.classList = "remove-tweet";
  removeBtn.textContent = "X";
  //create li element
  const li = document.createElement("li");
  li.textContent = task;

  //Add the remove button to each task
  li.appendChild(removeBtn);
  //add to the list
  taskList.appendChild(li);
  //add to local storage
  addTaskLocalStorage(task);
  //print the alert
  alert("Task added");
  document.getElementById("tweet").value = "";
}
//Remove the task from the dom
function removeTask(e) {
  if (e.target.classList.contains("remove-tweet")) {
    e.target.parentElement.remove();
  }

  //remove from the storage
  removeTaskLocalStorage(e.target.parentElement.textContent);
}
//add the task into local storage
function addTaskLocalStorage(task) {
  let tasks = getTaskFromStorage();

  //add the tasks into the array

  tasks.push(task);
  //Convert task array into String
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function getTaskFromStorage() {
  let tasks;
  const taskLS = localStorage.getItem("tasks");
  if (taskLS === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(taskLS);
  }
  return tasks;
}
//prints localStorage tasks on load
function localStorageOnLoad() {
  let tasks = getTaskFromStorage();
  //loop the storage and print the values
  tasks.forEach(function (task) {
    //create remove btn
    const removeBtn = document.createElement("a");
    removeBtn.classList = "remove-tweet";
    removeBtn.textContent = "X";
    //create li element
    const li = document.createElement("li");
    li.textContent = task;

    //Add the remove button to each task
    li.appendChild(removeBtn);
    taskList.appendChild(li);
  });
}
//Remove task from the function
function removeTaskLocalStorage(task) {
  //get task from storage
  let tasks = getTaskFromStorage();
  //remove the X from the task
  const taskDelete = task.substring(0, task.length - 1);

  //loop through the tasks and remove the task that's equal
  tasks.forEach(function (taskLS, index) {
    if (taskDelete === taskLS) {
      tasks.splice(index, 1);
    }
  });
  //save the data
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
