let addBtn = document.querySelector("#addTask");

addBtn.onclick = function() {

    let taskName = document.querySelector("#taskName");
    let errMsg1 = document.querySelector("#errMsg1");
    let errMsg2 = document.querySelector("#errMsg2");
    let errMsg3 = document.querySelector("#errMsg3");
    let textDescription = document.querySelector("#textDescription");
    let assignedTo = document.querySelector("#assignedTo");
    if (taskName.value == "" || taskName.value.length < 8) {

        errMsg1.innerHTML = "This field cannot be blank and must be 8 chars long";
        taskName.style.borderColor = "red";
        errMsg1.style.color = "red";
        //return false;

    } else {
        errMsg1.innerHTML = "Looks Good";
        errMsg1.style.color = "green";
        taskName.style.border = "none";
        // return true;
    }
    if (textDescription.value == "" || textDescription.value.length < 15) {

        errMsg2.innerHTML = "This field cannot be blank and must be 15 chars long";
        textDescription.style.borderColor = "red";
        errMsg2.style.color = "red";
        // return false;

    } else {
        // return true;
        errMsg2.innerHTML = "Looks good";
        textDescription.style.border = "none";
        errMsg2.style.color = "green";
    }
    if (assignedTo.value == "" || assignedTo.value.length < 8) {

        errMsg3.innerHTML = "This field cannot be blank and must be 8 chars long";
        assignedTo.style.borderColor = "red";
        errMsg3.style.color = "red";
        //return false;

    } else {
        errMsg3.innerHTML = "Looks Good";
        errMsg3.style.color = "green";
        assignedTo.style.border = "none";
        // return true;
    }

}