const addIngredientLink = document.getElementById("addIngredientLink");
const ingredientList = document.getElementById("ingredientList");

const addStepLink = document.getElementById("addStepLink");
const stepList = document.getElementById("stepList");

function addIngredientItem() {
  // Create a new list item element with the specified classes
  const listItem = document.createElement("li");
  listItem.classList.add("list-group-item", "d-flex", "align-items-center");
  listItem.id = "addlist";

  // Create an input element with the specified attributes and classes
  const inputElement = document.createElement("input");
  inputElement.type = "text";
  inputElement.placeholder = "Add next ingredient";
  inputElement.classList.add("form-control");
  inputElement.name = "recipe[ingredients]";
  inputElement.required = true;

  // Create a button element with the specified attributes and classes
  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.classList.add("btn", "btn-transparent", "pl-2");
  removeButton.setAttribute("aria-label", "Close");

  // Create a span element with the "x" symbol
  const closeButtonIcon = document.createElement("span");
  closeButtonIcon.textContent = "×";
  closeButtonIcon.setAttribute("aria-hidden", "true");

  // Append elements to the list item
  listItem.appendChild(inputElement);
  listItem.appendChild(removeButton);
  removeButton.appendChild(closeButtonIcon);

  // Append the new line item to the list
  // const ingredientItemList = document.getElementById("ingredientItemList");
  ingredientList.appendChild(listItem);

  // Automatically focus on the input field for user convenience
  inputElement.focus();

  // Add a click event listener to the Remove button to remove the line item
  removeButton.addEventListener("click", function () {
    if (ingredientList.children.length > 1) {
      ingredientList.removeChild(listItem); // Remove the line item if there is more than one item
    }
  });
}

function addStepItem() {
  // Create a new list item element with the specified classes
  const listItem = document.createElement("li");
  listItem.classList.add("list-group-item", "d-flex", "align-items-center");
  listItem.id = "addlist";

  // Create an input element with the specified attributes and classes
  const inputElement = document.createElement("input");
  inputElement.type = "text";
  inputElement.placeholder = "Add next step";
  inputElement.classList.add("form-control");
  inputElement.name = "recipe[steps]";
  inputElement.required = true;

  // Create a button element with the specified attributes and classes
  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.classList.add("btn", "btn-transparent", "pl-2");
  removeButton.setAttribute("aria-label", "Close");

  // Create a span element with the "x" symbol
  const closeButtonIcon = document.createElement("span");
  closeButtonIcon.textContent = "×";
  closeButtonIcon.setAttribute("aria-hidden", "true");

  // Append elements to the list item
  listItem.appendChild(inputElement);
  listItem.appendChild(removeButton);
  removeButton.appendChild(closeButtonIcon);

  // Append the new line item to the list
  stepList.appendChild(listItem);

  // Automatically focus on the input field for user convenience
  inputElement.focus();

  // Add a click event listener to the Remove button to remove the line item
  removeButton.addEventListener("click", function () {
    if (stepList.children.length > 1) {
      stepList.removeChild(listItem); // Remove the line item if there is more than one item
    }
  });
}

addIngredientLink.addEventListener("click", function (event) {
  event.preventDefault();
  addIngredientItem();
});

addStepLink.addEventListener("click", function (event) {
  event.preventDefault();
  addStepItem();
});

stepList.addEventListener("click", function (event) {
  if (event.target.classList.contains("remove-button")) {
    if (stepList.children.length > 1) {
      const listItem = event.target.parentElement;
      stepList.removeChild(listItem);
    }
  }
});

ingredientList.addEventListener("click", function (event) {
  if (event.target.classList.contains("remove-button")) {
    if (ingredientList.children.length > 1) {
      const listItem = event.target.parentElement;
      ingredientList.removeChild(listItem);
    }
  }
});
