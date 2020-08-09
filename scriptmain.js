class taskManager {
    constructor(parent) {
        this.tasks = [];
        this.currentId = 1;
        this.parent = parent;

    }
    addTask(name, description, assignee, date, status) {
        const task = new Task(`task${this.currentId++}`, name, description, assignee, date, status);
        this.tasks.push(task)
    }
    updateTask(id, name, description, assignee, date, status) {
        for (let i = 0; i < this.tasks.length; i++) {
            if (this.tasks[i].id == id) {
                this.tasks[i].name = name;
                this.tasks[i].description = description;
                this.tasks[i].assignee = assignee;
                this.tasks[i].date = date;
                this.tasks[i].status = status;
                break;
            }
        }

    }
    deleteTask(id) {
        this.tasks = this.tasks.filter(
            (t) => t.id !== id);

    }
    display() {
        this.parent.innerHTML = "";
        this.forEach((task) => {
            const taskElement = task.toHtmlElement();
            this.parent.append(taskElement);

        });

    }
}
class Task {
    constructor(id, name, description, assignee, date, status) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.assignee = assignee;
        this.date = date;
        this.status = status;
    }
    toHtmlElement() {
        const html = this.toHtmlString();
        const element = document.createRange().createContextualFragment(html);
        element
            .querySelector("button.edit")
            .addEventListener("click", editTaskClicked);
        element
            .querySelector("button.delete")
            .addEventListener("click", deleteTaskClicked);
        return element;
    }
    toHtmlString() {
        const html = `
        <div id="${this.id}" class="task col-lg-4 col-md-6 mb-4">
        <div class="card">
        <div class="card-header">
        ${this.date}
        </div>
        <div class="card-body">
        <h5 class="card-title">${this.name}</h5>
        <p class="card-text">${this.description}</p>
        </div>
        <div class="card-footer text-muted">
        ${this.assignee}-${this.status}
        <button class="edit btn btn-primary btn-sm float-right ml-2"><i class="far fa-edit"></i></button>
        <button class="delete btn btn-danger btn-sm float-right"><i class="far fa-trash-alt"></i></button>
        </div>
        </div>
        </div>
        `;
        return html;
    }
}

const taskContainer = document.querySelector('#tasks');
const taskManager = new TaskManager(taskContainer);

//const taskContainer = document.querySelector('#tasks');

const createButton = document.querySelector('#create-button');
createButton.addEventListener("click", createTaskClicked);

const taskForm = document.querySelector('#task-form');
taskForm.addEventListener("submit", taskFormSubmitted);

const modalElement = document.querySelector('#task-modal');

//Handle change events on Form elements
const taskIdInput = document.querySelector('#task-id');

const taskNameInput = document.querySelector('#task-name');
taskNameInput.addEventListener("input", (event) => {
    checkName(event.target)
});
const taskDescriptionInput = document.querySelector('#task-description');
taskDescriptionInput.addEventListener("input", (event) => {
    checkDescription(event.target)
});
const taskAssigneeInput = document.querySelector('#task-assignee');
taskAssigneeInput.addEventListener("input", (event) => {
    checkAssignee(event.target)
});
const taskDateInput = document.querySelector('#task-date');
taskDateInput.addEventListener("input", (event) => {
    checkDate(event.target)
});

const taskStatusInput = document.querySelector('#task-status');

function createTaskClicked(event) {
    clearValidation();
    clearModalFormFields();
    $("#task-modal").modal("show");
}

function clearModalFormFields() {
    taskIdInput.value = null;
    taskNameInput.value = null;
    taskDescriptionInput.value = null;
    taskAssigneeInput.value = null;
    taskDateInput.value = null;
    taskStatusInput.value = null;
}

function checkName(element) {
    if (element.value && element.value.length > 8) {
        addValidMessage(element)
        return true;
    } else {
        addInvalidMessage(element)
        return false;
    }
}

function checkDescription(element) {
    if (element.value && element.value.length > 15) {
        addValidMessage(element)
        return true;
    } else {
        addInvalidMessage(element)
        return false;
    }
}

function checkAssignee(element) {
    if (element.value && element.value.length > 8) {
        addValidMessage(element)
        return true;
    } else {
        addInvalidMessage(element)
        return false;
    }
}

function checkDate(element) {
    if (element.value) {
        addValidMessage(element);
        return true;
    } else {
        addInvalidMessage(element)
        return false;
    }
}

function addValidMessage(inputElement) {
    inputElement.classList.remove("is-invalid");
    inputElement.classList.add("is-valid")

}

function addInValidMessage(inputElement) {
    inputElement.classList.remove("is-valid");
    inputElement.classList.add("is-invalid")

}

function addTaskToPage(task) {
    const element = task.toHtmlElement();
    taskContainer.append(element);
}

function editTaskClicked(event) {
    clearValidation();
    const taskElement = event.target.closest(".task");
    const task = taskManager.tasks.find((t) => taskElement.id === t.id);

    taskIdInput.value = task.id;
    taskNameInput.value = task.name;
    taskDescriptionInput.value = task.description;
    taskAssigneeInput.value = task.assignee;
    taskDateInput.value = task.date;
    taskStatusInput.value = task.status;
    $("#task-modal").modal("show");
}

function deleteTaskClicked(event) {
    const taskElement = event.target.closest(".task");
    taskManager.deleteTask(taskElement.id);
    taskManager.display();
}

function clearValidation() {
    taskNameInput.classList.remove("is-invalid", "is-valid");
    taskDescriptionInput.classList.remove("is-invalid", "is-valid");
    taskAssigneeInput.classList.remove("is-invalid", "is-valid");
    taskDateInput.classList.remove("is-invalid", "is-valid");
}





function addTask(name, description, assignee, date, status, shouldRefresh = true) {
    taskManager.addTask(name, description, assignee, date, status);
    if (shouldRefresh) {
        //refreshPage(TaskManager.tasks)
        taskManager.display();
    }


}

function updateTask(id, name, description, assignee, date, status, shouldRefresh = true) {
    taskManager.updateTask(id, name, description, assignee, date, status);
    if (shouldRefresh) {
        //refreshPage(taskManager.tasks);
        taskManager.display();
    }
}

// function refreshPage(tasks) {
//     taskManager.display();

// }


taskManager.display();