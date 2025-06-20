//
// this file conatin the actions to be taken during menu switching
// 

let currentMenu = "Search"; // by default.......

// headerMEnu - menu from wider view
const lists = document.querySelectorAll("#header-menu li");
lists.forEach((li)=>{
    // list present in wider view
    li.addEventListener("click",()=>{
        // removing the previous list's id 
        lists.forEach((li)=>{
            li.id = '';
        })
        // updating current list's id
        li.id = "selected-menu";
        // changing the currentMenu var
        currentMenu = li.textContent;
        switch_menu();
    })
})

// minheaderMEnu - menu from less than 600px
const minlists = document.querySelectorAll("#min-header-menu li");
minlists.forEach((li)=>{
    // list present in wider view
    li.addEventListener("click",()=>{
        // removing the previous list's id 
        minlists.forEach((li)=>{
            li.id = '';
        })
        // updating current list's id
        li.id = "min-selected-menu";
        // changing the currentMenu var
        currentMenu = li.textContent;

        switch_menu();
    })
})

function switch_menu(){
    
    // search menu is default and it's code is present in home html itself 
    // when remaing menu are selected , search content is just hidden 
    // and allow other menu to be appear 
    if(currentMenu == "Search"){
        document.querySelector("#search-content").classList.add("active-menu");
        document.querySelector("#content").classList.remove("active-menu");
    }
    else{
        if(currentMenu != "Search"){
        document.querySelector("#search-content").classList.remove("active-menu");
        document.querySelector("#content").classList.add("active-menu");
        }
    }
    return;
}