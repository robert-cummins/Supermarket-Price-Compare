const dbFunctions = require('./dbFunctions')
const utils = require('./utils');


async function scrapeNewWorldPakSave(url, pageNum, context, page, supermarketProductModel, marketName, category) {
    await context.overridePermissions(url + pageNum, ['geolocation'])
    await page.goto(url + pageNum, { waitUntil: 'networkidle2' })
    await page.setGeolocation({ latitude: -41.274006, longitude: 174.778067 });
    const newWorldProductsTextArr = await scrapeSuperMarketProductsText(page, ".fs-product-card")
    await utils.autoScroll(page)
    const pics = await getNewWorldPaksavePicUrls(page)
    const newWorldPakSaveProductArr = await buildNewWorldPakSaveProductArr(newWorldProductsTextArr, pics, marketName, category)
    console.log(newWorldPakSaveProductArr)
    dbFunctions.insertData(newWorldPakSaveProductArr, supermarketProductModel)
}




async function scrapeCountdown(url, pageNum, context, page, supermarketProductModel, category) {
    await context.overridePermissions(url + pageNum, ['geolocation'])
    await page.goto(url + pageNum, { waitUntil: 'networkidle2' })
    await page.setGeolocation({ latitude: -41.274006, longitude: 174.778067 });

    if (pageNum <= 1) {
        if (await page.$('#itemsperpage-dropdown-1') !== null) await page.select("select#itemsperpage-dropdown-1", "120")
    }

    await utils.autoScroll(page)
    const countdownProductsTextArr = await scrapeSuperMarketProductsText(page, ".product-entry")
    const pics = await getCountdownPicUrls(page)
    const countdownProductArr = buildCountdownProductArr(countdownProductsTextArr, pics, category)
    console.log(countdownProductArr)
    dbFunctions.insertData(countdownProductArr, supermarketProductModel)
}





function buildCountdownProductArr(trimedArr, picsArr, category) {
    let dataArray = []
    trimedArr.map((el, i) => {

        productObject = {
            name: el[0],
            price: '',
            type: '',
            weight: 'N/A',
            supermarket: 'Countdown',
            category: category,
            dateAdded: utils.getDate(),
            picture: picsArr[i]
        }

        if (el[5] != undefined && !isNaN(el[5].charAt(0))) {
            productObject.weight = el[5]
        }
        if (el[3] != undefined && (el[3].charAt(2) === 'p' || el[3].charAt(1) === 'p')) {
            productObject.weight = el[3]
        }

        if (el[el.length - 1].charAt(0) === 'S') {
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





function buildNewWorldPakSaveProductArr(trimedArr, picsArr, market, category) {
    let dataArray = []
    trimedArr.map((el, i) => {

        productObject = {
            name: el[0],
            price: `${el[4]}.${el[5]}`,
            type: el[6], weight: 'N/A',
            upermarket: market,
            category: category,
            dateAdded: utils.getDate(),
            picture: utils.trimNewWorldPakSavePicUrl(picsArr[i])
        }

        if (!isNaN(el[2].charAt(0))) {
            productObject.weight = el[2]
        }
        return dataArray.push(productObject)
    })

    return dataArray
}



async function getNewWorldPaksavePicUrls(page) {
    return await page.$$eval(".fs-product-card__product-image", el => el.map(x => x.getAttribute('style')));
}



async function getCountdownPicUrls(page) {
    return await page.$$eval(".product-entry > figure > img", el => el.map(x => x.getAttribute('src')));
}



async function scrapeSuperMarketProductsText(page, element) {
    const elements = await page.$$(element)
    const elementHandles = await Promise.all(elements.map(handle => {
        return handle.getProperty('innerText')
    }))

    const productText = await Promise.all(elementHandles.map(handle => {
        return handle.jsonValue()
    }))

    const trimmedProductTextArr = productText.map(el => {
        return el.split(/\r?\n/)
    })
    return trimmedProductTextArr
}



module.exports = {
    scrapeNewWorldPakSave,
    scrapeCountdown,
}