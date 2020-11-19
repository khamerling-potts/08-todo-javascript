//I used the api documentation provided to help with javascript

document.addEventListener("DOMContentLoaded", function(){


var xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var todos = JSON.parse(this.responseText);
        console.log(todos);
    }
};

xhttp.open("GET", "https://cse204.work/todos", true);
xhttp.setRequestHeader("x-api-key","f32d02-3f32cc-c59414-4b288d-c7f6a6");
xhttp.send();



//make new todo when form is submitted
document.getElementById("addform").addEventListener("submit", (event)=>{
    event.preventDefault();
    console.log("the add form submitted");

    // Setting variable for form input (get from HTML form)
    var data = {
       text: document.getElementById("add").value
    }

    // Initalize AJAX Request
    var xhttp2 = new XMLHttpRequest();

    // Response handler
    xhttp2.onreadystatechange = function() {

        // Wait for readyState = 4 & 200 response
        if (this.readyState == 4 && this.status == 200) {

            // parse JSON response
            var todo = JSON.parse(this.responseText);
            

            console.log(todo);

        } else if (this.readyState == 4) {

            // this.status !== 200, error from server
            console.log(this.responseText);

        }
    };

    xhttp2.open("POST", "https://cse204.work/todos", true);

    xhttp2.setRequestHeader("Content-type", "application/json");
    xhttp2.setRequestHeader("x-api-key", "f32d02-3f32cc-c59414-4b288d-c7f6a6");
    xhttp2.send(JSON.stringify(data));
    var li = document.createElement("li");
    li.innerHTML = data.text;
    document.getElementById("todoList").appendChild(li);
});

// Setting variable for ToDo id
var id = todo.id

// Initalize AJAX Request
var xhttp2 = new XMLHttpRequest();

// Response handler
xhttp2.onreadystatechange = function() {

    // Wait for readyState = 4 & 200 response
    if (this.readyState == 4 && this.status == 200) {

        // parse JSON response
        var todo = JSON.parse(this.responseText);

        console.log(todo);

    } else if (this.readyState == 4) {

        // this.status !== 200, error from server
        console.log(this.responseText);

    }
};

xhttp2.open("GET", "https://cse204.work/todos/"+id, true);

xhttp2.setRequestHeader("Content-type", "application/json");
xhttp2.setRequestHeader("x-api-key", "f32d02-3f32cc-c59414-4b288d-c7f6a6");
xhttp2.send(JSON.stringify(data));

//w3schools helped me figure out how to create a new list item
function newToDo(text){
    var li = document.createElement("li");
    li.innerHTML = text;
    document.getElementById("todoList").appendChild(li);
}


});


