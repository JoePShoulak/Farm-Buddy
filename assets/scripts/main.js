// Global state variable -- this feels dirty
var taskBeingEditedID = null;

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

function autofillForm(data) {
    $("#form-title").val(data.title);
    $("#form-description").val(data.description);

    $("#form-due-date").val(data.dueDate);
    $("#form-weather").prop('checked', data.weather);
    $("#form-completed").prop('checked', data.completed);
}

function clearForm() {
    $("#form-title").val("");
    $("#form-description").val("");

    $("#form-due-date").val("");
    $("#form-weather").prop('checked', false);
    $("#form-completed").prop('checked', false);
}

// The callback function for clicking a button on a task
function taskClicked(event) {
    if (event.target.tagName != "BUTTON") {return;} // if it's not a button, quit
    
    var button = $(event.target); // Grab our button (now that we know it is one)
    var taskElement = button.parent().parent(); // Grab our task element (the grandparent of the button)

    // If we're updating a task...
    if (button.text() == "Update") {
        taskBeingEditedID = getIdFromTaskElement(taskElement); // Keep track of what we're editing

        var data = taskList.find(e => e.id == taskBeingEditedID);

        autofillForm(data);


        /* The rest of the task is updated by interacting with the modal that is 
           automatically opened by clicking on any update button. When clicking 
           "Save Changes" on the Update modal, the action of updating the object
           data in the array (as well as re-rendering it in the DOM) is handled. */ 
    }
}

// Update the task object where it sits in the array
function updateTask() {
    var data = getFormData(); // Grab the updated data from the form modals

    // Grab the list index where the ID matches what we're editing
    var taskListIndex = taskList.findIndex(e => e.id == taskBeingEditedID);

    console.log(taskList[taskListIndex] )
    taskList[taskListIndex] = data; // Update the data where it sits
    console.log(taskList[taskListIndex] )

    displayAllTasks(); // Re-render everything
}

function newTask() {
    // Set the new ID to one more than the max of all current IDs
    taskBeingEditedID = Math.max(...taskList.map(t => t.id)) + 1;

    clearForm();

    taskList.push({
        id: taskBeingEditedID,
    })
}

// Event Listeners
$("#task-list").on("click", taskClicked);
$("#form-submit").on("click", updateTask);
$("#new-task").on("click", newTask);

$(".close-modal").on("click", function() {
    console.log(taskList)
    
    var trash = taskList.pop(); 
    
    console.log(taskList)
})

// Render a task by appending it to the DOM with all the correct elements
function renderTask(task) {
    return $("<div>").addClass("task card column col-4").append(
        $("<div>").addClass("card-body")

            // Title and description
            .append($("<h5>").addClass("tcard-title").text(task.title))
            .append($("<p>").text(task.description))
            
            // ID
            .append($("<label>").text("ID:")
                .append($("<span>").text(task.id).addClass("id"))
            )

            // Weather
            .append($("<label>").text("Weather-Dependant:")
                .append($("<span>").text(task.weather))
            )

            // Due Date 
            .append($("<label>").text("Due Date:")
                .append($("<span>").text(task.dueDate))
            )

            // Completed? 
            .append($("<label>").text("Completed:")
                .append($("<span>").text(task.completed))
            )
            
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
    $("#task-list").empty();

    taskList.forEach(task => {
        $("#task-list").append(renderTask(task));
    });
}

// When the page first loads...
function init() {
    // Display all tasks
    displayAllTasks();
}

// Run this once when the page first loads
init();