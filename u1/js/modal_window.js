"use strict";

// Function create_statusMessage_box(message, withButton login_register_box) takes 3 arguments and creates: 
// - Server message status box
// - "Contacting server" box
// - Quiz correct/wrong answer box 

async function create_statusMessage_box(message, withButton, login_register_box) {
    // Create semi-transparent overlay + set classname 
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.body.appendChild(overlay);

    // Create status message box + set classname
    const status_box = document.createElement('div');
    document.body.appendChild(status_box);
    status_box.classList.add("status_box");

    // Create text element (for error message)
    const status_box_text = document.createElement("p");
    status_box.appendChild(status_box_text);
    status_box_text.textContent = message;

    if (withButton && login_register_box) {
        status_box.classList.add("login_register_statusBox");

        // Create "close" button
        const status_box_button = status_box.appendChild(document.createElement("button"));
        status_box_button.textContent = "CLOSE";

        status_box_button.addEventListener("click", () => {
            overlay.remove();
            status_box.remove();
        });

    } else if (withButton) {
        status_box.classList.add("quiz_statusBox");

        // Create "close" button
        const status_box_button = status_box.appendChild(document.createElement("button"));
        status_box_button.textContent = "CLOSE";

        status_box_button.addEventListener("click", () => {
            overlay.remove();
            status_box.remove();
        });

    } else {
        status_box.classList.add("contactingServer");

        // Wait for 1 second to simulate server response time 
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Remove the "Contacting server..." message box after 1 second
        setTimeout(() => {
            overlay.remove();
            status_box.remove();
        }, 1000);

    }
}