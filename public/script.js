let todoItems = [];
const form = document.querySelector(".form");
const lists = document.querySelector(".lists");
const all = document.querySelector(".all");
const active = document.querySelector(".active");
const completed = document.querySelector(".completed");
const clearCompleted = document.querySelector(".clear-completed");
const itemLeft = document.querySelector(".item-left");

function saveToLocalStorage() {
  console.info("Todo Items saved to Local storage");
  localStorage.setItem("items", JSON.stringify(todoItems));
}

function getFromLocalStorage() {
  console.info("Todo Items restored and render to screen");
  const ITEMS_FROM_LOCAL_STORAGE = JSON.parse(localStorage.getItem("items"));
  if (ITEMS_FROM_LOCAL_STORAGE) {
    todoItems = ITEMS_FROM_LOCAL_STORAGE;
    render();
  }
  itemCount();
}

function addTodo(e) {
  e.preventDefault();
  const todoInput = document.querySelector(".todo-input");
  const name = todoInput.value;
  if (name == null || name === "") return;
  const todo = {
    name: name,
    id: Date.now(),
    completed: false,
  };
  todoItems.push(todo);
  saveToLocalStorage();
  render();

  todoInput.value = null;
}

function render() {
  let listElement = "";
  todoItems.map((item) => {
    const isCompleted = item.completed ? "checked " : "active";
    listElement += `
      <li class="todo-item ${isCompleted}" data-key="${item.id}">
        <div class="inner-list draggable" draggable="true">
          <div>
            <input type="checkbox" id="${item.id}" class="check"
            ${item.completed ? "checked" : ""}
            />
            <label for="${item.id}" class="text transition">
              ${item.name}
            </label>
          </div>
          <img src="./images/icon-cross.svg" alt="" class="delete-item"/>
        </div>
      </li>
    `;
  });
  lists.innerHTML = listElement;
  drag_and_drop();
}

function checkTodoItem(key) {
  const index = todoItems.findIndex((item) => item.id === key);
  todoItems[index].completed = !todoItems[index].completed;
  saveToLocalStorage();
  render();
  itemCount();
}

function deleteTodoItem(key) {
  todoItems = todoItems.filter((item) => item.id !== key);
  saveToLocalStorage();
  render();
}

function renderAll() {
  const todoItem = document.querySelectorAll(".todo-item").forEach((item) => {
    if (item.classList.contains("checked")) {
      item.classList.remove("hide");
    }

    if (item.classList.contains("active")) {
      item.classList.remove("hide");
    }
  });
}

function renderActive() {
  const todoItem = document.querySelectorAll(".todo-item").forEach((item) => {
    if (item.classList.contains("checked")) {
      item.classList.add("hide");
    } else {
      item.classList.remove("hide");
    }
  });
}

function renderCompleted() {
  const todoItem = document.querySelectorAll(".todo-item").forEach((item) => {
    if (item.classList.contains("checked")) {
      item.classList.remove("hide");
    } else if (item.classList.contains("active")) {
      item.classList.add("hide");
    } else {
      item.classList.add("hide");
    }
  });
}

function deleteCompleted() {
  todoItems = todoItems.filter((item) => item.completed !== true);
  saveToLocalStorage();
  render();
}

function itemCount() {
  const newTodo = todoItems.filter((item) => item.completed === false);

  itemLeft.textContent = `${newTodo.length} items left`;
}

/* event listeners */
form.addEventListener("submit", addTodo);
lists.addEventListener("click", (e) => {
  if (e.target.classList.contains("check")) {
    const key = Number(e.target.closest(".todo-item").dataset.key);
    checkTodoItem(key);
  }

  if (e.target.classList.contains("delete-item")) {
    const key = Number(e.target.closest(".todo-item").dataset.key);
    deleteTodoItem(key);
  }
});

all.addEventListener("click", renderAll);
active.addEventListener("click", renderActive);
completed.addEventListener("click", renderCompleted);
clearCompleted.addEventListener("click", deleteCompleted);

function drag_and_drop() {
  const draggableLists = document.querySelector(".draggable-lists");
  const draggables = document.querySelectorAll(".draggable");

  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", (e) => {
      e.target.classList.add("dragging");
    });

    draggable.addEventListener("dragend", (e) => {
      e.target.classList.remove("dragging");
    });
  });

  draggableLists.addEventListener("dragover", (e) => {
    e.preventDefault();
    const draggable = document.querySelector(".dragging");
    // draggableLists.append(draggable);
  });
}
getFromLocalStorage();
