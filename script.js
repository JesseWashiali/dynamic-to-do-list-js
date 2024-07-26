document.addEventListener("DOMContentLoaded", function() {
    // Select DOM elements
    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

    // Load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false));
    }

    // Create the addTask function
    function addTask(taskText, save = true) {
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create a new li element
        const taskListItem = document.createElement("li");
        taskListItem.textContent = taskText;

        // Create a new button element for removing the task
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.className = "remove-btn";

        // Assign an onclick event to the remove button
        removeButton.onclick = function() {
            taskList.removeChild(taskListItem);
            removeTaskFromLocalStorage(taskText);
        };

        // Append the remove button to the li element
        taskListItem.appendChild(removeButton);

        // Append the li element to taskList
        taskList.appendChild(taskListItem);

        // Clear the task input field
        taskInput.value = "";

        if (save) {
            saveTaskToLocalStorage(taskText);
        }
    }

    // Save task to Local Storage
    function saveTaskToLocalStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Remove task from Local Storage
    function removeTaskFromLocalStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const index = storedTasks.indexOf(taskText);
        if (index !== -1) {
            storedTasks.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }
    }

    // Attach event listeners
    addButton.addEventListener("click", function() {
        addTask(taskInput.value);
    });

    taskInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            addTask(taskInput.value);
        }
    });

    // Load tasks from Local Storage
    loadTasks();
});
