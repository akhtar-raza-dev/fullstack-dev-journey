let todo = [];

let req = prompt("Please enter your request[Either: list or add or delete or quit] ");

while (true) {
    if (req === "quit") {
        console.log("quitting the app");
        break;
    }

    if(req === "list") {
        console.log("------------------------------------");
        if (todo.length === 0) {
            console.log("No tasks yet!");
        } else {
            for(let i = 0; i < todo.length; i++) {
                console.log(`${i}: ${todo[i]}`);
            }
        }
        console.log("------------------------------------");
    } else if(req === "add") {
        let task = prompt("Please enter the task you want to add: ");
        if (task && task.trim().length > 0) {
            todo.push(task);
            console.log("Task added successfully!");
        } else {
            console.log("Cannot add empty task. Please try again.");
        }
    } else if(req === "delete") {
        let index = prompt("Please enter the index of the task you want to delete: ");
        index = parseInt(index, 10);
        if(isNaN(index)) {
            console.log("Invalid index. Please enter a number.");
        } else if (index >= 0 && index < todo.length) {
            todo.splice(index, 1);  // splice modifies array in-place, don't reassign!
            console.log("Task deleted successfully!");
        } else {
            console.log("Invalid index. Please try again.");
        }
    } else {
        console.log("Invalid request. Please enter either: list, add, delete, or quit.");
    }

    req = prompt("Please enter your request[Either: list or add or delete or quit] ");

}