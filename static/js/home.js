const min_menu_btn = document.querySelector("#min-menu-btn");
const min_menu = document.querySelector("#min-menu");

// Toggle the menu when the button is clicked
min_menu_btn.addEventListener("click", (event) => {
    event.stopPropagation(); // Prevent it from triggering the outside click
    min_menu_btn.classList.toggle("min-menu-active");
    min_menu.classList.toggle("min-menu-active");
});

// Hide menu when clicking outside of it
document.addEventListener("click", (event) => {
    // Check if click is outside the min-menu
    if (!min_menu.contains(event.target) ) {
        min_menu.classList.remove("min-menu-active");
        min_menu_btn.classList.remove("min-menu-active");
    }
});
