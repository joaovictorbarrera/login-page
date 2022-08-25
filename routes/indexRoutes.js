const express = require("express")
const indexRouter = express.Router()
const { provideDetailsDocument } = require("../services/db/user/user-details/details")
const needsAuth = require("../middlewares/needsAuth.js")

// main page routes
indexRouter.route("/")
.get(needsAuth, async (req, res) => {
    const detailsDoc = await provideDetailsDocument(req.session.user.username)
    const firstname = req.session.user.firstname
    let message = detailsDoc?.favoritePerson ? 
    `${firstname}'s favorite person is ${detailsDoc.favoritePerson}` : 
    `${firstname} does not have a favorite person :(`
    res.render("index.ejs", {"message":message})
}
)
.post(needsAuth, async (req, res) => {
    if (!req.body || req.body.favoritePerson === undefined) return

    const favoritePerson = req?.body?.favoritePerson
    const username = req.session.user.username

    let detailsDoc = await provideDetailsDocument(username)
    detailsDoc.favoritePerson = favoritePerson
    await detailsDoc.save()

    res.redirect("/")
}) 

module.exports = indexRouter