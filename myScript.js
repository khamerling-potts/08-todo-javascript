//I used the api documentation provided to help with javascript

document.addEventListener("DOMContentLoaded", function(){

//List all todos when page loads
function listAllToDos(){
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var todos = JSON.parse(this.responseText);
            console.log(todos);
            for(i=0; i<todos.length; i++){
                //display all list items with close buttons
                var li = document.createElement("li");
                
                var checkbox = document.createElement("button");
                checkbox.innerHTML = "Done";
                checkbox.id=i;
                checkbox.style.marginRight = "10px";
                checkbox.style.backgroundColor = "#ceffc9";
                li.appendChild(checkbox);

                var todoLabel = document.createElement("label");
                todoLabel.id = i;
                todoLabel.innerHTML = todos[i].text;
                li.id=todos[i].id;
                li.appendChild(todoLabel);

                var button = document.createElement("button");
                //button.className = "close";
                button.innerHTML = "Delete";
                button.style.cssFloat = "right";
                button.style.backgroundColor = "#ffbdaf";
                li.appendChild(button);
                button.id=i;

                if (todos[i]["completed"] == true){
                    //var strikeText = document.getElementById(i).parentElement.childNodes[1];
                  
                    todoLabel.innerHTML=todos[i].text.strike();
                    // var strikeText = document.createElement("strike");
                    //console.log(todos[i].text.strike());
                    update(todos[i].id);
                }
                checkbox.addEventListener("click", function(event){
                   var strikeText = document.getElementById(event.target.id).parentElement.childNodes[1];
                  
                    strikeText.innerHTML=todos[event.target.id].text.strike();
                    // var strikeText = document.createElement("strike");
                    console.log(todos[event.target.id].text.strike());
                    update(todos[event.target.id].id);
                    
                    // todoLabel.appendChild(strikeText);
                    // strikeText.appendChild(todos[event.target.id].text);
                });
                button.addEventListener("click", function(event){
                    console.log("button clicked");
                    console.log(event.target);
                    // Setting variable for ToDo id
                    console.log(event.target.parentElement.parentElement);
                    console.log(event.target.id);
                    var id = todos[event.target.id].id;

                    //call retrieve, which gets the todo
                    retrieve(id);

                    //call update, which sends a put request
                    update(id);
                    
                    //call remove function, which deletes the todo
                    remove(id);
                });
                document.getElementById("todoList").appendChild(li);
            }
        }
};

xhttp.open("GET", "https://cse204.work/todos", true);
xhttp.setRequestHeader("x-api-key","f32d02-3f32cc-c59414-4b288d-c7f6a6");
xhttp.send();
}

listAllToDos();




//Make new todo when form is submitted
document.getElementById("addform").addEventListener("submit", (event)=>{
    event.preventDefault();
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
            //w3schools helped me figure out how to create a new list item
            var li = document.createElement("li");
            var checkbox = document.createElement("button");
            checkbox.innerHTML = "Done";
            checkbox.style.marginRight = "10px";
            checkbox.style.backgroundColor = "#ceffc9";
            li.appendChild(checkbox);
            
            var todoLabel = document.createElement("label");

            todoLabel.innerHTML = todo.text;
            li.appendChild(todoLabel);
            var button = document.createElement("button");
            //button.className = "close";
            button.innerHTML = "Delete";
            button.style.cssFloat = "right";
            button.style.backgroundColor = "#ffbdaf";
            li.id=todo.id;
       
            if (todo["completed"] == true){
                //var strikeText = document.getElementById(i).parentElement.childNodes[1];
              
                todoLabel.innerHTML=todo.text.strike();
                // var strikeText = document.createElement("strike");
                //console.log(todos[i].text.strike());
                update(todo.id);
            }
            checkbox.addEventListener("click", function(event){
               
                var strikeText = checkbox.parentElement.childNodes[1];
                  
                strikeText.innerHTML=todo.text.strike();
                    // var strikeText = document.createElement("strike");
                    //console.log(todos[event.target.id].text.strike());
                    //update(todos[event.target.id].id);
                todoLabel.innerHTML=todo.text.strike();
                update(todo.id);
                
            });
                button.addEventListener("click", function(event){
                    var id = todo.id;

                    //call retrieve, which gets the todo
                    retrieve(id);

                    //call update, which sends a put request
                    update(id);
                    
                    //call remove function, which deletes the todo
                    remove(id);
                });
            li.appendChild(button);
            document.getElementById("todoList").appendChild(li);
            
            

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
    
    document.getElementById("addform").reset();
});


//retrieves info for todo, calls GET
function retrieve(id){
    
    // Initalize AJAX Request
    var xhttp5 = new XMLHttpRequest();

    // Response handler
    xhttp5.onreadystatechange = function() {

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

    console.log(id);
    xhttp5.open("GET", "https://cse204.work/todos/"+id, true);

    xhttp5.setRequestHeader("Content-type", "application/json");
    xhttp5.setRequestHeader("x-api-key", "f32d02-3f32cc-c59414-4b288d-c7f6a6");
    xhttp5.send();

}

function update(id){
    // Including json object
    var data = {
        completed: true
    }
     //console.log(document.getElementById(id));
     //console.log("this is the parent text" + document.getElementById(id).text);

     // Initalize AJAX Request
     var xhttp3 = new XMLHttpRequest();
 
     // Response handler
     xhttp3.onreadystatechange = function() {
 
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
    //  console.log(data.completed);
 
     xhttp3.open("PUT", "https://cse204.work/todos/"+id, true);
 
     xhttp3.setRequestHeader("Content-type", "application/json");
     xhttp3.setRequestHeader("x-api-key", "f32d02-3f32cc-c59414-4b288d-c7f6a6");
     xhttp3.send(JSON.stringify(data));
}

function remove(id){
     // Initalize AJAX Request
     var xhttp4 = new XMLHttpRequest();
    
     // Response handler
     xhttp4.onreadystatechange = function() {
 
         // Wait for readyState = 4 & 200 response
         if (this.readyState == 4 && this.status == 200) {
 
             // parse JSON response
             //var todo = JSON.parse(this.responseText);
             //remove todo and its button from the html
            //document.getElementById(id).removeChild;
            document.getElementById(id).remove();
 
             //console.log(todo);
 
         } else if (this.readyState == 4) {
 
             // this.status !== 200, error from server
             console.log(this.responseText);

             
 
         }
     };
 
     xhttp4.open("DELETE", "https://cse204.work/todos/"+id, true);
 
     xhttp4.setRequestHeader("Content-type", "application/json");
     xhttp4.setRequestHeader("x-api-key", "f32d02-3f32cc-c59414-4b288d-c7f6a6");
     xhttp4.send();

     
}


});


