const input_text = document.querySelector(".input-text");

const btn_add = document.querySelector(".btn-add");

const todo_list = document.querySelector(".todo-list");

const addTodo = function (todo) {
  const todo_item = `<li>${todo}</li>`;

  console.log(todo, todo_item);
  todo_list?.insertAdjacentHTML("beforeend", todo_item);

  input_text.value = "";
};

btn_add.addEventListener("click", function (e) {
  e.preventDefault();

  const todo = input_text?.value;

  if (todo === "") return;

  addTodo(todo);
});



