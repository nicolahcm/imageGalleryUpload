const mongoose = require('mongoose');




const imageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    createdDate: {
        type: Date,
        default: Date.now
    }
})




const Image = mongoose.model('images', imageSchema)

module.exports = Image