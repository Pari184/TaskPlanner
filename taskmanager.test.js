import TaskManager from "./taskmanager.js";

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