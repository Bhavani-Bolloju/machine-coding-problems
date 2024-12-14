const input_text = document.querySelector(".input-text") as HTMLInputElement;

const btn_add = document.querySelector(".btn-add");

const todo_list = document.querySelector(".todo-list");

// const todo_delete = document.querySelector(".todo-delete");

// const todo_complete = document.querySelector(".todo-check");

// const todos = [];

const addTodo = function (todo: string) {
  const todo_item = `
        <li class="todo-item">
        <input type="checkbox" class="todo-check" />
          <div>
            <span contenteditable="true" class="todo-text">
              ${todo}
            </span>
          </div>
          <button class="todo-delete">
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
        </li>`;

  // console.log(todo, todo_item);
  todo_list?.insertAdjacentHTML("beforeend", todo_item);

  input_text.value = "";
};

btn_add?.addEventListener("click", function (e) {
  e.preventDefault();

  const todo = input_text.value;
  if (todo === "") return;
  addTodo(todo);
});

todo_list?.addEventListener("click", function (e) {
  const target = e.target as HTMLElement | null;

  const btn = target?.closest(".todo-delete");

  if (!btn) return;

  const todo = btn.closest(".todo-item") as HTMLElement;

  todo.classList.add("delete");
});
