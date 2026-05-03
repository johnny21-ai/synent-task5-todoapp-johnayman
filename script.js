let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// عرض التاريخ
const dateEl = document.getElementById('dateDisplay');
const today = new Date();
dateEl.textContent = today.toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
});

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
    const list = document.getElementById('taskList');
    const emptyMsg = document.getElementById('emptyMsg');
    const totalCount = document.getElementById('totalCount');
    const doneCount = document.getElementById('doneCount');

    list.innerHTML = '';

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = 'task-item' + (task.done ? ' done' : '');

        li.innerHTML = `
            <input type="checkbox" ${task.done ? 'checked' : ''} onchange="toggleTask(${index})">
            <span class="task-text">${task.text}</span>
            <button class="delete-btn" onclick="deleteTask(${index})">&#x2715;</button>
        `;

        list.appendChild(li);
    });

    const done = tasks.filter(t => t.done).length;
    totalCount.textContent = tasks.length + ' task' + (tasks.length !== 1 ? 's' : '');
    doneCount.textContent = done + ' done';

    if (tasks.length === 0) {
        emptyMsg.classList.add('visible');
    } else {
        emptyMsg.classList.remove('visible');
    }
}

function addTask() {
    const input = document.getElementById('taskInput');
    const text = input.value.trim();

    if (text === '') return;

    tasks.unshift({ text: text, done: false });
    saveTasks();
    renderTasks();

    input.value = '';
    input.focus();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

function toggleTask(index) {
    tasks[index].done = !tasks[index].done;
    saveTasks();
    renderTasks();
}

document.getElementById('taskInput').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') addTask();
});

renderTasks();