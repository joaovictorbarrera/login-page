const form = document.getElementById("login-form")
const errorElement = document.getElementById("login-error-box")
console.log("script loaded")
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Create new FormData object:
    const formData = new FormData(form);
    // Convert formData object to URL-encoded string:
    const payload = new URLSearchParams(formData);

    try {
        res = await fetch('./login', {
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
            window.location.replace("./");
        }

    } catch (e) {
        console.log("Error: " + JSON.stringify(e))
    }
})

function addInvalidDisplayToInputs(error) {
    error = error.toLowerCase()
    console.log(error)
    const userNameInput = document.getElementById("login-username-input")
    const passwordInput = document.getElementById("login-password-input")

    clearInvalidDisplay([userNameInput, passwordInput])

    if (error.includes("username")) {
        userNameInput.classList.add("is-invalid")
    } else if (error.includes("password")) {
        passwordInput.classList.add("is-invalid")
    }
}

function clearInvalidDisplay(listInputs) {
    listInputs.forEach(element => {
        element.classList.remove("is-invalid")
    });
}