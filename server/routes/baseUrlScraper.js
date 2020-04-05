const express = require('express')
const router = express.Router()
const scraperFunctions = require('../scraperFunctions')


router.get('/google', (req, res) => {
  let url = "https://google.com" + req.params.url
  scraperFunctions.scrapeLinks(url).then(response => {
    res.json(response)
  })
})


    

module.exports = router