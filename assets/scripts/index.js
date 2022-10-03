/* == INIT == */
var taskList = loadFromStorage(); // Load all our tasks from storage
if (taskList == null) { taskList = testTasks; }

// When the page first loads...
async function init() {
    // This is only for if I need to repop my localStorage data with some nice test data
    // const debug = true;
    // if (debug) {$("footer").append($("<button>").text("Reset Data").on("click", resetLocalStorage))}

    // Display all tasks
    renderAllTasks();
    
    // Render APIS
    renderWeatherData(await getWeatherData());
    renderDadJoke(await getDadJoke());
}

// Run this once when the page first loads
init();
