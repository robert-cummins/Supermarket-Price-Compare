const express = require('express')
const router = express.Router()
const scraper = require('../scraper/scraper')
const Supermarket = require('../models/productDetails.model')


router.get('/pakandsave', (req, res) => {
  Supermarket.pakAndSave.find((err, supermarketData) => {
    if(err){
      console.log("There is an error: " + err)
    } else {
      res.json(supermarketData)
    }
  })
})


router.get('/countdown', (req, res) => {
  Supermarket.countdown.find((err, supermarketData) => {
    if(err){
      console.log("There is an error: " + err)
    } else {
      res.json(supermarketData)
    }
  })
})

router.get('/newworld', (req, res) => {
  Supermarket.newWorld.find((err, supermarketData) => {
    if(err){
      console.log("There is an error: " + err)
    } else {
      res.json(supermarketData)
    }
  })
})


    
module.exports = router