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

mongoose.model('Countdown', productSchema)
mongoose.model('New World', productSchema)
mongoose.model('Pak and Save', productSchema)