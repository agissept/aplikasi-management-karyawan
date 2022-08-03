import {authenticate} from "../repository/api-helper.js";
import "./utils.js";

const inputs = document.querySelectorAll(".input");

function expandPlaceholder() {
    let parent = this.parentNode.parentNode;
    parent.classList.add("focus");
}

function collapsePlaceholder() {
    let parent = this.parentNode.parentNode;
    if (this.value === "") {
        parent.classList.remove("focus");
    }
}


inputs.forEach(input => {
    input.addEventListener("focus", expandPlaceholder);
    input.addEventListener("blur", collapsePlaceholder);
});

let userId
let password

checkLogin()

document.querySelector("#submit-login").addEventListener("click", async function (e) {
    e.preventDefault()

    userId = document.querySelector("#user-id").value;
    password = document.querySelector("#password").value;
    try {
        validate()
        await login()
        window.location.href = "dashboard.html"
    } catch (e) {
        alert(e)
    }

})

function validate() {
    if (userId === "" || password === "") {
        throw new Error("Please fill in all fields")
    }
}

async function login() {
    const response = await authenticate(userId, password);

    if (!response) {
        throw new Error("Login Failed")
    }

    sessionStorage.setItem("userId", userId)
}

function checkLogin() {
    if (sessionStorage.getItem("userId") !== null) {
        window.location.href = "dashboard.html"
    }
}
