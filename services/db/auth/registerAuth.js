const login = require("../../../models/loginSch")

const getNewId = require("./idGen.js")
const {encryptPassword} = require("./bcryptPasswordParser.js.js.js")
const validations = require("./newUserValidations.js")

async function createUser(newUser) {
    try {
        console.log(newUser)
        console.log("creating user")
        const validation = await validateCreatedUser(newUser)
        if (validation?.errorMessage) return validation
        newUser.userId = getNewId()
        newUser.password = await encryptPassword(newUser.password)
        const user = await login.create(newUser)
        console.log(`new user ${user.username} saved succesfully`)
        return true
    } catch (e) {
        console.log(e.message)
        return "Unexpected Error"
    }
}

async function validateCreatedUser(newUser) {
    console.log("validating new user")

    try {
        for (currentCheck of validations) {
            const res = await currentCheck(newUser)
            console.log({currentCheck:currentCheck.name, res})
            if (!res.success) return {errorMessage:res.errorMessage}
        }
    } catch (e) {
        console.log(e)
        return {errorMessage:"Unexpected Error"}
    }

    return true
}



// async function deleteUser(userId) {

// }

// async function updateUser(userId) {

// }

module.exports = {createUser}