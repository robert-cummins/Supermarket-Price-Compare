const puppeteer = require('puppeteer');

async function scrapeSite(url) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url, {waitUntil: 'networkidle2'})
    await page.evaluate(()=> {
        window.scrollBy(0, window.innerHeight)
    })
    await page.waitForSelector('.fs-product-card')

    const test = await page.$$(".fs-product-card")

    const testHandle = await Promise.all(test.map(handle => {
        return handle.getProperty('innerText')
    }))

    const jsTestHandle = await Promise.all(testHandle.map(handle => {
        return handle.jsonValue()
    }))

    const trimed = jsTestHandle.map(el => {
        return el.split(/\r?\n/)
    })

    const obj = trimed.map((el) => {
        productObject = {name: el[0], price: ''}
        if((el[el.length-1] == 'ea' || el[el.length-1] == 'kg')){
            productObject.price = `${el[el.length-3]}.${el[el.length-2]}`
        } else if ((el[el.length-2] == 'ea' || el[el.length-2] == 'kg')){
            productObject.price = `${el[el.length-4]}.${el[el.length-3]}`
        }

        return productObject  
    })
    console.log(obj)

}

scrapeSite('https://www.ishopnewworld.co.nz/category/fresh-foods-and-bakery/fruit--vegetables')

module.exports = {
    scrapeSite
}

