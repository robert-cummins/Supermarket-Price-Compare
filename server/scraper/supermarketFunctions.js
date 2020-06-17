const dbFunctions = require('./dbFunctions')

async function scrapeNewWorldPakSave(url, pageNum, context, page, marketModel, marketName, category) {

    await context.overridePermissions(url + pageNum, ['geolocation'])
    await page.goto(url + pageNum, { waitUntil: 'networkidle2' })
    await page.setGeolocation({ latitude: -41.274006, longitude: 174.778067 });
    const newWorldElementTextArr = await scrapeSuperMarketTextData(page, ".fs-product-card")

    // newWorldElementTextArr is a array of arrays that contain products and info
    // console.log(newWorldElementTextArr)
    const pics = await getPictureArray(page, ".fs-product-card__product-image" )

    const newWorldData = await getNewworldOrPakSaveDataObject(newWorldElementTextArr, pics, marketName, category)

    

    // pics is an array of hrefs for pictures. They seem to match order of newWorldElementTextArr. Do more research to confirm and find a way to add href to the finished object of each item
    // console.log(pics)
    dbFunctions.insertData(newWorldData, marketModel)
}

async function scrapeCountdown(url, pageNum, context, page, marketModel, category) {
    await context.overridePermissions(url + pageNum, ['geolocation'])
    await page.goto(url + pageNum, { waitUntil: 'networkidle2' })
    if (await page.$('#pageSize') !== null) console.log('found');
    else console.log('not found');
    await page.setGeolocation({ latitude: -41.274006, longitude: 174.778067 });
    if (pageNum <= 1) {
        if (await page.$('#pageSize') !== null) await page.select("select#pageSize", "120")
    }

    const countdownElementTextArr = await scrapeSuperMarketTextData(page, ".product-entry")
    const countdownData = getCountdownDataObject(countdownElementTextArr, category)
    dbFunctions.insertData(countdownData, marketModel)
}


function getCountdownDataObject(trimedArr, category) {
    let dataArray = []
    trimedArr.map(el => {
        productObject = { name: el[0], price: '', type: '', weight: 'N/A', supermarket: 'Countdown', category: category, dateAdded: getDate() }
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
        productObject = { name: el[0], price: `${el[4]}.${el[5]}`, type: el[6], weight: 'N/A', supermarket: market, category: category, dateAdded: getDate(), picture: picsArr[i] }
        if (!isNaN(el[2].charAt(0))) {
            productObject.weight = el[2]
        }
        return dataArray.push(productObject)
    })
    console.log(dataArray)
    return dataArray
}

async function getPictureArray(page, element){
    return await page.$$eval(element, el => el.map(x => x.getAttribute("style")));
    
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

function getDate() {
    let today = new Date()
    let dd = String(today.getDate()).padStart(2, '0')
    let mm = String(today.getMonth() + 1).padStart(2, '0')
    let yyyy = today.getFullYear()
    today = dd + '/' + mm + '/' + yyyy
    return today
}

getDate()

module.exports = {
    scrapeNewWorldPakSave,
    scrapeCountdown,
    getCountdownDataObject,
    getNewworldOrPakSaveDataObject,
    scrapeSuperMarketTextData,
    getPictureArray
}