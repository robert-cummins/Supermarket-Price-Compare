const dbFunctions = require('./dbFunctions')
const utils = require('./utils')

async function scrapeNewWorldPakSave(url, pageNum, context, page, marketModel, marketName, category) {

    await context.overridePermissions(url + pageNum, ['geolocation'])
    await page.goto(url + pageNum, { waitUntil: 'networkidle2' })
    await page.setGeolocation({ latitude: -41.274006, longitude: 174.778067 });
    const newWorldElementTextArr = await scrapeSuperMarketTextData(page, ".fs-product-card")
    await utils.autoScroll(page)
    const pics = await getNewWorldPaksavePics(page)
    console.log(pics)
    const newWorldData = await getNewworldOrPakSaveDataObject(newWorldElementTextArr, pics, marketName, category)
    dbFunctions.insertData(newWorldData, marketModel)
}

async function scrapeCountdown(url, pageNum, context, page, marketModel, category) {
    await context.overridePermissions(url + pageNum, ['geolocation'])
    await page.goto(url + pageNum, { waitUntil: 'networkidle2' })
    await page.setGeolocation({ latitude: -41.274006, longitude: 174.778067 });

    if (pageNum <= 1) {
        if (await page.$('#itemsperpage-dropdown-1') !== null) await page.select("select#itemsperpage-dropdown-1", "120")
    }

    await utils.autoScroll(page)
    const countdownElementTextArr = await scrapeSuperMarketTextData(page, ".product-entry")
    const pics = await getCountdownPics(page)
    console.log(pics)
    const countdownData = getCountdownDataObject(countdownElementTextArr, pics, category)
    dbFunctions.insertData(countdownData, marketModel)
}


function getCountdownDataObject(trimedArr, picsArr, category) {
    let dataArray = []
    trimedArr.map((el, i) => {
        productObject = { name: el[0], price: '', type: '', weight: 'N/A', supermarket: 'Countdown', category: category, dateAdded: utils.getDate(), picture: picsArr[i] }
        if (el[5] != undefined && !isNaN(el[5].charAt(0))) {
            productObject.weight = el[5]
        } 
        if(el[3] != undefined && (el[3].charAt(2) === 'p' || el[3].charAt(1) === 'p')){
            productObject.weight = el[3]
        }
          
        if(el[el.length - 1].charAt(0) === 'S'){
            productObject.price = `${el[el.length - 4]}.${el[el.length - 3]}`
            productObject.weight = el[el.length - 7]
        }

        else if (!isNaN(el[el.length - 1])) {
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

function getNewworldOrPakSaveDataObject(trimedArr, picsArr, market, category) {
    let dataArray = []
    trimedArr.map((el, i) => {
        productObject = { name: el[0], price: `${el[4]}.${el[5]}`, type: el[6], weight: 'N/A', supermarket: market, category: category, dateAdded: utils.getDate(), picture: utils.trimNewWorldPakSavePicUrl(picsArr[i]) }
        if (!isNaN(el[2].charAt(0))) {
            productObject.weight = el[2]
        }
        console.log(productObject)
        return dataArray.push(productObject)
    })
    
    console.log(dataArray)
    return dataArray
}

async function getNewWorldPaksavePics(page){
    return await page.$$eval(".fs-product-card__product-image", el => el.map(x => x.getAttribute('style')));
}

async function getCountdownPics(page){
    return await page.$$eval(".product-entry > figure > img", el => el.map(x => x.getAttribute('src')));
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