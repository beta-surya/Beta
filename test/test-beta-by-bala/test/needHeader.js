fetch("http://localhost:1234/needHeader")
.then(res=>{
    return res.text();
})
.then(data=>{
    console.log(data);
})
.catch(err=>{
    console.error(err);
})
