const puppeteer = require('puppeteer');
const mongoose = require('mongoose')
const db = mongoose.connection;
const NewWorldProduct = mongoose.model('New World')
const CountdownProduct = mongoose.model('Countdown')
const PakAndSaveProduct = mongoose.model('Pak and Save')

async function scrapeNewWorldPakSave(url, pageNum, context, page, marketModel, marketName) {

    await context.overridePermissions(url + pageNum, ['geolocation'])
    await page.goto(url + pageNum, { waitUntil: 'networkidle2' })
    const newWorldElementTextArr = await scrapeSuperMarketTextData(page, ".fs-product-card")
    const newWorldData = await getNewworldOrPakSaveDataObject(newWorldElementTextArr, marketName)
    insertData(newWorldData, marketModel)
}

async function scrapeCountdown(url, pageNum, page, marketModel) {
    await page.goto(url + pageNum, { waitUntil: 'networkidle2' })
    if (pageNum <= 1) {
        await page.select("select#pageSize", "120")
    }

    const countdownElementTextArr = await scrapeSuperMarketTextData(page, ".product-entry")
    const countdownData = getCountdownDataObject(countdownElementTextArr)
    insertData(countdownData, marketModel)
}

async function scrapeSites() {
    deleteCollection('new worlds')
    deleteCollection('pak and saves')
    deleteCollection('countdowns')

    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()
    const context = browser.defaultBrowserContext();


    for (let i = 1; i <= 20; i++) {
        if (i <= 2) {
            await scrapeCountdown("https://shop.countdown.co.nz/shop/browse/meat?page=", i, page, CountdownProduct)
            await scrapeCountdown("https://shop.countdown.co.nz/shop/browse/seafood?page=", i, page, CountdownProduct)
            await scrapeCountdown("https://shop.countdown.co.nz/shop/browse/liquor-beer-cider?page=", i, page, CountdownProduct)
        }
        if (i <= 3) {
            // await scrapeNewWorldPakSave("https://www.paknsaveonline.co.nz/category/chilled-frozen-and-desserts/desserts?ps=50&pg=", i, context, page, PakAndSaveProduct, 'PakSave')
            await scrapeCountdown("https://shop.countdown.co.nz/shop/browse/fruit-vegetables?page=", i, page, CountdownProduct)
        }
        if (i <= 4) { await scrapeCountdown("https://shop.countdown.co.nz/shop/browse/bakery?page=", i, page, CountdownProduct) }
        if (i <= 5) {
            // await scrapeNewWorldPakSave("https://www.ishopnewworld.co.nz/category/chilled-frozen-and-desserts/desserts?ps=50&pg=", i, context, page, NewWorldProduct, 'NewWorld') 
            await scrapeCountdown("https://shop.countdown.co.nz/shop/browse/baby-care?page=", i, page, CountdownProduct)
            await scrapeCountdown("https://shop.countdown.co.nz/shop/browse/canned-prepared-foods?page=", i, page, CountdownProduct)
        }
        if (i <= 6) {
            // await scrapeNewWorldPakSave("https://www.ishopnewworld.co.nz/category/chilled-frozen-and-desserts/cheese?ps=50&pg=", i, context, page, NewWorldProduct, 'NewWorld')
            // await scrapeNewWorldPakSave("https://www.paknsaveonline.co.nz/category/chilled-frozen-and-desserts/cheese?ps=50&pg=", i, context, page, PakAndSaveProduct, 'PakSave')
            // await scrapeNewWorldPakSave("https://www.paknsaveonline.co.nz/category/chilled-frozen-and-desserts/frozen-foods?ps=50&pg=", i, context, page, PakAndSaveProduct, 'PakSave')
            // await scrapeNewWorldPakSave("https://www.paknsaveonline.co.nz/category/baby-toddler-and-kids?ps=50&pg=", i, context, page, PakAndSaveProduct, 'PakSave')
        }
        if (i <= 7) {
            // await scrapeNewWorldPakSave("https://www.ishopnewworld.co.nz/category/baby-toddler-and-kids?ps=50&pg=", i, context, page, NewWorldProduct, 'NewWorld')
            await scrapeCountdown("https://shop.countdown.co.nz/shop/browse/frozen-foods?page=", i, page, CountdownProduct)

        }
        if (i <= 8) { await scrapeCountdown("https://shop.countdown.co.nz/shop/browse/baking-cooking?page=", i, page, CountdownProduct) }
        if (i <= 9) {
            // await scrapeNewWorldPakSave("https://www.ishopnewworld.co.nz/category/chilled-frozen-and-desserts/frozen-foods?ps=50&pg=", i, context, page, NewWorldProduct, 'NewWorld')
            // await scrapeNewWorldPakSave("https://www.paknsaveonline.co.nz/category/drinks/cold-drinks?ps=50&pg=", i, context, page, PakAndSaveProduct, 'PakSave')
            await scrapeCountdown("https://shop.countdown.co.nz/shop/browse/liquor-wine?page=", i, page, CountdownProduct)
            await scrapeCountdown("https://shop.countdown.co.nz/shop/browse/cleaning-homecare?page=", i, page, CountdownProduct)

        }
        if (i <= 10) { await scrapeCountdown("https://shop.countdown.co.nz/shop/browse/chocolate-sweets-snacks?page=", i, page, CountdownProduct) }
        if (i <= 11) { await scrapeCountdown("https://shop.countdown.co.nz/shop/browse/drinks-hot-cold?page=", i, page, CountdownProduct) }
        if (i <= 13) { await scrapeCountdown("https://shop.countdown.co.nz/shop/browse/deli-chilled-foods?page=", i, page, CountdownProduct) }
        if (i <= 14) {
            // await scrapeNewWorldPakSave("https://www.ishopnewworld.co.nz/category/beer-cider-and-wine?ps=50&pg=", i, context, page, NewWorldProduct, 'NewWorld')
            // await scrapeNewWorldPakSave("https://www.ishopnewworld.co.nz/category/drinks/cold-drinks?ps=50&pg=", i, context, page, NewWorldProduct, 'NewWorld')
        }
        // if (i <= 15) { await scrapeNewWorldPakSave("https://www.paknsaveonline.co.nz/category/beer-cider-and-wine?ps=50&pg=", i, context, page, PakAndSaveProduct, 'PakSave') }
        // await scrapeNewWorldPakSave("https://www.ishopnewworld.co.nz/category/fresh-foods-and-bakery?ps=50&pg=", i, context, page, NewWorldProduct, 'NewWorld')
        // await scrapeNewWorldPakSave("https://www.ishopnewworld.co.nz/category/pantry?ps=50&pg=", i, context, page, NewWorldProduct, 'NewWorld')
        // await scrapeNewWorldPakSave("https://www.ishopnewworld.co.nz/category/personal-care?ps=50&pg=", i, context, page, NewWorldProduct, 'NewWorld')
        // await scrapeNewWorldPakSave("https://www.paknsaveonline.co.nz/category/personal-care?ps=50&pg=", i, context, page, PakAndSaveProduct, 'PakSave')
        // await scrapeNewWorldPakSave("https://www.paknsaveonline.co.nz/category/fresh-foods-and-bakery?ps=50&pg=", i, context, page, PakAndSaveProduct, 'PakSave')
        // await scrapeNewWorldPakSave("https://www.paknsaveonline.co.nz/category/pantry?ps=50&pg=", i, context, page, PakAndSaveProduct, 'PakSave')
        await scrapeCountdown("https://shop.countdown.co.nz/shop/browse/personal-care?page=", i, page, CountdownProduct)







        // await context.overridePermissions(`https://www.paknsaveonline.co.nz/category/fresh-foods-and-bakery/fruit--vegetables?ps=50&pg=${i}`, ['geolocation'])
        // await page.goto(`https://www.paknsaveonline.co.nz/category/fresh-foods-and-bakery/fruit--vegetables?ps=50&pg=${i}`, { waitUntil: 'networkidle2' })
        // const pakSaveElementTextArr = await scrapeSuperMarketTextData(page, ".fs-product-card")
        // const pakData = getNewworldOrPakSaveDataObject(pakSaveElementTextArr, 'PakSave')
        // insertData(pakData, PakAndSaveProduct)




    }
    await browser.close();
}


function insertData(arr, superMarket) {
    arr.map(el => {
        let supermarketProduct = new superMarket()
        supermarketProduct.name = el.name
        supermarketProduct.price = el.price
        supermarketProduct.type = el.type
        supermarketProduct.weight = el.weight,
            supermarketProduct.supermarket = el.supermarket
        supermarketProduct.save((err, doc) => {
            if (!err) {
                console.log("success")
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



function getCountdownDataObject(trimedArr) {
    let dataArray = []
    trimedArr.map(el => {
        productObject = { name: el[0], price: '', type: '', weight: 'N/A', supermarket: 'Countdown' }
        if (el[5] != undefined && !isNaN(el[5].charAt(0))) {
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




function getNewworldOrPakSaveDataObject(trimedArr, market) {
    let dataArray = []
    trimedArr.map((el) => {
        productObject = { name: el[0], price: `${el[4]}.${el[5]}`, type: el[6], weight: 'N/A', supermarket: market }
        if (!isNaN(el[2].charAt(0))) {
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

scrapeSites()