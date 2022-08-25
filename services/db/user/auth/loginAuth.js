const login = require("../../../../models/loginSch")
const {checkPassword} = require("./util/bcryptPasswordParser.js")

async function authenticateUser(username, password) {
    try {
        console.log("validating user")
        if (!username || !password) return false

        // check username
        let obj = await login.find({"username":username}).limit(1)
        // if not username, check if its an email
        if (obj.length === 0) obj = await login.find({"email":username}).limit(1)
        // maybe not a user
        if (obj.length === 0) {
            console.log("No user found with that username or email")
            return {errorMessage:"No user found with that username or email address"}
        }

        const userFound = obj[0]
        if (await checkPassword(userFound, password)) {
            console.log(`user ${userFound.username} logged in successfully`)
            return userFound
        }

        console.log("Incorrect password")
        return {errorMessage:"Incorrect password"}
    } catch (e) {
        console.log(e)
        return {errorMessage:"Unexpected Error"}
    }
}

async function checkUserExists(username) {
    return (await login.find({username})).length > 0
}

module.exports = {authenticateUser, checkUserExists}