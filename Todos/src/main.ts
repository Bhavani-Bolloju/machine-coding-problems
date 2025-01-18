const input_text = document.querySelector(".input-text") as HTMLInputElement;
const btn_add = document.querySelector(".btn-add");
const todo_list = document.querySelector(".todo-list");

const tabs = document.querySelector(".tabs");

interface Todo {
  text: string;
  id: number;
  completed: boolean;
}

let todos: Todo[] = [];

const getLocallyStoredTodos = localStorage.getItem("todos");
todos = getLocallyStoredTodos ? JSON.parse(getLocallyStoredTodos) : [];

const todoTemplate = function (todo: Todo) {
  const todo_item = `
        <li class="todo-item" data-id="${todo.id}">
        <input type="checkbox" class="todo-check" ${
          todo.completed && "checked"
        } />
          <div class="todo-content">
            <span class="todo-text">${todo.text}</span>
            <input type="text" class="todo-input remove" />
          </div>
          <button class="btn-delete">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="48"
              height="48"
              viewBox="0 0 48 48"
            >
              <path
                d="M 20.5 4 A 1.50015 1.50015 0 0 0 19.066406 6 L 14.640625 6 C 12.803372 6 11.082924 6.9194511 10.064453 8.4492188 L 7.6972656 12 L 7.5 12 A 1.50015 1.50015 0 1 0 7.5 15 L 8.2636719 15 A 1.50015 1.50015 0 0 0 8.6523438 15.007812 L 11.125 38.085938 C 11.423352 40.868277 13.795836 43 16.59375 43 L 31.404297 43 C 34.202211 43 36.574695 40.868277 36.873047 38.085938 L 39.347656 15.007812 A 1.50015 1.50015 0 0 0 39.728516 15 L 40.5 15 A 1.50015 1.50015 0 1 0 40.5 12 L 40.302734 12 L 37.935547 8.4492188 C 36.916254 6.9202798 35.196001 6 33.359375 6 L 28.933594 6 A 1.50015 1.50015 0 0 0 27.5 4 L 20.5 4 z M 14.640625 9 L 33.359375 9 C 34.196749 9 34.974746 9.4162203 35.439453 10.113281 L 36.697266 12 L 11.302734 12 L 12.560547 10.113281 A 1.50015 1.50015 0 0 0 12.5625 10.111328 C 13.025982 9.4151428 13.801878 9 14.640625 9 z M 11.669922 15 L 36.330078 15 L 33.890625 37.765625 C 33.752977 39.049286 32.694383 40 31.404297 40 L 16.59375 40 C 15.303664 40 14.247023 39.049286 14.109375 37.765625 L 11.669922 15 z"
              ></path>
            </svg>
          </button>
          <button class="btn-edit">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
              </svg>
          </button>
          <button class="btn-save remove">save</button>
        </li>`;
  todo_list?.insertAdjacentHTML("beforeend", todo_item);
};

const addTodo = function (todo: Todo) {
  todoTemplate(todo);

  input_text.value = "";
};

const getTodoListElements = function (e: Event) {
  const target = e.target as HTMLElement;

  const todoCheck = target?.closest(".todo-check") as HTMLInputElement;
  const todoEl = target?.closest(".todo-item") as HTMLElement;
  const editBtn = target?.closest(".btn-edit") as HTMLElement;
  const saveBtn = target?.closest(".btn-save");
  const deleteBtn = target?.closest(".btn-delete");
  const todoInput = todoEl.querySelector(".todo-input") as HTMLInputElement;
  const todoText = todoEl.querySelector(".todo-text") as HTMLElement;
  const todoId = todoEl?.dataset?.id;

  return {
    todoEl,
    editBtn,
    saveBtn,
    deleteBtn,
    todoInput,
    todoText,
    todoCheck,
    todoId
  };
};

const renderTodos = function (todos: Todo[], status: string = "") {
  if (!todo_list) return;

  todo_list.innerHTML = " ";

  const filterTodos = todos.filter((todo) => {
    if (status === "completed") return todo.completed;

    if (status === "pending") return !todo.completed;
    return true;
  });

  if (filterTodos.length > 0) {
    filterTodos.map((todo) => todoTemplate(todo));
  } else {
    const emptyTemplate = `<p class="tab-status">${status} is empty</p>`;

    todo_list?.insertAdjacentHTML("beforeend", emptyTemplate);
  }
};

renderTodos(todos, "all");

const addToLocalStorage = function (todos: Todo[]) {
  const addItems = JSON.stringify(todos);

  localStorage.setItem("todos", addItems);
};

const addToList = function (todo: Todo) {
  todos.push(todo);
  addToLocalStorage(todos);
};

//.................adding new todo
btn_add?.addEventListener("click", function (e) {
  e.preventDefault();

  const text = input_text.value;

  if (text === "") return;

  const id = todos.length + 1;

  const todoObj = {
    id,
    text,
    completed: false
  };
  //display the item on the screen
  addTodo(todoObj);

  //add to the todos list and update locale storage
  addToList(todoObj);
});

//................deleting the todo
todo_list?.addEventListener("click", function (e) {
  const { deleteBtn, todoEl, todoId } = getTodoListElements(e);
  if (!deleteBtn || !todoEl || !todoId) return;

  todos = todos.filter((todo) => todo.id !== +todoId);

  renderTodos(todos);
  addToLocalStorage(todos);
});

// ............marking as complete/incomplete
todo_list?.addEventListener("click", function (e) {
  const { todoCheck, todoEl, todoId } = getTodoListElements(e);

  if (!todoCheck || !todoEl || !todoId) return;

  const isCompleted = todoCheck.checked;

  const index = todos.findIndex((todo) => todo.id === +todoId);
  const todo = todos[index];
  const updatedTodo = { ...todo, completed: isCompleted };
  todos.splice(index, 1, updatedTodo);

  renderTodos(todos);
  addToLocalStorage(todos);
});

// .............editing the todo
todo_list?.addEventListener("click", function (e) {
  const { todoEl, editBtn, todoInput, todoText } = getTodoListElements(e);

  if (!editBtn || !todoEl) return;

  const saveBtn = todoEl.querySelector(".btn-save");

  if (!saveBtn || !todoInput || !todoText) return;

  saveBtn?.classList.toggle("remove");
  editBtn?.classList.toggle("remove");
  todoText?.classList.toggle("remove");
  todoInput?.classList.toggle("remove");

  todoInput.value = todoText.textContent || "";
});

// ............updating the edited todo
todo_list?.addEventListener("click", function (e) {
  const { todoEl, todoInput, todoText, saveBtn, todoId } =
    getTodoListElements(e);

  if (!saveBtn || !todoEl || !todoInput || !todoId || !todoText) return;

  todoText.textContent = todoInput.value;

  const editBtn = todoEl.querySelector(".btn-edit");

  if (!editBtn) return;

  saveBtn?.classList.toggle("remove");
  editBtn?.classList.toggle("remove");
  todoText?.classList.toggle("remove");
  todoInput?.classList.toggle("remove");

  const index = todos.findIndex((todo) => todo.id === +todoId);

  const item = todos[index];
  const updatedTodo = { ...item, text: todoInput.value };

  todos.splice(index, 1, updatedTodo);

  addToLocalStorage(todos);
});

// sorting todos
tabs?.addEventListener("click", function (e) {
  // console.log(e.target);
  const target = e.target as HTMLElement;

  const btn = target.closest("button");

  if (!btn) return;

  const btn_class = btn.className;
  const btns = tabs.querySelectorAll("button");

  btns?.forEach((btn) => btn.classList.remove("active"));
  btn?.classList.add("active");
  renderTodos(todos, btn_class);
});
