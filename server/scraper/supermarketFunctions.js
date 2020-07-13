const dbFunctions = require('./dbFunctions')
const utils = require('./utils')


async function scrapeNewWorldPakSave(url, pageNum, context, page, supermarketProductModel, marketName, category) {
    await context.overridePermissions(url + pageNum, ['geolocation'])
    await page.goto(url + pageNum, { waitUntil: 'networkidle2' })
    await page.setGeolocation({ latitude: -41.274006, longitude: 174.778067 });
    const newWorldProductTextArr = await scrapeSuperMarketProductText(page, ".fs-product-card")
    console.log(newWorldProductTextArr)
    await utils.autoScroll(page)
    const pictureUrlsArr = await getNewWorldPaksavePicUrls(page)
    const newWorldData = await buildNewWorldPakSaveProductObject(newWorldProductTextArr, pictureUrlsArr, marketName, category)
    dbFunctions.insertData(newWorldData, supermarketProductModel)
}



async function scrapeCountdown(url, pageNum, context, page, supermarketProductModel, category) {
    await context.overridePermissions(url + pageNum, ['geolocation'])
    await page.goto(url + pageNum, { waitUntil: 'networkidle2' })
    await page.setGeolocation({ latitude: -41.274006, longitude: 174.778067 });
    
    if (pageNum <= 1) {
        if (await page.$('#itemsperpage-dropdown-1') !== null) await page.select("select#itemsperpage-dropdown-1", "120")
    }

    await utils.autoScroll(page)
    const countProductTextArr = await scrapeSuperMarketProductText(page, ".product-entry")
    const pictureUrlsArr = await getCountdownPicUrls(page)
    console.log(pictureUrlsArr)
    const countdownData = buildCountdownProductObject(countProductTextArr, pictureUrlsArr, category)
    dbFunctions.insertData(countdownData, supermarketProductModel)
}



function buildCountdownProductObject(trimedArr, picsArr, category) {
    let productObjectsArr = []
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

        return productObjectsArr.push(productObject)
    })
    console.log(productObjectsArr)
    return productObjectsArr
}


function buildNewWorldPakSaveProductObject(trimedArr, picsArr, market, category) {
    trimedArr.map((el, i) => {
        
        productObject = { 
            name: el[0], 
            price: `${el[4]}.${el[5]}`, 
            type: el[6], 
            weight: 'N/A', 
            supermarket: market, 
            category: category, 
            dateAdded: utils.getDate(), 
            picture: utils.trimNewWorldPakSavePicUrl(picsArr[i]) 
        }

        if (!isNaN(el[2].charAt(0))) {
            productObject.weight = el[2]
        }

        return productObjectsArr.push(productObject)
    })
    
    console.log(productObjectsArr)
    return productObjectsArr
}



async function getNewWorldPaksavePicUrls(page){
    return await page.$$eval(".fs-product-card__product-image", el => el.map(x => x.getAttribute('style')));
}


async function getCountdownPicUrls(page){
    return await page.$$eval(".product-entry > figure > img", el => el.map(x => x.getAttribute('src')));
}

async function scrapeSuperMarketProductText(page, element) {
    const text = await page.$$eval(element, divs => divs.map(({innerText}) => innerText))
    const trimmedTextArray = text.map(el => {
        return el.split(/\r?\n/)
    })
    return trimmedTextArray
}



module.exports = {
    scrapeNewWorldPakSave,
    scrapeCountdown,
    buildCountdownProductObject,
    buildNewWorldPakSaveProductObject,
    scrapeSuperMarketProductText
}