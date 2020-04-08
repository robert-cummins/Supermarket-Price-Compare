const path = require('path')
const express = require('express')
const server = express()
const scraper = require('./routes/scraper')

server.use('/api/v1/scraper', scraper)


server.use(express.json())
server.use(express.static(path.join(__dirname, './public')))

module.exports = server