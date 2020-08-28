import TaskManager from "./taskmanager.js";
//import displayAllTasksFromStorage from "./display.js";

import path from "path";
import fs from "fs";
const html = fs.readFileSync(path.resolve(__dirname, "./index.html"), "utf8");


beforeEach(() =>{ //sets up the DOM
    //localStorage.clear();
    document.documentElement.innerHTML = html.toString();
});

//Test update task
test("Task Updation", () => {
    const taskmanager = new TaskManager();
    //Add the task first
    taskmanager.addTask("Unit Testing Task 1", "To buy groceries for this week", "Anuradha", "20/08/2020", "todo");
    //Edit the added task details
    taskmanager.updateTask("task1", "Laundry Services", "To complete the laundry service", "Parimala", "24/08/2020", "todo");
    //Verify the task is updated with the updated details
    expect(taskmanager.tasks[0].id).toBe("task1");
    expect(taskmanager.tasks[0].name).toBe("Laundry Services");
    expect(taskmanager.tasks[0].description).toBe("To complete the laundry service");
    expect(taskmanager.tasks[0].assignee).toBe("Parimala");
    expect(taskmanager.tasks[0].date).toBe("24/08/2020");
    expect(taskmanager.tasks[0].status).toBe("todo");
});

//Test delete task
test("Task Updation", () => {
    const taskmanager = new TaskManager();
    //Add the task first
    taskmanager.addTask("Unit Testing Task 1", "To buy groceries for this week", "Anuradha", "20/08/2020", "todo");
    //Delete the added task
    taskmanager.deleteTask("task1");
    //Verify the task is deleted and check the tasks array length
    expect(taskmanager.tasks.length).toBe(0);
    
});

test("HTML element added to page ", () => {
    let cardrow = document.querySelector("#tasksummary"); //Select the parent element
    const tm = new TaskManager(cardrow);
    tm.addTask("Task 3", "To pick kids Kumon worksheets", "Anuradha", "26-08-2020", "Todo");
    expect(tm.tasks.length).toBe(1);
    tm.display();
    console.log(cardrow.innerHTML);
    expect(cardrow.children.length).toBe(3);
});