const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String
    },

    price: {
        type: String
    },

    type: {
        type: String
    },
})

// mongoose.model('Countdown', productSchema)
// mongoose.model('New World', productSchema)
// mongoose.model('Pak and Save', productSchema)

const countdown  = mongoose.model('Countdown', productSchema)
const newWorld = mongoose.model('New World', productSchema)
const pakAndSave =  mongoose.model('Pak and Save', productSchema)

module.exports = {
    countdown,
    newWorld,
    pakAndSave
}