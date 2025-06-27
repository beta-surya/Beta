function fetchData(){
    fetch("http://127.0.0.1:1234/gettodo")
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
            console.log(data);
        })
        .catch( error =>{
            console.log("## error\t"+error);
            return "error";
        });
}
function sendNewTodo(newdata){
    
    fetch("http://127.0.0.1:1234/addtodo" , {
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

}
function sendUpdateTodo(data){
    
    fetch("http://127.0.0.1:1234/updatetodo" , {
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
const data = {
    id: 5,
    task: 'send json for modification of existing one from front to backend',
    status: 'completed',
    datetime: '22 Jun 2025 10:01 PM'
}
