const dbFunctions = require('./dbFunctions')

async function scrapeNewWorldPakSave(url, pageNum, context, page, marketModel, marketName, category) {

    await context.overridePermissions(url + pageNum, ['geolocation'])
    await page.goto(url + pageNum, { waitUntil: 'networkidle2' })
    await page.setGeolocation({ latitude: -41.274006, longitude: 174.778067 });
    const newWorldElementTextArr = await scrapeSuperMarketTextData(page, ".fs-product-card")
    const pics = await getNewWorldPaksavePics(page)
    const newWorldData = await getNewworldOrPakSaveDataObject(newWorldElementTextArr, pics, marketName, category)
    dbFunctions.insertData(newWorldData, marketModel)
}

async function scrapeCountdown(url, pageNum, context, page, marketModel, category) {
    await context.overridePermissions(url + pageNum, ['geolocation'])
    await page.goto(url + pageNum, { waitUntil: 'networkidle2' })
    await page.setGeolocation({ latitude: -41.274006, longitude: 174.778067 });
    await autoScroll(page)
    if (await page.$('#itemsperpage-dropdown-1') !== null) console.log('found');
    else console.log('not found');
    if (pageNum <= 1) {
        if (await page.$('#itemsperpage-dropdown-1') !== null) await page.select("select#itemsperpage-dropdown-1", "120")
    }
    const countdownElementTextArr = await scrapeSuperMarketTextData(page, ".product-entry")
    const pics = await getCountdownPics(page)
    const countdownData = getCountdownDataObject(countdownElementTextArr, pics, category)
    dbFunctions.insertData(countdownData, marketModel)
}


function getCountdownDataObject(trimedArr, picsArr, category) {
    let dataArray = []
    trimedArr.map((el, i) => {
        productObject = { name: el[0], price: '', type: '', weight: 'N/A', supermarket: 'Countdown', category: category, dateAdded: getDate(), picture: picsArr[i] }
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
        productObject = { name: el[0], price: `${el[4]}.${el[5]}`, type: el[6], weight: 'N/A', supermarket: market, category: category, dateAdded: getDate(), picture: trimNewWorldPakSavePicUrl(picsArr[i]) }
        if (!isNaN(el[2].charAt(0))) {
            productObject.weight = el[2]
        }
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

function getDate() {
    let today = new Date()
    let dd = String(today.getDate()).padStart(2, '0')
    let mm = String(today.getMonth() + 1).padStart(2, '0')
    let yyyy = today.getFullYear()
    today = dd + '/' + mm + '/' + yyyy
    return today
}

async function autoScroll(page){
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if(totalHeight >= scrollHeight){
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
}

function trimNewWorldPakSavePicUrl(url){
    const regExp = /\(([^)]+)\)/
    url =  regExp.exec(url)
    url = url[0].replace(/[{()}]/g, '');
    url = url.replace(/'/g, '')
    return url
}



module.exports = {
    scrapeNewWorldPakSave,
    scrapeCountdown,
    getCountdownDataObject,
    getNewworldOrPakSaveDataObject,
    scrapeSuperMarketTextData
}