const details = require("../../../../models/detailsSch")

async function getDetails(username) {
    const docs = (await details.find({"username":username}))
    if (!docs) return null
    else return docs[0]
}

async function createDetails(username) {
    await details.create({
        "username":username
    })
    return (await details.find({"username":username}))[0]
}

async function provideDetailsDocument(username) {
    let detailsDoc = await getDetails(username)
    if (!detailsDoc) {
        detailsDoc = await createDetails(username)
    }

    return detailsDoc
}

module.exports = {getDetails, createDetails, provideDetailsDocument}