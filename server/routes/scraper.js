const express = require('express')
const router = express.Router()
const scraper = require('../scraperFunctions')
const Supermarket = require('../models/productDetails.model')


router.get('/data', (req, res) => {
  Supermarket.pakAndSave.find((err, supermarkets) => {
    if(err){
      console.log("There is an error: " + err)
    } else {
      console.log('hello')
      res.json(supermarkets)
    }
  })
})


    

module.exports = router