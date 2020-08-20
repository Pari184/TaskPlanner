import Task from "./task.js";

export default class TaskManager {
    constructor(parent, editTaskClicked, deleteTaskClicked) {
            this.tasks = [];
            this.currentId = 1;
            this.parent = parent;
            this.editTaskClicked = editTaskClicked;
            this.deleteTaskClicked = deleteTaskClicked;

        }
        // Function to add a task after successful validation and push the task to tasks array.
    addTask(name, description, assignee, date, status) {
        const task = new Task(`task${this.currentId++}`, name, description, assignee, date, status);
        this.tasks.push(task);
    }
    // Function to update the task with new edited values after successful validation.
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
    // Function for deleting a task whose id is passed.
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
                <div class="col-3 text-muted">
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
                const taskElement = task.toHtmlElement(this.editTaskClicked, this.deleteTaskClicked);
                this.parent.append(taskElement);
            });
        }

    }
}

