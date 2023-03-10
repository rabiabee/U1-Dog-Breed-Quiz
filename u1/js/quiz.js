"use strict";

async function create_quiz_page(un) {

    // Create server message box
    create_statusMessage_box("Getting a random image...", false, false);

    const main = document.querySelector("#main");

    main.classList.remove("main");
    main.classList.remove("login_register_main");

    main.classList.add("quiz_main");
    main.classList.add("bg_img");

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

    // Add event listener to logout button to clear localStorage
    const logoutBtn = document.querySelector("#logout_button");
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("loggedInUser");
        create_login_site();
    });


    await create_quiz_game(un);

    hide_status_box();

    main.classList.remove("bg_img");
}

async function create_quiz_game(un) {

    // get a random breed of dog
    const random_dog = ALL_BREEDS[getRandom(ALL_BREEDS.length)];

    // fetch image for the dog breed
    const response_image = await fetch_resource(`https://dog.ceo/api/breed/${random_dog.url}/images/random`);

    const dog = await response_image.json();

    // create image element with the fetched image URL
    const img = document.querySelector("#quiz_image");
    img.src = dog.message;

    // create array of 4 dog breeds, including the correct answer random_dog 
    const options = [random_dog];
    while (options.length < 4) {
        const optionDog = ALL_BREEDS[getRandom(ALL_BREEDS.length)];
        if (!options.includes(optionDog)) {
            options.push(optionDog);
        }
    }

    // shuffle the array of options
    shuffleArray(options);

    // create 4 clickable options
    const options_container = document.querySelector("#quiz_options");
    const optionButtons = options.map((optionDog) => {
        const button = document.createElement("button");
        button.textContent = optionDog.name;

        button.addEventListener("click", () => {
            if (optionDog === random_dog) {
                // show "correct" status message
                create_statusMessage_box("Correct!", true, true, "#4fbdbb");

                document.querySelector("body > div > .status_box_button").addEventListener("click", () => create_quiz_page(un));
            } else {
                create_statusMessage_box("I'm afraid not... :-(", true, true, "#de3839");
            }
        });

        return button;
    });

    // append the button elements to the options container
    options_container.append(...optionButtons);
}


function getRandom(max) {
    return Math.floor(Math.random() * max);
}
function shuffleArray(array) {
    array.sort(() => Math.random() - 0.5);
}

