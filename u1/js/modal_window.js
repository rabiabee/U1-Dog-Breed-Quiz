"use strict";

// Function create_statusMessage_box(message, isSuccess) creates: 
// - Server message status box
// - "Connecting to server" box
// - Quiz correct/wrong answer box 
// Take 3 arguments

function create_statusMessage_box(message, isSuccess) {
    // Create semi-transparent overlay + set classname 
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.body.appendChild(overlay);

    // Create status message box + set classname
    const status_box = document.createElement('div');
    document.body.appendChild(status_box);
    status_box.classList.add("status_box");

    // Create server text response (error message)
    const status_box_text = document.createElement("p");
    status_box_text.textContent = message;
    status_box.appendChild(status_box_text);

    // Create "close" button
    const status_box_button = status_box.appendChild(document.createElement("button"));
    status_box_button.textContent = "CLOSE";

    // If isSuccess is true, the status message box will have a success class, otherwise it will have an error class =======!!!!!!!!!!! contacting server vs status box?===============
    if (isSuccess) {
        status_box.classList.add("success");
    } else {
        status_box.classList.add('error');
    }

    // When button is clicked, the arrow function passed as the second argument is executed (overlay.remove(), hides status_box and removes overlay and status box)
    status_box_button.addEventListener("click", () => {
        overlay.remove();
        status_box.remove();
    });
}