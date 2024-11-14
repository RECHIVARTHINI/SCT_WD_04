// app.js
let taskList = [];

function addTask() {
    const taskInput = document.getElementById("taskInput").value;
    const taskDate = document.getElementById("taskDate").value;
    
    if (taskInput === "") {
        alert("Please enter a task.");
        return;
    }

    const task = {
        id: new Date().getTime(),
        task: taskInput,
        date: taskDate,
        completed: false
    };

    taskList.push(task);
    document.getElementById("taskInput").value = '';
    document.getElementById("taskDate").value = '';
    renderTasks();
}

function toggleTaskCompletion(taskId) {
    const task = taskList.find(t => t.id === taskId);
    task.completed = !task.completed;
    renderTasks();
}

function editTask(taskId) {
    const task = taskList.find(t => t.id === taskId);
    const newTask = prompt("Edit your task:", task.task);
    if (newTask !== null) {
        task.task = newTask;
        renderTasks();
    }
}

function deleteTask(taskId) {
    taskList = taskList.filter(t => t.id !== taskId);
    renderTasks();
}

function renderTasks() {
    const taskListContainer = document.getElementById("taskList");
    taskListContainer.innerHTML = '';
    
    taskList.forEach(task => {
        const li = document.createElement("li");
        li.classList.toggle("completed", task.completed);

        const taskText = document.createElement("span");
        taskText.innerText = `${task.task} ${task.date ? `- Due: ${task.date}` : ""}`;
        li.appendChild(taskText);
        
        const actions = document.createElement("span");

        const toggleButton = document.createElement("button");
        toggleButton.innerText = task.completed ? "Undo" : "Complete";
        toggleButton.onclick = () => toggleTaskCompletion(task.id);
        actions.appendChild(toggleButton);

        const editButton = document.createElement("button");
        editButton.innerText = "Edit";
        editButton.onclick = () => editTask(task.id);
        actions.appendChild(editButton);

        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.onclick = () => deleteTask(task.id);
        actions.appendChild(deleteButton);

        li.appendChild(actions);
        taskListContainer.appendChild(li);
    });
}
