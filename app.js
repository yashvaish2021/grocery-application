//select items
const alertMessage = window.document.querySelector(".alert");
const inputItem = window.document.querySelector("#grocery");
const submitForm = window.document.querySelector(".grocery-form");
const submitBtn = window.document.querySelector(".submit-btn");
const container = window.document.querySelector(".grocery-container");
const inputList = window.document.querySelector(".grocery-list");
const clearBtn = window.document.querySelector(".clear-btn");

submitForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const currentItem = inputItem.value;
  if (!currentItem) {
    alertMessage.innerHTML = `Item is required`;
  } else {
    groceryItems.push(currentItem);
    inputItem.value = "";
  }
  console.log(groceryItems);
});
