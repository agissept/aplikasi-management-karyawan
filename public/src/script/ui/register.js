import {registerUser} from '../repository/api-helper.js'
import "./utils/user-id-validator.js";

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

let userId = ''
let password = ''
let fullName = ''

document.querySelector("#submit-register-user").addEventListener("click", async function (event) {
    event.preventDefault()
    userId = document.querySelector("#user-id").value
    password = document.querySelector("#password").value
    fullName = document.querySelector("#full-name").value

    try {
        validate()
        await registerUser(userId, password, fullName)
        alert("You have successfully registered!")
    } catch (e) {
        alert(e)
    }
})

function validate() {
    if (userId === "" || password === "" || fullName === "") {
        throw new Error("Please fill in all fields");
    }
}


