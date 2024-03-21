const addToDoModal = document.getElementById("add-modal");
const startAddToDoButton = document.querySelector("header button");
const backdrop = document.getElementById("backdrop");
const cancelAddTodoButton = addToDoModal.querySelector(".btn--passive");
const confirmAddMovieButton = cancelAddTodoButton.nextElementSibling;
const userInput = addToDoModal.querySelector("input");
const entryTextSection = document.getElementById("entry-text");
const startDeleteButton = document.getElementById("start-delete");
const deleteTodoModal = document.getElementById("delete-modal");

console.log(deleteTodoModal);

let todos = [];

const toggleBackdrop = () => {
  backdrop.classList.toggle("visible");
};

const updateUI = () => {
  if (todos.length === 0) {
    entryTextSection.style.display = "block";
  } else {
    entryTextSection.style.display = "none";
  }
};

const showTodoModal = () => {
  addToDoModal.classList.add("visible");
  toggleBackdrop();
};

const closeTodoModal = () => {
  addToDoModal.classList.remove("visible");
};

const cancelAddTodoHandler = () => {
  closeTodoModal();
  toggleBackdrop();
  clearTodoInput();
};

const backdropClickHandler = () => {
  closeTodoModal();
  cancelTodoDeletion();
  clearTodoInput();
};

const clearTodoInput = () => {
  userInput.value = "";
};

const deleteTodoHandler = (todoId) => {
  let todoIndex = 0;
  for (const todo of todos) {
    if (todo.id === todoId) {
      break;
    }
    todoIndex++;
  }
  todos.splice(todoIndex, 1);
  const todoList = document.getElementById("todo-list");
  todoList.children[todoIndex].remove();
  cancelTodoDeletion();
};

const cancelTodoDeletion = () => {
  toggleBackdrop();
  deleteTodoModal.classList.remove("visible");
};

const startDeleteTodoHandler = (todoId) => {
  deleteTodoModal.classList.add("visible");
  toggleBackdrop();
  const cancelDeletionBtn = deleteTodoModal.querySelector(".btn--passive");
  let confirmDeletionBtn = deleteTodoModal.querySelector(".btn--danger");

  confirmDeletionBtn.replaceWith(confirmDeletionBtn.cloneNode(true));

  confirmDeletionBtn = deleteTodoModal.querySelector(".btn--danger");

  cancelDeletionBtn.removeEventListener("click", cancelTodoDeletion);

  cancelDeletionBtn.addEventListener("click", cancelTodoDeletion);
  confirmDeletionBtn.addEventListener(
    "click",
    deleteTodoHandler.bind(null, todoId)
  );
};

const renderNewTodoElement = (id, title) => {
  const newToDoElement = document.createElement("li");
  newToDoElement.className = "todo-element";
  newToDoElement.innerHTML += `  
    <h2>${title}</h2>
    <button class='delete-button'>
      <i class="material-icons ">delete</i>
    </button>
  `;

  const deleteButton = newToDoElement.querySelector(".delete-button");

  deleteButton.addEventListener("click", startDeleteTodoHandler.bind(null, id));
  const todoList = document.getElementById("todo-list");
  todoList.append(newToDoElement);
};

const addTodoHandler = () => {
  const userValue = userInput.value;

  if (userValue.trim() === "") {
    alert("Please enter valid values!");
    return;
  }

  const newTodo = {
    id: Math.random().toString(),
    title: userValue,
  };

  todos.push(newTodo);
  console.log(todos);
  closeTodoModal();
  toggleBackdrop();
  clearTodoInput();
  renderNewTodoElement(newTodo.id, newTodo.title);
  updateUI();
};

startAddToDoButton.addEventListener("click", showTodoModal);
backdrop.addEventListener("click", backdropClickHandler);
cancelAddTodoButton.addEventListener("click", cancelAddTodoHandler);
confirmAddMovieButton.addEventListener("click", addTodoHandler);
