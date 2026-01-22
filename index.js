let items = [
  "Сделать проектную работу",
  "Полить цветы",
  "Пройти туториал по Реакту",
  "Сделать фронт для своего проекта",
  "Прогуляться по улице в солнечный день",
  "Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");
const itemTemplate = document
  .getElementById("to-do__item-template")
  .content.querySelector(".to-do__item");

function handleDelete(evt) {
  const item = evt.target.closest(".to-do__item");
  item.remove();
  updateLocalStorage();
}

function handleDuplicate(evt) {
  const item = evt.target.closest(".to-do__item");
  const text = item.querySelector(".to-do__item-text").textContent;
  const newItem = createItem(text);
  listElement.prepend(newItem);
  updateLocalStorage();
}

function handleEdit(evt) {
  const item = evt.target.closest(".to-do__item");
  const textElement = item.querySelector(".to-do__item-text");
  textElement.contentEditable = true;
  textElement.focus();
}

function handleBlur(evt) {
  evt.target.contentEditable = false;
  updateLocalStorage();
}

function loadTasks() {
  const storedItems = localStorage.getItem("todo-items");
  if (storedItems) {
    return JSON.parse(storedItems);
  }
  return items;
}

function updateLocalStorage() {
  const currentItems = getTasksFromDOM();
  saveTasks(currentItems);
}

function getTasksFromDOM() {
  const tasks = [];
  const itemsNamesElements = document.querySelectorAll(".to-do__item-text");

  itemsNamesElements.forEach((element) => {
    tasks.push(element.textContent);
  });

  return tasks;
}

function saveTasks(tasks) {
  localStorage.setItem("todo-items", JSON.stringify(tasks));
}

function createItem(text) {
  const newElement = itemTemplate.cloneNode(true);
  const textElement = newElement.querySelector(".to-do__item-text");
  const deleteButton = newElement.querySelector(
    ".to-do__item-button_type_delete"
  );
  const duplicateButton = newElement.querySelector(
    ".to-do__item-button_type_duplicate"
  );
  const editButton = newElement.querySelector(".to-do__item-button_type_edit");

  textElement.textContent = text;

  // Именованные функции-обработчики
  deleteButton.addEventListener("click", handleDelete);
  duplicateButton.addEventListener("click", handleDuplicate);
  editButton.addEventListener("click", handleEdit);
  textElement.addEventListener("blur", handleBlur);

  return newElement;
}

function handleFormSubmit(evt) {
  // Страница не перезагружается
  evt.preventDefault();

  const text = inputElement.value;

  // Нельзя создать пустую задачу
  if (text.trim() === "") {
    return;
  }

  const newItem = createItem(text);
  listElement.prepend(newItem);

  inputElement.value = "";
  updateLocalStorage();
}

const initialTasks = loadTasks();

initialTasks.forEach((item) => {
  const newItem = createItem(item);
  listElement.append(newItem);
});

formElement.addEventListener("submit", handleFormSubmit);
