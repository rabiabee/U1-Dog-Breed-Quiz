"use strict";

function click_register() {

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
        <button type="submit" id="register_button">Register</button>
    </form>
`;

    // click reg button sends post request
    const register_form = document.querySelector("#register_form");
    register_form.addEventListener("submit", register_request);
}

async function register_request(event) {
    event.preventDefault();

    const un = document.querySelector("#user_name").value;
    const pw = document.querySelector("#password").value;

    const body_post = {
        action: "register",
        user_name: un,
        password: pw
    };

    const options = {
        method: "POST",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify(body_post),
    };

    const request_post = await fetch_resource(new Request(prefix, options));
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