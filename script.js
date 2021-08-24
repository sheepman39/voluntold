
            var teacher = "mendoza";
            /*
            Each choices object has two things:
                An array with student names
                An extra array that stores the students that were selected
            Each extra array allows for flexibility and modularity and restartability for the program
            */
            function dynamicButtons(data) {
                try {
                        
                        for (classHour in data[teacher]) {
                            
                            var button = document.createElement("BUTTON");
                            button.setAttribute("id", classHour);
                            button.innerHTML = data[teacher][classHour].className;

                            // makes the button visible on the body
                            document.getElementById("container").appendChild(button);

                            
                            button.addEventListener("click", function (classHour) {
                                return function(){
                                    studentSelector(data[teacher][classHour]);
                                }
                            }(classHour));
                        }
                } catch (err) {
                    document.getElementById("debug").innerHTML = err;
                    console.log(err);
                }
            }
            let Classes;

            fetch('./students.json')
                .then(function (response) {
                    response.clone().json();
                    return response.json();
                })
                .then(function (data) {

                    Classes = data;
                    //stringClasses = JSON.stringify(Classes, null, 4);
                    //document.getElementById("debug").innerHTML = "Classes: " + stringClasses;
                    //dynamicButtons(data);
                    return data;

                })
                .then(function (data) {

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
                document.getElementById("output").innerHTML = "<b><em>Next Victim:</em></b>" + pick;
                document.getElementById("remaining").innerHTML = "Students left: " + hour.names;
                document.getElementById("numberRemaining").innerHTML = "Number of students remaining: " + hour.names.length;

            }