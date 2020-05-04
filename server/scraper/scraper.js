const puppeteer = require('puppeteer')
const mongoose = require('mongoose')
const dbFunctions = require('./dbFunctions')
const NewWorldProduct = mongoose.model('New World')
const CountdownProduct = mongoose.model('Countdown')
const PakAndSaveProduct = mongoose.model('Pak and Save')
const marketFunction = require('./supermarketFunctions')



async function scrapeSites() {
    dbFunctions.deleteCollection('new worlds')
    dbFunctions.deleteCollection('pak and saves')
    dbFunctions.deleteCollection('countdowns')

    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()
    const context = browser.defaultBrowserContext();


    for (let i = 1; i <= 20; i++) {
        if (i <= 2) {
            await marketFunction.scrapeCountdown("https://shop.countdown.co.nz/shop/browse/meat?page=", i, context, page, CountdownProduct)
            await marketFunction.scrapeCountdown("https://shop.countdown.co.nz/shop/browse/seafood?page=", i, context, page, CountdownProduct)
            await marketFunction.scrapeCountdown("https://shop.countdown.co.nz/shop/browse/liquor-beer-cider?page=", i, context, page, CountdownProduct)
        }
        if (i <= 3) {
            await marketFunction.scrapeNewWorldPakSave("https://www.paknsaveonline.co.nz/category/chilled-frozen-and-desserts/desserts?ps=50&pg=", i, context, page, PakAndSaveProduct, 'PakSave')
            await marketFunction.scrapeCountdown("https://shop.countdown.co.nz/shop/browse/fruit-vegetables?page=", i, context, page, CountdownProduct)
        }
        if (i <= 4) { await marketFunction.scrapeCountdown("https://shop.countdown.co.nz/shop/browse/bakery?page=", i, context, page, CountdownProduct) }
        if (i <= 5) {
            await marketFunction.scrapeNewWorldPakSave("https://www.ishopnewworld.co.nz/category/chilled-frozen-and-desserts/desserts?ps=50&pg=", i, context, page, NewWorldProduct, 'NewWorld') 
            await marketFunction.scrapeCountdown("https://shop.countdown.co.nz/shop/browse/baby-care?page=", i, context, page, CountdownProduct)
            await marketFunction.scrapeCountdown("https://shop.countdown.co.nz/shop/browse/canned-prepared-foods?page=", i, context, page, CountdownProduct)
        }
        if (i <= 6) {
            await marketFunction.scrapeNewWorldPakSave("https://www.ishopnewworld.co.nz/category/chilled-frozen-and-desserts/cheese?ps=50&pg=", i, context, page, NewWorldProduct, 'NewWorld')
            await marketFunction.scrapeNewWorldPakSave("https://www.paknsaveonline.co.nz/category/chilled-frozen-and-desserts/cheese?ps=50&pg=", i, context, page, PakAndSaveProduct, 'PakSave')
            await marketFunction.scrapeNewWorldPakSave("https://www.paknsaveonline.co.nz/category/chilled-frozen-and-desserts/frozen-foods?ps=50&pg=", i, context, page, PakAndSaveProduct, 'PakSave')
            await marketFunction.scrapeNewWorldPakSave("https://www.paknsaveonline.co.nz/category/baby-toddler-and-kids?ps=50&pg=", i, context, page, PakAndSaveProduct, 'PakSave')
        }
        if (i <= 7) {
            await marketFunction.scrapeNewWorldPakSave("https://www.ishopnewworld.co.nz/category/baby-toddler-and-kids?ps=50&pg=", i, context, page, NewWorldProduct, 'NewWorld')
            await marketFunction.scrapeCountdown("https://shop.countdown.co.nz/shop/browse/frozen-foods?page=", i, context, page, CountdownProduct)

        }
        if (i <= 8) { await marketFunction.scrapeCountdown("https://shop.countdown.co.nz/shop/browse/baking-cooking?page=", i, context, page, CountdownProduct) }
        if (i <= 9) {
            await marketFunction.scrapeNewWorldPakSave("https://www.ishopnewworld.co.nz/category/chilled-frozen-and-desserts/frozen-foods?ps=50&pg=", i, context, page, NewWorldProduct, 'NewWorld')
            await marketFunction.scrapeNewWorldPakSave("https://www.paknsaveonline.co.nz/category/drinks/cold-drinks?ps=50&pg=", i, context, page, PakAndSaveProduct, 'PakSave')
            await marketFunction.scrapeCountdown("https://shop.countdown.co.nz/shop/browse/liquor-wine?page=", i, context, page, CountdownProduct)
            await marketFunction.scrapeCountdown("https://shop.countdown.co.nz/shop/browse/cleaning-homecare?page=", i, context, page, CountdownProduct)

        }
        if (i <= 10) { await marketFunction.scrapeCountdown("https://shop.countdown.co.nz/shop/browse/chocolate-sweets-snacks?page=", i, context, page, CountdownProduct) }
        if (i <= 11) { await marketFunction.scrapeCountdown("https://shop.countdown.co.nz/shop/browse/drinks-hot-cold?page=", i, context, page, CountdownProduct) }
        if (i <= 13) { await marketFunction.scrapeCountdown("https://shop.countdown.co.nz/shop/browse/deli-chilled-foods?page=", i, context, page, CountdownProduct) }
        if (i <= 14) {
            await marketFunction.scrapeNewWorldPakSave("https://www.ishopnewworld.co.nz/category/beer-cider-and-wine?ps=50&pg=", i, context, page, NewWorldProduct, 'NewWorld')
            await marketFunction.scrapeNewWorldPakSave("https://www.ishopnewworld.co.nz/category/drinks/cold-drinks?ps=50&pg=", i, context, page, NewWorldProduct, 'NewWorld')
        }
        if (i <= 15) { await marketFunction.scrapeNewWorldPakSave("https://www.paknsaveonline.co.nz/category/beer-cider-and-wine?ps=50&pg=", i, context, page, PakAndSaveProduct, 'PakSave') }
        await marketFunction.scrapeNewWorldPakSave("https://www.ishopnewworld.co.nz/category/fresh-foods-and-bakery?ps=50&pg=", i, context, page, NewWorldProduct, 'NewWorld')
        await marketFunction.scrapeNewWorldPakSave("https://www.ishopnewworld.co.nz/category/pantry?ps=50&pg=", i, context, page, NewWorldProduct, 'NewWorld')
        await marketFunction.scrapeNewWorldPakSave("https://www.ishopnewworld.co.nz/category/personal-care?ps=50&pg=", i, context, page, NewWorldProduct, 'NewWorld')
        await marketFunction.scrapeNewWorldPakSave("https://www.paknsaveonline.co.nz/category/personal-care?ps=50&pg=", i, context, page, PakAndSaveProduct, 'PakSave')
        await marketFunction.scrapeNewWorldPakSave("https://www.paknsaveonline.co.nz/category/fresh-foods-and-bakery?ps=50&pg=", i, context, page, PakAndSaveProduct, 'PakSave')
        await marketFunction.scrapeNewWorldPakSave("https://www.paknsaveonline.co.nz/category/pantry?ps=50&pg=", i, context, page, PakAndSaveProduct, 'PakSave')
        await marketFunction.scrapeCountdown("https://shop.countdown.co.nz/shop/browse/personal-care?page=", i, context, page, CountdownProduct)
        await marketFunction.scrapeNewWorldPakSave("https://www.ishopnewworld.co.nz/category/kitchen-dining-and-household?ps=50&pg=", i, context, page, NewWorldProduct, 'NewWorld')
        await marketFunction.scrapeNewWorldPakSave("https://www.paknsaveonline.co.nz/category/kitchen-dining-and-household?ps=50&pg=", i, context, page, PakAndSaveProduct, 'PakSave')



    }
    await browser.close();
}


module.exports = {
    scrapeSites
}

// scrapeSites()