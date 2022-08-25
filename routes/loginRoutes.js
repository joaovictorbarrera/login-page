const express = require("express")
const { createUser } = require("../services/db/user/auth/registerAuth.js")
const { authenticateUser } = require("../services/db/user/auth/loginAuth.js")
const needsAuth = require("../middlewares/needsAuth.js")
const { deleteAccount } = require("../services/db/user/account/deleteAccount.js")
const authRouter = express.Router()

// login page
authRouter
.route("/login")
.get((req, res) => {
    if (req.session.isAuth) res.redirect("/")
    else res.render("authViews/login.ejs")
})
.post(async (req, res) => {
    const user = await authenticateUser(req.body.username, req.body.password)
    if (!user || user?.errorMessage) {
        res.status(400).json({errorMessage:user?.errorMessage})
    }
    else {
        console.log("LOGGED IN")
        req.session.user = user
        req.session.isAuth = true
        res.status(200).json({})
    }
})

// register
authRouter.route("/register")
.get((req, res) => {
    res.render("authViews/register.ejs")
})
.post(async (req, res) => {
    console.log("Registering user")
    const created = await createUser({
        username: req.body.username, 
        password: req.body.password,
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    })

    if (created?.errorMessage) res.status(400).json({errorMessage:created.errorMessage})
    else res.status(201).json({}) 
})

// logout
authRouter.route("/logout")
.post(needsAuth, (req, res) => {
    req.session.isAuth = false
    res.redirect("/login")
})

authRouter.route("/delete-account")
.delete(needsAuth, (req, res) => {
    const username = req.session.user.username
    console.log("deleting account for "+username)
    if (deleteAccount(username)) {
        console.log("successfully deleted")
        res.status(204)
    } else {
        console.log("user doesn't exist in any db")
        res.status(404)
    }

    return res.redirect("/login")
})

module.exports = authRouter