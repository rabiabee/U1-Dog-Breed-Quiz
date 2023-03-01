"use strict";
// Function create_statusMessage_box takes 4 arguments and creates/adjusts: 
// - Server message status box (with close button) + styles
// - Quiz correct/wrong answer box + styles
// - "Contacting server" box + styles

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
    if (quiz_statusBox) {
        status_box.classList.add("quiz_statusBox");
    } else { // else add status_box class
        status_box.classList.add("status_box");
    }

    status_box.style.backgroundColor = bgColor; // Set background color

    // Create text element (message)
    const status_box_text = document.createElement("p");
    status_box.appendChild(status_box_text);
    status_box_text.textContent = message;

    if (withButton) {
        // Create "close" button
        create_close_button(status_box);
    }
}

// Create "close" button
function create_close_button(status_box) {
    const status_box_button = status_box.appendChild(document.createElement("button"));

    status_box_button.classList.add("status_box_button");

    status_box_button.textContent = "CLOSE";

    status_box_button.addEventListener("click", () => hide_status_box());
}

function hide_status_box() {
    document.querySelector("body > .status_box").remove();
    document.querySelector("body > .overlay").remove();
}
