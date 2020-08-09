// Class for creating task
class Task {
    constructor(id, name, description, assignee, date, status) {
            this.id = id;
            this.name = name;
            this.description = description;
            this.assignee = assignee;
            this.date = date;
            this.status = status;
            this.isDelete = false;
        }
        // Function to set the HTML code for all task
    toHTMLString() {
            const HTML = `
        <div class="card-body py-3">
        <div class="row no-gutters align-items-center" id="taskEdit">
            <div class="col"> <p class="text-big"   id="${this.id}" data-abc="true">${this.name}</p>


            <p class="text-big">${this.description}-${this.assignee}-${this.date}-${this.status}</p>

            </div>
            <div class="col-3 text-muted">
               
                    <button class="edit btn btn-primary ml-2"><i class="icon-edit" style="font-size:24px;color:blue"></i></i></button>
                    <button class="delete btn btn-danger"><i class="fas fa-trash-alt" style="font-size:24px;color:red"></i></i></button>
               
            </div>
        </div>
        </div>
        <hr class="m-0">
    `;


            // <div id="${this.id}" class="task col-lg-4 col-md-6 mb-4">
            // <div class="card">
            // <div class="card-header">
            // ${this.date}
            // </div>
            // <div class="card-body">
            // <h5 class="card-title">${this.name}</h5>
            // <p class="card-text">${this.description}</p>
            // </div>
            // <div class="card-footer text-muted">
            // ${this.assignee}-${this.status}
            // <button class="edit btn btn-primary btn-sm float-right ml-2"><i class="far fa-edit"></i></button>
            // <button class="delete btn btn-danger btn-sm float-right"><i class="far fa-trash-alt"></i></button>
            // </div>
            // </div>
            // </div>
            // ;

            //const element = document.createRange().createContextualFragment(HTML);
            return HTML;
        }
        // Function to create HTML elements for task
    toHtmlElement() {
        const html = this.toHTMLString();
        const element = document.createRange().createContextualFragment(html);
        element
            .querySelector("button.edit")
            .addEventListener("click", editTaskClicked);
        element
            .querySelector("button.delete")
            .addEventListener("click", deleteTaskClicked);
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
                this.display();
                //break;
            }
        }

    }
    deleteTask(id) {
            this.tasks = this.tasks.filter(
                (t) => t.id !== id);
            //this.display();



        }
        // To display all the tasks from "tasks" array.
    display() {
        this.parent.innerHTML = "";
        var cardheading = `<div class="card mb-3" id="tasksummary">
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
        if (this.tasks.length < 1) {
            cardheading = "";
        } else {
            const helement = document.createRange().createContextualFragment(cardheading);
            this.parent.append(helement);
            this.tasks.forEach((task) => {
                const taskElement = task.toHtmlElement();
                this.parent.append(taskElement);
            });
        }

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

//const editbtn;
//const taskContainer = document.querySelector('#tasks');

//const createButton = document.querySelector('.addTask');
//createButton.addEventListener("click", createTaskClicked);

const taskForm = document.querySelector('#task-form');
const taskIdInput = document.querySelector('#task-id');
//taskForm.addEventListener("addTask", taskFormSubmitted);

//const modalElement = document.querySelector('#addModal');


const addBtn = document.querySelector("#addTask");
const edttask = document.querySelector("#editTask");
var checkValid = true;


addBtn.onclick = function() {

    const name = document.querySelector("#taskName");
    //name.focus();
    const errMsg1 = document.querySelector("#errMsg1");
    const errMsg2 = document.querySelector("#errMsg2");
    const errMsg3 = document.querySelector("#errMsg3");
    const description = document.querySelector("#textDescription");
    const assignee = document.querySelector("#assignedTo");


    const date = document.querySelector("#dueDate");
    const status = document.querySelector("#taskStatus");


    if (name.value == "" || name.value.length < 8 || !isNaN(name.value)) {

        errMsg1.innerHTML = "This field cannot be blank, must be 8 chars long and can be alpha numeric";
        name.style.borderColor = "red";
        errMsg1.style.color = "red";
        checkValid = false;
        name.focus();
    } else {
        errMsg1.innerHTML = "Looks Good";
        errMsg1.style.color = "green";
        name.style.border = "none";
        //name.focus();
        //checkValid = true;
    }
    if (description.value == "" || description.value.length < 15 || !isNaN(description.value)) {

        errMsg2.innerHTML = "This field cannot be blank and must be 15 chars long";
        description.style.borderColor = "red";
        errMsg2.style.color = "red";
        checkValid = false;
        description.focus();
    }
     else {

        errMsg2.innerHTML = "Looks good";
        description.style.border = "none";
        errMsg2.style.color = "green";
        
        

    }
    if (assignee.value == "" || assignee.value.length < 8 || !isNaN(assignee.value)) {

        errMsg3.innerHTML = "This field cannot be blank and must be 8 chars long";
        assignee.style.borderColor = "red";
        errMsg3.style.color = "red";
        assignee.focus();

    } else {
        errMsg3.innerHTML = "Looks Good";
        errMsg3.style.color = "green";
        assignee.style.border = "none";
        
    }
    if (checkValid) {
        //const taskContainer = document.querySelector('#tasksummary');
        addBtn.focus();
        taskManager.addTask(name.value, description.value, assignee.value, date.value, status.value);
        taskManager.display();

        //taskContainer.append(element);
        //const element = newta.toHTMLString();
        //taskContainer.innerHTML = "";
        //taskManager.addTaskToPage(task);
        //document.forms["#task-form"].reset();
        document.querySelector("#task-form").reset();
        document.getElementsByClassName(".spanclass").hide();
        $("#addModal").modal("hide");
    } else {
        return false;
    }
};

edttask.onclick = function() {

    const name = document.querySelector("#taskName");
    const errMsg1 = document.querySelector("#errMsg1");
    const errMsg2 = document.querySelector("#errMsg2");
    const errMsg3 = document.querySelector("#errMsg3");
    const description = document.querySelector("#textDescription");
    const assignee = document.querySelector("#assignedTo");


    const date = document.querySelector("#dueDate");
    const status = document.querySelector("#taskStatus");
    const checkValid = false;

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
        taskManager.addTask(name.value, description.value, assignee.value, date.value, status.value, shouldRefresh = true);
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

        $("#editModal").modal("hide");
    } else {
        return false;
    }
};

// function addTask(name, description, assignee, date, status, shouldRefresh = true) {
//     taskManager.addTask(name, description, assignee, date, status);
//     if (shouldRefresh) {
//         //refreshPage(TaskManager.tasks)
//         taskManager.display();
//     }


// }

// function updateTask(id, name, description, assignee, date, status, shouldRefresh = true) {
//     taskManager.updateTask(id, name, description, assignee, date, status);
//     if (shouldRefresh) {
//         //refreshPage(taskManager.tasks);
//         taskManager.display();
//     }
// }


function editTaskClicked(event) {
    //clearValidation();
    var currentElement = $(this.parentElement).closest("#taskEdit")[0].getElementsByTagName("p");
    const taskID = currentElement[0].id;
    const taskName = currentElement[0].innerText;
    var contentsToSplit = currentElement[1].innerText.split('-');
    const taskDesc = contentsToSplit[0];
    const taskAssignee = contentsToSplit[1];
    const taskDate = contentsToSplit[2] + "-" + contentsToSplit[3] + "-" + contentsToSplit[4];
    const taskStatus = contentsToSplit[5];
    document.getElementById("editTaskID").value = taskID;
    document.getElementById("editTaskName").value = taskName;
    document.getElementById("editTextDescription").value = taskDesc;
    document.getElementById("editAssignedTo").value = taskAssignee;
    document.getElementById("editDueDate").value = taskDate;
    document.getElementById("editTaskStatus").selected = taskStatus;
    $("#editModal").modal("show");
    //later call the validation function.

    edttask.onclick = function() {
        const tid = document.getElementById("editTaskID");
        const tname = document.getElementById("editTaskName");
        const tdesc = document.getElementById("editTextDescription");
        const tassignee = document.getElementById("editAssignedTo");
        const tdate = document.getElementById("editDueDate");
        const tstatus = document.getElementById("editTaskStatus");
        taskManager.updateTask(tid.value, tname.value, tdesc.value, tassignee.value, tdate.value, tstatus.selected);
        $("#editModal").modal("hide");
    }



    //const taskElement = event.target.closest(`${this.id}`);
    //console.log(taskElement);
    //const task = taskManager.tasks.find((t) => taskElement.id === t.id);
    //console.log(task);

    // console.log(task);
    // taskIdInput.value = task.id;
    // name.value = task.name;
    // description.value = task.description;
    // assignee.value = task.assignee;
    // date.value = task.date;
    // status.value = task.status;
    //taskManager.updateTask(task.id.value, task.name.value, task.description.value, task.assignee.value, task.date.value, task.status.value);

}

function deleteTaskClicked(event) {
    //const taskElement = event.target.closest(".task");
    var currentElement = $(this.parentElement).closest("#taskEdit")[0].getElementsByTagName("p");
    const taskID = currentElement[0].id;
    taskManager.deleteTask(taskID);
    taskManager.display();
}


function addTaskToPage(task) {
    const element = task.toHtmlElement();
    taskContainer.append(element);
}