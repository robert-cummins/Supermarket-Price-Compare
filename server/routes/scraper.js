const express = require('express')
const router = express.Router()
const scraperFunctions = require('../scraperFunctions')


router.get('/data', (req, res) => {
  console.log('route')
  scraperFunctions.scrapeSites()
  .then(data => res.json(data))
  
})


    

module.exports = router