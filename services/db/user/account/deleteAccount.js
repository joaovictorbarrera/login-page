const login = require("../../../../models/loginSch")
const details = require("../../../../models/detailsSch")

async function deleteLogin(username) {
    const deleteCount = (await login.deleteMany({username})).deletedCount
    console.log(`Found and deleted ${deleteCount} login(s)`)
    return deleteCount !== 0
}

async function deleteDetails(username) {
    const deleteCount = (await details.deleteMany({username})).deletedCount
    console.log(`Found and deleted ${deleteCount} detail file(s)`)
    return deleteCount !== 0
}

async function deleteAccount(username) {
    const deletedLogin = await deleteLogin(username)
    const deletedDetails = await deleteDetails(username)

    return deletedLogin || deletedDetails
}

module.exports = {deleteAccount}