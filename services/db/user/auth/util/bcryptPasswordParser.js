const bcrypt = require("bcrypt")

async function encryptPassword(password) {
    const hashedPassword = await bcrypt.hash(password, 10)
    return hashedPassword
}

async function checkPassword(user, password) {
    return await bcrypt.compare(password, user.password)
}

module.exports = {encryptPassword, checkPassword}