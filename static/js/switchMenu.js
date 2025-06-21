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

let currentMenu = "Search"; // by default.......
// let currentMenu = "Todo"; // used while development

function switch_menu(){
    
    // search menu is default and it's code is present in home html itself 
    // when remaing menu are selected , search-content div is just hidden 
    // and allow other menu to be appear on content div
    if(currentMenu == "Search"){
        document.querySelector("#search-content").classList.add("active-menu");
        document.querySelector("#content").classList.remove("active-menu");
    }
    else{
        if(currentMenu != "Search"){
        document.querySelector("#search-content").classList.remove("active-menu");
        document.querySelector("#content").classList.add("active-menu");
        document.querySelector("#content").innerHTML = '';
        }
        
        if(currentMenu == "Todo"){
            switch2Todo();            
        }
        else{
            console.error("error\t" , currentMenu);
        }
    }

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

switch_menu(currentMenu);