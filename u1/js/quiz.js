"use strict";

function create_quiz_page(un) {
    const main = document.querySelector("#main");

    main.classList.remove("main");
    main.classList.remove("login_register_main");
    main.classList.add("quiz_main");

    main.innerHTML = `
        <div id="profile_bar">
            <div>${un}</div>
            <button id="logout_button">logout</button>
        </div>

        <div id="quiz_container">
        <img id="quiz_image" src="">
        <div id="quiz_options"></div>
        </div>
    `;
    create_quiz_game();

}

async function create_quiz_game() {

    // get a random breed of dog
    const random_dog = ALL_BREEDS[getRandom(ALL_BREEDS.length)];

    // fetch image for the dog breed
    const response = await fetch(`https://dog.ceo/api/breed/${random_dog.url}/images/random`);
    const dog = await response.json();

    // create image element with the fetched image URL
    const img = document.querySelector("#quiz_image");
    img.src = dog.message;

    // create 4 clickable options
    const options = document.querySelector("#quiz_options");
    for (let i = 0; i < 4; i++) {
        // get a random breed from the list of all breeds
        const optionDog = ALL_BREEDS[getRandom(ALL_BREEDS.length)];

        // create button element for the option
        const btn = document.createElement("button");
        btn.textContent = optionDog.name;

        // add event listener for the option button
        btn.addEventListener("click", () => {
            if (optionDog === random_dog) {
                create_statusMessage_box("CORRECT!", true, true);
            } else {
                create_statusMessage_box("False!", true, true);
            }
        });

        // append the button element to the options container
        options.appendChild(btn);
    }
}

function getRandom(max) {
    return Math.floor(Math.random() * max);
}
