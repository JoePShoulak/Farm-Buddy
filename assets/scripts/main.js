// Global state variable -- this feels dirty
var taskBeingEditedID = null;

// Frequent DOM elements
var taskListContainer = $("#task-list");

// Test data
var testTask = {
    id: 1,
    title: "Testing",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",

    dueDate: moment().format("YYYY-MM-DD"),
    weather: true,
    completed: false,
}

var testTask2 = {
    id: 2,
    title: "Testing 2",
    description: "Wassup Wassup Wassup Wassup Wassup.",

    dueDate: moment().format("YYYY-MM-DD"),
    weather: true,
    completed: false,
}

var taskList = [testTask, testTask2];

// Get the object data from the update form
function getFormData() {
    return {
        title: $("#form-title").val(),
        description: $("#form-description").val(),
        id: taskBeingEditedID,
    
        dueDate: $("#form-due-date").val(),
        weather: $("#form-weather").is(":checked"),
        completed: $("#form-completed").is(":checked"),
    };
}

// Get the object id from an HTML element containing the data for a task object
function getIdFromTaskElement(taskElement) {
    return taskElement.find(".id")[0].innerHTML;
}

// Populate the form with the data from the task object
function autofillForm() {
    var data = taskList.find(e => e.id == taskBeingEditedID);

    $("#form-title").val(data.title);
    $("#form-description").val(data.description);

    $("#form-due-date").val(data.dueDate);
    $("#form-weather").prop('checked', data.weather);
    $("#form-completed").prop('checked', data.completed);
}

// Clear the form 
function clearForm() {
    $("#form-title").val("");
    $("#form-description").val("");

    $("#form-due-date").val("");
    $("#form-weather").prop('checked', false);
    $("#form-completed").prop('checked', false);
}

// Delete the task with the specified ID
function deleteTask() {
    taskList = taskList.filter(t => t.id != taskBeingEditedID);

    displayAllTasks();
}

function completeTask() {
    var taskListIndex = taskList.findIndex(e => e.id == taskBeingEditedID);
    taskList[taskListIndex].completed = true;

    displayAllTasks();
}

// The callback function for clicking a button on a task
function taskClicked(event) {
    if (event.target.tagName != "BUTTON") {return;} // if it's not a button, quit
    
    var button = $(event.target); // Grab our button (now that we know it is one)
    var taskElement = button.parent().parent(); // Grab our task element (the grandparent of the button)

    taskBeingEditedID = getIdFromTaskElement(taskElement); // Keep track of what we're editing
    
    // If we're updating a task...
    if (button.text() == "Update") {
        autofillForm(); // The task is updated by the submit form button of the modal opened by this same click action
    } else if (button.text() == "Delete") {
        deleteTask();
    } else if (button.text() == "Complete") {
        completeTask();
    }
}

// Update the task object where it sits in the array
function updateTask() {
    var data = getFormData(); // Grab the updated data from the form modals

    // Grab the list index where the ID matches what we're editing
    var taskListIndex = taskList.findIndex(e => e.id == taskBeingEditedID);

    taskList[taskListIndex] = data; // Update the data where it sits

    displayAllTasks(); // Re-render everything
}

// Handle the creation of a new task
function newTask() {
    // Set the new ID to one more than the max of all current IDs
    taskBeingEditedID = Math.max(...taskList.map(t => t.id)) + 1;

    clearForm(); // Clear the form because we have no info to go off of

    // Add an element to the array with no data but an ID 
    taskList.push({
        id: taskBeingEditedID,
    })
}

// Read through the TaskList array and remove any data that has not been fully instantiated
function filterOutTrashData() {
   taskList = taskList.filter(t => t.title != undefined);
}

// Event Listeners
taskListContainer.on("click", taskClicked);
$("#form-submit").on("click", updateTask);
$("#new-task").on("click", newTask);
$(".close-modal").on("click", filterOutTrashData)

// Render simple label/span data in the DOM
function renderData(label, value) {
    var span = $("<span>").text(value);

    if (label == "ID") {span.addClass("id");}

    return $("<label>").text(`${label}: `).append(span);
}

// Render a task by appending it to the DOM with all the correct elements
function renderTask(task) {
    return $("<div>").addClass("task card column col-4").append(
        $("<div>").addClass("card-body")

            // Title and description
            .append($("<h5>").addClass("card-title").text(task.title))
            .append($("<p>").text(task.description))
            
            // Simple data (<label>Label: <span>Value</span></label>)
            .append(renderData("ID", task.id)) // ID            
            .append(renderData("Weather", task.weather)) // Weather
            .append(renderData("Due date", task.dueDate)) // Due Date   
            .append(renderData("Completed", task.completed)) // Completed
            
            // Buttons for Mark as Complete, Update, and Delete
            .append($("<button>").addClass("btn btn-primary").text("Complete"))
            .append($("<button>")
                .addClass("btn btn-secondary")
                .text("Update")
                .attr("data-mdb-toggle","modal")
                .attr("data-mdb-target", "#updateTaskModal")
            )
            .append($("<button>").addClass("btn btn-secondary").text("Delete"))
    )
}

// Display all the tasks by emptying the DOM container and re-appending all the elements
function displayAllTasks() {
    taskListContainer.empty();

    taskList.forEach(task => {
        taskListContainer.append(renderTask(task));
    });
}

// When the page first loads...
function init() {
    // Display all tasks
    displayAllTasks();
}

// Run this once when the page first loads
init();