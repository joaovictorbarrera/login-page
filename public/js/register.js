const formElement = document.getElementById("register-form")
const errorElement = document.getElementById("register-error-box")
const passwordInput = document.getElementById("register-password-input")
const confirmPasswordInput = document.getElementById("register-confirm-password-input")
const userNameInput = document.getElementById("register-username-input")
const firstnameInput = document.getElementById("register-firstname")
const lastnameInput = document.getElementById("register-lastname")
const emailInput = document.getElementById("register-email")

formElement.addEventListener('submit', async (e) => {
    e.preventDefault()
    const messages = checkPassword()

    if (messages.length > 0) {
        const errors = messages.join("\n")
        errorElement.innerText = errors
        errorElement.classList.add("alert", "alert-danger")
        addInvalidDisplayToInputs(errors)
    } else {
        // Create new FormData object:
        const formData = new FormData(formElement);
        // Convert formData object to URL-encoded string:
        const payload = new URLSearchParams(formData);

        try {
            res = await fetch('./register', {
                method: 'POST',
                credentials: 'same-origin',
                body: payload,
                })
            console.log("RECEIVED RESPONSE", res)
            res = await res.json()
            console.log("PARSED RESPONSE", res)

            if (res.errorMessage) {
                errorElement.innerText = res.errorMessage
                errorElement.classList.add("alert", "alert-danger")
                addInvalidDisplayToInputs(res.errorMessage)
            } else {
                window.location.replace("./login");
            }

        } catch (e) {
            console.log("Error: " + JSON.stringify(e))
        }
    }
})

function addInvalidDisplayToInputs(errors) {
    errors = errors.toLowerCase()
    console.log(errors)

    clearInvalidDisplay([
        userNameInput, 
        passwordInput, 
        confirmPasswordInput, 
        firstnameInput, 
        lastnameInput, 
        emailInput
    ])

    if (errors.includes("username")) {
        userNameInput.classList.add("is-invalid")
    } 

    if (errors.includes("password")) {
        passwordInput.classList.add("is-invalid")
        confirmPasswordInput.classList.add("is-invalid")
    }

    if (errors.includes("email")) {
        emailInput.classList.add("is-invalid")
    }

    if (errors.includes(" name")) {
        firstnameInput.classList.add("is-invalid")
        lastnameInput.classList.add("is-invalid")
    }
}

function clearInvalidDisplay(listInputs) {
    listInputs.forEach(element => {
        element.classList.remove("is-invalid")
    });
}

function checkPassword() {
    const messages = []
    const password = passwordInput.value
    console.log(password)
    if (password !== confirmPasswordInput.value) messages.push("Passwords are not equal") 
    if (password.length < 8) messages.push("Password is too short") 
    if (password.length > 50) messages.push("Password is too long")
    if (!new RegExp("[A-Z]").test(password)) messages.push("Password needs to contain a capital letter")
    if (!new RegExp("[0-9]").test(password)) messages.push("Password needs to contain a number")
    if (!new RegExp("[!@#$%^&*]").test(password)) messages.push("Password needs to contain a special symbol")
    return messages
}