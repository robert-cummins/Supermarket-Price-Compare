const puppeteer = require('puppeteer');

async function scrapeSite(url){
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.goto(url)

    let data = await page.evaluate(() => {
        return document.querySelector('div[class="szppmdbYutt__middle-slot-promo"] > a').innerText
    })

    console.log(data)
    
}

scrapeSite('https://www.google.com')

module.exports = {
    scrapeSite
}