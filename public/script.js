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
      <li class="todo-item ${isCompleted} draggable" data-key="${
      item.id
    }" draggable="true">
        <div class="inner-list">
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
  DRAG_AND_DROP();
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

function DRAG_AND_DROP() {
  const draggables = document.querySelectorAll(".draggable");
  const draggableLists = document.querySelector(".draggable-lists");

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
    draggableLists.appendChild(draggable);
    const afterElement = getDragAfterElement(draggableLists, e.clientY);

    if (afterElement == null) {
      draggableLists.appendChild(draggable);
    } else {
      draggableLists.insertBefore(draggable, afterElement);
    }
  });

  function getDragAfterElement(draggableLists, y) {
    const draggableElements = [
      ...draggableLists.querySelectorAll(".draggable:not(.dragging)"),
    ];

    return draggableElements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - (box.top + box.height / 2);
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      { offset: Number.NEGATIVE_INFINITY }
    ).element;
  }
}
getFromLocalStorage();

/* Dark Mode */

const moonIcon = document.querySelector(".moon-icon");
const sunIcon = document.querySelector(".sun-icon");
const userTheme = localStorage.getItem("theme");
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

function themecheck() {
  if (userTheme === "dark" || (!userTheme && systemTheme)) {
    document.documentElement.classList.add("dark");
    return;
  }
}

function themeSwitch() {
  if (document.documentElement.classList.contains("dark")) {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
    return;
  } else {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }
}

moonIcon.addEventListener("click", (e) => {
  if (!e.target.classList.contains("hide")) {
    e.target.classList.add("hide");
    e.target.nextElementSibling.classList.remove("hide");
  } else {
    e.target.classList.remove("hide");
    e.target.nextElementSibling.classList.add("hide");
  }
  themeSwitch();
});

sunIcon.addEventListener("click", (e) => {
  if (!e.target.classList.contains("hide")) {
    e.target.classList.add("hide");
    e.target.previousElementSibling.classList.remove("hide");
  } else {
    e.target.classList.remove("hide");
    e.target.previousElementSibling.classList.add("hide");
  }
  themeSwitch();
});
