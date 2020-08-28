//import Task from "./task.js";
import TaskManager from "./taskmanager.js";

// Class for creating task
var checkValidName = false; //global variable
var checkValidDesc = false; //global variable
var checkValidAssignee = false;
var checkValidStatus = false;
var checkValidDate = false;

//div in html to append new tasks.
const taskContainer = document.querySelector('#tasksummary');
//Instance of TaskManager class
const taskManager = new TaskManager(taskContainer, editTaskClicked, deleteTaskClicked);

//Variable for add task form in html
const taskForm = document.querySelector('#task-form');

const edttask = document.querySelector("#editTask");

//Variables for add task fields
const addBtn = document.querySelector("#addTask");
const name = document.querySelector("#taskName");
const description = document.querySelector("#textDescription");
const assignee = document.querySelector("#assignedTo");
const date = document.querySelector("#dueDate");
const status = document.querySelector("#taskStatus");

//Variables for add task corresponding error fileds
const errMsg1 = document.querySelector("#errMsg1");
const errMsg2 = document.querySelector("#errMsg2");
const errMsg3 = document.querySelector("#errMsg3");
const errMsg4 = document.querySelector("#errMsg4");
const errMsg5 = document.querySelector("#errMsg5");


//Variables for edit task fields
const tid = document.getElementById("editTaskID");
const tname = document.getElementById("editTaskName");
const tdesc = document.getElementById("editTextDescription");
const tassignee = document.getElementById("editAssignedTo");
const tdate = document.getElementById("editDueDate");
const tstatus = document.getElementById("editTaskStatus");

//Variables for edit task corresponding error fileds
// const errMsg1 = document.querySelector("#errMsg6");
// const errMsg2 = document.querySelector("#errMsg7");
// const errMsg3 = document.querySelector("#errMsg8");
// const errMsg4 = document.querySelector("#errMsg9");
// const mode = "Edit";


//Function onclick of "Add Task" button
addBtn.onclick = function() {   
        //Calling addTask function in TaskManager class after successful validation by passing values  
        taskManager.addTask(name.value, description.value, assignee.value, date.value, status.value);
        taskManager.display();

        //Resetting the add task form fields.
        taskForm.reset();
        
        //Reset validation messages
        clearErrorFields();

        //Hiding of the modal after adding task
        $("#addModal").modal("hide");
};

  
  // Validation if individual fields are not complete
  name.addEventListener("input", function(event) {
    if (event.target.value && event.target.value.length <= 8) {
      errMsg1.innerHTML = "Task name should be longer than 8 characters";
      errMsg1.style.color = "red";
      name.focus();
      checkValidName = false;
    } else {
        errMsg1.innerHTML = "Looks Good!";
        errMsg1.style.color = "green";
        checkValidName = true;
    }
  });

  description.addEventListener("input", function(event) {
    if (event.target.value && event.target.value.length <= 8) {
      //errMsg1.innerHTML = "";
      errMsg2.innerHTML = "Task description should be longer than 15 characters";
      errMsg2.style.color = "red";
      description.focus();
      checkValidDesc = false;
      
    } else {
        errMsg2.innerHTML = "Looks Good!";
        errMsg2.style.color = "green";
        checkValidDesc = true;
    }
  });

  assignee.addEventListener("input", function(event) {
    if (event.target.value && event.target.value.length <= 8) {
      //errMsg1.innerHTML = "";
      errMsg3.innerHTML = "Assignee name should be longer than 8 characters";
      errMsg3.style.color = "red";
      assignee.focus();
      checkValidAssignee = false;
    } else {
        errMsg3.innerHTML = "Looks Good!";
        errMsg3.style.color = "green";
        checkValidAssignee = true;
    }
  });

  date.addEventListener("change", function(event) {
    if (event.target.value == 0) {
      //errMsg1.innerHTML = "";
      errMsg4.innerHTML = "Please select a valid date."
      errMsg4.style.color = "red";
      date.focus();
      checkValidDate = false;
    } else {
        errMsg4.innerHTML = "Looks Good!";
        errMsg4.style.color = "green";
        checkValidDate = true;
    }
  });

  status.addEventListener("change", function(event) {
    if (event.target.value === "Please Choose") {
      //errMsg1.innerHTML = "";
      errMsg5.innerHTML = "Please select a valid status."
      errMsg5.style.color = "red";
      status.focus();
      checkValidStatus = false;
    } else {
        errMsg5.innerHTML = "Looks Good!";
        errMsg5.style.color = "green";
        checkValidStatus = true;
    }
  });


// Clear all error message labels
function clearErrorFields() {
    errMsg1.innerHTML = "";
    errMsg2.innerHTML = "";
    errMsg3.innerHTML = "";
    errMsg4.innerHTML = "";
    errMsg5.innerHTML = "";
  }

  
/*function validateFormElements(name,description,assignee,dueDate,mode){
    var errMsg1 = "";
    var errMsg2 = "";
    var errMsg3 = "";
    var errMsg4 = "";
    if(mode == "ADD"){
       errMsg1 =  "#errMsg1";
       errMsg2 = "#errMsg2";
       errMsg3 = "#errMsg3";
       errMsg4 = "#errMsg4";
    }
    else{
        errMsg1 =  "#errMsg6";
       errMsg2 = "#errMsg7";
       errMsg3 = "#errMsg8";
       errMsg4 = "#errMsg9";
    }
    if (name.value == "" || name.value.length < 8 ) {
        setErrorMessage("This field cannot be blank, must be 8 chars long and can be alpha numeric",errMsg1);
        name.style.borderColor = "red";
        name.focus();
        checkValidName=false;
    } else {
        setValidationSuccessMessage(errMsg1);
        name.style.border = "none";
        checkValidName = true;
    }
    if (description.value == "" || description.value.length < 15 ) {
        setErrorMessage("This field cannot be blank and must be 15 chars long",errMsg2);
        description.style.borderColor = "red";
        description.focus();
        checkValidDesc=false;
    }       else {
        setValidationSuccessMessage(errMsg2);
        description.style.border = "none";
        checkValidDesc=true;
    }
    if (assignee.value == "" || assignee.value.length < 8) {
        setErrorMessage("This field cannot be blank and must be 8 chars long",errMsg3);
        assignee.style.borderColor = "red";
        assignee.focus();
        checkValidAssignee = false;
    } else {
        setValidationSuccessMessage(errMsg3);
        assignee.style.border = "none";
        checkValidAssignee = true;
    }
    // var currentDate = new Date();
    // dueDateValue = new Date(dueDate.value);
    // if (dueDateValue.value == undefined || dueDateValue < currentDate){
    //     setErrorMessage("The date is lesser than current date",errMsg4);
    //     dueDate.style.borderColor = "red";
    //     dueDate.focus();
    //     checkValidDate = false;
    // }
    // else{
    //     setValidationSuccessMessage(errMsg4);
    //     dueDate.style.border = "none";
    //     checkValidDate = true;
    // }
        

}

*/

edttask.onclick = function() {

    validateFormElements(tname,tdesc,tassignee,tdate,mode);


    //later call the validation function.
    if (checkValidName && checkValidDesc && checkValidAssignee && checkValidDate) {
        taskManager.updateTask(tid.value, tname.value, tdesc.value, tassignee.value, tdate.value, tstatus.selected);
        resetValidationMessages();
        $("#editModal").modal("hide");
    }
    else
        $("#editModal").focus();
    // else {
    //     return false;
    // }
    
}


function editTaskClicked(event) {
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
    
}

function deleteTaskClicked(event) {
    //const taskElement = event.target.closest(".task");
    var currentElement = $(this.parentElement).closest("#taskEdit")[0].getElementsByTagName("p");
    const taskID = currentElement[0].id;
    taskManager.deleteTask(taskID);
    taskManager.display();
}


