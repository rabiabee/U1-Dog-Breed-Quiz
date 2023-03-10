"use strict";

// Create Register page 
function create_register_site() {
    const body = document.querySelector("body");
    const main = document.querySelector("#main");

    main.classList.remove("main");
    main.classList.add("login_register_main");

    // Replace html content of login form with a reg form
    main.innerHTML = `
    <h1>REGISTER</h1>

    <form action="" id="register_form">
        <label for="user_name">User Name:</label>
        <input type="text" name="user_name" id="user_name">

        <label for="password">Password:</label>
        <input type="password" name="password" id="password">

        <p id="ready">Ready when you are...</p>
        <button type="submit" id="register_button">Register</button>
        <p id="account_already">Already have an account? Go to login</p>
    </form>
`;

    /*
        const register_form = document.querySelector("#register_form");
        register_form.addEventListener("submit", click_register_button); 
    */

    // Send post request with event listener 
    const register_form = document.querySelector("#register_form");
    register_form.addEventListener("submit", (event) => {
        event.preventDefault();
        click_register_button(event);
    });


    const login_instead = document.querySelector("#account_already");
    // Add event listener to redirect to login page + add bg transition
    login_instead.addEventListener("click", () => {
        body.classList.remove("transition");
        create_login_site();
    });
}

// Async function, handles and sends post request via register submit button
async function click_register_button(event) {
    event.preventDefault();

    const un = document.querySelector("#user_name").value;
    const pw = document.querySelector("#password").value;

    const body_post = {
        action: "register",
        user_name: un,
        password: pw
    };
    const post = {
        method: "POST",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify(body_post),
    };

    const request_post = await fetch_resource(new Request(prefix, post));

    console.log(request_post.status);
    // <-- STATUS MESSAGES --> 
    // 409 = Conflict
    // 200 = Success
    // 418 = Not a teapot 
    switch (request_post.status) {
        case 409:
            create_statusMessage_box("Sorry, that name is taken. Please try with another one.", true, false);
            break;

        case 200:
            create_statusMessage_box("Registration Complete. Please proceed to login.", true, false);
            break;

        case 418:
            create_statusMessage_box("The server thinks it's not a teapot!", true, false);
            break;

        default:
            break;
    }
}

// Create login page
function create_login_site() {
    const body = document.querySelector("body");
    const main = document.querySelector("#main");

    main.classList.remove("main");
    main.classList.add("login_register_main");

    // Replace html content of reg form with a login form
    main.innerHTML = `
  <h1>LOGIN</h1>

  <form action="" id="login_form">
      <label for="user_name">User Name:</label>
      <input type="text" name="user_name" id="user_name">

      <label for="password">Password:</label>
      <input type="password" name="password" id="password">

      <p id="magic_start">Let the magic start!</p>
      <button type="submit" id="login_button">Login</button>
      <p id="register_now">New to this? Register for free</p>
  </form>
`;

    const login_form = document.querySelector("#login_form");
    login_form.addEventListener("submit", (event) => {
        event.preventDefault();
        click_login_button(event);
    });


    // Add event listener to redirect to register page + add bg transition
    const register_now = document.querySelector("#register_now");
    register_now.addEventListener("click", () => {
        body.classList.add("transition");
        create_register_site();
    });
}

// Async function, handles and sends get request via login submit button 
async function click_login_button(event) {
    event.preventDefault();

    // Create "Contacting server..." box
    create_statusMessage_box("Contacting server...", false, false);

    const un = login_form.user_name.value;
    const pw = login_form.password.value;

    // get request
    try {
        const request_get = (`${prefix}?action=check_credentials&user_name=${un}&password=${pw}`);

        const login_user_resource = await fetch_resource(new Request(request_get));

        // hide "contacting server message"
        hide_status_box();

        switch (login_user_resource.status) {
            case 400:
            case 404:
                // replace text content
                const magic_start = document.querySelector("#magic_start");
                magic_start.textContent = "Wrong user name or password.";
                magic_start.classList.add("wrong_password");
                break;

            case 200:
                // save the loggedInUser to localStorage after successful login
                localStorage.setItem("loggedInUser", un);

                // create quiz page
                create_quiz_page(un);

                // bg transition when user logs in
                document.querySelector("body").classList.add("transition");
                break;

            case 418:
                create_statusMessage_box("The server thinks it's not a teapot!", true, false);
                break;

            default:
                break;
        }
        console.log(login_user_resource.status);
    }

    catch (error) {
        if (error.message.includes("NetworkError")) {
            create_statusMessage_box("Something went wrong. Please try again!", true, false);
        }
    }
}

