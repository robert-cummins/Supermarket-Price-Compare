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

    weight: {
        type: String
    },
    supermarket: {
        type: String
    },
    numOf: {
        type: String
    },
    category: {
        type: String
    },
    selected: {
        type: Boolean
    }
})


const countdown  = mongoose.model('Countdown', productSchema)
const newWorld = mongoose.model('New World', productSchema)
const pakAndSave =  mongoose.model('Pak and Save', productSchema)

module.exports = {
    countdown,
    newWorld,
    pakAndSave
}