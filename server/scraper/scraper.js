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
    await page.setViewport({ width: 1366, height: 768})
    const context = browser.defaultBrowserContext();


        for (let i = 1; i <= 39; i++) {
            if (i <= 2) {
                await marketFunction.scrapeCountdown("https://shop.countdown.co.nz/shop/browse/meat-seafood?page=", i, context, page, CountdownProduct, categorys.fresh)
            }

            if (i <= 3) {
                await marketFunction.scrapeCountdown("https://shop.countdown.co.nz/shop/browse/fruit-veg?page=", i, context, page, CountdownProduct, categorys.fresh)
            }

            if (i <= 4) { 
                await marketFunction.scrapeCountdown("https://shop.countdown.co.nz/shop/browse/bakery?page=", i, context, page, CountdownProduct, categorys.fresh) 
                await marketFunction.scrapeCountdown("https://shop.countdown.co.nz/shop/browse/baby-child?page=", i, context, page, CountdownProduct, categorys.baby) 
            }
            
            if (i <= 6) {
                await marketFunction.scrapeCountdown("https://shop.countdown.co.nz/shop/browse/pet?page=", i, context, page, CountdownProduct, categorys.pantry)
            }

            if (i <= 7) {
                await marketFunction.scrapeCountdown("https://shop.countdown.co.nz/shop/browse/frozen?page=", i, context, page, CountdownProduct, categorys.frozen)
                await marketFunction.scrapeNewWorldPakSave("https://www.paknsaveonline.co.nz/category/baby-toddler-and-kids?ps=50&pg=", i, context, page, PakAndSaveProduct, 'PakSave', categorys.baby)
            }
            
            if (i <= 8) {
                await marketFunction.scrapeNewWorldPakSave("https://www.paknsaveonline.co.nz/category/pets?ps=50&pg=", i, context, page, PakAndSaveProduct, 'PakSave', categorys.pantry)
            }

            if (i <= 10) {
                await marketFunction.scrapeNewWorldPakSave("https://www.ishopnewworld.co.nz/category/baby-toddler-and-kids?ps=50&pg=", i, context, page, PakAndSaveProduct, 'PakSave', categorys.baby)
            }

            if (i <= 12) { 
                await marketFunction.scrapeCountdown("https://shop.countdown.co.nz/shop/browse/beer-wine?page=", i, context, page, CountdownProduct, categorys.alcohol) 
                await marketFunction.scrapeCountdown("https://shop.countdown.co.nz/shop/browse/drinks?page=", i, context, page, CountdownProduct, categorys.pantry) 
            }
            
            if (i <= 14) {
                await marketFunction.scrapeCountdown("https://shop.countdown.co.nz/shop/browse/fridge-deli?page=", i, context, page, CountdownProduct, categorys.fresh)
                await marketFunction.scrapeNewWorldPakSave("https://www.ishopnewworld.co.nz/category/pets?ps=50&pg=", i, context, page, NewWorldProduct, 'NewWorld', categorys.pantry)
                await marketFunction.scrapeNewWorldPakSave("https://www.paknsaveonline.co.nz/category/drinks?ps=50&pg=", i, context, page, PakAndSaveProduct, 'PakSave', categorys.pantry)
            }
            
            if (i <= 17) { 
                await marketFunction.scrapeNewWorldPakSave("https://www.paknsaveonline.co.nz/category/beer-cider-and-wine?ps=50&pg=", i, context, page, PakAndSaveProduct, 'PakSave', categorys.alcohol) 
            }

            if (i <= 19) { 
                await marketFunction.scrapeCountdown("https://shop.countdown.co.nz/shop/browse/household?page=", i, context, page, CountdownProduct, categorys.kitchen) 
            }

            if (i <= 20) { 
                await marketFunction.scrapeNewWorldPakSave("https://www.ishopnewworld.co.nz/category/fresh-foods-and-bakery?ps=50&pg=", i, context, page, NewWorldProduct, 'NewWorld', categorys.fresh)
                await marketFunction.scrapeNewWorldPakSave("https://www.ishopnewworld.co.nz/category/chilled-frozen-and-desserts/desserts?ps=50&pg=", i, context, page, NewWorldProduct, 'NewWorld', categorys.frozen)
                await marketFunction.scrapeNewWorldPakSave("https://www.ishopnewworld.co.nz/category/pantry?ps=50&pg=", i, context, page, NewWorldProduct, 'NewWorld', categorys.pantry)
                await marketFunction.scrapeNewWorldPakSave("https://www.ishopnewworld.co.nz/category/drinks?ps=50&pg=", i, context, page, NewWorldProduct, 'NewWorld', categorys.pantry)
                await marketFunction.scrapeNewWorldPakSave("https://www.ishopnewworld.co.nz/category/beer-cider-and-wine?ps=50&pg=", i, context, page, NewWorldProduct, 'NewWorld', categorys.alcohol)
                await marketFunction.scrapeNewWorldPakSave("https://www.ishopnewworld.co.nz/category/personal-care?ps=50&pg=", i, context, page, NewWorldProduct, 'NewWorld', categorys.personalCare)
                await marketFunction.scrapeNewWorldPakSave("https://www.ishopnewworld.co.nz/category/kitchen-dining-and-household?ps=50&pg=", i, context, page, NewWorldProduct, 'NewWorld', categorys.kitchen)
                await marketFunction.scrapeNewWorldPakSave("https://www.paknsaveonline.co.nz/category/fresh-foods-and-bakery?ps=50&pg=", i, context, page, PakAndSaveProduct, 'PakSave', categorys.fresh)
                await marketFunction.scrapeNewWorldPakSave("https://www.paknsaveonline.co.nz/category/chilled-frozen-and-desserts?ps=50&pg=", i, context, page, PakAndSaveProduct, 'PakSave', categorys.frozen)
                await marketFunction.scrapeNewWorldPakSave("https://www.paknsaveonline.co.nz/category/pantry?ps=50&pg=", i, context, page, PakAndSaveProduct, 'PakSave', categorys.pantry)
                await marketFunction.scrapeNewWorldPakSave("https://www.paknsaveonline.co.nz/category/personal-care?ps=50&pg=", i, context, page, PakAndSaveProduct, 'PakSave', categorys.personalCare)
                await marketFunction.scrapeNewWorldPakSave("https://www.paknsaveonline.co.nz/category/kitchen-dining-and-household?ps=50&pg=", i, context, page, PakAndSaveProduct, 'PakSave', categorys.kitchen)
            }

            if (i <= 25) { 
                await marketFunction.scrapeCountdown("https://shop.countdown.co.nz/shop/browse/health-beauty?page=", i, context, page, CountdownProduct, categorys.personalCare) 
            }
            
         await marketFunction.scrapeCountdown("https://shop.countdown.co.nz/shop/browse/pantry?page=", i, context, page, CountdownProduct, categorys.pantry)
            

        }
        await browser.close();
    }

marketFunction.scrapeSuperMarketTextData
module.exports = {
            scrapeSites
        }

scrapeSites()