const puppeteer = require('puppeteer');

async function scrapeSite(url) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url, {waitUntil: 'networkidle2'})
    
    const elements = await page.$$(".fs-product-card")

    const elementHandles = await Promise.all(elements.map(handle => {
        return handle.getProperty('innerText')
    }))

    const elementText = await Promise.all(elementHandles.map(handle => {
        return handle.jsonValue()
    }))

    const elementTextTrimed = elementText.map(el => {
        return el.split(/\r?\n/)
    })

    const dataObject = elementTextTrimed.map((el) => {
        productObject = {name: el[0], price: '', type: ''}
        if((el[el.length-1] == 'ea' || el[el.length-1] == 'kg')){
            productObject.type = el[el.length-1]
            productObject.price = `${el[el.length-3]}.${el[el.length-2]}`
        } else if ((el[el.length-2] == 'ea' || el[el.length-2] == 'kg')){
            productObject.type = el[el.length-2]
            productObject.price = `${el[el.length-4]}.${el[el.length-3]}`
        }

        return productObject  
    })
    console.log(dataObject)

}

scrapeSite('https://www.ishopnewworld.co.nz/category/fresh-foods-and-bakery')

module.exports = {
    scrapeSite
}

