// Change this to the teacher name
var teacher = "fmendoza";

// dynamicButtons receives the data from the json file and will make a new button for each class
function dynamicButtons(data) {

    // in case if anything goes wrong, try/catch block for error reporting
    try {

        // loop that will take each hour from the teacher specified in line 2
        for (classHour in data[teacher]) {

            // creates the button element and sets the id as the value of the classHour
            var button = document.createElement("BUTTON");
            button.setAttribute("id", classHour);

            // If a specified className is specified in students.json, use that as the name
            // If no className is defined, use the default class hour name as the text
            button.innerHTML = data[teacher][classHour].className ? data[teacher][classHour].className : classHour;

            // makes the button visible on the body
            document.getElementById("container").appendChild(button);

            // adds the event listener to each of the buttons
            // because variable will change, this needs to be a local function with local variable scope
            button.addEventListener("click", function (classHour) {
                return function () {

                    // student selector is the function to select students
                    studentSelector(data[teacher][classHour]);
                }
            }(classHour));
        }

    } catch (err) {

        // if there are errors, print them out 
        document.getElementById("debug").innerHTML = `Ops something went wrong.  Please report the following error code:\n${err}`;
        console.log(err);

    }
}

// Defines Classes as a variable that will later have json data assigned to it
let Classes;

// fetch the json data from this file
fetch('./students.json')
    .then(function (response) {

        // clones the json response and returns that data
        response.clone().json();
        return response.json();
    })
    .then(function (data) {

        // sets the response data to the Classes object
        Classes = data;
        // debug code for json data
        //stringClasses = JSON.stringify(Classes, null, 4);
        //document.getElementById("debug").innerHTML = "Classes: " + stringClasses;
        //dynamicButtons(data);
        return data;

    })
    .then(function (data) {

        // when the DOMContentLoaded is true, start making the buttons
        document.addEventListener("DOMContentLoaded", dynamicButtons(Classes));

    })
    .catch(function (err) {
        console.log(err);
        document.getElementById("debug").innerHTML = `Ops something went wrong.  Please report the following error code:\n${err}`;
    });


// this function resets all of the names to be reused
function masterRestart(ClassObject) {

    // this takes each class hour extra array and pushes it back into the names
    for (classHour in ClassObject) {
        ClassObject[classHour].extra.forEach(name => {
            ClassObject[classHour].names.push(name);
        });
        ClassObject[classHour].extra = [];
    }

    // Displays a message that the classes are restarted
    document.getElementById("output").innerHTML = "All classes are restarted";
    document.getElementById("remaining").innerHTML = "Please pick a class";
    document.getElementById("numberRemaining").innerHTML = "";

}

// this is the random number generator
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
// this is the actual selector function
function studentSelector(hour) {

    // checks if the array is empty
    if (hour.names.length === 0) {

        // if the array is empty, push those names into the main array
        hour.extra.forEach(name => {
            hour.names.push(name)
        });

        // clears the extra array
        hour.extra = [];

    }

    // ranNum picks a random number between 0 and the length of the array
    // pick stores the name that is randomly selected
    var ranNum = getRndInteger(0, hour.names.length);
    var pick = hour.names[ranNum];

    // The chosen name is pushed to the extra array
    // then that name is removed from the names array so it is not picked again
    hour.extra.push(pick);
    hour.names.splice(ranNum, 1);

    // output of the selected student, students left, and the number left
    document.getElementById("output").innerHTML = "<b><em>Next Victim: </em></b>" + pick;
    document.getElementById("remaining").innerHTML = "Students left: " + hour.names.join(", ");
    document.getElementById("numberRemaining").innerHTML = "Number of students remaining: " + hour.names.length;

}