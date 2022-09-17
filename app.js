//select items
const alertMessage = window.document.querySelector(".alert");
const inputItem = window.document.querySelector("#grocery");
const submitForm = window.document.querySelector(".grocery-form");
const submitBtn = window.document.querySelector(".submit-btn");
const container = window.document.querySelector(".grocery-container");
const inputList = window.document.querySelector(".grocery-list");
const clearBtn = window.document.querySelector(".clear-btn");

// edit items
let editElement;
let editFlag = false;
let editId = "";

//eventListener

//submit form
submitForm.addEventListener("submit", addItem);

clearBtn.addEventListener("click", clearItems);

window.addEventListener("DOMContentLoaded", setupItems);

// function
function addItem(e) {
  e.preventDefault();
  const currentValue = inputItem.value;
  const id = new Date().getTime().toString();
  if (currentValue && !editFlag) {
    createListItem(id, currentValue);
    displayAlert("successfully added item", "success");
    container.classList.add("show-container");
    addToLocalStorage(id, currentValue);
    setBackToDefault();
  } else if (currentValue && editFlag) {
    editElement.innerHTML = currentValue;
    displayAlert("value has changed", "success");
    editLocalStorage(editId, currentValue);
    setBackToDefault();
  } else {
    displayAlert("please enter the value", "danger");
  }
}

function displayAlert(text, action) {
  alertMessage.textContent = text;
  alertMessage.classList.add(`alert-${action}`);

  setTimeout(function () {
    alertMessage.textContent = "";
    alertMessage.classList.remove(`alert-${action}`);
  }, 1000);
}

function clearItems() {
  const items = window.document.querySelectorAll(".grocery-item");
  if (items.length > 0) {
    items.forEach(function (item) {
      inputList.removeChild(item);
    });
  }
  container.classList.remove("show-container");
  displayAlert("empty list!", "danger");
  setBackToDefault();
  localStorage.removeItem("list");
}

function deleteItems(e) {
  const element = e.currentTarget.parentElement.parentElement;
  const id = element.dataset.id;
  inputList.removeChild(element);
  if (inputList.children.length === 0) {
    container.classList.remove("show-container");
  }
  displayAlert("item delted successfully", "success");
  setBackToDefault();
  removeFromLocalStorage(id);
}
function editItems(e) {
  const element = e.currentTarget.parentElement.parentElement;
  editElement = e.currentTarget.parentElement.previousElementSibling;
  grocery.value = editElement.textContent;
  editFlag = true;
  submitBtn.textContent = "edit";
  editId = element.dataset.id;
}
function setBackToDefault() {
  inputItem.value = "";
  editId = "";
  editFlag = false;
  submitBtn.textContent = "submit";
}
function addToLocalStorage(id, currentValue) {
  const grocery = { id: id, value: currentValue };
  let items = getLocalStorage();
  items.push(grocery);
  localStorage.setItem("list", JSON.stringify(items));
}
function removeFromLocalStorage(id) {
  let items = getLocalStorage();
  items = items.filter(function (item) {
    if (item.id !== id) {
      return item;
    }
  });
  localStorage.setItem("list", JSON.stringify(items));
}
function editLocalStorage(id, value) {
  let items = getLocalStorage();
  items = items.map(function (item) {
    if (item.id === id) {
      item.value = currentValue;
    }
    return item;
  });
}
function getLocalStorage() {
  return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
}
function setupItems() {
  let items = getLocalStorage();
  if (items.length > 0) {
    items.forEach(function (item) {
      createListItem(item.id, item.currentValue);
    });
    container.classList.add("show-container");
  }
}
function createListItem(id, currentValue) {
  const article = window.document.createElement("article");
  article.classList.add("grocery-item");
  const attr = window.document.createAttribute("data-id");
  attr.value = id;
  article.setAttributeNode(attr);
  article.innerHTML = `<p class = "title">${currentValue}</p>
    <div class = btn-container>
    <button type = "button" class ="edit-btn">
    <i class = "fas fa-edit"></i>
    </button>
    <button type = "button" class ="delete-btn">
    <i class = "fas fa-trash"></i>
    </button>
    </div>`;
  const deleteBtn = article.querySelector(".delete-btn");
  const editBtn = article.querySelector(".edit-btn");

  deleteBtn.addEventListener("click", deleteItems);
  editBtn.addEventListener("click", editItems);
  inputList.appendChild(article);
}
