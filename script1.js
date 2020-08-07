// Class for creating task
class Task{
    constructor(id, name, description, assignee, date, status){
        this.id = id;
        this.name = name;
        this.description = description;
        this.assignee= assignee;
        this.date = date;
        this.status = status;
        this.isDelete = false;
    }
    // Function to set the HTML code for all task
    toHTMLString(){
        const HTML = `
        <div class="card-body py-3">
                <div class="row no-gutters align-items-center">
                    <div class="col"> <a href="javascript:void(0)" class="text-big" data-abc="true">${this.name}</a>
                    </div>
                    <div class="col-4 text-muted">
                        <div class="row no-gutters align-items-center">
                            <div class="col"><a class="btn btn-primary" href="images/pencil.svg"></a><a class="btn btn-primary" href="images/alert.svg"/></a></div>
                        </div>
                    </div>
                </div>
            </div>
            <hr class="m-0">
        `;
        //const element = document.createRange().createContextualFragment(HTML);
        return HTML;
    }
    // Function to create HTML elements for task
    toHtmlElement(){
        const html = this.toHTMLString();
        const element = document.createRange().createContextualFragment(html);
        // element
        //     .querySelector("button.edit")
        //     .addEventListener("click", editTaskClicked);
        // element
        //     .querySelector("button.delete")
        //     .addEventListener("click", deleteTaskClicked);
        return element;
    }
}

// Class for managing and accessing the task
class TaskManager {
    constructor(parent) {
        this.tasks = [];
        this.currentId = 1;
        this.parent = parent;
    }
    // Function to add a task and push the task to tasks array.
    addTask(name, description, assignee, date, status) {
        const task = new Task(`task${this.currentId++}`, name, description, assignee, date, status);
        this.tasks.push(task);
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
    // To display all the tasks from "tasks" array.
    display() {
        this.parent.innerHTML = "";
        const cardheading = `<div class="card mb-3" id="tasksummary">
        <div class="card-header pl-0 pr-0">
            <div class="row no-gutters w-100 align-items-center">
                <div class="col ml-3">Tasks</div>
                <div class="col-4 text-muted">
                    <div class="row no-gutters align-items-center">
                        <div class="col">Edit/Delete</div>
                    </div>
                </div>
            </div>
        </div>`;
        const helement = document.createRange().createContextualFragment(cardheading);
        this.parent.append(helement);
        this.tasks.forEach((task) => {
            const taskElement = task.toHtmlElement();
            this.parent.append(taskElement);

        });

    }
}
  

/* code for card heading 
        <div class="card mb-3">
            <div class="card-header pl-0 pr-0">
                <div class="row no-gutters w-100 align-items-center">
                    <div class="col ml-3">Tasks</div>
                    <div class="col-4 text-muted">
                        <div class="row no-gutters align-items-center">
                            <div class="col">Edit/Delete</div>
                        </div>
                    </div>
                </div>
            </div>
*/

/*const taskContainer = document.querySelector(".addModal");

const createTask = document.querySelector("#addTask");
createTask.addEventListener("click", validation);

function validation(){
    const taskname = document.querySelector("#")
    //validation for all fields
}*/


const taskContainer = document.querySelector('#tasksummary');
const taskManager = new TaskManager(taskContainer);

//const taskContainer = document.querySelector('#tasks');

//const createButton = document.querySelector('.addTask');
//createButton.addEventListener("click", createTaskClicked);

const taskForm = document.querySelector('#task-form');
//taskForm.addEventListener("addTask", taskFormSubmitted);

//const modalElement = document.querySelector('#addModal');


let addBtn = document.querySelector("#addTask");

addBtn.onclick = function() {

    let name = document.querySelector("#taskName");
    let errMsg1 = document.querySelector("#errMsg1");
    let errMsg2 = document.querySelector("#errMsg2");
    let errMsg3 = document.querySelector("#errMsg3");
    let description = document.querySelector("#textDescription");
    let assignee = document.querySelector("#assignedTo");


    let date = document.querySelector("#dueDate");
    let status = document.querySelector("#taskStatus");
    let checkValid = false;

    if (name.value == "" || name.value.length < 8) {

        errMsg1.innerHTML = "This field cannot be blank and must be 8 chars long";
        name.style.borderColor = "red";
        errMsg1.style.color = "red";


    } else {
        errMsg1.innerHTML = "Looks Good";
        errMsg1.style.color = "green";
        name.style.border = "none";
        name.focus();
        checkValid = true;
    }
    if (description.value == "" || description.value.length < 15) {

        errMsg2.innerHTML = "This field cannot be blank and must be 15 chars long";
        description.style.borderColor = "red";
        errMsg2.style.color = "red";


    } else {

        errMsg2.innerHTML = "Looks good";
        description.style.border = "none";
        errMsg2.style.color = "green";
        description.focus();
        checkValid = true;

    }
    if (assignee.value == "" || assignee.value.length < 8) {

        errMsg3.innerHTML = "This field cannot be blank and must be 8 chars long";
        assignee.style.borderColor = "red";
        errMsg3.style.color = "red";


    } else {
        errMsg3.innerHTML = "Looks Good";
        errMsg3.style.color = "green";
        assignee.style.border = "none";
        assignee.focus();
        checkValid = true;

    }
    if (checkValid == true) {
        //const taskContainer = document.querySelector('#tasksummary');
        const gettask = taskManager.addTask(name.value, description.value, assignee.value, date.value, status.value, shouldRefresh = true);
        if (shouldRefresh) {
        //refreshPage(TaskManager.tasks)
        //const element = task.toHtmlElement();
        //taskContainer.append(element);
        taskManager.display();
        }
        //taskContainer.append(element);
        //const element = newta.toHTMLString();
        //taskContainer.innerHTML = "";
        //taskManager.addTaskToPage(task);
        
        $("#addModal").modal("hide");
    } else {
        return false;
    }
};


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


function addTaskToPage(task) {
    const element = task.toHtmlElement();
    taskContainer.append(element);
}