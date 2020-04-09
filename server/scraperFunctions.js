const puppeteer = require('puppeteer');
const mongoose = require('mongoose')
const NewWorldProduct = mongoose.model('New World')
const CountdownProduct = mongoose.model('Countdown')
const PakAndSaveProduct = mongoose.model('Pak and Save')

async function scrapeSites() {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    
    let newWorldDataArray = []
    let countdownDataArray = []
    let pakSaveDataArray = []
    
    for (let i = 1; i <= 14; i++) {
        if (i <= 4) {
            await page.goto(`https://www.ishopnewworld.co.nz/category/fresh-foods-and-bakery/fruit--vegetables?ps=50&pg=${i}`, { waitUntil: 'networkidle2' })
            const newWorldElementTextArr = await scrapeSuperMarketTextData(page, ".fs-product-card")
            const newWorldData = await getNewworldOrPakSaveDataObject(newWorldElementTextArr)
            insertData(newWorldData, NewWorldProduct)
            newWorldDataArray.push(newWorldData)
        }
        await page.goto(`https://shop.countdown.co.nz/shop/browse/fruit-vegetables?ps=120page=${i}`, { waitUntil: 'networkidle2' })
        const countdownElementTextArr = await scrapeSuperMarketTextData(page, ".product-entry")
        const countdownData = getCountdownDataObject(countdownElementTextArr)
        insertData(countdownData, CountdownProduct)
        countdownDataArray.push(countdownData)

        await page.goto(`https://www.paknsaveonline.co.nz/category/fresh-foods-and-bakery/fruit--vegetables?ps=50&pg=${i}`, { waitUntil: 'networkidle2' })
        const pakSaveElementTextArr = await scrapeSuperMarketTextData(page, ".fs-product-card")
        const pakData = getNewworldOrPakSaveDataObject(pakSaveElementTextArr)
        insertData(pakData, PakAndSaveProduct)
        pakSaveDataArray.push(pakData)
    }
    // return [newWorldDataArray, countdownDataArray, pakSaveDataArray]
    // console.log(pakSaveDataArray)
}


function insertData(arr, superMarket) {
    arr.map(el => {
        let newWorldProduct = new superMarket()
        newWorldProduct.name = el.name
        newWorldProduct.price = el.price
        newWorldProduct.type = el.type
        newWorldProduct.save((err, doc) => {
            if(!err){
                console.log("success")
            } else {
                console.log("failed: " + err)
            }
        })
    })
}


function getCountdownDataObject(trimedArr) {
    let dataArray = []
    trimedArr.map(el => {
        productObject = { name: el[0], price: '', type: '' }
        if (!isNaN(el[el.length - 1])) {
            productObject.price = `${el[el.length - 2]}.${el[el.length - 1]}`
            productObject.type = 'ea'
        } else {
            productObject.price = `${el[el.length - 3]}.${el[el.length - 2]}`
            productObject.type = 'kg'
        }
        return dataArray.push(productObject)
    })
    return dataArray
}




function getNewworldOrPakSaveDataObject(trimedArr) {
    let dataArray = []
    trimedArr.map((el) => {
        productObject = { name: el[0], price: '', type: '' }
        if ((el[el.length - 1] == 'ea' || el[el.length - 1] == 'kg')) {
            productObject.type = el[el.length - 1]
            productObject.price = `${el[el.length - 3]}.${el[el.length - 2]}`
        } else if ((el[el.length - 2] == 'ea' || el[el.length - 2] == 'kg')) {
            productObject.type = el[el.length - 2]
            productObject.price = `${el[el.length - 4]}.${el[el.length - 3]}`
        }
        return dataArray.push(productObject)
    })
    return dataArray
}


async function scrapeSuperMarketTextData(page, element) {
    const elements = await page.$$(element)
    const elementHandles = await Promise.all(elements.map(handle => {
        return handle.getProperty('innerText')
    }))

    const elementText = await Promise.all(elementHandles.map(handle => {
        return handle.jsonValue()
    }))

    return elementText.map(el => {
        return el.split(/\r?\n/)
    })
}

module.exports = {
    scrapeSites
}

scrapeSites()