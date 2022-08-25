const mongoose = require("mongoose")

const detailsSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    favoritePerson: String
})

module.exports = mongoose.model("details", detailsSchema)
