// Global state variable -- this feels dirty
var taskBeingEdited = null;

// Test data
var testTask = {
    id: 1,
    title: "Testing",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",

    dueDate: moment().format("MM/DD/YYYY"),
    weatherDependant: true,
    completed: false,
}

var testTask2 = {
    id: 2,
    title: "Testing 2",
    description: "Wassup Wassup Wassup Wassup Wassup.",

    dueDate: moment().format("MM/DD/YYYY"),
    weatherDependant: true,
    completed: false,
}

var taskList = [testTask, testTask2];

// Get the object data from the update form
function getFormData() {
    return {
        title: $("#form-title").val(),
        description: $("#form-description").val(),
    
        dueDate: $("#form-due-date").val(),
        weather: $("#form-weather").val(),
        completed: $("#form-completed").val(),
    };
}

// Get the object id from an HTML element containing the data for a task object
function getIdFromTaskElement(taskElement) {
    return taskElement.find(".id")[0].innerHTML;
}

// The callback function for clicking a button on a task
function taskClicked(event) {
    if (event.target.tagName != "BUTTON") {return;} // if it's not a button, quit
    
    var button = $(event.target); // Grab our button (now that we know it is one)
    var taskElement = button.parent().parent(); // Grab our task element (the grandparent of the button)

    // If we're updating a task...
    if (button.text() == "Update") {
        taskBeingEdited = getIdFromTaskElement(taskElement); // Keep track of what we're editing

        /* The rest of the task is updated by interacting with the modal that is 
           automatically opened by clicking on any update button. When clicking 
           "Save Changes" on the Update modal, the action of updating the object
           data in the array (as well as re-rendering it in the DOM) is handled. */ 
    }
}

// Update the task object where it sits in the array
function updateTask() {
    var data = getFormData(); // Grab the updated data from the form modals

    // Grab the index where the ID matches what we're editing
    var taskListIndex = taskList.findIndex(e => e.id == taskBeingEdited);

    taskList[taskListIndex] = data; // Update the data where it sits

    displayAllTasks(); // Re-render everything
}

// Event Listeners
$("#task-list").on("click", taskClicked);
$("#form-submit").on("click", updateTask);

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
                .append($("<span>").text(task.weatherDependant))
            )

            // Completed? 
            .append($("<label>").text("Completed:")
                .append($("<span>").text(task.completed))
            )
            
            // Buttons for Mark as Complete, Update, and Delete
            .append($("<button>").addClass("btn btn-primary").text("Complete"))
            .append($("<button>").addClass("btn btn-secondary").text("Update").attr("data-mdb-toggle","modal").attr("data-mdb-target", "#updateTaskModal"))
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

init();