const mongoose = require('mongoose')
const db = mongoose.connection;


function insertData(arr, superMarket) {
    arr.map(el => {
        let supermarketProduct = new superMarket()
        supermarketProduct.name = el.name
        supermarketProduct.price = el.price
        supermarketProduct.type = el.type
        supermarketProduct.weight = el.weight
        supermarketProduct.supermarket = el.supermarket
        supermarketProduct.numOf = '0'
        supermarketProduct.selected = false
        supermarketProduct.category = el.category
        supermarketProduct.save((err, doc) => {
            if (!err) {
                console.log(supermarketProduct)
            } else {
                console.log("failed: " + err)
            }
        })
    })
}



function deleteCollection(collection) {
    db.dropCollection(collection, function (err, result) {
        if (err) { console.log("error delete collection") }
        else { console.log("delete collection success") }
    });
}

module.exports = {
    insertData,
    deleteCollection
}