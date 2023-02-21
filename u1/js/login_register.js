"use strict";

function click_register_now() {

    //select login form element
    const main = document.querySelector("#main");

    //replace content of login form with the reg form
    main.innerHTML = `
    <h2>Register</>
    <form action="" id="register_form">
        <label for="user_name">Username</label>
        <input type="text" name="user_name" id="user_name">
        <label for="password">Password</label>
        <input type="password" name="password" id="password">
        <p id="ready">Ready when you are...</p>
        <button type="submit" id="register_button">Register</button>
        <p id="account_already">Already have an account? Go to login</p>

    </form>
`;

    // click reg button sends post request
    const register_form = document.querySelector("#register_form");
    register_form.addEventListener("submit", register_user_request);
}

async function register_user_request(event) {
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

    // 409 = conflict
    // 200 = success
    // 418 = not a teapot 
    // in a function? quiz answers
    switch (request_post.status) {
        case 409:
            create_statusMessage_box("Sorry, that name is taken. Please try with another one.");
            break;

        case 200:
            create_statusMessage_box("Registration Complete. Please proceed to login.");
            break;

        case 418:
            create_statusMessage_box("The server thinks it's not a teapot!");
            break;

        default:
            break;
    }
}
function create_statusMessage_box(string) {
    const status_box = document.body.appendChild(document.createElement("div"));
    // server text response (error messages)
    const status_box_text = document.createElement("p");
    status_box_text.textContent = string;
    status_box.appendChild(status_box_text);
    // "close" button
    const status_box_button = document.createElement("button");
    status_box.appendChild(status_box_button);
    status_box_button.textContent = "Close";
}

function create_login_site() {
    //select login form element
    const main = document.querySelector("#main");

    //replace content of login form with the reg form
    main.innerHTML = `
  <h2>Login</>
  <form action="" id="login_form">
      <label for="user_name">Username</label>
      <input type="text" name="user_name" id="user_name">
      <label for="password">Password</label>
      <input type="password" name="password" id="password">
      <p id="magic_start">Let the magic start!</p>
      <button type="submit" id="login_button">Log in</button>
      <p id="register_now">New to this? Register for free</p>

  </form>
`;
    const login_form = document.querySelector("#login_form");
    login_form.addEventListener("submit", click_login);
}

function click_login(event) {
    event.preventDefault();
    const un = login_form.user_name.value;
    const pw = login_form.password.value;
    console.log(un);

    const request_get = new Request(`${prefix}?action=check_credentials&user_name=${un}&password=${pw}`);

    return fetch_resource(request_get);
}