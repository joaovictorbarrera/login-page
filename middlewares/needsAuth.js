const { checkUserExists } = require("../services/db/user/auth/loginAuth")

async function needsAuth (req, res, next)  {
    if (!req.session.isAuth || !req.session.user || !(await checkUserExists(req.session.user.username))) {
        req.session.isAuth = false
        return res.status(401).redirect("/login")
    }

    next()
}

module.exports = needsAuth