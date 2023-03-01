"use strict";

// Function to check if there is a logged-in user when the window is loaded ->
window.onload = function () {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
        create_quiz_page(loggedInUser);
    } else {
        create_login_site();
    }
};

