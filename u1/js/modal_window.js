"use strict";
// Function create_statusMessage_box takes 4 arguments and creates/adjusts: 
// - Server message status box + styles
// - "Contacting server" box + styles
// - Quiz correct/wrong answer box + styles

async function create_statusMessage_box(message, withButton, quiz_statusBox, bgColor) {
    // Create semi-transparent overlay + set classname 
    const overlay = document.createElement("div");
    overlay.classList.add("overlay");
    document.body.appendChild(overlay);

    // Create status message box + set classname
    const status_box = document.createElement('div');
    document.body.appendChild(status_box);
    status_box.classList.add("status_box");

    // if quiz_StatusBox = true, add quiz_statusBox class 
    // else add status_box class
    if (quiz_statusBox) {
        status_box.classList.add("quiz_statusBox");
    } else {
        status_box.classList.add("status_box");
    }

    status_box.style.backgroundColor = bgColor; // Set background color

    // Create text element (for error message)
    const status_box_text = document.createElement("p");
    status_box.appendChild(status_box_text);
    status_box_text.textContent = message;

    if (withButton) {
        // Create "close" button
        create_close_button(status_box, overlay);
    }
}

// Create "close" button
function create_close_button(status_box, overlay) {
    const status_box_button = status_box.appendChild(document.createElement("button"));

    status_box_button.classList.add("status_box_button");

    status_box_button.textContent = "CLOSE";

    status_box_button.addEventListener("click", () => {
        overlay.remove();
        status_box.remove();
    });
}

function hide_status_box() {
    document.querySelector("body > .status_box").remove();
    document.querySelector("body > .overlay").remove();
}
