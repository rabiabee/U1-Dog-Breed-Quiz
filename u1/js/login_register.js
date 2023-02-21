"use strict";

function create_register_site() {

    //select login form element
    const main = document.querySelector("#main");

    //replace content of login form with the reg form
    main.innerHTML = `
    <h1>REGISTER</h1>
    <form action="" id="register_form">
        <label for="user_name">User Name</label>
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

    // event listener to "go to login" link from register page ======> doesn't allow you to click register< ====
    const login_instead = document.querySelector("#account_already");
    login_instead.addEventListener("click", () => create_login_site());
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
    // ==== could be in a function? quiz answers status text ====
    switch (request_post.status) {
        case 409:
            create_statusMessage_box("Sorry, that name is taken. Please try with another one.", false);
            break;

        case 200:
            create_statusMessage_box("Registration Complete. Please proceed to login.", false);
            break;

        case 418:
            create_statusMessage_box("The server thinks it's not a teapot!", false);
            break;

        default:
            break;
    }
}
function create_statusMessage_box(message, isSuccess) {
    // create semi-transparent overlay + set classname 
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.body.appendChild(overlay);

    // create status message box 
    const status_box = document.createElement('div');
    document.body.appendChild(status_box);
    status_box.classList.add("status_box");

    // if isSuccess is true, the status message box will have a success class, otherwise it will have an error class
    if (isSuccess) {
        status_box.classList.add("success");
    } else {
        status_box.classList.add('error');
    }

    // server text response (error messages)
    const status_box_text = document.createElement("p");
    status_box_text.textContent = message;
    status_box.appendChild(status_box_text);

    // create "close" button
    const status_box_button = status_box.appendChild(document.createElement("button"));
    status_box_button.textContent = "CLOSE";
    // when  button is clicked, the arrow function passed as the second argument is executed (overlay.remove(), hides status_box and removes overlay and status box)
    status_box_button.addEventListener("click", () => {
        overlay.remove();
        status_box.remove();
    });
}

function create_login_site() {
    //select login form element
    const main = document.querySelector("#main");

    //replace content of login form with the reg form
    main.innerHTML = `
  <h1>LOGIN</h1>
  <form action="" id="login_form">
      <label for="user_name">User Name</label>
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

// async function handles login submit button and sends server request 
async function click_login(event) {
    event.preventDefault();
    const un = login_form.user_name.value;
    const pw = login_form.password.value;

    const request_get = new Request(`${prefix}?action=check_credentials&user_name=${un}&password=${pw}`);

    const login_user_resource = await fetch_resource(new Request(request_get));

    switch (login_user_resource.status) {
        case 404:
            // replace text content
            document.querySelector("#magic_start").textContent = "Wrong username or password.";
            break;

        case 200:
            successful_log_in();
            break;

        case 418:
            create_statusMessage_box("The server thinks it's not a teapot!");
            break;

        default:
            break;
    }
    console.log(login_user_resource.status);
}

function successful_log_in() {
    const main = document.querySelector("#main");
    main.innerHTML = `
    
    `;

}