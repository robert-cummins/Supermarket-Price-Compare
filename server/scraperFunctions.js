const puppeteer = require('puppeteer');

async function scrapeSite(url){
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.goto(url)

    let data = await page.evaluate(() => {
        let titles = [... document.querySelectorAll('div[class="fs-product-card__description"] > h3')]
        return titles.map((title) => title.textContent.trim())
    })
    

   console.log(data)
    
}

scrapeSite('https://www.ishopnewworld.co.nz/category/fresh-foods-and-bakery')

module.exports = {
    scrapeSite
}