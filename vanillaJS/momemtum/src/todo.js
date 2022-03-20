const todoForm = document.getElementById("todo-form");
const todoInput = document.querySelector("#todo-form input");
const todoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";
let todos = [];

function saveTodos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
}

function deleteTodo(event) {
  const target = event.target.parentElement;
  target.remove();

  todos = todos.filter((todo) => {
    return todo.id !== parseInt(target.id);
  });

  saveTodos();
}

function paintTodo(newTodo) {
  const li = document.createElement("li");
  li.id = newTodo.id;
  const span = document.createElement("span");
  const button = document.createElement("button");

  button.id = "todo-button";
  button.innerText = "✖";
  button.addEventListener("click", deleteTodo);
  li.appendChild(span);
  li.appendChild(button);

  span.innerText = newTodo.content;
  todoList.appendChild(li);
}

function handleTodoSubmit() {
  event.preventDefault();
  const newTodo = {
    id: Date.now(),
    content: todoInput.value,
  };

  todoInput.value = "";

  todos.push(newTodo);
  paintTodo(newTodo);
  saveTodos();
}

todoForm.addEventListener("submit", handleTodoSubmit);

const savedTodos = localStorage.getItem(TODOS_KEY);

if (savedTodos !== null) {
  const parsedTodos = JSON.parse(savedTodos);
  todos = parsedTodos;

  parsedTodos.forEach((todo) => {
    paintTodo(todo);
  });
}
