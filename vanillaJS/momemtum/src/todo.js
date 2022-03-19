const todoForm = document.getElementById("todo-form");
const todoInput = document.querySelector("#todo-form input");
const todoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";
const todos = [];

function saveTodos() {
  // JSON.parse(localStorage.getItem("todos"));
  localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
}

function deleteTodo(event) {
  const li = event.target.parentElement;
  const todo = (li.querySelector("span").innerText);
  const idx = todos.indexOf(todo);

  if(idx > -1) {
    todos.splice(idx, 1);
    saveTodos();
  } 
  li.remove();
}

function paintTodo(newTodo) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const button = document.createElement("button");

  button.innerText = "✖";
  button.addEventListener("click", deleteTodo);
  li.appendChild(span);
  li.appendChild(button);
  span.innerText = newTodo;
  todoList.appendChild(li);
}

function handleTodoSubmit() {
  event.preventDefault();
  const newTodo = todoInput.value;
  todoInput.value = "";

  todos.push(newTodo);
  paintTodo(newTodo);
  saveTodos();
}

todoForm.addEventListener("submit", handleTodoSubmit);

const savedTodos = localStorage.getItem(TODOS_KEY);

if(savedTodos !== null) {
  const parsedTodos = JSON.parse(savedTodos);
  todos = parsedTodos;
  
  parsedTodos.forEach(todo => { 
    paintTodo(todo);
  });
}