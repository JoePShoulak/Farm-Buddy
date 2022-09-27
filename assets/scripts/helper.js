/* == HELPER FUNCTIONS == */

// Get the object id from an HTML element containing the data for a task object
function getIdFromTaskElement(taskElement) {
    return taskElement.find(".id")[0].innerHTML;
}

// Read through the TaskList array and remove any data that has not been fully instantiated
// This should probably be done better 
function filterOutTrashData() {
   taskList = taskList.filter(t => t.title != undefined);
}