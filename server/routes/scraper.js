const express = require('express')
const router = express.Router()
const scraperFunctions = require('../scraperFunctions')


router.get('/data', (req, res) => {
  const data = await scraperFunctions.scrapeSites()
  res.json(data)
})


    

module.exports = router