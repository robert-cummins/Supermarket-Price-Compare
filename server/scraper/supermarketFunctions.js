const dbFunctions = require('./dbFunctions')

async function scrapeNewWorldPakSave(url, pageNum, context, page, marketModel, marketName, category) {

    await context.overridePermissions(url + pageNum, ['geolocation'])
    await page.goto(url + pageNum, { waitUntil: 'networkidle2' })
    await page.setGeolocation({ latitude: -41.274006, longitude: 174.778067 });
    const newWorldElementTextArr = await scrapeSuperMarketTextData(page, ".fs-product-card")
    const newWorldData = await getNewworldOrPakSaveDataObject(newWorldElementTextArr, marketName)
    dbFunctions.insertData(newWorldData, marketModel)
}

async function scrapeCountdown(url, pageNum, context, page, marketModel, category) {
    await context.overridePermissions(url + pageNum, ['geolocation'])
    await page.goto(url + pageNum, { waitUntil: 'networkidle2' })
    await page.setGeolocation({ latitude: -41.274006, longitude: 174.778067 });
    if (pageNum <= 1) {
        await page.select("select#pageSize", "120")
    }

    const countdownElementTextArr = await scrapeSuperMarketTextData(page, ".product-entry")
    const countdownData = getCountdownDataObject(countdownElementTextArr, category)
    dbFunctions.insertData(countdownData, marketModel)
}


function getCountdownDataObject(trimedArr) {
    let dataArray = []
    trimedArr.map(el => {
        productObject = { name: el[0], price: '', type: '', weight: 'N/A', supermarket: 'Countdown', category: category }
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

function getNewworldOrPakSaveDataObject(trimedArr, market, category) {
    let dataArray = []
    trimedArr.map((el) => {
        productObject = { name: el[0], price: `${el[4]}.${el[5]}`, type: el[6], weight: 'N/A', supermarket: market, category: category }
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
    scrapeNewWorldPakSave,
    scrapeCountdown,
    getCountdownDataObject,
    getNewworldOrPakSaveDataObject,
    scrapeSuperMarketTextData
}