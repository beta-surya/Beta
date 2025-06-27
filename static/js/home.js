// this file contains the code for search menu and 
// display menu under screen width of 600px 


let minMenuActivestate = false; 

function showMinMenu(event){

    const min_menu_btn = document.querySelector("#min-menu-btn");
    const min_menu = document.querySelector("#min-menu");

    event.stopPropagation(); // Prevent it from triggering the outside click
    min_menu_btn.classList.toggle("min-menu-active");
    min_menu.classList.toggle("min-menu-active");
    minMenuActivestate = true;
}

// Hide menu when clicking outside of it
document.addEventListener("click", (event) => {
    if(minMenuActivestate == true){
        // Check if click is outside the min-menu
        const min_menu_btn = document.querySelector("#min-menu-btn");
        const min_menu = document.querySelector("#min-menu");

        if (!min_menu.contains(event.target) ) {
            min_menu.classList.remove("min-menu-active");
            min_menu_btn.classList.remove("min-menu-active");
            minMenuActivestate = false;
        }
    }

});
