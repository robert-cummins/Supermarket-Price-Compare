const puppeteer = require('puppeteer');

async function scrapeSites() {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    
    let newWorldDataArray = []
    let countdownDataArray = []
    let pakSaveDataArray = []
    
    for (let i = 1; i <= 14; i++) {
        if (i <= 4) {
            await page.goto(`https://www.ishopnewworld.co.nz/category/fresh-foods-and-bakery/fruit--vegetables?ps=50&pg=${i}`, { waitUntil: 'networkidle2' })
            const newWorldElementTextArr = await scrapeNewworldTextData(page, ".fs-product-card")
            const newWorldData = await getNewworldDataObject(newWorldElementTextArr)
            newWorldDataArray.push(newWorldData)
        }
        await page.goto(`https://shop.countdown.co.nz/shop/browse/fruit-vegetables?page=${i}`, { waitUntil: 'networkidle2' })
        const countdownElementTextArr = await scrapeNewworldTextData(page, ".product-entry")
        const countdownData = getCountdownDataObject(countdownElementTextArr)
        countdownDataArray.push(countdownData)

        await page.goto(`https://www.paknsaveonline.co.nz/category/fresh-foods-and-bakery/fruit--vegetables?ps=50&pg=1`, { waitUntil: 'networkidle2' })
        const pakSaveElementTextArr = await scrapeNewworldTextData(page, ".fs-product-card")
        const pakData = getNewworldDataObject(pakSaveElementTextArr)
        pakSaveDataArray.push(pakData)
    }

    console.log(newWorldDataArray)

    console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')

    console.log(countdownDataArray)

    console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')

    console.log(pakSaveDataArray)

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




function getNewworldDataObject(trimedArr) {
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



async function scrapeNewworldTextData(page, element) {
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



scrapeSites()


module.exports = {
    scrapeSites
}
