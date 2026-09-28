const fs = require("fs");
const readline = require("readline");

const FILE_NAME = "tasks.json";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


function getTasks() {
  const data = fs.readFileSync(FILE_NAME, "utf-8");

  return JSON.parse(data);
}

function saveTasks(tasks) {
  fs.writeFileSync(
    FILE_NAME,
    JSON.stringify(tasks, null, 2)
  );
}


function addTask() {
  rl.question("Task name: ", (title) => {
    const tasks = getTasks();

    const newTask = {
      id: tasks.length + 1,
      title: title
    };

    tasks.push(newTask);

    saveTasks(tasks);

    console.log("\nTask added successfully!\n");

    showMenu();
  });
}

// Show all tasks
function showTasks() {
  const tasks = getTasks();

  console.log("\n=== Tasks ===");

  if (tasks.length === 0) {
    console.log("No tasks found.");
  } else {
    tasks.forEach((task) => {
      console.log(`${task.id}. ${task.title}`);
    });
  }

  console.log("");

  showMenu();
}

// Delete a task
function deleteTask() {
  const tasks = getTasks();

  if (tasks.length === 0) {
    console.log("\nNo tasks to delete.\n");
    showMenu();
    return;
  }

  console.log("\n=== Tasks ===");

  tasks.forEach((task) => {
    console.log(`${task.id}. ${task.title}`);
  });

  rl.question("\nEnter task id: ", (input) => {
    const id = Number(input);

    const taskIndex = tasks.findIndex(
      (task) => task.id === id
    );

    if (taskIndex === -1) {
      console.log("\nTask not found.\n");
      showMenu();
      return;
    }

    tasks.splice(taskIndex, 1);

    // Re-number tasks
    tasks.forEach((task, index) => {
      task.id = index + 1;
    });

    saveTasks(tasks);

    console.log("\nTask deleted successfully!\n");

    showMenu();
  });
}

// Main menu
function showMenu() {
  console.log("=== Task Manager ===");
  console.log("1. Add task");
  console.log("2. Show tasks");
  console.log("3. Delete task");
  console.log("4. Exit");

  rl.question("\nChoose an option: ", (choice) => {
    switch (choice) {
      case "1":
        addTask();
        break;

      case "2":
        showTasks();
        break;

      case "3":
        deleteTask();
        break;

      case "4":
        console.log("\nGoodbye!");
        rl.close();
        break;

      default:
        console.log("\nInvalid option.\n");
        showMenu();
    }
  });
}

// Start application
showMenu();