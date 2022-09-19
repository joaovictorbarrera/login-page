(async () => {
    require("dotenv").config()
    console.log("waiting for database to connect...")

    // DB
    const mongoURL = process.env.MONGO_URL || "mongodb://127.0.0.1/loginPage"
    await require("./services/db/connectDB")(mongoURL)

    const MongoStore = require("connect-mongo")
    const sessionStore = new MongoStore({
        mongoUrl: mongoURL,
        collectionName: 'sessions'
    })
    
    // modules
    const express = require("express")
    const authRouter = require("./routes/loginRoutes")
    const indexRouter = require("./routes/indexRoutes")
    
    // app startup
    const app = express()
    const PORT = process.env.PORT || 5000
    console.log("express app started")

    // import middleswares
    const logger = require("./middlewares/logger.js")
    const cookieParser = require('cookie-parser')
    const methodOverride = require('method-override')
    const session = require("express-session")
  

    // set global middlewares
    app.set("view engine", "ejs")
    app.use(express.static("public"))
    app.use(methodOverride('_method'))
    app.use(logger)
    if (!process.env.SECRET) console.log("\x1b[41m\x1b[37mWARNING! No secret found in environment variables! Your app may be at danger.\x1b[0m")
    app.use(session({
        secret: process.env.SECRET || "secret",
        resave: false,
        saveUninitialized: false,
        store: sessionStore,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7, // expires in 7 days
            httpOnly: true
        }
    }))
    
    app.use(cookieParser())
    app.use(express.json())
    app.use(express.urlencoded({extended:false}))
    
    // routers
    app.use("/", indexRouter)
    app.use("/", authRouter)
    
    app.listen(PORT, "localhost")
})()