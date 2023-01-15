const ul = document.querySelector("ul");
const input = document.querySelector(".todo-input");
const btnAdd = document.querySelector(".add-btn");
const todoLis = 
[...document.querySelectorAll("li")];
const alertInfo = document.querySelector(".alert-info");

const popup = document.querySelector(".popup");
const popupInput = document.querySelector(".popup-input");
const popupSubmitBtn = document.querySelector(".popup-btn.accept");
const popupCancelBtn = document.querySelector(".popup-btn.cancel");
// let popupInputValue;
let editedTodo;

//ADD NEW TODO
const createNewTodo = () => {
  if (input.value.length) {
    const liText = input.value.trim();
    const liHTML = `
         ${liText}
         <div class="tools">
          <button class="complete"><i class="fas fa-check"></i></button><button class="edit">EDIT</button><button class="delete"><i class="fas fa-times"></i></button>
        </div>
      `;
    const id = Date.now();
    const li = document.createElement("li");
    li.setAttribute("id", id);
    li.innerHTML = liHTML;

    ul.appendChild(li);
    todoLis.push(li);
    input.value = "";
    handleEmptyListMessage();
  }
};

//DELETE ITEM FROM THE LIST
const deleteTodoAndChangeArrayOfTodos = (todo) => {
  const indexOfTodoToDelete = todoLis.indexOf(todo);
  todoLis.splice(indexOfTodoToDelete, 1);
  todo.remove();
};

const deleteTodo = (e) => {
  const todoToDelete = e.target.closest("li");
  deleteTodoAndChangeArrayOfTodos(todoToDelete);
  handleEmptyListMessage();
  console.log(todoLis.length);
};

const completedTodo = (e) => {
  e.target.closest("li").classList.toggle("completed");
};

//EDIT
const handleEdit = (e) => {
  popup.style.display = "flex";
  editedTodo = e.target.closest("li");
  const text = editedTodo.firstChild.textContent;
  const popupInputValue = text.trim();
  popupInput.value = popupInputValue;
  popupSubmitBtn.addEventListener("click", () => submitEdition(editedTodo));
};

//EDIT SUBMIT EDITION
const submitEdition = (editedTodo) => {
  if (popupInput.value.length) {
    const popupInputValue = popupInput.value.trim();
    console.log(popupInputValue);
    editedTodo.innerHTML = `
         ${popupInputValue}
         <div class="tools editedLi">
          <button class="complete"><i class="fas fa-check"></i></button>
          <button class="edit">EDIT</button>
          <button class="delete"><i class="fas fa-times"></i></button>
        </div>
      `;

    closePopup();
  }
};

//EDIT CLOSE POPUP
const closePopup = () => (popup.style.display = "none");
//HANDLE TODO TOOLS
const handleTodoTools = (e) => {
  if (
    e.target.classList.contains("delete") ||
    e.target.classList.contains("fa-times")
  ) {
    deleteTodo(e);
  } else if (
    e.target.classList.contains("complete") ||
    e.target.classList.contains("fa-check")
  ) {
    completedTodo(e);
  } else if (e.target.classList.contains("edit")) {
    handleEdit(e);
  }
};

//CHECK IF LIST OF TODOS IS EMPTY
const handleEmptyListMessage = () => {
  if (!todoLis.length) alertInfo.style.display = "block";
  else alertInfo.style.display = "none";
};

handleEmptyListMessage();

btnAdd.addEventListener("click", createNewTodo);
ul.addEventListener("click", handleTodoTools);
popupCancelBtn.addEventListener("click", closePopup);
