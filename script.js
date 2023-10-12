

// Get references to HTML elements
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// Retrieve stored items from local storage
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Function to render the list
function renderTodoList() {
  // Clear existing list items
    todoList.innerHTML = '';

  // Render each item in the todos array
    todos.forEach((todo, index) => {
    // Create list item element
    const listItem = document.createElement('li');

    // Create checkbox element
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    // Create text element
    const text = document.createElement('span');
    text.textContent = todo;

    // Create delete button element
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'x';
    deleteButton.classList.add('delete-button');

    // Add event listener to delete button
    deleteButton.addEventListener('click', () => {
      // Remove item from todos array
        todos.splice(index, 1);

      // Update local storage
        localStorage.setItem('todos', JSON.stringify(todos));

      // Render the updated list
        renderTodoList();
    });

    // Append elements to the list item
    listItem.appendChild(checkbox);
    listItem.appendChild(text);
    listItem.appendChild(deleteButton);

    // Append list item to the todo list
    todoList.appendChild(listItem);
    });
}

// Add event listener to form submit event
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();

  // Get the value of the input field
    const todoText = todoInput.value.trim();

    if (todoText !== '') {
    // Add new item to todos array
    todos.unshift(todoText);

    // Update local storage
    localStorage.setItem('todos', JSON.stringify(todos));

    // Clear the input field
    todoInput.value = '';

    // Render the updated list
    renderTodoList();
    }
});

// Render the initial list on page load
renderTodoList();