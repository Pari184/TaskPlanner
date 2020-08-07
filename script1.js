class Task{
    constructor(id, name, description, assignee, date, status){
        this.id = id;
        this.name = name;
        this.description = description;
        this.assignee = assignee;
        this.date = date;
        this.status = status;
        this.isDelete = false;
    }
    toHTMLString(){
        const HTML = `
        <hr class="m-0">
        <div class="card-body py-3">
                <div class="row no-gutters align-items-center">
                    <div class="col"><a href="javascript:void(0)" class="text-big" data-abc="true">${this.name}</a>
                    </div>
                    <div class="col-4 text-muted">
                        <div class="row no-gutters align-items-center">
                            <div class="col"><img src="images/expanddown.svg"><img src="images/pencil.svg"></div>
                        </div>
                    </div>
                </div>
        </div>
        `;
        const element = document.createRange().createContextualFragment(HTML);
        return element;
    }
}




let addBtn = document.querySelector("#addTask");
//let addModal = document.querySelector("#addModal");

addBtn.onclick = function() {

    let taskName = document.querySelector("#taskName");
    let errMsg1 = document.querySelector("#errMsg1");
    let errMsg2 = document.querySelector("#errMsg2");
    let errMsg3 = document.querySelector("#errMsg3");
    let textDescription = document.querySelector("#textDescription");
    let assignedTo = document.querySelector("#assignedTo");


    //let dueDate = document.querySelector("#dueDate");
    //let taskStatus = document.querySelector("#taskStatus");
    let dueDate = "07/08/2020";
    let taskStatus = "Inprogress";
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
        const taskContainer = document.querySelector('#tasksummary');
        let newta = new Task(6, taskName.value, textDescription.value, assignedTo.value, dueDate, taskStatus);
        const element = newta.toHTMLString();
        //taskContainer.innerHTML = "";
        taskContainer.append(element);
        $("#addModal").modal("hide");
    } else {
        return false;
    }
};
