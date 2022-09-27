/* == RENDERING FUNCTIONS == */

// Render simple label/span data in the DOM
function renderData(label, value) {
    var span = $("<span>").text(value);

    if (label == "ID") {span.addClass("id");}

    return $("<label>").text(`${label}: `).append(span);
}

// Render a task by appending it to the DOM with all the correct elements
function renderTask(task) {
    return $("<div>").addClass("task card column col-5").append(
        $("<div>").addClass("card-body")

            // Title and description
            .append($("<h5>").addClass("card-title").text(task.title))
            .append($("<p>").text(task.description))
            
            // Simple data (<label>Label: <span>Value</span></label>)
            .append(renderData("ID", task.id)) // ID            
            .append(renderData("Needs nice weather", task.weather)) // Weather
            .append(renderData("Due date", task.dueDate)) // Due Date   
            .append(renderData("Completed", task.completed)) // Completed
            
            // Buttons for Mark as Complete, Update, and Delete
            .append($("<button>").addClass("btn btn-primary").text("Complete"))
            .append($("<button>")
                .addClass("btn btn-secondary")
                .text("Update")
                .attr("data-mdb-toggle","modal")
                .attr("data-mdb-target", "#update-task-modal")
            )
            .append($("<button>").addClass("btn btn-secondary").text("Delete"))
    )
}

// Display all the tasks by emptying the DOM container and re-appending all the elements
function renderAllTasks() {
    $("#task-list").empty();

    getFilteredTasks().forEach(task => {
        $("#task-list").append(renderTask(task));
    });
}