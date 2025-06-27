// number of todo's
let global_todo_count = 0;
// 
// sendUpdateTodo send the updated todo to backend
// 
function sendUpdateTodo(id,task,status,datetime){

    const data={
        id : id,
        task : task,
        status : status,
        datetime : datetime
    }

    fetch("/updatetodo" , {
        method:"POST",
        headers:{
                "Content-Type":"application/json"
            },
        body: JSON.stringify(data)
    })
    .then( response =>{
        if(!response.ok) throw new Error("response is false\n"+response.ok);
        
    })
    .catch( error =>{
        console.log("## error \t",error);
    });
}
// 
// 
// 
export function switch2Todo() {

    fetch("/gettodo")
        .then(response =>{
            if(!response.ok){
                throw new Error("response is false");
            }
            return response.json();
        })
        .then(data => {
            if(data == 500){
                throw new Error("data is not fetched");
            }
            addTodoOnContent(data);
        })
        .catch( error =>{
            console.log("## error\t"+error);
            return "error";
        });
}

function getDateTime(){

    const date = new Date();

    const month = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    let fdate = date.getDate() +' ' +month[date.getMonth()] + ' ' + date.getFullYear();

    let hr = date.getHours();
    let min = date.getMinutes();
    let meridiem = 'AM'; // default
    if (hr>=12){
        meridiem = 'PM';
        hr = hr % 12 || 12; 
    }

    let ftime = hr + ':' + min + ' ' + meridiem;
    
    return fdate + ' ' + ftime;
}

function addTodo(id,task,status,datetime){

        const content = document.querySelector("#content");
        const div = document.querySelector(".todo"); 
        const todoDiv = document.createElement("div");
        todoDiv.id = `task_id_${id}`
        todoDiv.classList.add(`todo`);
        todoDiv.classList.add(status);
        todoDiv.innerHTML = `<div class="task-box">
                    <p class="task">${task}</p>
                    <input type="text" oninput="checkme_whether_im_blank(event)" onkeydown="checkEnter_todoUpdate(event)" />
                    <span>
                        <select>
                            <option>pending</option>       
                            <option>ongoing</option>              
                            <option>completed</option>
                            <option>cancelled</option>
                        </select>
                    </span>
                </div>
                <p class="task-progress"> 
                    <span class="task-status">${status}</span>
                    <span class="task-time">${datetime}</span>
                    <span>
                        <button class="task-edit" onclick="editTodo(event)">edit</button>
                        <button class="task-del" onclick="deleteTodo(event)">delete</button>
                    </span>
                </p>`
        content.insertBefore(todoDiv, div);
}

export function addnewTodo(){

    const div = document.querySelector("#addTodoDiv-active");
    const task = div.querySelector("input").value;
    const status = div.querySelector("select").value;
    const datetime  = getDateTime();
    global_todo_count += 1;
    const id = global_todo_count;

    const newdata = { //this will be used inside the fetch()
        id: id,
        task: task,
        status: status,
        datetime: datetime
    }

    fetch("/addtodo" , {
            method:"POST",
            headers:{
                    "Content-Type":"application/json"
                },
            body: JSON.stringify(newdata)
        })
        .then( response =>{
            if(!response.ok) throw new Error("response is false\n"+response.ok);
        })
        .catch( error =>{
            console.log("## error \t",error);
        });

    addTodo(id,task,status,datetime);    
    // erase the input value 
    div.querySelector("input").value = '';
    // to close the add new todo interface
    cancelAddTodo();
}

function addTodoOnContent(jsons) {
    const content = document.querySelector("#content");
    content.innerHTML = `
        <div id="addTodoDiv">
            <div id='addTodomenu'>
                <button onclick='openAddTodoMenu()'>add todo</button>
            </div>
            <div class="task-box task-update-input-box">
                <input type="text" oninput="checkme_whether_im_blank(event)" onkeydown="checkEnter_addTodo(event)"/>
                <span>
                        <select>
                            <option>pending</option>       
                            <option>ongoing</option>              
                            <option>completed</option>
                            <option>cancelled</option>
                        </select>
                    </span>
            </div>
            <div class="task-button"> 
                    <button class="task-edit wait-till-user-enter" onclick="addnewTodo()">add</button>
                    <button class="task-del" onclick="cancelAddTodo()">cancel</button>
            </div>
        </div>
    
        <!-- below the todo will be present -->
    `
    // assigning the todo count to global var
    global_todo_count = Object.keys(jsons).length;
    
    for (let index = 0; index < Object.keys(jsons).length; index++) {

        addTodo(
            jsons[index]['id'] , // id
            jsons[index]['task'], //task
            jsons[index]['status'] , // progress 
            getDateTime() //date and time 
        );
    }
}
// 
// seperate function 
// 
export function deleteTodo(event){
    event.target.closest(".todo").remove();

    const todoDiv = event.target.closest("div");
    
    const data = {
        id:parseInt(todoDiv.id.replace("task_id_",""))
    }
    fetch("/deletetodo" , {
        method:"POST",
        headers:{
                "Content-Type":"application/json"
            },
        body: JSON.stringify(data)
    })
    .then( response =>{
        if(!response.ok) throw new Error("response is false\n"+response.ok);
    })
    .catch( error =>{
        console.log("## error \t",error);
    });
}
export function editTodo(event){

    // console.log("edit");
    const editbtn = event.target;
    const todoDiv = editbtn.closest("div");
    const inputDiv = todoDiv.querySelector(".task-box");
    
    inputDiv.classList.add("task-update-input-box");

    const currentTask = inputDiv.querySelector("p");
    const input = inputDiv.querySelector("input");
    input.value =   currentTask.textContent;
    
    editbtn.textContent = "Update";
    editbtn.onclick = (event) => updateTodo(event);

    
    const delbtn = todoDiv.querySelector(".task-del");
    delbtn.textContent = "Cancel";
    delbtn.onclick = (event) => cancelTodo(event);
}
export function updateTodo(event){
    
    const editbtn = event.target;
    const todoDiv = editbtn.closest("div");
    const inputDiv = todoDiv.querySelector(".task-box");
    
    inputDiv.classList.remove("task-update-input-box");
    
    const currentTask = inputDiv.querySelector("p");
    const input = inputDiv.querySelector("input");
    currentTask.textContent = input.value;
    
    sendUpdateTodo(
        parseInt(todoDiv.id.replace("task_id_","")),
        input.value,
        inputDiv.querySelector("select").value,
        getDateTime()
    )
    
    editbtn.textContent = "Edit";
    editbtn.onclick = (event) => editTodo(event);

    const delbtn = todoDiv.querySelector(".task-del");
    delbtn.textContent = "Delete";
    delbtn.onclick = (event) => deleteTodo(event);
}
// during input if user presses the enter key ,
// then the task will be updated automatically
export function checkEnter_todoUpdate(event){
    if(event.key != "Enter" || checkme_whether_im_blank(event)==false) return;

    
    const input = event.target;
    const todoDiv = input.closest(".todo");
    // console.log(todoDiv);
    const inputDiv = todoDiv.querySelector(".task-box");
    
    inputDiv.classList.remove("task-update-input-box");
    
    const currentTask = inputDiv.querySelector("p");
    currentTask.textContent = input.value;

    sendUpdateTodo(
        parseInt(todoDiv.id.replace("task_id_","")),
        input.value,
        inputDiv.querySelector("select").value,
        getDateTime()
    );
    
    const editbtn = todoDiv.querySelector(".task-edit");
    editbtn.textContent = "Edit";
    editbtn.onclick = (event) => editTodo(event);
    
    const delbtn = todoDiv.querySelector(".task-del");
    delbtn.textContent = "Delete";
    delbtn.onclick = (event) => deleteTodo(event);
    
}
export function checkEnter_addTodo(event){
    if(event.key == "Enter" && checkme_whether_im_blank(event)==true){
        addnewTodo(event);
    }
}
export function cancelTodo(event){

    const editbtn = event.target;
    const todoDiv = editbtn.closest("div");
    const inputDiv = todoDiv.querySelector(".task-box");
    
    inputDiv.classList.remove("task-update-input-box");
        
    editbtn.textContent = "delete";
    editbtn.onclick = (event) => deleteTodo(event);

    const delbtn = todoDiv.querySelector(".task-edit");
    delbtn.textContent = "Edit";
    delbtn.onclick = (event) => editTodo(event);

    return ;
}
export function cancelAddTodo(){
    const addTododiv = document.querySelector('#addTodoDiv-active');
    addTododiv.id = 'addTodoDiv';
}
export function openAddTodoMenu(){
    const addTododiv = document.querySelector('#addTodoDiv');
    addTododiv.id = 'addTodoDiv-active';
}
export function checkme_whether_im_blank(event){

    const eve = event.target;
    let div = eve.closest("#addTodoDiv-active");
    if(div == null){
        // if null , then func called from  todo div
        div = eve.closest(".todo");
    }
    let btn = div.querySelector(".task-edit");
    
    if(event.target.value.length == 0){
        // the input tag is blank
        btn.classList.add('wait-till-user-enter'); 
    }
    else{
        btn.classList.remove('wait-till-user-enter');
    }
    // retun true if input is not blank
    return event.target.value.length == 0?false:true;
}
