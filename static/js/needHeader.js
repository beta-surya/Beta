function whichMenu(){
    const menu = window.location.pathname.replace("/",'').toLowerCase();
    const menus = ["search","diary","todo","notebook"];
    for( let index = 0 ; index < menus.length ; index++){
        if (menu == menus[index]){
            return index;
        }
    }
    console.error("can't find menu");
}

const currentMenu = whichMenu();

fetch("/needHeader")
.then(res=>{
    return res.text();
})
.then(data=>{
    
    const head = document.querySelector("#head");
    head.innerHTML = data;

    // min-menu - selected menu highlight
    const min_li = head.querySelectorAll("#min-header-menu li");
    for (let index = 0; index < 4; index++) {
        min_li[index].id = '';
    }
    min_li[currentMenu].id = "min-selected-menu";

    // menu - selected menu highlight
    const li = head.querySelectorAll("#header-menu li");

    for (let index = 0; index < 4; index++) {
        li[index].id = '';
    }
    li[currentMenu].id = "selected-menu";
    

})
.catch(err=>{
    console.error(err);
})
