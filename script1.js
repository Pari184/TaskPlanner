class Task{
    constructor(tid, tname, tdesc, assignedto, duedate, status){
        this.tname = name;
        this.tdesc = tdesc;
        this.assignedTo = assignedto;
        this.duedate = duedate;
        this.status = status;
        this.isDeleted = false;
    }
}

class TaskManager{
    constructor(){
        this.currentID = 1;
        this.tasks = [];
    }

    getAllTask(){
        // code to display in the landing page all the tasks!
        // only with isDeleted true.
        for(let i=0;i<=this.tasks.length;i++){
            if(!this.isDeleted)
            {
                //return this.tasks[i]; Display the tasks
                this.newDisplayTask.push(task);
            }
        }
        return newDisplayTask;
    }

    addTask(tname, tdesc, assignedto, duedate, status){
        const task = new Task(this.currentID++, tname, tdesc, assignedto,duedate,status);
        this.tasks.push(task);
    }
    displayTask(id){
        for(let i=0;i<=this.tasks.length;i++){
            if(this.currentId == id)
            {
                //return this.tasks[i];
            }
        }
    }
    deleteTask(id){
        //code to delete task
        this.isDeleted = true;
    }
    statusSort(status){
        // code to filter by status
    }
}

let addBtn = document.querySelector("#addTask");

addBtn.onclick = function() {

    let taskName = document.querySelector("#taskName");
    let errMsg1 = document.querySelector("#errMsg1");
    let errMsg2 = document.querySelector("#errMsg2");
    let errMsg3 = document.querySelector("#errMsg3");
    let textDescription = document.querySelector("#textDescription");
    let assignedTo = document.querySelector("#assignedTo");


    let dueDate = document.querySelector("#dueDate");
    let taskStatus = document.querySelector("#taskStatus");
    let checkValid = false;

    if (taskName.value == "" || taskName.value.length < 8) {

        errMsg1.innerHTML = "This field cannot be blank and must be 8 chars long";
        taskName.style.borderColor = "red";
        errMsg1.style.color = "red";


    } else {
        errMsg1.innerHTML = "Looks Good";
        errMsg1.style.color = "green";
        taskName.style.border = "none";
        taskName.focus();
        checkValid = true;
    }
    if (textDescription.value == "" || textDescription.value.length < 15) {

        errMsg2.innerHTML = "This field cannot be blank and must be 15 chars long";
        textDescription.style.borderColor = "red";
        errMsg2.style.color = "red";


    } else {

        errMsg2.innerHTML = "Looks good";
        textDescription.style.border = "none";
        errMsg2.style.color = "green";
        textDescription.focus();
        checkValid = true;

    }
    if (assignedTo.value == "" || assignedTo.value.length < 8) {

        errMsg3.innerHTML = "This field cannot be blank and must be 8 chars long";
        assignedTo.style.borderColor = "red";
        errMsg3.style.color = "red";


    } else {
        errMsg3.innerHTML = "Looks Good";
        errMsg3.style.color = "green";
        assignedTo.style.border = "none";
        assignedTo.focus();
        checkValid = true;

    }



    if (checkValid == true) {
        //add task goes here
        //taskManager.addTask(taskName.value, taskDescription.value, assignedTo.value, dueDate.value, taskStatus.value,"" );
        //and then call the display task list method
        //displayTaskList();
    } else {
        return false;
    }




}