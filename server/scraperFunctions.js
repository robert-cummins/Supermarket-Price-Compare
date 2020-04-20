const puppeteer = require('puppeteer');
const mongoose = require('mongoose')
const db = mongoose.connection;
const NewWorldProduct = mongoose.model('New World')
const CountdownProduct = mongoose.model('Countdown')
const PakAndSaveProduct = mongoose.model('Pak and Save')

async function scrapeSites() {
    deleteCollection('new worlds')
    deleteCollection('pak and saves')
    deleteCollection('countdowns')
    
    const browser = await puppeteer.launch({headless: false})
    const page = await browser.newPage()
    
    

    for (let i = 1; i <= 12; i++) {
        
        const context = browser.defaultBrowserContext();
        await context.overridePermissions(`https://www.ishopnewworld.co.nz/category/fresh-foods-and-bakery/fruit--vegetables?ps=50&pg=${i}`, ['geolocation'])
        await page.goto(`https://www.ishopnewworld.co.nz/category/fresh-foods-and-bakery/fruit--vegetables?ps=50&pg=${i}`, { waitUntil: 'networkidle2' })
        const newWorldElementTextArr = await scrapeSuperMarketTextData(page, ".fs-product-card")
        const newWorldData = await getNewworldOrPakSaveDataObject(newWorldElementTextArr)
        console.log(newWorldData)
        insertData(newWorldData, NewWorldProduct)

      
        await context.overridePermissions(`https://www.paknsaveonline.co.nz/category/fresh-foods-and-bakery/fruit--vegetables?ps=50&pg=${i}`, ['geolocation'])
        await page.goto(`https://www.paknsaveonline.co.nz/category/fresh-foods-and-bakery/fruit--vegetables?ps=50&pg=${i}`, { waitUntil: 'networkidle2' })
        const pakSaveElementTextArr = await scrapeSuperMarketTextData(page, ".fs-product-card")
        const pakData = getNewworldOrPakSaveDataObject(pakSaveElementTextArr)
        console.log(pakData)
        insertData(pakData, PakAndSaveProduct)
           
        await page.goto(`https://shop.countdown.co.nz/shop/browse/fruit-vegetables?page=${i}`, { waitUntil: 'networkidle2' })
        const countdownElementTextArr = await scrapeSuperMarketTextData(page, ".product-entry")
        // console.log(countdownElementTextArr)
        const countdownData = getCountdownDataObject(countdownElementTextArr)
        console.log(countdownData)
        insertData(countdownData, CountdownProduct)

        
    }
    await browser.close();
}


function insertData(arr, superMarket) {
    arr.map(el => {
        let newWorldProduct = new superMarket()
        newWorldProduct.name = el.name
        newWorldProduct.price = el.price
        newWorldProduct.type = el.type
        newWorldProduct.save((err, doc) => {
            if (!err) {
                console.log("success")
            } else {
                console.log("failed: " + err)
            }
        })
    })
}

function deleteCollection(collection){
    db.dropCollection(collection, function (err, result) {
        if (err) {console.log("error delete collection")} 
        else {console.log("delete collection success")}
    });
}



function getCountdownDataObject(trimedArr) {
    let dataArray = []
    trimedArr.map(el => {
        productObject = { name: el[0], price: '', type: '', weight: 'N/A' }
        if(el[5] != undefined && !isNaN(el[5].charAt(0))){
            productObject.weight = el[5]
        }
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
        productObject = { name: el[0], price: `${el[4]}.${el[5]}`, type: el[6], weight: 'N/A' }
        if(!isNaN(el[2].charAt(0))){
            productObject.weight = el[2]
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

// scrapeSites()