// 
//  todo modificaation function 
// 
function deleteTodo(event){
   
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
        console.error("## error \t",error);
    });
}
function editTodo(event){

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
function cancelTodo(event){

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
function updateTodo(event){

    const editbtn = event.target;
    const todoDiv = editbtn.closest("div");
    const inputDiv = todoDiv.querySelector(".task-box");
    
    inputDiv.classList.remove("task-update-input-box");
    
    const currentTask = inputDiv.querySelector("p");
    const input = inputDiv.querySelector("input");
    currentTask.textContent = input.value;
    
    const status = todoDiv.querySelector(".task-status");
    status.textContent = inputDiv.querySelector("select").value;

    const datetime = todoDiv.querySelector(".task-time");
    datetime.textContent = getDateTime();
    
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
// 
// support functions
// 
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
    let ftime;
    if(hr<10 && min<10){
        ftime = '0' +hr + ':0' + min + ' ' + meridiem;
    }
    else if(hr<10 && min>10){
        ftime = '0' +hr + ':' + min + ' ' + meridiem;
    }
    else if(hr>10 && min<10){
        ftime = hr + ':0' + min + ' ' + meridiem;
    }
    else if(hr>10 && min>10){
        ftime = hr + ':' + min + ' ' + meridiem;
    }
    
    return fdate + ' ' + ftime;
}
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
        console.log(response.ok);
    })
    .catch( error =>{
        console.log("## error \t",error);
    });

}
function checkWhetherFieldIsBlank(event){

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
function checkEnter_todoUpdate(event){
    if(event.key != "Enter" || checkWhetherFieldIsBlank(event)==false) return;

    
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
// 
// add todo option - function
// 
function openAddTodoOption(){
    const addTododiv = document.querySelector('#addTodoDiv');
    addTododiv.id = 'addTodoDiv-active';
}
function checkEnter_addTodoOption(event){
    if(event.key == "Enter" && checkWhetherFieldIsBlank(event)==true){
        addnewTodo(event);
    }
}
function addnewTodo(){


    let global_todo_count = parseInt(document.querySelector(".todo").id.replace("task_id_",""))

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
function cancelAddTodoOption(){
    const addTododiv = document.querySelector('#addTodoDiv-active');
    addTododiv.id = 'addTodoDiv';
}