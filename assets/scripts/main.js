var taskBeingEdited = null;

var testTask = {
    id: 1,
    title: "Testing",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",

    dueDate: moment().format("MM/DD/YYYY"),
    weatherDependant: true,
    completed: false,
}

var taskList = [testTask];

function getFormData() {
    return {
        title: $("#form-title").val(),
        description: $("#form-description").val(),
    
        dueDate: $("#form-due-date").val(),
        weather: $("#form-weather").val(),
        completed: $("#form-completed").val(),
    };
}

function getIdFromTaskElement(taskElement) {
    return taskElement.find(".id")[0].innerHTML;
}

function taskClicked(event) {
    var button = $(event.target);

    if (event.target.tagName != "BUTTON") {return;}
    var task = button.parent().parent();

    if (button.text() == "Update") {
        taskBeingEdited = getIdFromTaskElement(task);
    }
}

function updateTask() {
    var data = getFormData(); 
    var taskListIndex = taskList.findIndex(e => e.id == taskBeingEdited);

    taskList[taskListIndex] = data;

    displayAllTasks();
}

// Event Listeners
$("#task-list").on("click", taskClicked);
$("#form-submit").on("click", updateTask);

function renderTask(task) {
    return $("<div>").addClass("task card column col-4").append(
        $("<div>").addClass("card-body")
            .append($("<h5>").addClass("tcard-title").text(task.title))
            .append($("<p>").text(task.description))
            
            .append($("<label>").text("ID:")
                .append($("<span>").text(task.id).addClass("id"))
            )

            .append($("<label>").text("Weather-Dependant:")
                .append($("<span>").text(task.weatherDependant))
            )

            .append($("<label>").text("Completed:")
                .append($("<span>").text(task.completed))
            )
            
            .append($("<button>").addClass("btn btn-primary").text("Complete"))
            .append($("<button>").addClass("btn btn-secondary").text("Update").attr("data-mdb-toggle","modal").attr("data-mdb-target", "#updateTaskModal"))
            .append($("<button>").addClass("btn btn-secondary").text("Delete"))
    )
}

function displayAllTasks() {
    $("#task-list").empty();

    taskList.forEach(task => {
        $("#task-list").append(renderTask(task));
    });
}

function init() {
    // Display all tasks
    displayAllTasks();
}

init();