const mongoose = require('mongoose')


mongoose.connect('mongodb://robertk762:Marcelia21@ds023105.mlab.com:23105/heroku_vlwdt8kw', {useNewUrlParser: true}, (err) => {
    if(!err){
        console.log("Mongo connection Succeeded")
    } else {
        console.log("Error in DB connnection: " + err  )
    }
})

require('./productDetails.model')