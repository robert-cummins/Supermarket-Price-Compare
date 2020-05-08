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

    const categorys = {
        fresh: 'Fresh food, chilled and bakery',
        frozen: 'Frozen',
        pantry: 'Pantry and non perishables',
        alcohol: 'Beer, cider and wine',
        personalCare: 'Personal Care',
        baby: 'Baby toddler',
        kitchen: 'Kitchen, dining and household'
    }

    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()
    const context = browser.defaultBrowserContext();
    
    for (let i = 1; i <= 20; i++) {
        if (i <= 2) {
            await marketFunction.scrapeCountdown("https://shop.countdown.co.nz/shop/browse/meat?page=", i, context, page, CountdownProduct, categorys.fresh)
            await marketFunction.scrapeCountdown("https://shop.countdown.co.nz/shop/browse/seafood?page=", i, context, page, CountdownProduct, categorys.fresh)
            await marketFunction.scrapeCountdown("https://shop.countdown.co.nz/shop/browse/liquor-beer-cider?page=", i, context, page, CountdownProduct, categorys.alcohol)
        }
        if (i <= 3) {
            await marketFunction.scrapeNewWorldPakSave("https://www.paknsaveonline.co.nz/category/chilled-frozen-and-desserts/desserts?ps=50&pg=", i, context, page, PakAndSaveProduct, 'PakSave', categorys.frozen)
            await marketFunction.scrapeCountdown("https://shop.countdown.co.nz/shop/browse/fruit-vegetables?page=", i, context, page, CountdownProduct, categorys.fresh)
        }
        if (i <= 4) { await marketFunction.scrapeCountdown("https://shop.countdown.co.nz/shop/browse/bakery?page=", i, context, page, CountdownProduct, categorys.fresh) }
        if (i <= 5) {
            await marketFunction.scrapeNewWorldPakSave("https://www.ishopnewworld.co.nz/category/chilled-frozen-and-desserts/desserts?ps=50&pg=", i, context, page, NewWorldProduct, 'NewWorld', categorys.frozen) 
            await marketFunction.scrapeCountdown("https://shop.countdown.co.nz/shop/browse/baby-care?page=", i, context, page, CountdownProduct, categorys.baby)
            await marketFunction.scrapeCountdown("https://shop.countdown.co.nz/shop/browse/canned-prepared-foods?page=", i, context, page, CountdownProduct, categorys.pantry)
        }
        if (i <= 6) {
            await marketFunction.scrapeNewWorldPakSave("https://www.ishopnewworld.co.nz/category/chilled-frozen-and-desserts/cheese?ps=50&pg=", i, context, page, NewWorldProduct, 'NewWorld', categorys.fresh)
            await marketFunction.scrapeNewWorldPakSave("https://www.paknsaveonline.co.nz/category/chilled-frozen-and-desserts/cheese?ps=50&pg=", i, context, page, PakAndSaveProduct, 'PakSave', categorys.fresh)
            await marketFunction.scrapeNewWorldPakSave("https://www.paknsaveonline.co.nz/category/chilled-frozen-and-desserts/frozen-foods?ps=50&pg=", i, context, page, PakAndSaveProduct, 'PakSave', categorys.frozen)
            await marketFunction.scrapeNewWorldPakSave("https://www.paknsaveonline.co.nz/category/baby-toddler-and-kids?ps=50&pg=", i, context, page, PakAndSaveProduct, 'PakSave', categorys.baby)
        }
        if (i <= 7) {
            await marketFunction.scrapeNewWorldPakSave("https://www.ishopnewworld.co.nz/category/baby-toddler-and-kids?ps=50&pg=", i, context, page, NewWorldProduct, 'NewWorld', categorys.baby)
            await marketFunction.scrapeCountdown("https://shop.countdown.co.nz/shop/browse/frozen-foods?page=", i, context, page, CountdownProduct, categorys.frozen)

        }
        if (i <= 8) { await marketFunction.scrapeCountdown("https://shop.countdown.co.nz/shop/browse/baking-cooking?page=", i, context, page, CountdownProduct, categorys.pantry) }
        if (i <= 9) {
            await marketFunction.scrapeNewWorldPakSave("https://www.ishopnewworld.co.nz/category/chilled-frozen-and-desserts/frozen-foods?ps=50&pg=", i, context, page, NewWorldProduct, 'NewWorld', categorys.frozen)
            await marketFunction.scrapeNewWorldPakSave("https://www.paknsaveonline.co.nz/category/drinks/cold-drinks?ps=50&pg=", i, context, page, PakAndSaveProduct, 'PakSave', categorys.pantry)
            await marketFunction.scrapeCountdown("https://shop.countdown.co.nz/shop/browse/liquor-wine?page=", i, context, page, CountdownProduct, categorys.alcohol)
            await marketFunction.scrapeCountdown("https://shop.countdown.co.nz/shop/browse/cleaning-homecare?page=", i, context, page, CountdownProduct, categorys.kitchen)

        }
        if (i <= 10) { await marketFunction.scrapeCountdown("https://shop.countdown.co.nz/shop/browse/chocolate-sweets-snacks?page=", i, context, page, CountdownProduct, categorys.pantry) }
        if (i <= 11) { await marketFunction.scrapeCountdown("https://shop.countdown.co.nz/shop/browse/drinks-hot-cold?page=", i, context, page, CountdownProduct, categorys.pantry) }
        if (i <= 13) { await marketFunction.scrapeCountdown("https://shop.countdown.co.nz/shop/browse/deli-chilled-foods?page=", i, context, page, CountdownProduct, categorys.fresh) }
        if (i <= 13) { await marketFunction.scrapeCountdown("https://shop.countdown.co.nz/shop/browse/meal-ingredients?page=", i, context, page, CountdownProduct, categorys.fresh) }
        if (i <= 14) {
            await marketFunction.scrapeNewWorldPakSave("https://www.ishopnewworld.co.nz/category/beer-cider-and-wine?ps=50&pg=", i, context, page, NewWorldProduct, 'NewWorld', categorys.alcohol)
            await marketFunction.scrapeNewWorldPakSave("https://www.ishopnewworld.co.nz/category/drinks/cold-drinks?ps=50&pg=", i, context, page, NewWorldProduct, 'NewWorld', categorys.pantry)
        }
        if (i <= 15) { await marketFunction.scrapeNewWorldPakSave("https://www.paknsaveonline.co.nz/category/beer-cider-and-wine?ps=50&pg=", i, context, page, PakAndSaveProduct, 'PakSave', categorys.alcohol) }
        await marketFunction.scrapeNewWorldPakSave("https://www.ishopnewworld.co.nz/category/fresh-foods-and-bakery?ps=50&pg=", i, context, page, NewWorldProduct, 'NewWorld', categorys.fresh)
        await marketFunction.scrapeNewWorldPakSave("https://www.ishopnewworld.co.nz/category/pantry?ps=50&pg=", i, context, page, NewWorldProduct, 'NewWorld', categorys.pantry)
        await marketFunction.scrapeNewWorldPakSave("https://www.ishopnewworld.co.nz/category/personal-care?ps=50&pg=", i, context, page, NewWorldProduct, 'NewWorld', categorys.personalCare)
        await marketFunction.scrapeNewWorldPakSave("https://www.paknsaveonline.co.nz/category/personal-care?ps=50&pg=", i, context, page, PakAndSaveProduct, 'PakSave', categorys.personalCare)
        await marketFunction.scrapeNewWorldPakSave("https://www.paknsaveonline.co.nz/category/fresh-foods-and-bakery?ps=50&pg=", i, context, page, PakAndSaveProduct, 'PakSave', categorys.fresh)
        await marketFunction.scrapeNewWorldPakSave("https://www.paknsaveonline.co.nz/category/pantry?ps=50&pg=", i, context, page, PakAndSaveProduct, 'PakSave', categorys.pantry)
        await marketFunction.scrapeCountdown("https://shop.countdown.co.nz/shop/browse/personal-care?page=", i, context, page, CountdownProduct, categorys.personalCare)
        await marketFunction.scrapeNewWorldPakSave("https://www.ishopnewworld.co.nz/category/kitchen-dining-and-household?ps=50&pg=", i, context, page, NewWorldProduct, 'NewWorld', categorys.kitchen)
        await marketFunction.scrapeNewWorldPakSave("https://www.paknsaveonline.co.nz/category/kitchen-dining-and-household?ps=50&pg=", i, context, page, PakAndSaveProduct, 'PakSave', categorys.kitchen)



    }
    await browser.close();
}


module.exports = {
    scrapeSites
}

// scrapeSites()