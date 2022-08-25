const mongoose = require("mongoose")
module.exports = async (mongoURL) => {
    try {
        await mongoose.connect(
            mongoURL, {useNewUrlParser: true, useUnifiedTopology: true}
        )
        console.log("mongodb connected")
    } catch (e) {
        console.log(e.message)
        process.exit(1)
    }
}