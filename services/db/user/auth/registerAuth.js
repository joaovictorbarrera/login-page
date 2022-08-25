const login = require("../../../../models/loginSch")

const {encryptPassword} = require("./util/bcryptPasswordParser.js")
const validations = require("./util/newUserValidations.js")

async function createUser(newUser) {
    try {
        console.log("creating user")
        const validation = await validateCreatedUser(newUser)
        if (validation?.errorMessage) return validation
        newUser.firstname = capitalizeFirstLetter(newUser.firstname)
        newUser.lastname = capitalizeFirstLetter(newUser.lastname)
        newUser.password = await encryptPassword(newUser.password)
        const user = await login.create(newUser)
        console.log(`new user ${user.username} saved succesfully`)
        return true
    } catch (e) {
        console.log(e.message)
        return {errorMessage:"Unexpected Error"}
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
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