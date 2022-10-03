/* == FORM HANDLING FUNCTIONS == */

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
// TODO: Clean up the ClearForm Function https://stackoverflow.com/questions/6364289/clear-form-fields-with-jquery
function clearForm() {
    $("#form-title").val("");
    $("#form-description").val("");

    $("#form-due-date").val("");
    $("#form-weather").prop('checked', false);
    $("#form-completed").prop('checked', false);
}

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