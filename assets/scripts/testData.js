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
    weather: false,
    completed: true,
}

var testTasks = [testTask, testTask2];
