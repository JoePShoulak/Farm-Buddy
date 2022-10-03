/* == Global Variables == */

// Global state variable -- this feels dirty
var taskBeingEditedID = null;

// Filter states
var filter = {
    weather: false,
}

/* == MAIN EDITING FUNCTIONS - DELETE, COMPLETE, UPDATE, NEW == */

// Delete the task with the specified ID
function deleteTask() {
    taskList = taskList.filter(t => t.id != taskBeingEditedID);

    renderAllTasks();
    saveToStorage();
}

// Mark a task as complete
function completeTask() {
    var taskListIndex = taskList.findIndex(e => e.id == taskBeingEditedID);
    taskList[taskListIndex].completed = true;

    renderAllTasks();
    saveToStorage();
}

// Update the task object where it sits in the array
function updateTask() {
    var data = getFormData(); // Grab the updated data from the form modals

    // Grab the list index where the ID matches what we're editing
    var taskListIndex = taskList.findIndex(e => e.id == taskBeingEditedID);

    taskList[taskListIndex] = data; // Update the data where it sits

    renderAllTasks(); // Re-render everything
    saveToStorage();
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

/* == MAIN ACTION-HANDLING FUNCTION == */

// The callback function for clicking a button on a task
function taskClicked(event) {
    if (event.target.tagName != "BUTTON") {return;} // if it's not a button, quit
    
    var button = $(event.target); // Grab our button (now that we know it is one)
    var taskElement = button.parent().parent(); // Grab our task element (the grandparent of the button)

    taskBeingEditedID = getIdFromTaskElement(taskElement); // Keep track of what we're editing
    
    // If we're updating a task...
    if (button.text() == "Update") {
        autofillForm();
        // The task is updated by the submit form button of the modal opened by this same click action
    } else if (button.text() == "Delete") {
        deleteTask();
    } else if (button.text() == "Complete") {
        completeTask();
    }
}

/* == FILTER FUNCTIONS == */

// Dynamically return a subset of all tasks that match the current filters
function getFilteredTasks() {
    var filteredList = taskList; // Make a copy of our list

    Object.keys(filter).forEach(key => { // For each thing we might be filtering on...
        if (filter[key]) { //  If it's an active filter...
            filteredList = filteredList.filter(t => t[key]) // Refilter our list based on it
        }
    });

    return filteredList;
}

// Update the filter object whenever a filter input element is clicked
function updateFilter(event) {
    if (event.target.tagName != "INPUT") {return;} // If it's not an input, quit (probably redundant)

    var filterKey = event.target.id.split("-")[0]; // Grab the correct key to update the filter objecct
    
    filter[filterKey] = $(event.target).is(":checked"); // Update the filter value to the state of the checkbox

    renderAllTasks(); // Rerender all tasks
}

/* == EVENT LISTENERS == */
$("#task-list").on("click", taskClicked);
$("#form-submit").on("click", updateTask);
$("#new-task").on("click", newTask);

$(".close-modal").on("click", filterOutTrashData);
$(".filter").on("click", updateFilter);

/* == DB FUNCTIONS == */
// Load our tasks from localStorage
function loadFromStorage() {
    return JSON.parse(localStorage.getItem("tasks"));
}

// Save our tasks to localStorage
function saveToStorage() {
    localStorage.setItem("tasks", JSON.stringify(taskList));
}

// Reset localStorage with dummy data
function resetLocalStorage() {
    localStorage.clear(); // Clear storage
    taskList = testTasks; // Overrite loaded data with testData
    
    renderAllTasks();
    saveToStorage();
}

/* == API FUNCTIONS == */
// Get dad joke API data
async function getDadJoke() {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'dd51b13c60mshcfa44cb1124b33fp109983jsnb399edffa700',
            'X-RapidAPI-Host': 'dad-jokes.p.rapidapi.com'
        }
    };
    
    return fetch('https://dad-jokes.p.rapidapi.com/random/joke', options)
        .then(response => response.json())
        .then(response => response.body)
}

// Get weather API data
async function getWeatherData() {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'dd51b13c60mshcfa44cb1124b33fp109983jsnb399edffa700',
            'X-RapidAPI-Host': 'aerisweather1.p.rapidapi.com'
        }
    };
    
    return fetch('https://aerisweather1.p.rapidapi.com/observations/corcoran,mn', options)
        .then(response => response.json())
        .catch(err => console.error(err));
}

/* == INIT == */
var taskList = loadFromStorage(); // Load all our tasks from storage
if (taskList == null) {
    taskList = testTasks;
}

// When the page first loads...
async function init() {
    // Display all tasks
    renderAllTasks();
    
    // Render APIS
    renderWeatherData(await getWeatherData());
    renderDadJoke(await getDadJoke());
}

// Run this once when the page first loads
init();
