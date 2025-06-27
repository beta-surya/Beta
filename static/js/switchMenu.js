//
// this file conatin the actions to be taken during menu switching
// 

import {switch2Todo, deleteTodo, editTodo, updateTodo, checkEnter_todoUpdate, checkEnter_addTodo, cancelTodo ,cancelAddTodo, openAddTodoMenu, addnewTodo, checkme_whether_im_blank } from './todo.js'

// enabling the functions to be accessible from html 
// todo => functions
window.deleteTodo = deleteTodo;
window.editTodo = editTodo;
window.updateTodo = updateTodo;
window.checkEnter_todoUpdate = checkEnter_todoUpdate;
window.checkEnter_addTodo = checkEnter_addTodo;
window.cancelTodo = cancelTodo;
window.cancelAddTodo = cancelAddTodo;
window.openAddTodoMenu = openAddTodoMenu;
window.addnewTodo = addnewTodo;
window.checkme_whether_im_blank = checkme_whether_im_blank;


function get_current_menuFromURL() {
    const path = window.location.pathname; // e.g., "/Todo"
    const menu = path.split('/')[1];       
    return menu || 'Search';                 // default to 'Search' if path is "/"
}
function changeMenuColor(currentMenu) {
    // Header menu (wider view)
    const lists = document.querySelectorAll("#header-menu li");
    lists.forEach(li => {
        li.id = ''; // Remove previous selection
        if (li.textContent.toLowerCase() === currentMenu.toLowerCase()) {
            li.id = "selected-menu";
        }
    });

    // Min header menu (less than 600px view)
    const minlists = document.querySelectorAll("#min-header-menu li");
    minlists.forEach(li => {
        li.id = ''; // Remove previous selection
        if (li.textContent.toLowerCase() === currentMenu.toLowerCase()) {
            li.id = "min-selected-menu";
        }
    });
}

// let currentMenu = "Search"; // by default.......
let currentMenu = get_current_menuFromURL();
changeMenuColor(currentMenu);

switch_menu();

function update_address(){
    history.pushState({ page: currentMenu }, '', `/${currentMenu}`);
}


function switch_menu(){

    // search menu is default and it's code is present in home html itself 
    // when remaing menu are selected , search-content div is just hidden 
    // and allow other menu to be appear on content div
    if(currentMenu == "Search"){
        document.querySelector("#search-content").classList.add("active-menu");
        document.querySelector("#content").classList.remove("active-menu");
        console.log("1");
    }
    else{
        if(currentMenu != "Search"){

            document.querySelector("#search-content").classList.remove("active-menu");
            document.querySelector("#content").classList.add("active-menu");
            document.querySelector("#content").innerHTML = '';
            console.log("2");    
        }
        
        if(currentMenu == "Todo"){
            switch2Todo();            
        }
        else{
            console.error("error\t" , currentMenu);
        }
    }
    
    update_address();

    return;
}

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
        // closing the min-menu
        document.querySelector("#min-menu").classList.remove("min-menu-active");
        switch_menu();
    })
})
