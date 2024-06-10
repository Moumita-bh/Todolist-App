document.addEventListener('DOMContentLoaded', () => {
    displayTodos();
    displayArchivedTodos();
});

function getTodos() {
    return JSON.parse(localStorage.getItem('todos')) || [];
}

function getArchivedTodos() {
    return JSON.parse(localStorage.getItem('archive')) || [];
}

function saveTodos(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function saveArchivedTodos(archivedTodos) {
    localStorage.setItem('archive', JSON.stringify(archivedTodos));
}

function addTodo() {
    const title = document.getElementById('todoInput').value;
    const priority = document.getElementById('prioritySelect').value;

    if (!title) {
        alert('Todo cannot be empty!');
        return;
    }

    const todos = getTodos();
    todos.push({
        title: title,
        priority: priority,
        status: 'Pending🔃'
    });

    saveTodos(todos);
    displayTodos();
}

function displayTodos() {
    const todos = getTodos();
    const todoTableBody = document.getElementById('todoTableBody');
    todoTableBody.innerHTML = '';

    todos.forEach((todo, index) => {
        const row = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.textContent = todo.title;
        row.appendChild(nameCell);

        const priorityCell = document.createElement('td');
        priorityCell.textContent = todo.priority;
        if (todo.priority === 'medium') {
            priorityCell.classList.add('medium-priority');
        } else if (todo.priority === 'high') {
            priorityCell.classList.add('high-priority');
        }
        row.appendChild(priorityCell);

        const statusCell = document.createElement('td');
        const statusButton = document.createElement('button');
        statusButton.textContent = todo.status;
        statusButton.onclick = () => toggleStatus(index);
        statusCell.appendChild(statusButton);
        row.appendChild(statusCell);

        const deleteCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Archive';
        deleteButton.classList.add('archive-button');
        deleteButton.onclick = () => archiveItem(index);
        deleteCell.appendChild(deleteButton);
        row.appendChild(deleteCell);

        todoTableBody.appendChild(row);
    });
}

function toggleStatus(index) {
    const todos = getTodos();
    todos[index].status = todos[index].status === 'Pending🔃' ? 'Completed✅' : 'Pending🔃';
    saveTodos(todos);
    displayTodos();
}

function archiveItem(index) {
    const todos = getTodos();
    const archivedTodos = getArchivedTodos();

    const archivedItem = todos.splice(index, 1)[0];
    archivedTodos.push(archivedItem);

    saveTodos(todos);
    saveArchivedTodos(archivedTodos);
    displayTodos();
}

function displayArchivedTodos() {
    const archivedTodos = getArchivedTodos();
    const archiveTableBody = document.getElementById('archiveTableBody');
    archiveTableBody.innerHTML = '';

    archivedTodos.forEach((todo, index) => {
        const row = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.textContent = todo.title;
        row.appendChild(nameCell);

        const priorityCell = document.createElement('td');
        priorityCell.textContent = todo.priority;
        if (todo.priority === 'medium') {
            priorityCell.classList.add('medium-priority');
        } else if (todo.priority === 'high') {
            priorityCell.classList.add('high-priority');
        }
        row.appendChild(priorityCell);

        const statusCell = document.createElement('td');
        statusCell.textContent = todo.status;
        row.appendChild(statusCell);

        const restoreCell = document.createElement('td');
        const restoreButton = document.createElement('button');
        restoreButton.textContent = 'Restore';
        restoreButton.onclick = () => restoreItem(index);
        restoreCell.appendChild(restoreButton);
        row.appendChild(restoreCell);

        const deleteCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteArchivedItem(index);
        deleteCell.appendChild(deleteButton);
        row.appendChild(deleteCell);

        archiveTableBody.appendChild(row);
    });
}

function restoreItem(index) {
    const archivedTodos = getArchivedTodos();
    const todos = getTodos();

    const restoredItem = archivedTodos.splice(index, 1)[0];
    todos.push(restoredItem);

    saveArchivedTodos(archivedTodos);
    saveTodos(todos);
    displayArchivedTodos();
    displayTodos();
}

function deleteArchivedItem(index) {
    const archivedTodos = getArchivedTodos();
    archivedTodos.splice(index, 1);

    saveArchivedTodos(archivedTodos);
    displayArchivedTodos();
}

function filterArchivedTodos() {
    const priorityFilter = document.getElementById('priorityFilter').value;
    const statusFilter = document.getElementById('statusFilter').value;

    const archivedTodos = getArchivedTodos();
    const filteredTodos = archivedTodos.filter(todo => {
        const priorityMatch = priorityFilter === 'all' || todo.priority === priorityFilter;
        const statusMatch = statusFilter === 'all' || todo.status === statusFilter;
        return priorityMatch && statusMatch;
    });

    const archiveTableBody = document.getElementById('archiveTableBody');
    archiveTableBody.innerHTML = '';

    filteredTodos.forEach((todo, index) => {
        const row = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.textContent = todo.title;
        row.appendChild(nameCell);

        const priorityCell = document.createElement('td');
        priorityCell.textContent = todo.priority;
        if (todo.priority === 'medium') {
            priorityCell.classList.add('medium-priority');
        } else if (todo.priority === 'high') {
            priorityCell.classList.add('high-priority');
        }
        row.appendChild(priorityCell);

        const statusCell = document.createElement('td');
        statusCell.textContent = todo.status;
        row.appendChild(statusCell);

        const actionsCell = document.createElement('td');
        const restoreButton = document.createElement('button');
        restoreButton.textContent = 'Delete';
        restoreButton.onclick = () => restoreItem(index);
        actionsCell.appendChild(restoreButton);

        const deleteCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteArchivedItem(index);
        deleteCell.appendChild(deleteButton);
        row.appendChild(deleteCell);

        archiveTableBody.appendChild(row);
    });
}

