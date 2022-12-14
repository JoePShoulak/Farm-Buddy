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

// Render the weather data
function renderWeatherData(data) {
    $("#weather-display").text(`Weather is ${data.response.ob.weather}`);
}

// Render the dad joke
function renderDadJoke(dadJoke) {
    dadJoke = dadJoke[0];
    
    $("#joke-setup").text(dadJoke.setup);
    $("#joke-punchline").text(dadJoke.punchline);
}

function renderAllForecastData(data) {
console.log(data.response[0].periods)

    data.response[0].periods.forEach(forecast => {
        $("#forecast-list").append(renderForecast(forecast));
    });
}

// Render a task by appending it to the DOM with all the correct elements
function renderForecast(forecast) {
    return $("<div>").addClass("task card column col-3").append(
        $("<div>").addClass("card-body")

            // Title and description
            .append($("<h5>").addClass("card-title").text(forecast.dateTimeISO.split("T")[0]))
            .append($("<p>").text(forecast.weather))

            .append($("<img>").attr("src", `https://cdn.aerisapi.com/wxicons/v2/${forecast.icon}`))
            
            // Simple data (<label>Label: <span>Value</span></label>)
            .append(renderData("High", forecast.maxTempF)) // ID
            .append(renderData("Low", forecast.minTempF)) // ID
    )
}