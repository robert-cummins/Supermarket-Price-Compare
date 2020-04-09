const mongoose = require('mongoose')


mongoose.connect('mongodb://localhost:27017/SupermarketDb', {useNewUrlParser: true}, (err) => {
    if(!err){
        console.log("Mongo connection Succeeded")
    } else {
        console.log("Error in DB connnection: " + err  )
    }
})

require('./productDetails.model')