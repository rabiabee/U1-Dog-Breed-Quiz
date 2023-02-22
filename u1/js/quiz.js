"use strict";

function create_quiz_page() {
    const main = document.querySelector("#main");
    main.innerHTML = `
    <div id="profile_bar">
            <p id="signed_in_user">ra1</p>
            <button id="logout_button">logout</button>
    </div>
    
    <div>quiz</div>


    `;
}