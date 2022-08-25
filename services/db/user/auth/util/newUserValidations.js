const login = require("../../../../../models/loginSch")
const emailValidator = require('deep-email-validator');

const validations = [
    async function checkUsernameAlreadyExists(newUser) {
        // check username already exists
        const newUsername = newUser.username
        const docUsername = await login.find({username:newUsername})
        if (docUsername.length !== 0) {
            console.log("Username already exists!")
            return {errorMessage:"Username already exists!", success:false}
        }
        return {success:true}
    },
    async function checkEmailAlreadyExists(newUser) {
        // check email already exists
        const newEmail = newUser.email.toLowerCase()
        const docEmail = await login.find({email:newEmail})
        if (docEmail.length !== 0) {
            console.log("Email already exists!")
            return {errorMessage:"Email already exists!", success:false}
        }
        return {success:true}
    },
    async function checkEmailIsValid(newUser) {
        // check email is valid
        const email = newUser.email
        if (!(await emailValidator.validate(email)).valid) {
            console.log("Invalid email!")
            return {errorMessage:"Invalid email!", success:false}
        }
        return {success:true}
    },
    async function checkPassword(newUser) {
        // check password strong enough
        const newPassword = newUser.password
        if (newPassword.length < 8) {
            console.log("Password too short!")
            return {errorMessage:" Password too short!", success:false}
        }
        return {success:true}
    }
]

module.exports = validations